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
#   POCKET_TTS_PYTHON  Python with pocket_tts installed (default: ~/sandbox/pocket-tts/.venv/bin/python)
#   YOTAM_VOICE        Yotam's voice for his own text (default: his "conversational" emotion recording)
#   NARRATOR_VOICE     voice for titles, descriptions and other people's words (default: george)
set -euo pipefail
cd "$(dirname "$0")/.."

export POCKET_TTS_PYTHON="${POCKET_TTS_PYTHON:-$HOME/sandbox/pocket-tts/.venv/bin/python}"
export YOTAM_VOICE="${YOTAM_VOICE:-$HOME/sandbox/pocket-tts/voice-profiles/self/emotions/conversational.safetensors}"
export NARRATOR_VOICE="${NARRATOR_VOICE:-george}"
mkdir -p _narration/.work assets/audio/posts

render() {
  local name="$1"
  OMP_NUM_THREADS=4 "$POCKET_TTS_PYTHON" bin/narrate.py "_narration/scripts/$name.txt" "assets/audio/posts/$name" \
    --lexicon _narration/lexicon.tsv --steps 5 --timings "_narration/.work/$name.timings.json" \
    --voice body="$YOTAM_VOICE" --voice title="$NARRATOR_VOICE" \
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
