---
layout: post
title: "Read-along: Listening to Claude Code Instead of Reading It"
date: 2026-10-11 20:00:00+0900
thumbnail: assets/img/projects/read-along-banner.png
og_image: /assets/img/projects/read-along-banner.png
featured: false
tags: text-to-speech low-vision open-source AI
categories: projects
author: Yotam Sechayk
audio: /assets/audio/posts/2026-10-11-read-along.mp3
audio_note: "Synthetic narration"
giscus_comments: true
related_posts: true
related_publications: false
description: "Long replies in a terminal wear me out, so I built read-along, a mod for Claude Code that reads Claude's replies aloud and highlights each sentence as it is heard. I explain why I wanted it, what it does, the features I asked for while building it, and what still needs testing in this first public preview."
---

Reading long blocks of text in a terminal wears me out. I use Claude Code every day, and Claude writes a lot of text. So I built a way to listen to it.

I have albinism and low vision, and I research accessibility for people with low vision. I use screen magnification and high contrast, and I sit close to my screens. A terminal is a hard place to read for me. When I magnify, I can only see a few lines at a time. A long reply wears me out quickly.

**Read-along is a mod for Claude Code that reads Claude's replies aloud and highlights each sentence as you hear it.** Version 0.9.0 came out today as a public preview. You can [try the demo on its web page](https://sechayk.com/claude-read-along/) and find the code [on GitHub](https://github.com/tomfluff/claude-read-along).

<div class="row justify-content-center mt-3">
  <div class="col-12">
    {%
      include video.liquid
      path="assets/video/posts/read-along-short.mp4"
      poster="/assets/img/posts/read-along-short-poster.jpg"
      class="img-fluid rounded z-depth-1"
      controls=true
      title="Read-along reading a reply from Claude in the terminal"
    %}
    <div class="caption">Read-along reading a reply from Claude in my terminal. The sentence being read is highlighted, and the player above the prompt shows the voice, the progress and the controls. The recording has sound.</div>
  </div>
</div>

## Why listen instead of read

I've used text-to-speech for many years. In my [previous post](/blog/2026/accessibility-on-by-default/), I wrote about how I read with [Balabolka](https://www.cross-plus-a.com/balabolka.htm) and the extra buttons on my mouse. I select text, press a button, and hear it right away. That gives me support when I want it, without a screen reader reading everything on the screen.

That habit didn't carry over to the terminal. Selecting text in a terminal is difficult. The terminal's shortcuts also don't work with my setup. And even when I do get a reply read aloud, I can't follow along easily, because it's disorienting.

**I wanted the reading to happen where the text already is.** I want to hear a reply and see which sentence I'm hearing, so I can look at the screen when I need to and look away when I don't. My research works on the same idea: helping low-vision people use their residual vision, with visual highlights that point to what matters ([see my publications](/publications/)).

> Read-along is not a screen reader and doesn't replace one. It reads Claude's messages, and leaves the rest of the screen to you.

## What it does

Each part of read-along answers something I ran into while reading in the terminal.

- **Play any message.** Hovering over a message shows buttons to play it, restart it, change the speed and change the voice.
- **Follow the highlight.** The sentence being spoken is highlighted in the message. When I lose my place, I find it again by looking for the highlight.
- **A player above the prompt.** It shows the progress and has pause, stop, back, forward, speed and voice controls. Its buttons also have keys: `p` to pause, `s` to stop, `b` to go back and `n` to skip ahead.
- **Auto-read.** Read-along can read each reply as it arrives. It can also read the short updates Claude writes between tool calls, which is where Claude explains what it's about to do.
- **Fast, without chipmunk voices.** Speeds up to 4× keep the voice's pitch.
- **Several languages in one reply.** Each sentence gets a voice in its own language, so a reply that mixes English and Japanese is read with the right voice for each part.
- **Local and private.** The speech is made on your own machine, and nothing you read is sent anywhere.

The natural voices come from [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M) by hexgrad, which speaks English, Japanese, Chinese, Spanish, French, Hindi, Italian and Portuguese. Read-along can also use the macOS and Windows voices, and eSpeak NG for about 100 more languages.

## Features I asked for along the way

I built read-along with Claude Code itself. Most of its features came from something that got in my way while I used it.

- **Updates read the moment they're written.** At first, read-along read the updates between tool calls only when Claude finished a step. Before a long tool call, that could be a minute late. Now each update is read as soon as its text appears.
- **A player that never moves the transcript.** If the text I'm reading jumps when the player appears or changes, I lose my place. The player has a fixed place above the prompt.
- **Room for other mods.** Two example mods I installed hid the player when they drew their own bar. Read-along now notices when that happens and shows a simple line under the prompt instead. I also reported the problem to the people who maintain those mods.
- **Reading Claude's thinking.** When Claude's thinking is shown as updates, read-along can read it too. This is off by default.

## Who it's for

I built read-along for people like me. I think it can also help people with dyslexia, ADHD or eye strain, people reading in a second language, and anyone who wants to listen while doing something else. **For me, hearing a long reply while seeing where I am in it takes less effort than reading it alone.**

## A preview, not 1.0

I released read-along as 0.9.0 because so far I've used it day to day on WSL only. On Linux and macOS, its tests pass in CI, but nobody has tried it there by hand yet. If you use Claude Code on [macOS](https://github.com/tomfluff/claude-read-along/issues/1) or [Linux](https://github.com/tomfluff/claude-read-along/issues/2), I'd love to hear how it works for you. Support for Windows without WSL is [planned](https://github.com/tomfluff/claude-read-along/issues/5).

Read-along is an independent project. It is not an Anthropic product.

To install it, run this at the Claude Code prompt:

```
/plugin install read-along --marketplace tomfluff/claude-read-along
```

Then `/read-along doctor` shows what your machine already has, and `/read-along setup` walks you through installing the Kokoro voices.

I wanted to hear Claude Code without losing my place in it. If long replies wear you out too, I hope read-along helps.
