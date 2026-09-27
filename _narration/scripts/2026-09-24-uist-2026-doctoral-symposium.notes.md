# Notes: 2026-09-24-uist-2026-doctoral-symposium

Script: `2026-09-24-uist-2026-doctoral-symposium.txt`. About 1,390 spoken words, 11 chapters.

Chapters: Introduction · Seeing a fragment at a time · Using the vision we have · Visual communication, in two directions · From tools that show to tools that see · VeasyGuide: a highlight is a message · On-Cursor Visual Context: bring context into view · Visual context for AI: let the tool see what I see · Next: both directions · Who decides where to look? · See you in Detroit.

## Changes beyond verbatim

- "UIST 2026" is written "UIST twenty twenty-six" (link text in the intro, and "If you're at UIST 2026").
- The 🎓 emoji after the intro paragraph was dropped.
- Links are read as their link text: VeasyGuide, On-Cursor Visual Context, "how we designed VeasyGuide", "try it in your browser", and my needs are not "special".
- Italic and bold emphasis is lost: _show_ (twice), _for_ me, _with_ the vision, _ability-based design_, _visual communication_, the bold "Takeaway:" and "The next question:" labels, and the bold thesis sentence ("My dissertation asks how…"). The words are unchanged.
- The "What is a doctoral symposium?" note callout (a `.block-note` blockquote in Yotam's voice) is read as `[body]`, with its bold lead-in as a plain sentence.
- VeasyGuide figure caption: "(a)", "(b)", "(c)" are written "(panel a)", "(panel b)", "(panel c)". A lone "a" in parentheses sounds like the article "a" in TTS. Revert if you prefer the original.
- The three figure.liquid images and the two inline SVGs are all introduced as "Figure:".

## Figure descriptions (each SVG described once)

Yotam asked for general, audiobook-style descriptions. Each one is cut to its title or gist in 1 to 2 sentences (25 to 40 words), followed by the full caption. The wording is condensed from the alt text or `<desc>` and adds nothing that isn't there.

- **fig-fragment** and **fig-agency**: each has a desktop and a mobile copy with the same content. Each is described once, from its `<title>` and a condensed `<desc>`.
- **uist26-ds-overview.png**: the venue years (ASSETS 2025, CHI 2026) and the per-column details were dropped. It keeps the four project names and "ongoing" and "future".
- **uist26-ds-veasyguide.png**: the colors, the Z key and the filter names were dropped. It keeps the three panels in a, b, c order, so the caption's "panel a/b/c" still lines up.
- **uist26-ds-chartaccess.png**: the chart title and the Dynamic Context and Mini-map details were dropped, because the caption and body text explain them.
- The captions are first person ("what I'm reading", "My research trajectory") but are read by George in `[describe]`.

## Skipped

- `{% cite sechayk2026visualcommunication %}`, `{% cite sechayk2025veasyguide %}`, `{% cite sechayk2026visualcontext %}`.
- Everything after the closing `<hr>`: "If you found this useful, please cite the paper:", the APA-style citation with DOI, and the BibTeX block.
- Front matter `_styles`, prettier-ignore comments, and the `{: .block-note }` attribute.
- No images without alt text. No videos, tables, embeds or footnotes.

## Structure decisions

- The four `###` subsections have `# ` chapter markers and are still spoken as `[title]` blocks. There is no `<pause>` before them. The script relies on narrate.py's role-change gap (0.8 s).

## Pronunciation to confirm

- **UIST** (written as is, including "UIST twenty twenty-six").
- **VeasyGuide** (lexicon, becomes "VizzyGuide"). It appears many times.
- **Sechayk** (byline): the lexicon.tsv has no entry. The earlier example used "Se-cha-ik".
- **Takeo Igarashi** and **Ariel Shamir** (acknowledgements).
- **AI** (throughout), **PhD** (the doctoral symposium note).
- **On-Cursor**, **Mini-map** (hyphenated names). **Detroit**, **albinism**.

## Unsure

- Whether the callout's bold question "What is a doctoral symposium?" should get a `[describe]` lead-in such as "A note:". I kept it as plain `[body]` with no added words.
