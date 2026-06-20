---
layout: post
title: "My Needs are Not 'Special'"
date: 2026-06-19 12:00:00+0900
thumbnail: /assets/img/posts/special-needs-1.jpg
featured: true
tags: inclusion needs low-vision
categories: accessibility
author: Yotam Sechayk
giscus_comments: true
related_posts: true
related_publications: true
description: "I don't like the term 'special needs'. For large portions of my life, people have addressed my needs as special. But to me, nothing about what I need is special. Special is 'extra', 'more', 'beyond the standard'. But to me? To me, being able to take an exam like all the other kids in my class is not special, it's fundamental. Recently I've been reading some (2025!!) papers that still use the term 'special needs', and I had to express how that makes me feel."
---

{%
  include figure.liquid
  path="assets/img/posts/special-needs-1.jpg"
  class="img-fluid rounded z-depth-1"
  alt="The words 'SPECIAL' struck through in gray and 'NEEDS' in bold white on a dark background."
%}

I don't like the term "special needs."

> I have albinism and low-vision. This is also the lens through which I do my research, as a motivator for the tools I build, and as a reality I navigate every single day. I use screen magnification, high contrast settings, and a carefully positioned monitor. I sit close to screens.<br /><br />
> I always make adjustments to my environment, to make working easier. But actually, don't we all?

For many years, the world has described my situation using this phrase: special needs. As if what I need is somehow rare, exotic, or beyond the reasonable scope of what the world should offer.

It is not.

Let me tell you what I need. I need to read a research paper without figures being bitmap images; which, when I magnify turns into a blurry mess. I need to watch a video lecture where the instructor uses a thick pen when marking on the slides. I need a website that does not break when I zoom to 200%. I need a game that does not require me to read text at 8pt against a gray background. I need a movie streaming service that let's me change the visuals of the captions freely so I could read them (no matter how tired my eyes are).

> Why on Netflix, I have to choose between 100% and 200% font size for captions? Why can't I choose 150%? I don't understand why the size adjustments are so limited.

{%
  include figure.liquid
  path="assets/img/posts/special-needs-4.png"
  class="img-fluid rounded z-depth-1"
  zoomable=true
  alt="Netflix subtitle settings showing only three text size options: Large, Medium, and Small. No intermediate sizes available."
%}

<div class="caption">Netflix's subtitle text size settings offer only three fixed options — Large, Medium, or Small. For low-vision users who need something in between, there is simply no choice.</div>

Are any of these special? Are they unusual? Are they extraordinary requests that go above and beyond what the average person expects from the world?

No. They are basic. They are fundamental. They are the same access to information, entertainment, and education that sighted people take for granted every single day.

The word "special" implies something extra. Something above the baseline. When we call my needs "special," we are saying, implicitly, that my baseline is already satisfied, and that I am asking for a bonus on top of it. But that is not what is happening. What is happening is that the baseline was built for someone else, and I am asking to be included in it.

I understand why the term exists. It came from a good place. People wanted to signal that disabled individuals have needs that differ from the norm, and they wanted to communicate that those needs deserve attention. "Special" was meant to be a kind word. Respectful. Acknowledging.

But good intentions do not neutralize bad framing.

When we call a need "special," we shift the responsibility. The implication becomes: there is a normal world, and then there are people who need special accommodations to function in it. The world is fine. These people just need some extra help.

But what if the world is the problem?

What if the issue is not that I have special needs, but that the world was designed without me in mind? What if the problem is universities building lecture halls without thinking about the distance between the seats and the board/screen? Software companies shipping products without making it navigable with a screen reader? Office buildings being constructed with windows for walls, because it's more fashionable? Bus stops being built with information signage that is out of reach for low-vision people?

That is not my need being special. That is the world being exclusionary.

In primary school, I had to leave class to enlarge my own handouts on the copier (no, the teachers wouldn't wait for me to return before continuing class). They also kept forgetting to write large on the board (even after I asked them to do so 5 minutes earlier). And most annoyingly, my school refused to install curtains because they "don't have the resources", so my family had to purchase and instal them and uninstal them and reinstal them every year as I moved to a new classroom. Every single year.

None of that is because I had _special needs_. It is because I was an afterthought. That is not a personal failing on my part. That is a systemic failure.

This distinction matters because language shapes policy. When we frame disability as a matter of "special needs," institutions respond by building special accommodations as optional add-ons. Accessibility becomes a checkbox. A budget line item. A request you have to submit in advance, in writing, with justification.

When we reframe disability as a fundamental design failure, the response changes. Accessibility becomes a design requirement. A baseline. Something you build in from the start, not something you bolt on after the fact.

> See how [I redesigned the new Google Icons to be more accessible](/blog/2026/google-icon-redesign/). Is this a "special design?" No, it's just another options for a design that would fundamentally be easier to see for more people.

**One framing says:** this person is different, so we should make an exception for them.

**The other framing says:** this person was excluded by design, so we need to fix the design.

> These are not the same thing. The first creates charity. The second creates equity. I want the system fixed.

I am a researcher. I build tools. I run studies. I talk to users about how they actually experience digital content. And over and over again, I hear the same story: a person with a basic, reasonable, predictable need, trying to do an ordinary thing, hitting a wall that should not exist.

When I study how low vision users look at data visualizations {% cite sechayk2026visualcontext %}, they are not asking for extra features. **They just want to read a chart.** But because standard charts are not built for magnification, users lose the axis label the moment they zoom in on a data point. We built tools to bring that context to the cursor. The need was not special; charts are just not designed with low-vision users in mind.

The same goes for educational videos. Low vision learners do not need a different curriculum; **they just need to know what an instructor is pointing at** {% cite sechayk2025veasyguide %}. We built a tool to dynamically highlight those subtle visual cues. It helped low vision users immediately, but strikingly, it made sighted students more engaged too. Good design is just good design.

Or look at the web. Modern sites **force screen reader users to spend minutes navigating irrelevant elements** to do what takes a sighted user seconds {% cite mohanbabu2025taskmode %}. We built a system that uses AI to filter out that structural noise. We did not build a special internet. We just fixed the navigation.

These systemic failures go beyond vision. Looking at the email history of a professional with chronic illness and ADHD {% cite pimenova2025longitudinal %}, the pattern is the same: **standard tools operate as invisible barriers**, and working around them is exhausting, invisible labor that gets miscategorized as a personal coping strategy rather than evidence of design failure.

These are not special accommodations. They are fundamental and basic needs.

> So what should we call it instead? Just "needs" works.

Words matter. The words we use to describe a problem determine what solutions we build. If we think people have special needs, we build special programs. If we think people have unmet needs in a world that excluded them, we build a better world.

I still see papers that use that terminology. And I always cringe when I do. Even papers from recent years still use "special needs." I know that language is not easy to change. **But every small step we take, takes us a little bit closer to the top of the hill.** So, we better get going.

I do not have special needs. I have needs. They are basic, and they are often forgotten or ignored. Let us start there.
