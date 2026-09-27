#!/usr/bin/env python3
"""Check rendered narrations: transcribe each spoken block on its own and compare it with its script text.

Transcribing a whole file at once makes Whisper hallucinate repeated phrases in the gaps, so this uses
the block timings that bin/narrate.py writes (_narration/.work/<post>.timings.json).
It needs a Python with transformers, librosa and torch, for example the Voicebox backend virtualenv:

    ~/sandbox/voicebox/backend/venv/bin/python bin/narration_check.py <post> [<post> ...]

Blocks that match below the threshold are listed. Mispronounced names show up here too, so read the list.
"""

import difflib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THRESHOLD = 0.85


def words(text):
    return re.sub(r"[^a-z0-9' ]", " ", text.lower().replace("-", " ")).split()


def main():
    import librosa
    from transformers import pipeline

    asr = pipeline("automatic-speech-recognition", model="openai/whisper-base", device=0)
    for name in sys.argv[1:]:
        blocks = json.loads((ROOT / "_narration" / ".work" / f"{name}.timings.json").read_text())
        audio, rate = librosa.load(str(ROOT / "assets" / "audio" / "posts" / f"{name}.mp3"), sr=16000)
        flagged = []
        for block in blocks:
            clip = audio[int(block["start"] * rate):int((block["end"] + 0.3) * rate)]
            heard = asr(clip, return_timestamps=True, generate_kwargs={"language": "en"})["text"]
            match = difflib.SequenceMatcher(a=words(block["text"]), b=words(heard), autojunk=False).ratio()
            if match < THRESHOLD:
                flagged.append((block["start"], match, block["text"][:90], heard.strip()[:140]))
        print(f"{name}: {len(blocks)} blocks, {len(flagged)} below {THRESHOLD}")
        for start, match, text, heard in flagged:
            print(f"  {start:7.1f}s  {match:.2f}\n     script: {text}\n     heard:  {heard}")


if __name__ == "__main__":
    main()
