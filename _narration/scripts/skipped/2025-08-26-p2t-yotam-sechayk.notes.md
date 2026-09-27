# Notes: 2025-08-26-p2t-yotam-sechayk

Script: `2025-08-26-p2t-yotam-sechayk.txt`. It has 9 chapters, about 3,590 spoken words, and about 3,060 of them are in `[body]`.

## Voices: who says what

This post is a Paths to Technology (Perkins) interview republished on the site. Its front matter redirects to perkins.org. So much of the text is not Yotam's:

- **P2T introduction** (the two opening paragraphs): `[quote]`. Before it I added the attribution `[describe] The interview opens with an introduction from Paths to Technology.`
- **Veronica's questions** (16 in total): `[quote]`. Before the first one I added a single framing line, `[describe] Veronica Lewis asks the questions, and Yotam answers.` The questions have no attribution of their own. **Alternative:** the example's per-question style, `[describe] Question one.` and so on. It is more robotic but easier to navigate.
- **Yotam's answers**: `[body]`.
- **Closing thank-you** from P2T ("Thank you to Yotam Sechayk…"): `[quote]`, with no attribution. It is clearly not Yotam, because it thanks him.
- **Byline**: I kept `By Yotam Sechayk. August 26, 2025.` because the guide requires it. But Veronica Lewis wrote and ran the interview, for P2T. Yotam may prefer something like "An interview by Veronica Lewis, Paths to Technology."

## Structure

- The markdown has no `##` headings. The questions are plain lines, not headings. (On the Perkins page they are headings. In the repo file, most questions have no blank line before them, so they would merge into the previous paragraph if rendered.) I treated the post as headingless and invented 6 chapters, which are not spoken: Introduction; Growing up with low vision; Assistive tech today; Learning tools and coding; From classes to research; Advice and the future.
- "Screen magnification", "Text-to-speech" and "Dark mode" are sub-headings under the assistive-tech question. Each is read as a `[title]` block and now also gets its own chapter marker, which brings the total to 9 chapters. **This was a judgement call.** Only "Text-to-speech" is long (about 330 words). "Screen magnification" (about 90 words) and "Dark mode" (about 60 words) are short. I gave all three a marker because they are the three parts of one answer ("magnification, text-to-speech, and dark mode"). With a marker on "Text-to-speech" only, "Dark mode" would sit inside a chapter called "Text-to-speech". It's easy to drop the two short markers if you prefer.
- I added `<pause 1.0>` before each question that doesn't start a chapter, and before the closing thank-you.

## Changes beyond verbatim

- Em dashes, and one box-drawing dash (`─`), became a comma or a full stop: "levels, even PhD students", "trip. He has been", "primary school. It looked", "explore them more. There is", "web browser. CSS is", "new format, which is".
- Bracketed link texts lost their brackets: AssistiveTouch, Speak Screen or Speak Text, accessibility shortcut.
- "Q&A-style" became "Q and A-style".
- Slashes were written out: "albinism/low vision" became "albinism or low vision". "older/younger" became "older or younger" (in `[body]`). "programming/coding" and "courses/research" use "or". **"research and/or accessibility" became "research and or accessibility"**, which is worth a listen.
- "C#" became "C sharp" (narrate.py rejects `#` as markup), and "C++" became "C plus plus", twice, in `[body]`.
- Closing: "Yotam Sechayk | GitHub" became "Yotam Sechayk, GitHub." (the pipe is gone and a full stop is added). The original link targets are unknown, so this reads a little oddly.

## Images

None of the images are real image tags. The alt text and captions were pasted in as plain lines, so I inferred which line is the alt and which is the caption.

Following the short-description rule, each description is a general gist of 12 words or fewer, followed by the caption as written. The descriptions draw only on the alt text, with nothing invented.

1. **Dome magnifier** (lines 29 and 30): the description is shortened to "a dome magnifier resting on a history textbook", followed by the caption. "5x" became "5 times".
2. **CSS comparison** (lines 58 and 59): the description is "Two screenshots of an excerpt of this post, compared side by side", followed by the caption. The alt's detail, including "about 22 pt font", is dropped. The caption itself is long and technical, at about 45 words. It is kept, but it could be trimmed if Yotam wants less detail. Units in the caption are written out: "2.5rem" became "2.5 rem", "40px and 16 px" became "40 pixels and 16 pixels" (without parentheses), and the snippet ".main font-size: 30px" became "dot main, font-size: 30 pixels".
3. **Nested HTML** (lines 65 and 66): the alt and caption are identical. The description is shortened to "deeply indented HTML code", and the full caption follows. "11-13" became "11 to 13".
4. **Mouse side buttons** (line 70): there is only one line, so it is unclear whether it's the alt or the caption. It is read as `Image: Example of side buttons on mouse.` **This image has no real alt text.**
5. **VeasyGuide screenshots** (line 88): only a caption. The URL is dropped, and "Taken from https://veasyguide.github.io/" became "taken from the VeasyGuide website". **This image has no alt text.**

## Skipped

- The front-matter description (which has HTML links), the thumbnail (`p2t-logo.png`) and the redirect.

## Pronunciation to confirm

- **AT**, in the title "AT and me". The TTS will likely say "at". A possible lexicon entry is `AT and me` → `A T and me`.
- **Sechayk**. It is not in `lexicon.tsv`. The example script had "Se-cha-ik" applied by hand, so it probably needs a lexicon row.
- **P2T**, in the intro.
- **BalaBolka**. It appears 3 times, as written in the post. The product is usually spelled "Balabolka".
- **4K** and **480p**. "480p" may come out as "four hundred eighty p".
- **A3**, the paper size.
- **rem**, the CSS unit, in the image description.
- **VeasyGuide**, which the lexicon already covers.
- Others that are probably fine: PhD, CSS, HTML, AI, R, TypeScript, AssistiveTouch, Dark Reader, nystagmus, photophobia, "C sharp", "C plus plus".

## Unsure or left alone

- "It is very, very, useful." The stray comma is kept as written.
- "VeasyGuide will be available publicly as a web application by October 2025." This is a dated statement, kept verbatim.
- "an excerpt of this post" in the CSS alt text refers to the P2T article. Kept.
