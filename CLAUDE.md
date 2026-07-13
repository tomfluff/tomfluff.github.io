# CLAUDE.md

Personal academic website of Yotam Sechayk (PhD candidate, University of Tokyo — HCI & accessibility).
Jekyll + [al-folio](https://github.com/alshedivat/al-folio), deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.

**Pushing to `main` publishes the live site.**

## How we work together

This is a guided, collaborative process. Yotam decides *what*; Claude proposes *how* and executes.

- **Ask on anything ambiguous.** Wording, tone, design choices, structure, and anything touching Yotam's voice or research framing are his calls. Present options, don't pick silently. Mechanical fixes (typos, broken links, formatting) — just do them.
- **Commit when asked. Never push.** Edit the working tree freely; wait for an explicit "commit" before committing, and never `git push` — deploying is always Yotam's call.
- **Verify by serving locally** before reporting a change as done (see below). Don't claim a page renders correctly without having built it.
- **Surgical changes.** Touch only what the request implies. This is a fork of al-folio; leave upstream files alone unless the task is about them.

## Local development

```bash
bundle exec jekyll serve   # http://localhost:4000, rebuilds on save
```

Docker alternative: `docker compose up` (see `docker-compose.yml`). Slim variant: `docker-compose-slim.yml`.

Site config is `_config.yml`. Prettier + pre-commit hooks run on commit; formatting failures are fixable with `npx prettier --write <file>`.

## Where things live

| What | Where |
|---|---|
| Blog posts | `_posts/YYYY-MM-DD-slug.md` |
| Drafts | `_drafts/` |
| News items (about-page blurbs) | `_news/` |
| Pages (about, cv, publications, …) | `_pages/` |
| Publications | `_bibliography/papers.bib` (jekyll-scholar) |
| Projects | `_projects/` |
| Structured data (CV, socials, repos) | `_data/` |
| Images | `assets/img/`, post images in `assets/img/posts/` |
| Styles | `_sass/` |
| Layouts / partials | `_layouts/`, `_includes/` |

## Writing posts

**`POST_WRITING_GUIDE.md` is the reference — read it before writing or editing a post.** It documents front matter, media, galleries, citations, and formatting.

Conventions worth stating up front:

- Filename `YYYY-MM-DD-kebab-slug.md`; `date` in front matter includes time and `+0900`.
- Match the voice of existing posts: first-person, direct, personal experience grounded in accessibility/low-vision, not academic-formal.
- `description` is a real paragraph (it's used as the excerpt), not a one-line summary.
- New posts: mirror the front matter of a recent post rather than inventing fields.

## Non-goals

Don't restructure the al-folio theme, add dependencies, or "improve" adjacent code that isn't part of the request.
