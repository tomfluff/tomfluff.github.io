---
layout: post
title: "A Label Is Not a Priority"
date: 2026-08-26 20:00:00+0900
thumbnail: assets/img/posts/github-a11y-label-docs.jpg
og_image: /assets/img/posts/github-a11y-label-social.png
featured: true
tags: accessibility open-source github development
categories: technology
author: Yotam Sechayk
giscus_comments: true
related_posts: true
related_publications: false
citation: true
bibliography: external_refs
description: "I'm very glad to see that GitHub now ships an accessibility label in every new repository. It also made me wonder: what actually happens after somebody applies it? I've filed accessibility bugs, and I've watched them sit in a backlog until the conversation just stopped. A label makes accessibility visible. Visibility is not the same as priority, and the difference is decided by the workflow around the label, not the label itself."
_styles: >
  .post-figure {
    margin: 2.5rem 0;
  }
  .post-figure svg {
    display: block;
    width: 100%;
    height: auto;
    font-family: inherit;
  }
  .post-figure figcaption {
    margin-top: 0.75rem;
    font-size: 0.95rem;
    color: var(--global-text-color-light);
  }
  .fig-desktop {
    display: block;
  }
  .fig-mobile {
    display: none;
  }
  @media (max-width: 520px) {
    .fig-desktop {
      display: none;
    }
    .fig-mobile {
      display: block;
    }
  }
---


I was very excited when I saw [Maria Lamardo's post](https://lnkd.in/p/ggkGbf7j). GitHub now ships an `accessibility` label in every new repository, described as indicating a barrier affecting people with disabilities. Maria is a Senior Accessibility Program Manager at GitHub and helped lead the initiative.

Then, a few seconds later, a second thought showed up:

> Wait... what happens _after_ somebody applies it?

For some context, I have albinism and low-vision, and I research accessibility for people with low vision. I also file accessibility bugs and contributions, and I have watched [some of them sit quietly in a backlog](https://github.com/garrytan/gstack/pull/2288). Nobody argued with me. Nobody closed the issue either. It simply stopped moving.

So I'm genuinely happy GitHub made this change. I'm also very interested in the process waiting on the other side of the label.

**The label makes accessibility visible. Visibility is not the same as priority.**

<div class="row justify-content-center">
  <div class="col-md-10">
    {%
      include figure.liquid
      loading="eager"
      path="assets/img/posts/github-a11y-label-docs.jpg"
      class="img-fluid rounded z-depth-1"
      zoomable=true
      alt="The About default labels section of GitHub Docs. A table lists accessibility first, circled in red, described as indicating a barrier affecting people with disabilities, followed by the bug and documentation labels."
    %}
  </div>
</div>

<div class="caption">GitHub now includes <code>accessibility</code> in the default label set for every new repository. Source: <a href="https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#about-default-labels">GitHub Docs</a>.</div>

## Why the label is genuinely useful

GitHub has always let projects create custom labels. Some repositories already used `accessibility` or `a11y`. Others relied on words in the issue title, or filed the barrier as a `bug`, an `enhancement`, or whatever else felt close enough. What was missing was a shared default that tells every new project: this is a category of software problem you should expect to run into.

That gap is measurable. {% cite bi2021firstlook --file external_refs %} searched 1,000 popular GitHub projects for accessibility-related issue text and tags, manually checked the results, and collected 11,820 relevant issues. Developers _were_ discussing accessibility. Those discussions just weren't represented consistently across projects. A default label gives that work a common name.

A common name makes barriers easier to filter, route, and count. It can connect an issue with somebody who actually has the relevant accessibility knowledge. Because it's a default, it shows up in projects that would never have created it themselves. **This has a secondary effect of raising awareness to the importance of accessibility.**

Defaults can shape how people construct workflows. For instance, GitHub's `good first issue` label, now populates a repository's `contribute` page. {% cite tan2020goodfirstissue --file external_refs %} found that projects increasingly adopted the label over the preceding decade, although many labeled issues still did not lead to a newcomer contribution. The label didn't guarantee an outcome, but it changed which work became visible to newcomers.

The new `accessibility` label can do the same thing for accessibility work.

## So, what's the risk?

A label is a routing mechanism, and routing can lead to very different places.

<figure class="post-figure">
  <svg class="fig-desktop" xmlns="http://www.w3.org/2000/svg" id="fig-two-paths" viewBox="0 0 760 500" role="img" aria-labelledby="fig-two-paths-title fig-two-paths-desc" focusable="false">
    <title id="fig-two-paths-title">One accessibility label leads to two possible workflows.</title>
    <desc id="fig-two-paths-desc">A reported barrier receives the accessibility label. The flow then splits into two paths with the same box sizes, line weights, and number of steps. The owned path runs through Owner assigned, Severity applied, and Blocks release, ending in a solid-bordered box labeled Fixed. The unowned path runs through No owner, No severity, and Blocks nothing, ending in a dashed-bordered box labeled Still open.</desc>
    <style>
      #fig-two-paths .bg { fill: var(--global-bg-color); }
      #fig-two-paths .box { fill: var(--global-bg-color-accent); stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-two-paths .box-accent { fill: var(--global-bg-color-accent); stroke: var(--global-theme-color); stroke-width: 2.5; }
      #fig-two-paths .end { fill: var(--global-bg-color-accent); stroke: var(--global-text-color); stroke-width: 2.5; }
      #fig-two-paths .end-open { stroke-dasharray: 7 5; }
      #fig-two-paths .flow { fill: none; stroke: var(--global-text-color-light); stroke-width: 2; stroke-linejoin: round; }
      #fig-two-paths .ah { fill: var(--global-text-color-light); }
      #fig-two-paths .lbl { fill: var(--global-text-color); font-size: 16px; text-anchor: middle; }
      #fig-two-paths .lbl-end { fill: var(--global-text-color); font-size: 18px; font-weight: 600; text-anchor: middle; }
    </style>
    <defs>
      <marker id="fig-two-paths-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path class="ah" d="M0,0 L10,5 L0,10 Z" />
      </marker>
    </defs>
    <rect class="bg" x="0" y="0" width="760" height="500" />
    <rect class="box" x="280" y="16" width="200" height="52" rx="10" />
    <text class="lbl" x="380" y="47">Barrier reported</text>
    <path class="flow" d="M380,68 V90" marker-end="url(#fig-two-paths-ah)" />
    <rect class="box-accent" x="270" y="94" width="220" height="52" rx="10" />
    <text class="lbl" x="380" y="125">Labelled accessibility</text>
    <path class="flow" d="M380,146 V172 H190 V190" marker-end="url(#fig-two-paths-ah)" />
    <path class="flow" d="M380,146 V172 H570 V190" marker-end="url(#fig-two-paths-ah)" />
    <rect class="box" x="80" y="192" width="220" height="48" rx="8" />
    <text class="lbl" x="190" y="222">Owner assigned</text>
    <path class="flow" d="M190,240 V262" marker-end="url(#fig-two-paths-ah)" />
    <rect class="box" x="80" y="264" width="220" height="48" rx="8" />
    <text class="lbl" x="190" y="294">Severity applied</text>
    <path class="flow" d="M190,312 V334" marker-end="url(#fig-two-paths-ah)" />
    <rect class="box" x="80" y="336" width="220" height="48" rx="8" />
    <text class="lbl" x="190" y="366">Blocks release</text>
    <path class="flow" d="M190,384 V404" marker-end="url(#fig-two-paths-ah)" />
    <rect class="end" x="80" y="406" width="220" height="56" rx="10" />
    <text class="lbl-end" x="190" y="441">Fixed</text>
    <rect class="box" x="460" y="192" width="220" height="48" rx="8" />
    <text class="lbl" x="570" y="222">No owner</text>
    <path class="flow" d="M570,240 V262" marker-end="url(#fig-two-paths-ah)" />
    <rect class="box" x="460" y="264" width="220" height="48" rx="8" />
    <text class="lbl" x="570" y="294">No severity</text>
    <path class="flow" d="M570,312 V334" marker-end="url(#fig-two-paths-ah)" />
    <rect class="box" x="460" y="336" width="220" height="48" rx="8" />
    <text class="lbl" x="570" y="366">Blocks nothing</text>
    <path class="flow" d="M570,384 V404" marker-end="url(#fig-two-paths-ah)" />
    <rect class="end end-open" x="460" y="406" width="220" height="56" rx="10" />
    <text class="lbl-end" x="570" y="441">Still open</text>
  </svg>
  <figcaption>The same label can support either workflow. Ownership, severity, and release criteria decide which path the issue follows.</figcaption>
</figure>

Imagine a project with no accessibility owner, no shared severity rules, and no release criterion for accessibility barriers. Before the new default, an accessibility issue might have landed in the general bug queue. Now the team can separate it immediately. The issue gets easier to find, and it also gets easier to leave in a dedicated queue that just gets forgotten, since nothing else depends on it.

> A dedicated queue that nobody owns is not a workflow, it's a waiting room.

*Forgotten accessibility issues* only require a process where accessibility is visible but disconnected from the ordinary decisions about severity, ownership, and releases.

That environment is common. {% cite alshayban2020accessibility --file external_refs %} found that many developers lacked awareness of accessibility principles and of the tools available to check them. {% cite bi2022practice --file external_refs %} similarly found that accessibility was often treated as a separate concern instead of a first-class consideration throughout development.

In that environment, a label can organize the work without giving anybody a reason to act on it.

## "Later" is not a schedule

Postponing accessibility isn't a neutral scheduling choice.

The W3C's [business case for digital accessibility](https://www.w3.org/WAI/business-case/) recommends **integrating accessibility from the beginning**, because retrofitting an inaccessible product later is generally harder and more expensive. The reason is structural. A missing alt attribute can be a small, local change. A custom component built without semantics or focus management may need a redesign. And if navigation, dialogs, and forms already depend on that component, the team also has to inspect and update every place where it's used.

<figure class="post-figure">
  <svg class="fig-desktop" xmlns="http://www.w3.org/2000/svg" id="fig-deferral-scope" viewBox="0 0 760 470" role="img" aria-labelledby="fig-deferral-title fig-deferral-desc" focusable="false">
    <title id="fig-deferral-title">Finding a component barrier later expands the scope of the fix.</title>
    <desc id="fig-deferral-desc">The first example is labeled Found during design. A component contract covering semantics, focus behavior, and contrast constraints points to Correct before reuse, and the change stays in one component. The second example is labeled Found after release. The same component contract branches to navigation, dialogs, and forms that already depend on it, and each dependency must be inspected when the contract changes. The example illustrates how dependencies expand the scope of a correction. It does not measure time, cost, or a universal ratio between development stages.</desc>
    <style>
      #fig-deferral-scope .bg { fill: var(--global-bg-color); }
      #fig-deferral-scope .box { fill: var(--global-bg-color-accent); stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-deferral-scope .contract { fill: var(--global-bg-color-accent); stroke: var(--global-theme-color); stroke-width: 2.5; }
      #fig-deferral-scope .flow { fill: none; stroke: var(--global-text-color-light); stroke-width: 2; stroke-linejoin: round; }
      #fig-deferral-scope .divider { stroke: var(--global-divider-color); stroke-width: 1.5; }
      #fig-deferral-scope .ah { fill: var(--global-text-color-light); }
      #fig-deferral-scope .heading { fill: var(--global-text-color-light); font-size: 14px; font-weight: 600; letter-spacing: 0.04em; }
      #fig-deferral-scope .label { fill: var(--global-text-color); font-size: 16px; text-anchor: middle; }
      #fig-deferral-scope .label-strong { fill: var(--global-text-color); font-size: 17px; font-weight: 600; text-anchor: middle; }
      #fig-deferral-scope .small { fill: var(--global-text-color-light); font-size: 14px; text-anchor: middle; }
    </style>
    <defs>
      <marker id="fig-deferral-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path class="ah" d="M0,0 L10,5 L0,10 Z" />
      </marker>
    </defs>
    <rect class="bg" x="0" y="0" width="760" height="470" />
    <text class="heading" x="34" y="34">FOUND DURING DESIGN</text>
    <rect class="contract" x="42" y="54" width="250" height="132" rx="10" />
    <text class="label-strong" x="167" y="88">Component contract</text>
    <text class="small" x="167" y="119">Semantics • focus behavior</text>
    <text class="small" x="167" y="145">Contrast constraints</text>
    <path class="flow" d="M292,120 H420" marker-end="url(#fig-deferral-ah)" />
    <rect class="box" x="424" y="72" width="286" height="96" rx="10" />
    <text class="label-strong" x="567" y="111">Correct before reuse</text>
    <text class="small" x="567" y="140">The change stays in one component</text>
    <line class="divider" x1="34" y1="223" x2="726" y2="223" />
    <text class="heading" x="34" y="262">FOUND AFTER RELEASE</text>
    <rect class="contract" x="42" y="292" width="250" height="132" rx="10" />
    <text class="label-strong" x="167" y="326">Component contract</text>
    <text class="small" x="167" y="357">Semantics • focus behavior</text>
    <text class="small" x="167" y="383">Contrast constraints</text>
    <path class="flow" d="M292,358 H352 V305 H424" marker-end="url(#fig-deferral-ah)" />
    <path class="flow" d="M352,358 H424" marker-end="url(#fig-deferral-ah)" />
    <path class="flow" d="M352,358 V411 H424" marker-end="url(#fig-deferral-ah)" />
    <rect class="box" x="428" y="280" width="250" height="50" rx="8" />
    <text class="label" x="553" y="311">Navigation depends on it</text>
    <rect class="box" x="428" y="333" width="250" height="50" rx="8" />
    <text class="label" x="553" y="364">Dialogs depend on it</text>
    <rect class="box" x="428" y="386" width="250" height="50" rx="8" />
    <text class="label" x="553" y="417">Forms depend on it</text>
  </svg>
  <figcaption>Deferral expands the scope of the work. This dependency example is illustrative, not a measured cost comparison.</figcaption>
</figure>

And this work moves downstream easily. {% cite indika2026mobile --file external_refs %} surveyed 110 mobile developers across 43 countries. Most of them considered accessibility important, yet accessibility testing typically happened late in development. The study also identified technical and organizational constraints that made implementation difficult.

That's the gap that worries me.

Accessibility debt compounds like technical debt, except somebody is locked out while the interest accumulates.

## What turns a label into a commitment?

The label is useful infrastructure, but the workflow around it decides what it means. Here are five things I would want in any repository that adopts it:

1. **Give the label an owner and a response target.** Name who triages these issues and how quickly the first review should happen.
2. **Use accessibility alongside severity, not instead of it.** A barrier should carry `accessibility` _and_ the same priority vocabulary as any other bug. The label describes the type of problem, not its importance.
3. **Add it to existing repositories.** The default only applies to new repositories. Older projects can add the label in their settings, and they're often the projects with the deepest accessibility debt.
4. **Move accessibility upstream.** A label only sees barriers somebody already found. Pair it with accessible design requirements, a definition of done, pull-request guidance, and appropriate automated and manual checks.
5. **Measure the workflow, not only the backlog.** Track time to triage, ownership, severity, and resolution. GitHub reports that an [internal, AI-assisted accessibility-feedback workflow](https://github.blog/open-source/building-githubs-next-chapter-in-accessibility/) reduced resolution time by 62%, with 89% of issues closing within 90 days. Those results didn't come from a label alone. They came from combining structured metadata with automation, accountability, and measurement.

The label is a great addition, but it should not be an excuse to defer accessibility problems to *"some other time"*.

## The question I keep coming back to

GitHub did something accessibility advocates have wanted platforms to do for years. It recognized accessibility barriers as a normal category of software work and put that category in front of every new project.

Now thousands of repositories have to decide what the category means in practice.

A label can make accessibility work visible, but incorporating it into a workflow is what makes accessibility happen in-practice.

## References

<div class="publications">
{% bibliography --file external_refs --cited --group_by none %}
</div>
