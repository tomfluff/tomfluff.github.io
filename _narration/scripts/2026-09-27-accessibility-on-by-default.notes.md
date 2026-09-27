# Notes: 2026-09-27-accessibility-on-by-default

Script: `2026-09-27-accessibility-on-by-default.txt`. About 2,350 spoken words, 7 chapters. Parses with `parse()` from `bin/narrate.py` (56 items). Tags used: `[title]`, `[body]`, `[describe]` only.

Chapters: Introduction · Trying a feature before deciding · How I have found help for myself · Where Wolverine gives players a choice · Making settings easier to find and try · Showing how people use settings · Finding help without going through every option.

## Changes beyond verbatim

- All 25 body paragraphs are verbatim once markdown, links and the cite tag are removed (checked by script).
- Bold dropped from "That opportunity to try a feature is why I favor having suitable assist features on by default." The words are unchanged.
- Links are read as their link text: Kotaku, Balabolka, SlideNotes, "Making settings easier to find and try" (an in-page anchor), "reduced its opacity for everyone", Can I Play That?, update, "screen reader starts on", SightlessKombat's review, High Contrast mode, Call of Duty, VeasyGuide, Forza Horizon 6, Digital Foundry, PlayStation Blog.
- Caption credits, shortened to a spoken credit:
  - "Image: © Insomniac, via Kotaku." became "Image from Insomniac, via Kotaku."
  - "Photo: Jacek Halicki, Wikimedia Commons, CC BY-SA 4.0." became "Photo by Jacek Halicki, Wikimedia Commons." The license was dropped.
  - "Screenshot: Balabolka website." became "Screenshot from the Balabolka website."
  - "© 2026 Marvel." became "Copyright Marvel."
  - The two "Source: …" lines (Can I Play That?, PlayStation Blog) are kept as written.
- Captions are otherwise verbatim, including "Left:" and "Right:" in the mouse and Balabolka pair.

## Image descriptions

Each is 1 to 2 sentences (25 to 45 words), condensed from the alt text, then the caption.

- **wolverine-scent-trail.jpg**: the full alt text (25 words).
- **on-by-default-mouse.jpg + on-by-default-balabolka.png**: read as "A photo and a screenshot." The USB receiver and the "toolbar" and "rate and pitch" details were dropped. About 45 words for the pair.
- **on-by-default-slidenotes.jpg**: "comment counts" was dropped. The comment 'Use larger font size.' is in double quotes without its full stop.
- **wolverine-cipt-article.jpg**: keeps the author (Marijn Rongen), the headline and the brighter-vs-fainter trail. The date is left to the caption, and "wooden rooftops" was dropped.
- **wolverine-high-contrast.jpg**: lightly trimmed alt text.
- **on-by-default-mockup-a.jpg**: says "a mockup of accessibility settings for an invented game", following the caption. The hand-drawn scene, the Vision tab and the full playtester note ("Experiences differ. Try it and see what works for you.") were cut down to "noting that experiences differ".
- **on-by-default-mockup-b.jpg**: its caption doesn't say the game is invented, so the description opens "An invented mockup". The chest, lever, door and plant with yellow outlines were dropped. "said:" plus single quotes became "said," plus double quotes.

## Skipped

- `{% cite sechayk2025veasyguide %}`.
- The reference list, related posts and "cite this post" are rendered from front matter, not the post body, so nothing is in the script.
- No images without alt text. No videos, tables, embeds or footnotes.

## Pronunciation to confirm

Nothing in this post is in `lexicon.tsv` except VeasyGuide ("VizzyGuide"). Suggested spoken forms, written as one word where a space would make the voice split it:

- **WYSIWYG**: "wizzywig".
- **Modern Warfare III**: "Modern Warfare Three". "III" may be read as letters.
- **SightlessKombat** (as "SightlessKombat's review"): "Sightless Combat". The CamelCase may run together.
- **Balabolka** (4 times): stress on BOL, "bah-lah-BOL-kah". Try as written first; fallback "Bahlabolka".
- **Insomniac** (3 times): probably fine; fallback "Insomneeack".
- **Kotaku** (twice): "koh-TAH-koo"; fallback "Kotahkoo".
- **Marijn Rongen** (image description): Dutch, roughly "mah-RAIN RONG-en"; suggested "Mahrain Rongen".
- **Jacek Halicki** (caption): Polish, "YAH-tsek hah-LEETS-kee"; suggested "Yatsek Haleetskee".
- **Can I Play That?** (4 times, mid-sentence): the "?" may make the voice rise and pause as if a question ends. Suggested lexicon entry "Can I Play That?" to "Can I Play That".
- **DIY** (twice): "D I Y". **PC**: "P C". **AI**: as elsewhere.
- **SlideNotes**: "Slide Notes" if it runs together.
- **Codex**, **Figma**, **Gene Park**, **Logan**, **Spider-Man**, **Forza Horizon 6** ("six"), **Navigation Assist**, **Senses**, **Deaf**, **albinism**: likely fine, listen once.
- **PS5** is not spoken; it only appears in URLs.
- **Sechayk** (byline): read as written, as settled.
- Numbers stay as digits: "September 15", "September 26", "September 21, 2026", "August 28, 2026", "over 100".

## Unsure

- The in-page link "which I discuss in Making settings easier to find and try" is kept verbatim. By ear it points to a chapter the listener hears later. It could get a small audio hint ("…, a later chapter") if you want one.
- The parenthetical source links "(Kotaku)", "(Call of Duty)", "(Digital Foundry)" and "(PlayStation Blog)" are read as link text, because they are Yotam's text. They could be dropped as citation-style if they sound cluttered.
- "Copyright Marvel." versus dropping the © line, since the Source line already credits the clip.
- "Image:" is used for game stills and mockups, and "Screenshot:" for the Balabolka, SlideNotes and Can I Play That? pages.
