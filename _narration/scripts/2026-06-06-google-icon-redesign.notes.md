# Notes: 2026-06-06-google-icon-redesign

Chapters: Introduction · The icons are WCAG 2.1 compliant, but that's not enough · Visual perception and the effect on how we glance · What if low-vision people designed the icons? · So, what can we do?

Script: about 1,960 spoken words (2,034 with tags and markers).

Image descriptions are kept short (at most 26 words, not counting the caption). Each one keeps only the details the argument depends on: gradients and distinct colors, the four brand colors, the problem pairs, and the redesign staying distinct when blurred. The post has no `###` subsections, so no extra chapter markers were added.

## Changes beyond verbatim

- Typo fixes in `[body]`:
  - "changing it's icons" → "its icons", and "Google changes it's icon design" → "its icon design". These sound the same aloud; fixed for correctness only.
  - "even when places side by side" → "placed".
  - "For me, it absolutely a step" → "it's absolutely a step". A word is missing here, and without it the sentence sounds broken when spoken.
- Symbols written out:
  - "3:1" → "3 to 1" (twice, `[body]`).
  - "Meet x Slides, Calendar x Docs, and Chat x Sheets pairs" (`[body]`) → "Meet versus Slides, …". The letter "x" would be read as "ex". "and" is the alternative, but it gets confusing with three pairs in one sentence.
  - "vs" (alt text) and "×" (caption) in the simulated-vision figure → "versus".
  - "@brandinquirer" (two captions) → "at brandinquirer".
- Em dashes in three captions → a full stop or commas.
- Glanceable definition box: the "Source: Wiktionary the free dictionary" line moved before the quote as a `[describe]` attribution ("A definition, from Wiktionary, the free dictionary:"). The definition itself is `[quote]`.
- Six blockquotes in Yotam's own voice kept as `[body]`: "Is this Docs…", "It took me so long…", "They all look so much alike…", "Hint: I flipped…", "What if a low-vision person…", "I did not change the color profile…".
- Screenshot group: all three images have the same alt text, so they are condensed into one sentence: "Three screenshots of YouTube comments criticizing the new Google icons, from BrenTech and 9to5Google on YouTube." The per-image credits are folded into it, and the group caption is read as written.
- Description labels: "Image:" for the two icon sets, "Figure:" for the two comparison illustrations, "Three screenshots" for the comments.

## Skipped

- Five `{% cite %}` markers (TREISMAN198097 ×2, sechayk2025veasyguide ×2, Trapp2018AppIS).
- The "## References" heading and the bibliography.
- URLs: W3C WCAG 2.1, Wiktionary, the emergobyul article, and three YouTube source links. Link text is kept.
- Prettier-ignore comments and `{: .block-note }`.

## Images without alt text

- None. All six images have alt text.
- The three comment screenshots share generic alt text ("YouTube comments criticizing the new Google icons."). The listener never hears what the comments say. If that matters, the alt text in the post would need to quote a comment or two.

## Pronunciation to confirm

- **Sechayk** (byline). `lexicon.tsv` has no entry for it. The old example used "Se-cha-ik".
- **WCAG** (7 times, including a chapter title), "WCAG 2.1".
- **1.4.11** and **1.4.1** (WCAG success criterion numbers). TTS may read these as "one point four point eleven". Decide the spoken form, for example "one four eleven".
- **HCI**, **PhD**, **AI**, "the **G** logo", **alt-text**.
- **brandinquirer** (perhaps "Brand Inquirer").
- **BrenTech** ("Bren Tech"?).
- **9to5Google** (probably "nine to five Google"). Kept as written. It needs a lexicon entry.
- **Wiktionary**, **glassmorphic**, **Gemini**.

## Unsure

- "They all look so much alike, it's so hard to tell them apart!" The post frames it as a criticism "many had (including myself)". I kept it `[body]` because Yotam includes himself. Switch it to `[quote]` if it should sound like other people's words.
- "What would I had designed?" is kept verbatim. It may be meant as "have", but that is a grammar fix, not a spelling typo, so I left it.
- "Oh It's actually Calendar": the capital I makes no difference aloud, so it is kept.
- "Hint: I flipped the placement of some of the icons for the added challenge." This aside refers to a visual challenge in the figure that a listener can't try. It is kept verbatim as `[body]`.
- First chapter named "Introduction". Alternative: "Google's new icons". The intro is long (seven paragraphs and three image descriptions), so it could also be split, but the post has no heading there.
- Parentheses are kept as written ("(again)", "(too many)", "(HCI)" and so on). Check how the TTS voices them.
