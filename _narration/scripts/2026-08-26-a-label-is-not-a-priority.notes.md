# Notes: 2026-08-26-a-label-is-not-a-priority

Chapters: GitHub's new label (invented, not spoken) · Why the label is genuinely useful · So, what's the risk? · "Later" is not a schedule · What turns a label into a commitment? · The label is how we start

## Changes beyond verbatim

- **Citations used as sentence subjects (needs a decision).** Five `{% cite %}` tags are the grammatical subject of their sentence, so skipping them (the guide's rule) would leave broken sentences like "That gap is measurable. searched 1,000 popular GitHub projects". The page renders them as "(Bi et al., 2021)". I wrote them as "Bi et al. (2021)", "Tan et al. (2020)", "Alshayban et al. (2020)", "Bi et al. (2022)" and "Indika et al. (2026)". "et al." may be read oddly or cause a sentence-break pause. Alternatives: a lexicon entry `et al.` to `and colleagues`, or drop the year.
- Numbered list of five items: each item is its own block, with "First," through "Fifth," added. The bold lead phrases are now plain sentences.
- "62%" and "89%" are written as "62 percent" and "89 percent".
- Removed a stray comma: "GitHub's good first issue label, now populates" is now "GitHub's good first issue label now populates" (subject–verb comma, would cause a pause).
- Label names that were code-formatted (accessibility, a11y, bug, enhancement, good first issue, contribute) are read as plain words. By ear, "A barrier should carry accessibility and the same priority vocabulary" does not make it obvious that "accessibility" is the label name.
- The one-line blockquotes ("Wait... what happens after somebody applies it?" and "A dedicated queue that nobody owns is not a workflow, it's a waiting room.") are Yotam's own asides, so they stay `[body]`.
- Image descriptions are shortened to a gist (1 to 2 sentences, under 40 words, plus the full caption), as the lead asked:
  - Screenshot: kept the alt text but cut "described as indicating a barrier affecting people with disabilities", since the body text right before it says the same.
  - Diagram 1: the `<title>`, plus a one-sentence summary of the `<desc>` in my own words: the owned path (owner, severity, release blocker) ends in Fixed, and the unowned path ends in Still open. The visual details (box sizes, line weights, solid or dashed borders) are dropped.
  - Diagram 2: the `<title>`, plus a one-sentence summary of the two cases. The last two `<desc>` sentences are dropped because the caption says the same thing.
- The screenshot caption keeps "Source: GitHub Docs." because it is part of the caption.
- No `###` subsections, so no extra chapter markers.
- First chapter name "GitHub's new label" was invented, since the opening has a clear topic. It is not spoken. "Introduction" would also work.

## Skipped

- All five `{% cite %}` tags as tags (their author and year are spoken, see above).
- The "References" heading and the bibliography block.
- The citation block from `citation: true`, related posts and comments (these are layout features, not post text).
- Link URLs (Maria Lamardo's post, the gstack PR, the W3C business case, the GitHub blog post, GitHub Docs).

## Images without alt text

- None. The screenshot has alt text, and both inline SVGs have `<title>` and `<desc>`.

## Pronunciation to confirm

- Sechayk (not in lexicon.tsv; the old example used "Se-cha-ik")
- Maria Lamardo
- a11y (numeronym. Could be read as "A eleven Y" or "ally")
- W3C
- AI (in "AI-assisted")
- GitHub
- Cited author surnames: Bi, Tan, Alshayban, Indika
- "et al."
- Diagram box labels read as plain words: Fixed, Still open

## Unsure

- The citation handling above is the main open question.
- "Wait... what happens after somebody applies it?": the ellipsis is kept verbatim. Check that the pause sounds right.
