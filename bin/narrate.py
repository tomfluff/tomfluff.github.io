#!/usr/bin/env python3
"""Render a narration script into one MP3, with a voice per role.

Scripts live in _narration/scripts/ (see _narration/README.md). Script format, blocks separated by blank lines:

    # Chapter title          starts a chapter here (written to <out>.chapters.json)
    [role] Paragraph text    speaks the paragraph with the voice mapped to that role
    Paragraph text           continues with the previous block's role
    <pause 1.2>              inserts silence, in seconds

Roles map to Pocket TTS voices through --voice role=voice, where a voice is a built-in name
(such as george) or a .wav/.safetensors path. Run it with the Pocket TTS virtualenv, which has
pocket_tts installed. bin/narrate_posts.sh wraps this with the voices and settings we use.
"""

import argparse
import json
import re
import subprocess
import tempfile
import time
from pathlib import Path

import numpy as np

# Silence, in seconds, between blocks.
GAP_SAME_ROLE = 0.45
GAP_ROLE_CHANGE = 0.8
TARGET_RMS = 0.08

ROLE_LINE = re.compile(r"^\[([a-z_]+)\]\s*(.*)$", re.S)
PAUSE_LINE = re.compile(r"^<pause\s+([\d.]+)>$")


def parse(script: str):
    """Yield ("chapter", title), ("pause", seconds) or ("speak", role, text) items."""
    role = None
    for block in re.split(r"\n\s*\n", script.strip()):
        block = " ".join(line.strip() for line in block.strip().splitlines())
        if not block:
            continue
        if block.startswith("# "):
            yield ("chapter", block[2:].strip())
            continue
        pause = PAUSE_LINE.match(block)
        if pause:
            yield ("pause", float(pause.group(1)))
            continue
        tagged = ROLE_LINE.match(block)
        if tagged:
            role, block = tagged.group(1), tagged.group(2)
        if role is None:
            raise ValueError(f"No role set before: {block[:60]}")
        yield ("speak", role, block)


def load_lexicon(path):
    """Read written<TAB>spoken rows. Longest entries first, so "ASSETS 2025" wins over "ASSETS"."""
    if not path:
        return []
    rows = [line for line in Path(path).read_text().splitlines() if line.strip() and not line.startswith("#")]
    lexicon = []
    for line in sorted(rows, key=lambda row: -len(row.split("\t")[0])):
        written, spoken = line.split("\t")
        lexicon.append((re.compile(rf"(?<!\w){re.escape(written)}(?!\w)"), spoken))
    return lexicon


def speakable(text, lexicon):
    """Apply the pronunciation lexicon to one block of text."""
    for pattern, spoken in lexicon:
        text = pattern.sub(spoken, text)
    return text


def clean_edges(audio: np.ndarray, rate: int) -> np.ndarray:
    """Cut the decoder's start-up blip and the quiet lead-in and tail, then fade the edges.

    Every Pocket TTS clip opens with the same few-millisecond blip before the speech.
    Played straight after silence, it is heard as a click.
    """
    audio = audio[int(0.02 * rate):]
    # A higher threshold finds the onset. A lower one keeps soft word endings such as "s".
    onset = np.flatnonzero(np.abs(audio) > 0.02)
    tail = np.flatnonzero(np.abs(audio) > 0.008)
    if onset.size:
        start = max(0, onset[0] - int(0.08 * rate))
        end = min(len(audio), tail[-1] + int(0.2 * rate))
        audio = audio[start:end]
    fade_in, fade_out = int(0.015 * rate), int(0.04 * rate)
    audio = audio.copy()
    audio[:fade_in] *= np.sin(np.linspace(0, np.pi / 2, fade_in)) ** 2
    audio[-fade_out:] *= np.cos(np.linspace(0, np.pi / 2, fade_out)) ** 2
    return audio


def level(audio: np.ndarray) -> np.ndarray:
    """Bring each spoken block to the same loudness, so voices sit at one level.

    The gain is capped so peaks stay below full scale, instead of clipping them.
    """
    voiced = audio[np.abs(audio) > 0.01]
    rms = float(np.sqrt(np.mean(voiced**2))) if voiced.size else 0.0
    peak = float(np.abs(audio).max()) if audio.size else 0.0
    if rms == 0.0 or peak == 0.0:
        return audio
    return audio * min(TARGET_RMS / rms, 0.89 / peak)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("script")
    parser.add_argument("out_stem", help="Output path without extension, e.g. assets/audio/posts/<post>")
    parser.add_argument("--voice", action="append", default=[], help="role=voice")
    parser.add_argument("--device", default="cpu")
    parser.add_argument("--steps", type=int, default=5, help="LSD decode steps (quality)")
    parser.add_argument("--temp", type=float, default=None, help="Sampling temperature")
    parser.add_argument("--lexicon", default=None, help="TSV of written<TAB>spoken replacements")
    parser.add_argument("--timings", default=None, help="Write each block's start and end time here (JSON)")
    args = parser.parse_args()

    voices = dict(item.split("=", 1) for item in args.voice)
    lexicon = load_lexicon(args.lexicon)
    items = list(parse(Path(args.script).read_text()))
    unknown = {item[1] for item in items if item[0] == "speak"} - set(voices)
    if unknown:
        raise SystemExit(f"No --voice given for roles: {sorted(unknown)}")
    stray = [item[2][:60] for item in items if item[0] == "speak" and re.search(r"[\[\]<>{}*_#`]", item[2])]
    if stray:
        raise SystemExit(f"Markup left in text: {stray}")

    import scipy.io.wavfile
    from pocket_tts import TTSModel

    model = TTSModel.load_model(temp=args.temp, lsd_decode_steps=args.steps)
    model.to(args.device)
    rate = model.sample_rate
    states = {role: model.get_state_for_audio_prompt(voice) for role, voice in voices.items()}

    started = time.time()
    pieces, chapters, blocks, cursor, previous_role = [], [], [], 0.0, None
    pending_pause = None

    def add_silence(seconds):
        nonlocal cursor
        pieces.append(np.zeros(int(seconds * rate), dtype=np.float32))
        cursor += seconds

    for item in items:
        if item[0] == "chapter":
            if pending_pause:
                add_silence(pending_pause)
                pending_pause = None
            chapters.append({"t": round(cursor, 2), "title": item[1]})
        elif item[0] == "pause":
            pending_pause = item[1]
        else:
            _, role, text = item
            text = speakable(text, lexicon)
            if pieces:
                gap = GAP_SAME_ROLE if role == previous_role else GAP_ROLE_CHANGE
                add_silence(max(gap, pending_pause or 0.0))
            pending_pause = None
            audio = model.generate_audio(states[role], text).cpu().numpy().astype(np.float32)
            audio = level(clean_edges(audio, rate))
            pieces.append(audio)
            blocks.append({"start": round(cursor, 2), "end": round(cursor + len(audio) / rate, 2), "role": role, "text": text})
            cursor += len(audio) / rate
            previous_role = role
            print(f"{cursor:7.1f}s  [{role}] {text[:70]}", flush=True)

    out = Path(args.out_stem)
    out.parent.mkdir(parents=True, exist_ok=True)
    mp3 = out.parent / f"{out.name}.mp3"
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "narration.wav"
        scipy.io.wavfile.write(wav, rate, np.concatenate(pieces))
        # Spoken-word loudness (-16 LUFS, peaks under -1.5 dBTP), then a high-quality MP3.
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav),
             "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(rate), "-ac", "1",
             "-codec:a", "libmp3lame", "-q:a", "2", str(mp3)],
            check=True,
        )
    if chapters:
        (out.parent / f"{out.name}.chapters.json").write_text(json.dumps(chapters, indent=1) + "\n")
    if args.timings:
        Path(args.timings).parent.mkdir(parents=True, exist_ok=True)
        Path(args.timings).write_text(json.dumps(blocks, indent=1) + "\n")
    took = time.time() - started
    print(f"Wrote {mp3} ({cursor:.1f}s audio in {took:.0f}s, {len(chapters)} chapters)")


if __name__ == "__main__":
    main()
