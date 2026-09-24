---
layout: post
title: "Visual Communication for Low-Vision Information Access"
date: 2026-09-24 12:00:00+0900
thumbnail: assets/img/posts/uist26-ds-thumbnail.png
og_image: /assets/img/posts/uist26-ds-social.png
featured: true
tags: UIST low-vision dissertation AI
categories: conference
author: Yotam Sechayk
giscus_comments: true
related_posts: true
related_publications: true
citation: false
description: "My paper was accepted to the UIST 2026 Doctoral Symposium! Magnification helps me see a detail, but it can hide the context that gives that detail meaning. In this post I share how visual communication between people and their tools connects my research on lecture videos, charts, and AI, and why being in control of what I see still matters."
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
  .post-figure .fig-desktop {
    display: block;
  }
  .post-figure .fig-mobile {
    display: none;
  }
  @media (max-width: 520px) {
    .post-figure .fig-desktop {
      display: none;
    }
    .post-figure .fig-mobile {
      display: block;
    }
  }
---

When I magnify a chart enough to read one bar, the axis and legend can disappear from my view.
I can see the bar, but I lose what it means.

I have albinism and low vision, and I use screen magnification every day.
That gap between detail and context connects my research.
Writing my doctoral symposium paper meant putting the connection into words.

My paper _"Visual Communication for Low-Vision Information Access: From Personalized Highlights to AI Agents"_ {% cite sechayk2026visualcommunication %} was accepted to the [UIST 2026](https://uist.acm.org/2026/) Doctoral Symposium. 🎓
In November, I'll present it in Detroit to a panel of senior researchers.

<!-- prettier-ignore-start -->
> **What is a doctoral symposium?** PhD students present their dissertation plans to senior researchers and get feedback while there is still time to change them. Think of it as a friendly stress test for the research.
{: .block-note }
<!-- prettier-ignore-end -->

## Seeing a fragment at a time

Magnification makes things bigger by showing only part of the screen at a time.
That tradeoff matters when information is spread across a page.

In a lecture video, an instructor can mark a sentence outside my magnified view.
In a chart, I can see the bar under my pointer while its axes and legend sit elsewhere.
Sometimes I don't even know what I missed.

<figure class="post-figure">
  <svg class="fig-desktop" xmlns="http://www.w3.org/2000/svg" id="fig-fragment" viewBox="0 0 760 330" role="img" aria-labelledby="fig-fragment-title fig-fragment-desc" focusable="false">
    <title id="fig-fragment-title">Magnification shows only a fragment of the page.</title>
    <desc id="fig-fragment-desc">On the left, the whole page: a heading, a few lines of text, one highlighted sentence, a small bar chart, and its legend. A small purple frame marks the part of the page that fits in the magnified view. It covers only the middle of the sentence. An arrow leads to the right, where the magnified view shows that part much larger, with the words cut off at both edges. Text below it says that only part of the sentence fits, and everything else is out of view.</desc>
    <style>
      #fig-fragment .bg { fill: var(--global-bg-color); }
      #fig-fragment .page { fill: var(--global-bg-color-accent); stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-fragment .view-line { fill: none; stroke: var(--global-theme-color); stroke-width: 4; }
      #fig-fragment .frame { fill: none; stroke: var(--global-theme-color); stroke-width: 3; }
      #fig-fragment .tint { fill: var(--global-theme-color); fill-opacity: 0.14; }
      #fig-fragment .ink { fill: var(--global-text-color); }
      #fig-fragment .ink-soft { fill: var(--global-text-color); fill-opacity: 0.55; }
      #fig-fragment .grey { fill: var(--global-text-color-light); }
      #fig-fragment .grey-soft { fill: var(--global-text-color-light); fill-opacity: 0.45; }
      #fig-fragment .legend { fill: var(--global-bg-color); stroke: var(--global-text-color-light); stroke-width: 1.5; }
      #fig-fragment .axis { stroke: var(--global-text-color); stroke-width: 2; }
      #fig-fragment .flow { fill: none; stroke: var(--global-theme-color); stroke-width: 3; }
      #fig-fragment .ah { fill: var(--global-theme-color); }
      #fig-fragment .ttl { fill: var(--global-text-color); font-size: 18px; font-weight: 700; text-anchor: middle; }
      #fig-fragment .lbl { fill: var(--global-text-color); font-size: 17px; text-anchor: middle; }
    </style>
    <defs>
      <marker id="fig-fragment-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path class="ah" d="M0,0 L10,5 L0,10 Z" />
      </marker>
    </defs>
    <rect class="bg" x="0" y="0" width="760" height="330" />
    <text class="ttl" x="185" y="30">The whole page</text>
    <rect class="page" x="20" y="46" width="330" height="270" rx="12" />
    <rect class="grey" x="44" y="70" width="160" height="16" rx="8" />
    <rect class="grey-soft" x="44" y="102" width="282" height="8" rx="4" />
    <rect class="grey-soft" x="44" y="118" width="258" height="8" rx="4" />
    <rect class="grey-soft" x="44" y="134" width="270" height="8" rx="4" />
    <g>
      <rect class="tint" x="44" y="160" width="282" height="52" rx="6" />
      <rect class="ink" x="56" y="172" width="40" height="10" rx="5" />
      <rect class="ink" x="102" y="172" width="58" height="10" rx="5" />
      <rect class="ink" x="166" y="172" width="30" height="10" rx="5" />
      <rect class="ink" x="202" y="172" width="46" height="10" rx="5" />
      <rect class="ink" x="254" y="172" width="16" height="10" rx="5" />
      <rect class="ink-soft" x="56" y="192" width="34" height="10" rx="5" />
      <rect class="ink-soft" x="96" y="192" width="52" height="10" rx="5" />
      <rect class="ink-soft" x="154" y="192" width="64" height="10" rx="5" />
      <rect class="ink-soft" x="224" y="192" width="38" height="10" rx="5" />
      <rect class="ink-soft" x="268" y="192" width="40" height="10" rx="5" />
    </g>
    <rect class="frame" x="120" y="151" width="110" height="72" rx="6" />
    <rect class="grey" x="54" y="252" width="30" height="40" />
    <rect class="ink-soft" x="94" y="232" width="30" height="60" />
    <rect class="grey" x="134" y="262" width="30" height="30" />
    <line class="axis" x1="44" y1="292" x2="176" y2="292" />
    <rect class="legend" x="204" y="240" width="122" height="56" rx="6" />
    <rect class="grey" x="216" y="252" width="12" height="12" />
    <rect class="grey-soft" x="236" y="254" width="76" height="8" rx="4" />
    <rect class="ink-soft" x="216" y="272" width="12" height="12" />
    <rect class="grey-soft" x="236" y="274" width="76" height="8" rx="4" />
    <path class="flow" d="M230,187 H350 C382,187 386,151 410,151" marker-end="url(#fig-fragment-ah)" />
    <text class="ttl" x="580" y="30">My magnified view</text>
    <clipPath id="fig-fragment-clip">
      <rect x="420" y="46" width="320" height="210" rx="14" />
    </clipPath>
    <rect class="bg" x="420" y="46" width="320" height="210" rx="14" />
    <g clip-path="url(#fig-fragment-clip)">
      <g transform="translate(420 46) scale(2.909) translate(-120 -151)">
        <rect class="tint" x="44" y="160" width="282" height="52" rx="6" />
        <rect class="ink" x="56" y="172" width="40" height="10" rx="5" />
        <rect class="ink" x="102" y="172" width="58" height="10" rx="5" />
        <rect class="ink" x="166" y="172" width="30" height="10" rx="5" />
        <rect class="ink" x="202" y="172" width="46" height="10" rx="5" />
        <rect class="ink" x="254" y="172" width="16" height="10" rx="5" />
        <rect class="ink-soft" x="56" y="192" width="34" height="10" rx="5" />
        <rect class="ink-soft" x="96" y="192" width="52" height="10" rx="5" />
        <rect class="ink-soft" x="154" y="192" width="64" height="10" rx="5" />
        <rect class="ink-soft" x="224" y="192" width="38" height="10" rx="5" />
        <rect class="ink-soft" x="268" y="192" width="40" height="10" rx="5" />
      </g>
    </g>
    <rect class="view-line" x="420" y="46" width="320" height="210" rx="14" />
    <text class="lbl" x="580" y="290">Only part of the sentence fits.</text>
    <text class="lbl" x="580" y="314">Everything else is out of view.</text>
  </svg>
  <svg class="fig-mobile" xmlns="http://www.w3.org/2000/svg" id="fig-fragment-m" viewBox="0 0 340 600" role="img" aria-labelledby="fig-fragment-m-title fig-fragment-m-desc" focusable="false">
    <title id="fig-fragment-m-title">Magnification shows only a fragment of the page.</title>
    <desc id="fig-fragment-m-desc">At the top, the whole page: a heading, a few lines of text, one highlighted sentence, a small bar chart, and its legend. A small purple frame marks the part of the page that fits in the magnified view. It covers only the middle of the sentence. An arrow leads down to the magnified view, which shows that part much larger, with the words cut off at both edges. Text below it says that only part of the sentence fits, and everything else is out of view.</desc>
    <style>
      #fig-fragment-m .bg { fill: var(--global-bg-color); }
      #fig-fragment-m .page { fill: var(--global-bg-color-accent); stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-fragment-m .view-line { fill: none; stroke: var(--global-theme-color); stroke-width: 4; }
      #fig-fragment-m .frame { fill: none; stroke: var(--global-theme-color); stroke-width: 3; }
      #fig-fragment-m .tint { fill: var(--global-theme-color); fill-opacity: 0.14; }
      #fig-fragment-m .ink { fill: var(--global-text-color); }
      #fig-fragment-m .ink-soft { fill: var(--global-text-color); fill-opacity: 0.55; }
      #fig-fragment-m .grey { fill: var(--global-text-color-light); }
      #fig-fragment-m .grey-soft { fill: var(--global-text-color-light); fill-opacity: 0.45; }
      #fig-fragment-m .legend { fill: var(--global-bg-color); stroke: var(--global-text-color-light); stroke-width: 1.5; }
      #fig-fragment-m .axis { stroke: var(--global-text-color); stroke-width: 2; }
      #fig-fragment-m .flow { fill: none; stroke: var(--global-theme-color); stroke-width: 3; }
      #fig-fragment-m .ah { fill: var(--global-theme-color); }
      #fig-fragment-m .ttl { fill: var(--global-text-color); font-size: 18px; font-weight: 700; text-anchor: middle; }
      #fig-fragment-m .lbl { fill: var(--global-text-color); font-size: 17px; text-anchor: middle; }
    </style>
    <defs>
      <marker id="fig-fragment-m-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path class="ah" d="M0,0 L10,5 L0,10 Z" />
      </marker>
    </defs>
    <rect class="bg" x="0" y="0" width="340" height="600" />
    <text class="ttl" x="170" y="28">The whole page</text>
    <rect class="page" x="20" y="44" width="300" height="250" rx="12" />
    <rect class="grey" x="40" y="66" width="140" height="14" rx="7" />
    <rect class="grey-soft" x="40" y="94" width="258" height="8" rx="4" />
    <rect class="grey-soft" x="40" y="110" width="236" height="8" rx="4" />
    <rect class="grey-soft" x="40" y="126" width="250" height="8" rx="4" />
    <g>
      <rect class="tint" x="40" y="150" width="260" height="48" rx="6" />
      <rect class="ink" x="52" y="162" width="36" height="9" rx="4.5" />
      <rect class="ink" x="94" y="162" width="52" height="9" rx="4.5" />
      <rect class="ink" x="152" y="162" width="28" height="9" rx="4.5" />
      <rect class="ink" x="186" y="162" width="56" height="9" rx="4.5" />
      <rect class="ink-soft" x="52" y="180" width="30" height="9" rx="4.5" />
      <rect class="ink-soft" x="88" y="180" width="48" height="9" rx="4.5" />
      <rect class="ink-soft" x="142" y="180" width="58" height="9" rx="4.5" />
      <rect class="ink-soft" x="206" y="180" width="34" height="9" rx="4.5" />
      <rect class="ink-soft" x="246" y="180" width="36" height="9" rx="4.5" />
    </g>
    <rect class="frame" x="110" y="150" width="100" height="50" rx="5" />
    <rect class="grey" x="48" y="240" width="28" height="36" />
    <rect class="ink-soft" x="84" y="222" width="28" height="54" />
    <rect class="grey" x="120" y="250" width="28" height="26" />
    <line class="axis" x1="40" y1="276" x2="160" y2="276" />
    <rect class="legend" x="184" y="226" width="116" height="52" rx="6" />
    <rect class="grey" x="194" y="236" width="12" height="12" />
    <rect class="grey-soft" x="214" y="238" width="72" height="8" rx="4" />
    <rect class="ink-soft" x="194" y="256" width="12" height="12" />
    <rect class="grey-soft" x="214" y="258" width="72" height="8" rx="4" />
    <path class="flow" d="M170,300 V336" marker-end="url(#fig-fragment-m-ah)" />
    <text class="ttl" x="170" y="364">My magnified view</text>
    <clipPath id="fig-fragment-m-clip">
      <rect x="20" y="378" width="300" height="150" rx="14" />
    </clipPath>
    <rect class="bg" x="20" y="378" width="300" height="150" rx="14" />
    <g clip-path="url(#fig-fragment-m-clip)">
      <g transform="translate(20 378) scale(3) translate(-110 -150)">
        <rect class="tint" x="40" y="150" width="260" height="48" rx="6" />
        <rect class="ink" x="52" y="162" width="36" height="9" rx="4.5" />
        <rect class="ink" x="94" y="162" width="52" height="9" rx="4.5" />
        <rect class="ink" x="152" y="162" width="28" height="9" rx="4.5" />
        <rect class="ink" x="186" y="162" width="56" height="9" rx="4.5" />
        <rect class="ink-soft" x="52" y="180" width="30" height="9" rx="4.5" />
        <rect class="ink-soft" x="88" y="180" width="48" height="9" rx="4.5" />
        <rect class="ink-soft" x="142" y="180" width="58" height="9" rx="4.5" />
        <rect class="ink-soft" x="206" y="180" width="34" height="9" rx="4.5" />
        <rect class="ink-soft" x="246" y="180" width="36" height="9" rx="4.5" />
      </g>
    </g>
    <rect class="view-line" x="20" y="378" width="300" height="150" rx="14" />
    <text class="lbl" x="170" y="560">Only part of the sentence fits.</text>
    <text class="lbl" x="170" y="584">Everything else is out of view.</text>
  </svg>
  <figcaption>Magnification makes what I'm reading big and clear, but only a piece of the sentence fits in view at once. The heading, chart, and legend around it are out of sight.</figcaption>
</figure>

## Using the vision we have

Many people with low vision prefer to use the vision they have.
Speech, sound, and touch can also make visual information accessible, but they don't directly support that way of seeing.

So what if we build on the vision people already use?

My research follows _ability-based design_: start with what a person can do, then shape the tool around their abilities.
For me, that means working alongside tools such as magnification, allowing people to adjust the visual support, and designing with people with low vision.
Their needs and strategies differ, and their vision can change with the situation.

## Visual communication, in two directions

The thread that ties my projects together is _visual communication_ in two directions.
A tool can _show_ me where to look with a highlight or bring missing context into my view.
I can _show_ a tool what I'm looking at by sharing my magnified view and where I point.
What happens when both directions work together?

<div class="row justify-content-center">
  <div class="col-12">
    {%
      include figure.liquid
      loading="eager"
      path="assets/img/posts/uist26-ds-overview.png"
      class="img-fluid rounded z-depth-1"
      zoomable=true
      alt="A four-column timeline of my research, read left to right. VeasyGuide (ASSETS 2025) highlights an instructor's mark on a lecture slide. On-Cursor Visual Context (CHI 2026) shows two chart interactions, Dynamic Context and Mini-map. Visual Context for AI (ongoing) shows a user pointing at a bar in a chart while an AI assistant answers with its value. Visual Communication with AI Agents (future) asks whether visual dialogue with AI builds independence or creates reliance, and whether AI should tell, highlight, guide, or show. Labels along the bottom read: how tools can communicate visually with low-vision users, how low-vision users communicate visually with AI, and how bidirectional visual communication impacts agency."
    %}
  </div>
</div>
<div class="caption">
  My research trajectory. It starts with tools that communicate visually to low-vision users, moves to low-vision users who communicate visually with AI, and heads toward visual communication in both directions.
</div>

## From tools that show to tools that see

My dissertation follows this idea step by step.
Each project taught me something, and each lesson shaped the next one.

### VeasyGuide: a highlight is a message

In a lecture video, an instructor may point to a part of a slide without naming it.
[VeasyGuide](https://veasyguide.github.io/) {% cite sechayk2025veasyguide %} makes that action easier to find with a highlight that can appear before the action and with magnification that can follow it.
My co-design partners helped decide how the highlight should look and behave.
You can read [how we designed VeasyGuide](/blog/2025/veasyguide-assets-2025/) or [try it in your browser](https://veasyguide.github.io/app).

<div class="row justify-content-center">
  <div class="col-md-10">
    {%
      include figure.liquid
      loading="lazy"
      path="assets/img/posts/uist26-ds-veasyguide.png"
      class="img-fluid rounded z-depth-1"
      zoomable=true
      alt="Three panels of VeasyGuide. Panel a, the VeasyGuide player: a lecture slide titled Machine Learning, where a red bounding box with a translucent yellow fill highlights the phrase the instructor is marking, next to a hand-shaped pointer icon. Panel b, zoomed-in view: pressing the Z key shows a magnified view of the highlighted slide text. Panel c, personalization panels: settings for the fill color and opacity, border color and width, pointer shape and scale, filters named Invert, Thicker, and Thicker dark, and the highlight's shape and animation."
    %}
  </div>
</div>
<div class="caption">
  VeasyGuide marks an instructor's action with a personalized highlight and pointer icon (a), can zoom in to follow the action (b), and lets each learner tune how the highlight looks (c).
</div>

**Takeaway:** a highlight has to be findable, predictable, and adjustable to communicate anything.
It should also leave the learner free to decide whether to follow it.

But a chart poses a different problem: the context I need is spread across axes, legends, and data points.

### On-Cursor Visual Context: bring context into view

[On-Cursor Visual Context](https://visual-context.github.io/) {% cite sechayk2026visualcontext %} explores two ways to keep chart context available under magnification.
Dynamic Context brings axes and legend information near the pointer, with a crosshair to help trace values.
Mini-map keeps a small overview of the chart in view.

The crosshair came from a participant's workaround: they used the edge of their docked magnifier as a ruler because the chart's grid lines were too faint.

<div class="row justify-content-center">
  <div class="col-md-10">
    {%
      include figure.liquid
      loading="lazy"
      path="assets/img/posts/uist26-ds-chartaccess.png"
      class="img-fluid rounded z-depth-1"
      zoomable=true
      alt="Top: an illustration of a person leaning close to a monitor to read a bar chart, next to an annotated bar chart titled Car Counts by Number of Gears, with callouts labeling its overview, legend, grid lines, and axes. Bottom: two monitors showing visual context interactions under screen magnification. On the left, Dynamic Context shows a magnified part of the chart with the Count axis values, the Transmission legend, the Number of Gears axis label, and a crosshair gathered in a compact area around the pointer. On the right, Mini-map shows a magnified part of the chart with a small overview of the whole chart in the corner and a dot marking where the pointer is."
    %}
  </div>
</div>
<div class="caption">
  The context a chart reader needs (top), and two ways to bring it into the magnified view (bottom): Dynamic Context gathers the axes, legend, and a crosshair around the pointer, and Mini-map keeps an overview of the whole chart in view.
</div>

**Takeaway:** context can move into the magnified view, and people's workarounds can show us how.
But a fixed display can't answer the next question a reader has about the chart.

### Visual context for AI: let the tool see what I see

What if an AI assistant could see where I'm looking in a chart?
In my ongoing work, I'm exploring an assistant that receives the user's magnified view and pointer location as context.
That lets a person point and ask without first describing exactly where they are in the chart.

**The next question:** can the assistant answer in a way I can see?
The user can show the assistant their visual context, but the assistant answers in words.
It can tell me where to look, but it can't show me.
That brings me back to the problem VeasyGuide started with.

### Next: both directions

I want to study an assistant that can also answer visually: highlight a region, guide my attention along a path, or adjust the view.
Then the person and the tool could each show the other what they mean.
I also want to explore this beyond charts, starting with information seeking on web pages and eventually extending to documents and the physical world.

Put together, the projects form one arc.
VeasyGuide and On-Cursor Visual Context show that tools can communicate visually with people with low vision.
The AI work turns this around, so people can communicate visually with their tools.
The next step closes the loop.

## Who decides where to look?

Should the tool move my view, highlight something and let me look, or just answer?
The right response may depend on the person and the task.

<figure class="post-figure">
  <svg class="fig-desktop" xmlns="http://www.w3.org/2000/svg" id="fig-agency" viewBox="0 0 760 330" role="img" aria-labelledby="fig-agency-title fig-agency-desc" focusable="false">
    <title id="fig-agency-title">Four kinds of help, and the person chooses between them.</title>
    <desc id="fig-agency-desc">A circle in the center reads I choose. Four equally sized cards surround it, each connected to the circle by a line. Tell, answer in words, shown with a speech bubble. Highlight, mark a region, shown with a tinted, outlined box. Guide, point the way, shown with a dashed arrow. Adjust view, reframe the screen, shown with a small frame inside a larger one. Text below reads: the right response depends on the person and the moment.</desc>
    <style>
      #fig-agency .bg { fill: var(--global-bg-color); }
      #fig-agency .card { fill: var(--global-bg-color-accent); stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-agency .hub { fill: var(--global-theme-color); fill-opacity: 0.14; stroke: var(--global-theme-color); stroke-width: 3; }
      #fig-agency .link { stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-agency .icon { fill: none; stroke: var(--global-text-color); stroke-width: 2.5; stroke-linejoin: round; }
      #fig-agency .icon-accent { fill: none; stroke: var(--global-theme-color); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
      #fig-agency .dash { stroke-dasharray: 6 5; }
      #fig-agency .tint { fill: var(--global-theme-color); fill-opacity: 0.14; }
      #fig-agency .ah { fill: var(--global-theme-color); }
      #fig-agency .hub-lbl { fill: var(--global-text-color); font-size: 19px; font-weight: 700; text-anchor: middle; }
      #fig-agency .name { fill: var(--global-text-color); font-size: 18px; font-weight: 700; }
      #fig-agency .what { fill: var(--global-text-color); font-size: 16px; }
      #fig-agency .lbl { fill: var(--global-text-color); font-size: 17px; text-anchor: middle; }
    </style>
    <defs>
      <marker id="fig-agency-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path class="ah" d="M0,0 L10,5 L0,10 Z" />
      </marker>
    </defs>
    <rect class="bg" x="0" y="0" width="760" height="330" />
    <line class="link" x1="280" y1="68" x2="338" y2="108" />
    <line class="link" x1="480" y1="68" x2="422" y2="108" />
    <line class="link" x1="280" y1="232" x2="338" y2="192" />
    <line class="link" x1="480" y1="232" x2="422" y2="192" />
    <circle class="hub" cx="380" cy="150" r="60" />
    <text class="hub-lbl" x="380" y="157">I choose</text>
    <g transform="translate(20 24)">
      <rect class="card" x="0" y="0" width="260" height="88" rx="12" />
      <path class="icon" d="M24,24 H58 A6,6 0 0 1 64,30 V48 A6,6 0 0 1 58,54 H36 L26,64 V54 H24 A6,6 0 0 1 18,48 V30 A6,6 0 0 1 24,24 Z" />
      <text class="name" x="80" y="38">Tell</text>
      <text class="what" x="80" y="64">answer in words</text>
    </g>
    <g transform="translate(480 24)">
      <rect class="card" x="0" y="0" width="260" height="88" rx="12" />
      <rect class="tint" x="18" y="26" width="46" height="36" rx="4" />
      <rect class="icon-accent" x="18" y="26" width="46" height="36" rx="4" />
      <text class="name" x="80" y="38">Highlight</text>
      <text class="what" x="80" y="64">mark a region</text>
    </g>
    <g transform="translate(20 188)">
      <rect class="card" x="0" y="0" width="260" height="88" rx="12" />
      <path class="icon-accent dash" d="M18,62 C28,30 46,70 60,32" marker-end="url(#fig-agency-ah)" />
      <text class="name" x="80" y="38">Guide</text>
      <text class="what" x="80" y="64">point the way</text>
    </g>
    <g transform="translate(480 188)">
      <rect class="card" x="0" y="0" width="260" height="88" rx="12" />
      <rect class="icon" x="18" y="24" width="46" height="40" rx="4" />
      <rect class="icon-accent" x="28" y="33" width="26" height="22" rx="2" />
      <text class="name" x="80" y="38">Adjust view</text>
      <text class="what" x="80" y="64">reframe the screen</text>
    </g>
    <text class="lbl" x="380" y="316">The right response depends on the person and the moment.</text>
  </svg>
  <svg class="fig-mobile" xmlns="http://www.w3.org/2000/svg" id="fig-agency-m" viewBox="0 0 340 570" role="img" aria-labelledby="fig-agency-m-title fig-agency-m-desc" focusable="false">
    <title id="fig-agency-m-title">Four kinds of help, and the person chooses between them.</title>
    <desc id="fig-agency-m-desc">A circle at the top reads I choose. Below it, four equally sized cards are stacked. Tell, answer in words, shown with a speech bubble. Highlight, mark a region, shown with a tinted, outlined box. Guide, point the way, shown with a dashed arrow. Adjust view, reframe the screen, shown with a small frame inside a larger one. Text below reads: the right response depends on the person and the moment.</desc>
    <style>
      #fig-agency-m .bg { fill: var(--global-bg-color); }
      #fig-agency-m .card { fill: var(--global-bg-color-accent); stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-agency-m .hub { fill: var(--global-theme-color); fill-opacity: 0.14; stroke: var(--global-theme-color); stroke-width: 3; }
      #fig-agency-m .link { fill: none; stroke: var(--global-text-color-light); stroke-width: 2; }
      #fig-agency-m .icon { fill: none; stroke: var(--global-text-color); stroke-width: 2.5; stroke-linejoin: round; }
      #fig-agency-m .icon-accent { fill: none; stroke: var(--global-theme-color); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
      #fig-agency-m .dash { stroke-dasharray: 6 5; }
      #fig-agency-m .tint { fill: var(--global-theme-color); fill-opacity: 0.14; }
      #fig-agency-m .ah { fill: var(--global-theme-color); }
      #fig-agency-m .hub-lbl { fill: var(--global-text-color); font-size: 19px; font-weight: 700; text-anchor: middle; }
      #fig-agency-m .name { fill: var(--global-text-color); font-size: 18px; font-weight: 700; }
      #fig-agency-m .what { fill: var(--global-text-color); font-size: 16px; }
      #fig-agency-m .lbl { fill: var(--global-text-color); font-size: 17px; text-anchor: middle; }
    </style>
    <defs>
      <marker id="fig-agency-m-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path class="ah" d="M0,0 L10,5 L0,10 Z" />
      </marker>
    </defs>
    <rect class="bg" x="0" y="0" width="340" height="570" />
    <path class="link" d="M170,126 V140 M10,140 H330 M10,140 V466 M330,140 V466" />
    <circle class="hub" cx="170" cy="70" r="56" />
    <text class="hub-lbl" x="170" y="77">I choose</text>
    <g transform="translate(20 150)">
      <rect class="card" x="0" y="0" width="300" height="80" rx="12" />
      <path class="icon" d="M24,20 H58 A6,6 0 0 1 64,26 V44 A6,6 0 0 1 58,50 H36 L26,60 V50 H24 A6,6 0 0 1 18,44 V26 A6,6 0 0 1 24,20 Z" />
      <text class="name" x="80" y="34">Tell</text>
      <text class="what" x="80" y="60">answer in words</text>
    </g>
    <g transform="translate(20 242)">
      <rect class="card" x="0" y="0" width="300" height="80" rx="12" />
      <rect class="tint" x="18" y="22" width="46" height="36" rx="4" />
      <rect class="icon-accent" x="18" y="22" width="46" height="36" rx="4" />
      <text class="name" x="80" y="34">Highlight</text>
      <text class="what" x="80" y="60">mark a region</text>
    </g>
    <g transform="translate(20 334)">
      <rect class="card" x="0" y="0" width="300" height="80" rx="12" />
      <path class="icon-accent dash" d="M18,58 C28,26 46,66 60,28" marker-end="url(#fig-agency-m-ah)" />
      <text class="name" x="80" y="34">Guide</text>
      <text class="what" x="80" y="60">point the way</text>
    </g>
    <g transform="translate(20 426)">
      <rect class="card" x="0" y="0" width="300" height="80" rx="12" />
      <rect class="icon" x="18" y="20" width="46" height="40" rx="4" />
      <rect class="icon-accent" x="28" y="29" width="26" height="22" rx="2" />
      <text class="name" x="80" y="34">Adjust view</text>
      <text class="what" x="80" y="60">reframe the screen</text>
    </g>
    <text class="lbl" x="170" y="536">The right response depends on</text>
    <text class="lbl" x="170" y="560">the person and the moment.</text>
  </svg>
  <figcaption>Tell, highlight, guide, or adjust the view. These are different kinds of help, not a ranking, and the right one depends on the person and the moment.</figcaption>
</figure>

More assistance is not always more access.
Being able to look for myself is part of what I value.
I don't want a tool that sees _for_ me.
I want one that helps me see.

**My dissertation asks how people with low vision and their tools can show each other what they mean, extending the sight we already use rather than replacing it.**
Through all of it, the person stays in control of what they see.

## See you in Detroit

At the symposium, I want feedback on how to measure visual access and agency, and how to bring these projects together into one framework.
I'm also looking forward to the panel's advice on building a research career as a disabled researcher.

If you're at UIST 2026, come say hi!

If you want to read more about why I care so much about designing _with_ the vision we have, check out my post on why [my needs are not "special"](/blog/2026/my-needs-are-not-special/).

I'm grateful to my advisors, Takeo Igarashi and Ariel Shamir, and to everyone who shared their experiences in these studies.

<br>
<hr>
<br>

If you found this useful, please cite the paper:

> Sechayk, Y. (2026). Visual Communication for Low-Vision Information Access: From Personalized Highlights to AI Agents. In _Adjunct Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology (UIST Adjunct '26)_. ACM. [https://doi.org/10.1145/3830397.3841706](https://doi.org/10.1145/3830397.3841706)

or as a BibTeX entry:

```bibtex
@inproceedings{sechayk2026visualcommunication,
  author    = {Sechayk, Yotam},
  title     = {Visual Communication for Low-Vision Information Access: From Personalized Highlights to AI Agents},
  booktitle = {Adjunct Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology},
  series    = {UIST Adjunct '26},
  year      = {2026},
  publisher = {Association for Computing Machinery},
  address   = {Detroit, MI, USA},
  doi       = {10.1145/3830397.3841706}
}
```
