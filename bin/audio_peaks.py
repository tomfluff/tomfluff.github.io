#!/usr/bin/env python3
"""Precompute waveform peaks for the blog's audio player.

The post audio player (_includes/audio_player.liquid) draws its waveform from a
small JSON file instead of downloading and decoding the whole MP3 in the
browser. This script writes that file.

Usage:
    bin/audio_peaks.py assets/audio/posts/<slug>.mp3            # writes <slug>.peaks.json next to it
    bin/audio_peaks.py assets/audio/posts/*.mp3                 # one JSON per file
    bin/audio_peaks.py in.mp3 -o out.json --count 1000          # custom output and resolution

Output format:
    {"version": 1, "duration": 483.21, "peaks": [0.0, 0.412, ..., 0.873]}

"duration" is in seconds. "peaks" holds --count values between 0 and 1: the
loudest absolute sample in each equal slice of the audio (or the RMS level with
--mode rms), normalised so the loudest slice is 1.

Needs only the Python standard library and an ffmpeg binary on PATH (or passed
with --ffmpeg). ffmpeg decodes the audio to raw 16-bit mono PCM on stdout.
"""

import argparse
import array
import json
import math
import os
import subprocess
import sys

SAMPLE_RATE = 8000  # plenty for a visual envelope, and keeps memory small


def decode(path, ffmpeg):
    """Return the audio as an array of signed 16-bit mono samples."""
    cmd = [
        ffmpeg,
        "-v", "error",
        "-nostdin",
        "-i", path,
        "-vn",
        "-ac", "1",
        "-ar", str(SAMPLE_RATE),
        "-f", "s16le",
        "-acodec", "pcm_s16le",
        "-",
    ]
    try:
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    except FileNotFoundError:
        sys.exit(f"error: could not run '{ffmpeg}'. Install ffmpeg or pass --ffmpeg /path/to/ffmpeg.")
    if proc.returncode != 0:
        sys.exit(f"error: ffmpeg failed on {path}:\n{proc.stderr.decode(errors='replace').strip()}")

    raw = proc.stdout
    if len(raw) % 2:
        raw = raw[:-1]
    samples = array.array("h")
    samples.frombytes(raw)
    if sys.byteorder == "big":
        samples.byteswap()
    return samples


def compute_peaks(samples, count, mode):
    n = len(samples)
    if n == 0:
        return [0.0] * count

    values = []
    for i in range(count):
        start = i * n // count
        end = max(start + 1, (i + 1) * n // count)
        chunk = samples[start:end]
        if mode == "rms":
            values.append(math.sqrt(sum(s * s for s in chunk) / len(chunk)))
        else:
            values.append(max(max(chunk), -min(chunk)))

    top = max(values) or 1
    return [round(v / top, 3) for v in values]


def default_output(path):
    base, _ext = os.path.splitext(path)
    return base + ".peaks.json"


def main():
    parser = argparse.ArgumentParser(description="Write waveform peaks JSON for the blog audio player.")
    parser.add_argument("inputs", nargs="+", help="audio file(s) to analyse")
    parser.add_argument("-o", "--output", help="output path (only with a single input; default: <input>.peaks.json)")
    parser.add_argument("-n", "--count", type=int, default=800, help="number of peak values (default: 800)")
    parser.add_argument("--mode", choices=["peak", "rms"], default="peak", help="level per slice (default: peak)")
    parser.add_argument("--ffmpeg", default="ffmpeg", help="ffmpeg binary (default: ffmpeg on PATH)")
    args = parser.parse_args()

    if args.output and len(args.inputs) > 1:
        parser.error("--output only works with a single input file")
    if args.count < 1:
        parser.error("--count must be at least 1")

    for path in args.inputs:
        samples = decode(path, args.ffmpeg)
        duration = round(len(samples) / SAMPLE_RATE, 3)
        data = {
            "version": 1,
            "duration": duration,
            "peaks": compute_peaks(samples, args.count, args.mode),
        }
        out = args.output or default_output(path)
        with open(out, "w", encoding="utf-8") as fh:
            json.dump(data, fh, separators=(",", ":"))
            fh.write("\n")
        print(f"{out}: {duration:.1f}s, {args.count} peaks")


if __name__ == "__main__":
    main()
