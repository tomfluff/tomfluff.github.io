// "Listen to this article" player for blog posts.
// Markup: _includes/audio_player.liquid. Styles: assets/css/audio-player.css.
// Loaded only on posts that set `audio` in their front matter. No dependencies.
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var RATE_KEY = "audio-player:rate";
  var POSITION_KEY = "audio-player:position:";
  var RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];
  var ARROW_STEP = 5; // seconds, arrow keys
  var PAGE_STEP = 30; // seconds, Page Up / Page Down
  var BAR_WIDTH = 3;
  var BAR_GAP = 2;
  var MARKER_HEIGHT = 6;
  var uid = 0;

  // ---- small helpers -------------------------------------------------------

  function readStore(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch (e) {
      /* storage blocked or full: the player works without it */
    }
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  // 83 -> "1:23", 3723 -> "1:02:03"
  function clock(seconds) {
    var s = Math.max(0, Math.floor(seconds || 0));
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    s = s % 60;
    return h ? h + ":" + pad(m) + ":" + pad(s) : m + ":" + pad(s);
  }

  function unit(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  // 130 -> "2 minutes 10 seconds"
  function spoken(seconds) {
    var s = Math.max(0, Math.floor(seconds || 0));
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    s = s % 60;
    var parts = [];
    if (h) parts.push(unit(h, "hour"));
    if (m) parts.push(unit(m, "minute"));
    if (s || !parts.length) parts.push(unit(s, "second"));
    return parts.join(" ");
  }

  // Length shown next to the label before playing: "8 min", "1 hr 5 min".
  function lengthLabel(seconds) {
    var total = Math.max(1, Math.round(seconds / 60));
    var h = Math.floor(total / 60);
    var m = total % 60;
    return h ? h + " hr" + (m ? " " + m + " min" : "") : m + " min";
  }

  function fetchJSON(url) {
    return fetch(url, { credentials: "same-origin" }).then(function (response) {
      if (!response.ok) throw new Error(url + ": HTTP " + response.status);
      return response.json();
    });
  }

  function svgEl(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) node.setAttribute(key, attrs[key]);
    }
    return node;
  }

  function parsePeaks(data) {
    var list = data && (Array.isArray(data) ? data : data.peaks);
    if (!Array.isArray(list) || !list.length) return null;
    var peaks = [];
    for (var i = 0; i < list.length; i++) {
      var v = Number(list[i]);
      peaks.push(isFinite(v) ? Math.min(1, Math.abs(v)) : 0);
    }
    var duration = data && !Array.isArray(data) ? Number(data.duration) : NaN;
    return { peaks: peaks, duration: isFinite(duration) && duration > 0 ? duration : 0 };
  }

  function parseChapters(data) {
    var list = data && (Array.isArray(data) ? data : data.chapters);
    if (!Array.isArray(list)) return [];
    var chapters = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i] || {};
      var t = Number(item.t);
      var title = typeof item.title === "string" ? item.title.trim() : "";
      if (isFinite(t) && t >= 0 && title) chapters.push({ t: t, title: title });
    }
    chapters.sort(function (a, b) {
      return a.t - b.t;
    });
    return chapters;
  }

  // Average the peaks into `count` bars, then scale so the loudest bar is 1.
  function resample(peaks, count) {
    var out = new Array(count);
    var len = peaks.length;
    var max = 0;
    for (var i = 0; i < count; i++) {
      var start = Math.floor((i * len) / count);
      var end = Math.max(start + 1, Math.floor(((i + 1) * len) / count));
      var sum = 0;
      var n = 0;
      for (var j = start; j < end && j < len; j++) {
        sum += peaks[j];
        n++;
      }
      out[i] = n ? sum / n : 0;
      if (out[i] > max) max = out[i];
    }
    for (var k = 0; k < count && max > 0; k++) out[k] /= max;
    return out;
  }

  // ---- one player ----------------------------------------------------------

  function initPlayer(root) {
    var audio = root.querySelector(".ap-audio");
    if (!audio) return;

    var q = function (selector) {
      return root.querySelector(selector);
    };
    var playButton = q(".ap-play");
    var timeline = q(".ap-timeline");
    var wave = q(".ap-wave");
    var seek = q(".ap-seek");
    var currentEl = q(".ap-current");
    var durationEl = q(".ap-duration");
    var lengthEl = q(".ap-length");
    var rateSelect = q(".ap-rate");
    var chaptersToggle = q(".ap-chapters-toggle");
    var chaptersPanel = q(".ap-chapters");
    var chapterList = q(".ap-chapter-list");
    var chapterNow = q(".ap-chapter-now");
    var statusEl = q(".ap-status");
    var errorEl = q(".ap-error");

    var id = ++uid;
    var clipId = "ap-clip-" + id;
    var barsId = "ap-bars-" + id;
    var positionKey = POSITION_KEY + (root.getAttribute("data-key") || location.pathname);

    var peaks = null;
    var peaksDuration = 0;
    var chapters = [];
    var chapterButtons = [];
    var currentChapter = -1;
    var width = 0;
    var clipRect = null;
    var playhead = null;
    var dragging = false;
    var dragTime = 0;
    var seekFocused = false;
    var pendingStart = null;
    var lastSecond = -1;
    var lastSaved = 0;
    var frame = 0;
    var drawnDuration = 0;
    var announceTimer = 0;
    var sessionReady = false;

    // -- time --------------------------------------------------------------

    function duration() {
      var d = audio.duration;
      return isFinite(d) && d > 0 ? d : peaksDuration;
    }

    function now() {
      if (dragging) return dragTime;
      if (pendingStart !== null) return pendingStart;
      return audio.currentTime || 0;
    }

    function isPlaying() {
      return !audio.paused && !audio.ended;
    }

    function clamp(t) {
      var d = duration();
      t = Math.max(0, t || 0);
      return d ? Math.min(t, d) : t;
    }

    // Before metadata has loaded, remember the target and apply it on loadedmetadata.
    function applyStart(t) {
      if (audio.readyState < 1) {
        pendingStart = t;
        return;
      }
      try {
        audio.currentTime = t;
        pendingStart = null;
      } catch (e) {
        pendingStart = t;
      }
    }

    function seekTo(t) {
      t = clamp(t);
      applyStart(t);
      render(true);
      savePosition(true);
      updatePositionState();
      return t;
    }

    function seekBy(delta) {
      return seekTo(now() + delta);
    }

    function play() {
      if (pendingStart !== null) applyStart(pendingStart);
      var result = audio.play();
      if (result && typeof result.catch === "function") {
        result.catch(function (err) {
          if (err && err.name === "NotAllowedError") return; // autoplay rules; the user can press play again
          if (audio.error) showError();
        });
      }
    }

    function togglePlay() {
      if (isPlaying()) audio.pause();
      else play();
    }

    // -- announcements (polite, only for meaningful changes) ---------------

    function announce(message, delay) {
      window.clearTimeout(announceTimer);
      announceTimer = window.setTimeout(function () {
        statusEl.textContent = "";
        // A fresh text node after clearing makes repeated messages announce again.
        window.setTimeout(function () {
          statusEl.textContent = message;
        }, 50);
      }, delay || 0);
    }

    // -- drawing -------------------------------------------------------------

    function draw() {
      var w = Math.round(timeline.clientWidth);
      var h = Math.round(timeline.clientHeight);
      if (!w || !h) return;
      width = w;

      var d = duration();
      drawnDuration = d;
      var markerTimes = [];
      if (d && chapters.length) {
        for (var c = 0; c < chapters.length; c++) {
          if (chapters[c].t > 0.5 && chapters[c].t < d) markerTimes.push(chapters[c].t);
        }
      }
      var markerRow = markerTimes.length ? MARKER_HEIGHT + 2 : 0;
      var waveHeight = h - markerRow;
      var mid = waveHeight / 2;
      var markerX = markerTimes.map(function (t) {
        return Math.round((t / d) * w);
      });

      while (wave.firstChild) wave.removeChild(wave.firstChild);
      wave.setAttribute("viewBox", "0 0 " + w + " " + h);
      wave.setAttribute("width", w);
      wave.setAttribute("height", h);

      var defs = svgEl("defs", {});
      var clip = svgEl("clipPath", { id: clipId });
      clipRect = svgEl("rect", { x: 0, y: -10, width: 0, height: h + 20 });
      clip.appendChild(clipRect);
      defs.appendChild(clip);

      var bars = svgEl("g", { id: barsId });
      var nearMarker = function (x0, x1) {
        for (var m = 0; m < markerX.length; m++) {
          if (x1 > markerX[m] - 3 && x0 < markerX[m] + 3) return true;
        }
        return false;
      };

      if (peaks) {
        var step = BAR_WIDTH + BAR_GAP;
        var count = Math.max(1, Math.floor((w + BAR_GAP) / step));
        var offset = Math.floor((w - (count * step - BAR_GAP)) / 2);
        var levels = resample(peaks, count);
        for (var i = 0; i < count; i++) {
          var x = offset + i * step;
          if (nearMarker(x, x + BAR_WIDTH)) continue; // leave a gap at each chapter start
          var bh = Math.max(3, Math.round(levels[i] * (waveHeight - 4)));
          bars.appendChild(svgEl("rect", { x: x, y: Math.round(mid - bh / 2), width: BAR_WIDTH, height: bh, rx: 1.5 }));
        }
      } else {
        // No peaks file: a plain progress bar, split into segments at chapter starts.
        var track = 6;
        var edges = [0].concat(markerX, [w]);
        for (var e = 0; e < edges.length - 1; e++) {
          var x0 = edges[e] + (e ? 3 : 0);
          var x1 = edges[e + 1] - (e < edges.length - 2 ? 3 : 0);
          if (x1 - x0 < 1) continue;
          bars.appendChild(svgEl("rect", { x: x0, y: Math.round(mid - track / 2), width: x1 - x0, height: track, rx: track / 2 }));
        }
      }
      defs.appendChild(bars);
      wave.appendChild(defs);

      var unplayed = svgEl("use", { href: "#" + barsId, class: "ap-unplayed" });
      var played = svgEl("use", { href: "#" + barsId, class: "ap-played", "clip-path": "url(#" + clipId + ")" });
      wave.appendChild(unplayed);
      wave.appendChild(played);

      for (var k = 0; k < markerX.length; k++) {
        wave.appendChild(svgEl("rect", { class: "ap-mark", x: markerX[k] - 1.5, y: h - MARKER_HEIGHT, width: 3, height: MARKER_HEIGHT, rx: 1.5 }));
      }

      playhead = svgEl("g", {});
      playhead.appendChild(svgEl("rect", { class: "ap-playhead", x: -1, y: 0, width: 2, height: waveHeight, rx: 1 }));
      playhead.appendChild(svgEl("circle", { class: "ap-knob", cx: 0, cy: mid, r: 6 }));
      wave.appendChild(playhead);

      render(true);
    }

    function syncSlider(force) {
      // While playing with the slider focused, leave its value alone so screen
      // readers don't read out every passing second. It catches up on any seek.
      if (!force && seekFocused && isPlaying()) return;
      var d = duration();
      var t = now();
      if (d) seek.max = String(Math.max(1, d));
      seek.value = String(t);
      seek.setAttribute("aria-valuetext", d ? spoken(t) + " of " + spoken(d) : spoken(t));
    }

    function render(force) {
      var d = duration();
      var t = now();
      var fraction = d ? Math.min(1, Math.max(0, t / d)) : 0;
      var x = Math.round(fraction * width * 10) / 10;
      if (clipRect) clipRect.setAttribute("width", x);
      if (playhead) playhead.setAttribute("transform", "translate(" + Math.min(Math.max(x, 1), width - 1) + " 0)");

      var second = Math.floor(t);
      if (force || second !== lastSecond) {
        lastSecond = second;
        currentEl.textContent = clock(t);
        updateChapter(t);
        syncSlider(force);
      }
    }

    function loop() {
      render(false);
      frame = isPlaying() ? window.requestAnimationFrame(loop) : 0;
    }

    function startLoop() {
      if (!frame && !prefersReducedMotion()) frame = window.requestAnimationFrame(loop);
    }

    function stopLoop() {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function updateDuration() {
      var d = duration();
      if (!d) return;
      durationEl.textContent = clock(d);
      if (lengthEl) {
        lengthEl.textContent = lengthLabel(d);
        lengthEl.hidden = false;
      }
      // Chapter markers depend on the duration; redraw if it changed noticeably.
      if (Math.abs(d - drawnDuration) > 0.5) draw();
      else render(true);
    }

    // -- chapters ------------------------------------------------------------

    function chapterAt(t) {
      var index = -1;
      for (var i = 0; i < chapters.length; i++) {
        if (chapters[i].t <= t + 0.25) index = i;
      }
      return index;
    }

    function updateChapter(t) {
      if (!chapters.length) return;
      var index = chapterAt(t);
      if (index === currentChapter) return;
      currentChapter = index;
      for (var i = 0; i < chapterButtons.length; i++) {
        if (i === index) chapterButtons[i].setAttribute("aria-current", "true");
        else chapterButtons[i].removeAttribute("aria-current");
      }
      if (index < 0) {
        chapterNow.hidden = true;
        return;
      }
      chapterNow.textContent = "";
      var label = document.createElement("span");
      label.className = "ap-sr";
      label.textContent = "Chapter " + (index + 1) + " of " + chapters.length + ": ";
      chapterNow.appendChild(label);
      chapterNow.appendChild(document.createTextNode(chapters[index].title));
      chapterNow.hidden = false;
    }

    function goToChapter(index, startPlaying) {
      if (index < 0 || index >= chapters.length) return;
      seekTo(chapters[index].t);
      announce("Chapter " + (index + 1) + " of " + chapters.length + ": " + chapters[index].title);
      if (startPlaying && !isPlaying()) play();
    }

    function buildChapters() {
      chapterList.textContent = "";
      chapterButtons = [];
      chapters.forEach(function (chapter, index) {
        var item = document.createElement("li");
        var button = document.createElement("button");
        button.type = "button";
        var time = document.createElement("span");
        time.className = "ap-chapter-time";
        time.setAttribute("aria-hidden", "true");
        time.textContent = clock(chapter.t);
        var title = document.createElement("span");
        title.textContent = chapter.title;
        var when = document.createElement("span");
        when.className = "ap-sr";
        when.textContent = ", at " + spoken(chapter.t);
        button.appendChild(time);
        button.appendChild(title);
        button.appendChild(when);
        button.addEventListener("click", function () {
          goToChapter(index, true);
        });
        item.appendChild(button);
        chapterList.appendChild(item);
        chapterButtons.push(button);
      });
      chaptersToggle.hidden = false;
      currentChapter = -2; // force a refresh
      setChapterActions();
      draw();
    }

    function setChaptersOpen(open) {
      chaptersPanel.hidden = !open;
      chaptersToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    // -- storage -------------------------------------------------------------

    function savePosition(force) {
      var t = now();
      var d = duration();
      if (!force && Math.abs(t - lastSaved) < 5) return;
      lastSaved = t;
      // Only worth resuming somewhere in the middle.
      if (t > 5 && (!d || t < d - 10)) writeStore(positionKey, String(Math.floor(t)));
      else writeStore(positionKey, null);
    }

    function restorePosition() {
      var saved = parseFloat(readStore(positionKey));
      if (isFinite(saved) && saved > 5) applyStart(saved);
    }

    function setRate(rate, persist) {
      if (RATES.indexOf(rate) < 0) rate = 1;
      audio.defaultPlaybackRate = rate;
      audio.playbackRate = rate;
      rateSelect.value = String(rate);
      if (persist) writeStore(RATE_KEY, String(rate));
    }

    // -- errors --------------------------------------------------------------

    function showError() {
      if (!errorEl.hidden) return;
      errorEl.hidden = false;
      root.classList.add("has-error");
      announce("The narration could not be loaded.");
    }

    // -- Media Session (lock screen, headphones, media keys) ---------------

    function updatePositionState() {
      var d = duration();
      if (!sessionReady || !d || !navigator.mediaSession || !navigator.mediaSession.setPositionState) return;
      try {
        navigator.mediaSession.setPositionState({
          duration: d,
          playbackRate: audio.playbackRate || 1,
          position: Math.min(Math.max(0, audio.currentTime || 0), d),
        });
      } catch (e) {
        /* unsupported values */
      }
    }

    function setupMediaSession() {
      if (sessionReady || !("mediaSession" in navigator)) return;
      sessionReady = true;
      var session = navigator.mediaSession;
      try {
        var artwork = root.getAttribute("data-artwork");
        session.metadata = new window.MediaMetadata({
          title: root.getAttribute("data-title") || document.title,
          artist: root.getAttribute("data-artist") || "",
          artwork: artwork ? [{ src: new URL(artwork, location.href).href }] : [],
        });
      } catch (e) {
        /* MediaMetadata missing */
      }
      var handlers = {
        play: function () {
          play();
        },
        pause: function () {
          audio.pause();
        },
        seekbackward: function (details) {
          seekBy(-((details && details.seekOffset) || 15));
        },
        seekforward: function (details) {
          seekBy((details && details.seekOffset) || 15);
        },
        seekto: function (details) {
          if (details && isFinite(details.seekTime)) seekTo(details.seekTime);
        },
      };
      Object.keys(handlers).forEach(function (action) {
        setAction(action, handlers[action]);
      });
      setChapterActions();
    }

    function setAction(action, handler) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (e) {
        /* action not supported by this browser */
      }
    }

    // Previous/next track buttons jump between chapters when there are any.
    function setChapterActions() {
      if (!sessionReady || !chapters.length) return;
      setAction("previoustrack", function () {
        var index = chapterAt(now());
        // Restart the current chapter unless we're right at its start.
        if (index >= 0 && now() - chapters[index].t > 3) goToChapter(index);
        else goToChapter(Math.max(0, index - 1));
      });
      setAction("nexttrack", function () {
        goToChapter(chapterAt(now()) + 1);
      });
    }

    // -- wiring --------------------------------------------------------------

    playButton.addEventListener("click", togglePlay);

    root.querySelectorAll(".ap-skip").forEach(function (button) {
      button.addEventListener("click", function () {
        var t = seekBy(parseFloat(button.getAttribute("data-skip")) || 0);
        // One summary after a burst of presses, not one per press.
        announce("At " + spoken(t), 600);
      });
    });

    rateSelect.addEventListener("change", function () {
      setRate(parseFloat(rateSelect.value), true);
    });

    chaptersToggle.addEventListener("click", function () {
      setChaptersOpen(chaptersPanel.hidden);
    });

    chaptersPanel.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setChaptersOpen(false);
        chaptersToggle.focus();
      }
    });

    // Keyboard on the slider. Handled here so arrows move a fixed 5 seconds
    // regardless of the input's step, and Space plays/pauses like other players.
    seek.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      var d = duration();
      var handled = true;
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowDown":
          seekBy(-ARROW_STEP);
          break;
        case "ArrowRight":
        case "ArrowUp":
          seekBy(ARROW_STEP);
          break;
        case "PageDown":
          seekBy(-PAGE_STEP);
          break;
        case "PageUp":
          seekBy(PAGE_STEP);
          break;
        case "Home":
          seekTo(0);
          break;
        case "End":
          if (d) seekTo(d);
          break;
        case " ":
        case "Spacebar":
          togglePlay();
          break;
        default:
          handled = false;
      }
      if (handled) event.preventDefault();
    });

    // Assistive tech (e.g. VoiceOver swipe up/down) changes the value directly.
    seek.addEventListener("input", function () {
      if (!dragging) seekTo(parseFloat(seek.value));
    });

    seek.addEventListener("focus", function () {
      seekFocused = true;
      syncSlider(true);
    });

    seek.addEventListener("blur", function () {
      seekFocused = false;
    });

    // Left/Right also nudge the position while the play or skip buttons have
    // focus. Nothing is bound at page level, so screen readers keep their keys.
    root.querySelectorAll(".ap-play, .ap-skip").forEach(function (button) {
      button.addEventListener("keydown", function (event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === "ArrowLeft") seekBy(-ARROW_STEP);
        else if (event.key === "ArrowRight") seekBy(ARROW_STEP);
        else return;
        event.preventDefault();
      });
    });

    // Pointer: click or drag anywhere on the waveform.
    function timeAt(clientX) {
      var box = timeline.getBoundingClientRect();
      var fraction = box.width ? (clientX - box.left) / box.width : 0;
      return clamp(Math.min(1, Math.max(0, fraction)) * duration());
    }

    timeline.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 || !duration()) return;
      dragging = true;
      dragTime = timeAt(event.clientX);
      try {
        timeline.setPointerCapture(event.pointerId);
      } catch (e) {
        /* older browsers */
      }
      render(true);
    });

    timeline.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      dragTime = timeAt(event.clientX);
      render(true);
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      seekTo(dragTime);
      // Keep keyboard control on the timeline after a click, so the arrow keys work next.
      try {
        seek.focus({ preventScroll: true, focusVisible: false });
      } catch (e) {
        seek.focus();
      }
    }

    timeline.addEventListener("pointerup", endDrag);
    timeline.addEventListener("pointercancel", endDrag);
    timeline.addEventListener("lostpointercapture", endDrag);

    // Media element events
    audio.addEventListener("play", function () {
      root.classList.add("is-playing");
      playButton.setAttribute("aria-label", "Pause narration");
      setupMediaSession();
      if (sessionReady) navigator.mediaSession.playbackState = "playing";
      startLoop();
    });

    audio.addEventListener("pause", function () {
      root.classList.remove("is-playing");
      playButton.setAttribute("aria-label", "Play narration");
      if (sessionReady) navigator.mediaSession.playbackState = "paused";
      stopLoop();
      render(true);
      savePosition(true);
      updatePositionState();
    });

    audio.addEventListener("ended", function () {
      writeStore(positionKey, null);
      render(true);
      announce("Narration finished.");
    });

    audio.addEventListener("timeupdate", function () {
      if (!frame) render(false);
      if (isPlaying()) savePosition(false);
    });

    audio.addEventListener("loadedmetadata", function () {
      if (pendingStart !== null) {
        if (pendingStart < audio.duration - 1) applyStart(pendingStart);
        else pendingStart = null;
      }
      updateDuration();
    });

    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("seeked", function () {
      render(true);
    });

    audio.addEventListener("ratechange", function () {
      rateSelect.value = String(audio.playbackRate);
      updatePositionState();
    });

    audio.addEventListener("error", showError);

    window.addEventListener("pagehide", function () {
      if (isPlaying() || now() > 5) savePosition(true);
    });

    if (typeof ResizeObserver === "function") {
      var lastWidth = 0;
      new ResizeObserver(function () {
        var w = Math.round(timeline.clientWidth);
        if (w && w !== lastWidth) {
          lastWidth = w;
          draw();
        }
      }).observe(timeline);
    } else {
      window.addEventListener("resize", draw);
    }

    // -- start ---------------------------------------------------------------

    var savedRate = parseFloat(readStore(RATE_KEY));
    setRate(isFinite(savedRate) ? savedRate : 1, false);
    restorePosition();
    if (audio.error) showError();
    draw();
    updateDuration();

    var peaksUrl = root.getAttribute("data-peaks");
    if (peaksUrl) {
      fetchJSON(peaksUrl)
        .then(function (data) {
          var parsed = parsePeaks(data);
          if (!parsed) return;
          peaks = parsed.peaks;
          peaksDuration = parsed.duration;
          draw();
          updateDuration();
        })
        .catch(function () {
          /* keep the plain progress bar */
        });
    }

    var chaptersUrl = root.getAttribute("data-chapters");
    if (chaptersUrl) {
      fetchJSON(chaptersUrl)
        .then(function (data) {
          chapters = parseChapters(data);
          if (chapters.length) buildChapters();
        })
        .catch(function () {
          /* no chapter list */
        });
    }
  }

  function start() {
    document.querySelectorAll(".audio-player").forEach(initPlayer);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
