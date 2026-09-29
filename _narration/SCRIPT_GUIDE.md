# Writing a narration script for a blog post

These are audiobook-style narrations of Yotam Sechayk's blog posts (tomfluff.github.io). Yotam is an HCI researcher with low vision. Listeners should be able to follow the whole post by ear: the text, the images, the videos, and the structure.

Two voices, set by a role tag:

- `[body]` is **the main voice** (currently Kokoro's Fenrir). Use it only for Yotam's own words from the post.
- `[title]`, `[describe]` and `[quote]` are **the narrator** (currently Kokoro's Heart). Use them for everything added for listening, and for other people's words.

## File format (read by bin/narrate.py)

Blocks are separated by one blank line. Each block is one paragraph, written on a single line.

```
# Chapter title             a chapter marker, shown in the player's chapter list; place it right before the block that starts the chapter
[role] Paragraph text        speaks the paragraph with that role's voice
Paragraph text               a block with no tag keeps the previous block's role
<pause 1.5>                  silence in seconds, on its own block
```

Tags must be exactly `[title]`, `[body]`, `[describe]`, or `[quote]`, at the start of a block. Don't use square brackets anywhere else in the text.

## Structure

1. `# Introduction` (or a better first chapter name if the post's opening has a clear topic).
2. `[title] <Post title>.` Then a second block: `By Yotam Sechayk. <Month D, YYYY>.` Use the date from the front matter.
3. `<pause 1.2>`
4. The post, in order.
5. At the end: `<pause 1.2>`, then `[title] End of article.`

## Chapters

- One chapter per `##` heading, using the heading text. Read the heading aloud too, as its own `[title]` block, after a `<pause 1.5>` block and the `# ` marker:

  ```
  <pause 1.5>

  # Why defaults matter

  [title] Why defaults matter.

  [body] ...
  ```

- `###` subheadings: read them as a `[title]` block, but only add a chapter marker if the section is long.
- A post without headings still needs 3 to 6 chapters. Split it at natural topic changes and give each chapter a short, plain name. Don't read these invented names aloud. Only real headings are spoken.

## Yotam's text (`[body]`)

- Keep his words **exactly**. Don't paraphrase, shorten, or "improve" anything.
- You may only:
  - Fix obvious typos, such as "publuc" to "public" or "Congradulations" to "Congratulations".
  - Drop emoji.
  - Read a link as its link text and drop the URL.
  - Drop markdown, HTML and Liquid.
  - Turn a list into sentences, one item after another. Keep each item's words, and add "First," or similar only if the list is numbered.
  - Replace `---` or an em dash with a comma or a full stop, whichever fits.
  - Write "&" as "and".
- A one-paragraph blockquote in Yotam's own voice, such as his own aside, stays `[body]`.
- Footnotes: read them where they are referenced only if they add content. Otherwise skip them.

## Images, figures, and diagrams (`[describe]`)

- A single image: `[describe] Photo: <alt text>. Caption: <caption>.` Use "Figure:", "Diagram:", "Screenshot:" or "Image:" when that fits better than "Photo:".
- A group: `[describe] Two photos. Photo one: <alt>. Photo two: <alt>. Caption: <caption>.`
- Keep descriptions general, like an audiobook: one or two sentences, at most about 40 words, then the caption. Take them from the alt text, with typos fixed and cut down if needed. Don't invent details that the alt text or caption doesn't say.
- If there is no caption, leave out "Caption:". If there is no alt text, describe the image only from what the post or the file name makes clear, and list it in your notes file.
- Inline SVG figures: use their `aria-label`, `<title>`, `<desc>`, or figcaption.

## Videos, embeds, tables, and code (`[describe]`)

- **Video:** `[describe] Video: <what it is, from its title or caption>. You can watch it on the article page.` Mention captions if the post does.
- **Embedded post** (for example X): `[describe] A post on X by <author>:` followed by `[quote] <the post text>`.
- **Table:** read a small table as sentences. Summarize a large one in one or two `[describe]` sentences and say it's on the article page.
- **Code block:** describe it in one sentence.

## Other people's words (`[quote]`)

- Use this for quoted text by someone else, and for audience questions.
- Precede it with a short `[describe]` attribution when the post names the source, for example `[describe] Question one.` or `[describe] From the paper's abstract:`.

## Skip entirely

- `{% cite %}`, hidden divs, the bibliography, "cite this post" and citation blocks.
- Buttons, "related posts" and table-of-contents markers.
- Image credits: fold them into the caption only if the caption itself includes them.
- A callout that only works visually, such as "jump ahead to the recording (link)": turn it into an audio equivalent in `[describe]`, for example "You can jump to the recording from the chapter list." List it in your notes.

## Pronunciation

- Write names as they appear. A lexicon applied at render time already handles:
  - ASSETS, and ASSETS followed by a year
  - ACM SIGACCESS
  - VeasyGuide
- Write a year after a conference or event name in words, for example "UIST twenty twenty-six" or "CHI twenty twenty-five". A year elsewhere, such as "in 2025", stays as digits.
- Write out symbols that TTS reads badly: "%" as "percent", and "e.g." as "for example" (that one is allowed even in `[body]`).
- **Don't guess** how to say acronyms such as UIST, CHI, WISS or P2T. Keep them as written, and list every acronym and unusual name in your notes file so Yotam can confirm.

## Deliverables (per post)

- `scripts/<post file name without .md>.txt`: the script.
- `scripts/<post file name without .md>.notes.md`: a short list covering:
  - every change beyond verbatim, such as typo fixes, adapted callouts and summarized tables
  - skipped content
  - images without alt text
  - every acronym or unusual name whose pronunciation should be confirmed
  - anything you were unsure about

## Example

See the finished scripts in `scripts/`. `2025-11-12-veasyguide-assets-2025.txt` has photo groups, a video and a Q&A. `2026-11-01-uist-2026-doctoral-symposium.txt` has headings, subsections and figures.
