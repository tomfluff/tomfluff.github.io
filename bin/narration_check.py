#!/usr/bin/env python3
"""Check rendered narrations: transcribe each spoken block on its own and compare it with its script text.

Transcribing a whole file at once makes Whisper hallucinate repeated phrases in the gaps, so this uses
the block timings that bin/narrate.py writes (_narration/.work/<post>.timings.json).
It uses the local Whisper setup in ~/sandbox/whisper (see its README), run with that folder's Python:

    ~/sandbox/whisper/.venv/bin/python bin/narration_check.py <post> [<post> ...]

Blocks that match below the threshold are listed. Mispronounced names show up here too, so read the list.
Set WHISPER_HOME to use a Whisper folder elsewhere, and WHISPER_MODEL=base for the small, faster model.
"""

import difflib
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WHISPER_HOME = Path(os.environ.get("WHISPER_HOME", Path.home() / "sandbox" / "whisper"))
THRESHOLD = 0.85


def words(text):
    text = re.sub(r"\[([^\]]*)\]\(/[^)]*/\)", r"\1", text)  # Kokoro IPA markup: keep the written word
    return re.sub(r"[^a-z0-9' ]", " ", text.lower().replace("-", " ")).split()


def main():
    sys.path.insert(0, str(WHISPER_HOME))
    from transcribe import RATE, load_audio, load_pipeline, transcribe

    asr = load_pipeline(os.environ.get("WHISPER_MODEL", "turbo"))
    for name in sys.argv[1:]:
        blocks = json.loads((ROOT / "_narration" / ".work" / f"{name}.timings.json").read_text())
        audio = load_audio(ROOT / "assets" / "audio" / "posts" / f"{name}.mp3")
        flagged = []
        for block in blocks:
            clip = audio[int(block["start"] * RATE):int((block["end"] + 0.3) * RATE)]
            heard = transcribe(asr, clip, language="en", sequential=True)["text"]
            match = difflib.SequenceMatcher(a=words(block["text"]), b=words(heard), autojunk=False).ratio()
            if match < THRESHOLD:
                flagged.append((block["start"], match, block["text"][:90], heard.strip()[:140]))
        print(f"{name}: {len(blocks)} blocks, {len(flagged)} below {THRESHOLD}")
        for start, match, text, heard in flagged:
            print(f"  {start:7.1f}s  {match:.2f}\n     script: {text}\n     heard:  {heard}")


if __name__ == "__main__":
    main()
