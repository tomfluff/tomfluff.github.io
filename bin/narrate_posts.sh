#!/usr/bin/env bash
# Render narrations for posts, three at a time, with the voices and settings we chose.
#
#   bin/narrate_posts.sh                          every script in _narration/scripts/
#   bin/narrate_posts.sh 2026-06-06-google-icon-redesign [...]
#
# Writes assets/audio/posts/<post>.mp3, .chapters.json and .peaks.json,
# plus block timings and a log in _narration/.work/ (not committed).
#
# Settings (environment variables):
#   BODY_VOICE         voice for Yotam's own text (default: kokoro:am_fenrir)
#   NARRATOR_VOICE     voice for titles, descriptions and other people's words (default: kokoro:af_heart)
#   NARRATION_PYTHON   Python with the engines in use installed (default: the Voicebox virtualenv, which has
#                      kokoro; for Pocket TTS voices use ~/sandbox/pocket-tts/.venv/bin/python)
# A voice is kokoro:<name>, or a Pocket TTS built-in name or .wav/.safetensors path.
set -euo pipefail
cd "$(dirname "$0")/.."

export BODY_VOICE="${BODY_VOICE:-kokoro:am_fenrir}"
export NARRATOR_VOICE="${NARRATOR_VOICE:-kokoro:af_heart}"
export NARRATION_PYTHON="${NARRATION_PYTHON:-$HOME/sandbox/voicebox/backend/venv/bin/python}"
mkdir -p _narration/.work assets/audio/posts

render() {
  local name="$1"
  OMP_NUM_THREADS=4 "$NARRATION_PYTHON" bin/narrate.py "_narration/scripts/$name.txt" "assets/audio/posts/$name" \
    --lexicon _narration/lexicon.tsv --kokoro-lexicon _narration/lexicon-kokoro.tsv --steps 5 \
    --timings "_narration/.work/$name.timings.json" \
    --voice body="$BODY_VOICE" --voice title="$NARRATOR_VOICE" \
    --voice describe="$NARRATOR_VOICE" --voice quote="$NARRATOR_VOICE" \
    > "_narration/.work/$name.log" 2>&1 \
    && grep Wrote "_narration/.work/$name.log" \
    && python3 bin/audio_peaks.py "assets/audio/posts/$name.mp3" \
    || { echo "FAILED $name (see _narration/.work/$name.log)"; tail -n 3 "_narration/.work/$name.log"; }
}
export -f render

if [ "$#" -gt 0 ]; then
  printf '%s\n' "$@"
else
  for script in _narration/scripts/*.txt; do basename "$script" .txt; done
fi | xargs -P 3 -I{} bash -c 'render {}'
