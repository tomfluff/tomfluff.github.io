# Blog narrations

Audiobook-style narrations of the blog posts, played by the "Listen to this article" player (see "Audio narration" in `POST_WRITING_GUIDE.md`). Jekyll ignores this folder because its name starts with an underscore, so nothing here is published.

## What's here

| Path                      | What it is                                                                 |
| ------------------------- | -------------------------------------------------------------------------- |
| `SCRIPT_GUIDE.md`         | How to turn a post into a narration script: roles, chapters, descriptions  |
| `lexicon.tsv`             | Pronunciations, applied at render time (`written<TAB>spoken`, whole words) |
| `lexicon-kokoro.tsv`      | Extra pronunciations for Kokoro voices only, written in IPA                |
| `scripts/<post>.txt`      | One script per post, named after the post file without `.md`               |
| `scripts/<post>.notes.md` | What the script changed or skipped, and names to double-check              |
| `scripts/skipped/`        | Scripts not published. The P2T interview page redirects to Perkins         |
| `.work/`                  | Block timings and render logs (git-ignored)                                |

## Voices and settings

Since 2026-09-29 the narrations use [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), run from the Voicebox virtualenv on the GPU. Yotam picked the voices by rating samples.

- **Main voice** (`[body]`): Kokoro `am_fenrir`.
- **Narrator** (`[title]`, `[describe]`, `[quote]`): Kokoro `af_heart`.
- **Speed:** all eight posts render in about 2 minutes.
- **Earlier setup:** Pocket TTS, with Yotam's own recorded voice (`~/sandbox/pocket-tts/voice-profiles/self/emotions/conversational.safetensors`) for `[body]` and the built-in `george` for the narrator, at 5 decode steps. To go back, set `BODY_VOICE`, `NARRATOR_VOICE` and `NARRATION_PYTHON` for `bin/narrate_posts.sh` (see the comments at its top). Voice files stay on this machine and are never committed.
- **Pronunciations:** chosen by Yotam, by ear:
  - "ASSETS 2025" is read as "Assets twenty twenty-five".
  - VeasyGuide is "VizzyGuide", as one word. Spaces or dashes make the voice split it.
  - UIST is "Wist", and CHI is "Kai".
  - "Sechayk" with the Hebrew ח, `/sɛxːˈajɪk/`, and "Yotam" as the Hebrew "yo-TAHM", `/jOtˈɑm/`. Only Kokoro can take IPA, so these live in `lexicon-kokoro.tsv`. Kokoro writes the "ai" in "Sechayk" as `aj` and the "o" in "Yotam" as `O`, in its own phoneme alphabet (misaki).

## Adding a narration for a new post

1. **Write the script.** Follow `SCRIPT_GUIDE.md` and save `scripts/<post>.txt`, plus a short `scripts/<post>.notes.md`.
2. **Add new pronunciations** to `lexicon.tsv`, such as acronyms or a conference name with a year. Names that need exact sounds go in `lexicon-kokoro.tsv` as `[Word](/IPA/)`.
3. **Render it:**
   ```bash
   bin/narrate_posts.sh <post>
   ```
   This writes `assets/audio/posts/<post>.mp3`, `.chapters.json` and `.peaks.json`.
4. **Check it:**
   ```bash
   ~/sandbox/whisper/.venv/bin/python bin/narration_check.py <post>
   ```
   This transcribes every block with the local Whisper large-v3-turbo in `~/sandbox/whisper` (see its README), and lists the blocks that don't match the script. Expect names and numbers to show up in the list, because Whisper writes numbers as digits. Look for missing sentences.
5. **Turn on the player** by adding two lines to the post's front matter:
   ```yaml
   audio: /assets/audio/posts/<post>.mp3
   audio_note: "Synthetic narration"
   ```
6. **Build the site and listen.**

If you edit a post later, update its script and render it again.
