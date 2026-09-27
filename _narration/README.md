# Blog narrations

Audiobook-style narrations of the blog posts, played by the "Listen to this article" player (see "Audio narration" in `POST_WRITING_GUIDE.md`). Jekyll ignores this folder because its name starts with an underscore, so nothing here is published.

## What's here

| Path                      | What it is                                                                 |
| ------------------------- | -------------------------------------------------------------------------- |
| `SCRIPT_GUIDE.md`         | How to turn a post into a narration script: roles, chapters, descriptions  |
| `lexicon.tsv`             | Pronunciations, applied at render time (`written<TAB>spoken`, whole words) |
| `scripts/<post>.txt`      | One script per post, named after the post file without `.md`               |
| `scripts/<post>.notes.md` | What the script changed or skipped, and names to double-check              |
| `scripts/skipped/`        | Scripts not published. The P2T interview page redirects to Perkins         |
| `.work/`                  | Block timings and render logs (git-ignored)                                |

## Voices and settings

- **Yotam's voice** (`[body]`): his "conversational" recording in Pocket TTS, `~/sandbox/pocket-tts/voice-profiles/self/emotions/conversational.safetensors`. The voice files stay on this machine and are never committed.
- **Narrator** (`[title]`, `[describe]`, `[quote]`): Pocket TTS's built-in `george` voice.
- **Quality:** 5 decode steps. Rendering on the CPU runs at about 0.6 to 0.9 times real time, so a 10-minute post takes 6 to 9 minutes. A GPU was only about 20% faster.
- **Pronunciations:** chosen by Yotam, by ear:
  - "ASSETS 2025" is read as "Assets twenty twenty-five".
  - VeasyGuide is "VizzyGuide", as one word. Spaces or dashes make the voice split it.
  - UIST is "Wist", and CHI is "Kai".
  - "Sechayk" is read as written. Many spellings for the Hebrew ח were tried, and none sounded right.

## Adding a narration for a new post

1. **Write the script.** Follow `SCRIPT_GUIDE.md` and save `scripts/<post>.txt`, plus a short `scripts/<post>.notes.md`.
2. **Add new pronunciations** to `lexicon.tsv`, such as acronyms or a conference name with a year.
3. **Render it:**
   ```bash
   bin/narrate_posts.sh <post>
   ```
   This writes `assets/audio/posts/<post>.mp3`, `.chapters.json` and `.peaks.json`.
4. **Check it:**
   ```bash
   ~/sandbox/voicebox/backend/venv/bin/python bin/narration_check.py <post>
   ```
   This transcribes every block and lists the ones that don't match the script. Expect names to show up in the list. Look for missing sentences.
5. **Turn on the player** by adding two lines to the post's front matter:
   ```yaml
   audio: /assets/audio/posts/<post>.mp3
   audio_note: "Synthetic narration"
   ```
6. **Build the site and listen.**

If you edit a post later, update its script and render it again.
