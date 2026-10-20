// Site behaviours layered over al_folio_core's scripts.
document.addEventListener("DOMContentLoaded", () => {
  // Publications: Abstract, Bib and Video are real <button>s that open a panel in place.
  // al_folio_core's common.js only binds <a class="abstract">, so these are handled here.
  // A closed panel is inert, so nothing inside it (the BibTeX copy button) takes focus.
  const panelSelector = (button) => {
    if (button.classList.contains("bibtex")) return ".bibtex.hidden";
    if (button.textContent.trim() === "Video") return ".abstract.hidden:has(video, iframe)";
    return ".abstract.hidden:not(:has(video, iframe))";
  };

  const setOpen = (button, panel, open) => {
    panel.classList.toggle("open", open);
    panel.inert = !open;
    button.setAttribute("aria-expanded", String(open));
  };

  let panelCount = 0;
  document.querySelectorAll(".links button.abstract, .links button.bibtex").forEach((button) => {
    const scope = button.closest(".links")?.parentElement;
    const panel = scope?.querySelector(panelSelector(button));
    if (!panel) return;
    panel.id ||= `pub-panel-${++panelCount}`;
    button.setAttribute("aria-controls", panel.id);
    button.addEventListener("click", () => {
      const open = !panel.classList.contains("open");
      scope.querySelectorAll(".links button[aria-expanded='true']").forEach((other) => {
        const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
        if (other !== button && otherPanel) setOpen(other, otherPanel, false);
      });
      setOpen(button, panel, open);
    });
  });

  // Display panel: text size, line spacing, theme, contrast and reading aid. Settings
  // are attributes on <html> (an inline script in the head applies them before first
  // paint) and are saved in localStorage. Theme goes through theme.js's setThemeSetting.
  const displayToggle = document.getElementById("display-toggle");
  const displayPanel = document.getElementById("display-panel");
  const displayBackdrop = document.querySelector(".display-backdrop");
  if (displayToggle && displayPanel) {
    const root = document.documentElement;
    const read = (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    };
    const write = (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {}
    };
    const current = (key) => (key === "theme" ? read("theme") || "system" : read(`display-${key}`) || "default");
    const markPressed = () => {
      displayPanel.querySelectorAll("[data-display-setting]").forEach((button) => {
        button.setAttribute("aria-pressed", String(current(button.dataset.displaySetting) === button.dataset.value));
      });
    };
    const apply = (key, value) => {
      if (key === "theme") {
        if (typeof setThemeSetting === "function") setThemeSetting(value);
        else write("theme", value);
      } else {
        write(`display-${key}`, value);
        if (value === "default") root.removeAttribute(`data-${key}`);
        else root.setAttribute(`data-${key}`, value);
      }
      markPressed();
    };
    // Under browser zoom the top bar can wrap onto several rows, and the header is sticky,
    // so the dropdown is capped at the space left below it and scrolls inside. The phone
    // sheet (position: fixed) has its own cap in _site.scss.
    const fit = () => {
      displayPanel.style.maxHeight = "";
      if (displayPanel.hidden || getComputedStyle(displayPanel).position !== "absolute") return;
      displayPanel.style.maxHeight = `${innerHeight - displayPanel.getBoundingClientRect().top - 8}px`;
    };
    const setOpen = (open) => {
      displayPanel.hidden = !open;
      if (displayBackdrop) displayBackdrop.hidden = !open;
      displayToggle.setAttribute("aria-expanded", String(open));
      if (open) {
        fit();
        markPressed();
        displayPanel.querySelector("[aria-pressed='true']")?.focus();
      }
    };

    displayToggle.addEventListener("click", () => setOpen(displayPanel.hidden));
    displayPanel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-display-setting]");
      if (button) apply(button.dataset.displaySetting, button.dataset.value);
      if (event.target.closest(".display-reset")) {
        ["text-size", "line-spacing", "contrast", "reading-aid"].forEach((key) => apply(key, "default"));
        apply("theme", "system");
      }
      // text size changes the height of the top bar
      fit();
      if (event.target.closest(".display-done")) {
        setOpen(false);
        displayToggle.focus();
      }
    });
    window.addEventListener("resize", fit);
    // on phones the panel is a sheet over a dimmed page; tapping the page closes it
    displayBackdrop?.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !displayPanel.hidden) {
        setOpen(false);
        displayToggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!displayPanel.hidden && !event.target.closest(".display-settings")) setOpen(false);
    });
  }

  // Reading aid (Display panel). "Ruler" is a thin line across the page at the pointer.
  // "Line focus" is a band that dims the rest of the page: over text it snaps to the line
  // under the pointer, at that line's height; elsewhere it follows the pointer. Both follow
  // a mouse, trackpad or pen only: a finger gives no position between taps, so touch is
  // ignored, and the setting is hidden on touch-only screens (_site.scss).
  {
    const root = document.documentElement;
    const band = document.createElement("div");
    band.className = "reading-aid";
    band.setAttribute("aria-hidden", "true");
    band.hidden = true;
    document.body.appendChild(band);
    let pointer = null;
    let frame = 0;

    // the text line at (x, y): its vertical centre and line height, or null off text
    const lineAt = (x, y) => {
      let node, offset;
      if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (pos) [node, offset] = [pos.offsetNode, pos.offset];
      } else if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(x, y);
        if (range) [node, offset] = [range.startContainer, range.startOffset];
      }
      if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return null;
      const element = node.parentElement;
      if (element.closest("header, .display-panel, button, input, textarea")) return null;
      const range = document.createRange();
      range.setStart(node, Math.min(offset, node.length));
      range.collapse(true);
      const rect = [...range.getClientRects()][0] || range.getBoundingClientRect();
      if (!rect || !rect.height) return null;
      const style = getComputedStyle(element);
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.6;
      const centre = rect.top + rect.height / 2;
      // caret positions also exist in margins next to text; only accept the line the pointer is on
      if (Math.abs(centre - y) > lineHeight * 0.75) return null;
      return { centre, height: lineHeight };
    };

    const draw = () => {
      frame = 0;
      const mode = root.getAttribute("data-reading-aid");
      if (!mode || !pointer) {
        band.hidden = true;
        return;
      }
      if (mode === "ruler") {
        band.style.top = `${pointer.y}px`;
        band.style.height = "";
      } else {
        const fallback = parseFloat(getComputedStyle(document.body).fontSize) * 1.9;
        const line = lineAt(pointer.x, pointer.y) || { centre: pointer.y, height: fallback };
        const height = line.height + 6;
        band.style.top = `${line.centre - height / 2}px`;
        band.style.height = `${height}px`;
      }
      band.dataset.mode = mode;
      band.hidden = false;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const follow = (event) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    document.addEventListener("pointermove", follow);
    document.addEventListener("pointerdown", follow);
    // a mouse leaving the window hides the band
    document.documentElement.addEventListener("mouseleave", () => {
      pointer = null;
      schedule();
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    new MutationObserver(schedule).observe(root, { attributes: true, attributeFilter: ["data-reading-aid"] });
  }

  // Comments: the giscus embed waits in a <template> until the panel is first opened.
  // Scripts copied out of a template do not run, so each one is recreated.
  const comments = document.querySelector("details.post-comments");
  if (comments) {
    comments.addEventListener("toggle", () => {
      const template = comments.querySelector("template[data-comments-template]");
      const host = comments.querySelector("[data-comments-host]");
      if (!comments.open || !template || !host) return;
      host.appendChild(template.content.cloneNode(true));
      host.querySelectorAll("script").forEach((old) => {
        const script = document.createElement("script");
        [...old.attributes].forEach((attr) => script.setAttribute(attr.name, attr.value));
        script.textContent = old.textContent;
        old.replaceWith(script);
      });
      template.remove();
    });
  }

  // Publications page: a text filter (bibsearch.js marks non-matching entries "unloaded"),
  // plus a year menu and venue chips that _layouts/publications.liquid builds from the list.
  // An entry shows only when it passes all three; a year heading hides when none of its
  // entries show.
  const input = document.getElementById("bibsearch");
  const status = document.getElementById("bibsearch-status");
  const clear = document.querySelector(".bibsearch-clear");
  const list = document.querySelector(".publications-page .publications");
  const yearSelect = document.getElementById("pubs-year");
  const venueBox = document.querySelector(".pubs-venues");
  if (input && status && clear && list && yearSelect && venueBox) {
    const entries = Array.from(list.querySelectorAll("ol.bibliography > li"));
    const rowOf = (li) => li.querySelector(":scope > .row");
    const yearOf = (li) => rowOf(li)?.dataset.year || "";
    const venueOf = (li) => rowOf(li)?.dataset.venue || "";
    const total = entries.length;
    // venues with their own chip; every other venue falls under "Other venues"
    const mainVenues = Array.from(venueBox.querySelectorAll(".pubs-venue"))
      .map((b) => b.dataset.venue)
      .filter((v) => v && v !== "other");

    let venue = "";
    const venueMatches = (li) => !venue || (venue === "other" ? !mainVenues.includes(venueOf(li)) : venueOf(li) === venue);

    const update = () => {
      const year = yearSelect.value;
      entries.forEach((li) => li.classList.toggle("pub-filtered", !venueMatches(li) || (year && yearOf(li) !== year)));
      list.querySelectorAll("h2.bibliography").forEach((heading) => {
        const ol = heading.nextElementSibling;
        if (!ol || ol.tagName !== "OL") return;
        const visible = Array.from(ol.children).some((li) => !li.classList.contains("unloaded") && !li.classList.contains("pub-filtered"));
        heading.classList.toggle("pub-filtered", !visible);
        ol.classList.toggle("pub-filtered", !visible);
      });
      const shown = entries.filter((li) => !li.classList.contains("unloaded") && !li.classList.contains("pub-filtered")).length;
      const query = input.value.trim();
      const active = Boolean(query || year || venue);
      if (!active) {
        status.textContent = "";
      } else if (shown === 0) {
        status.textContent = query ? `No publications match “${query}” with these filters.` : "No publications match these filters.";
      } else {
        status.textContent = `Showing ${shown} of ${total} publications.`;
      }
      clear.hidden = !active;
    };

    venueBox.addEventListener("click", (event) => {
      const button = event.target.closest(".pubs-venue");
      if (!button) return;
      venue = button.dataset.venue;
      venueBox.querySelectorAll(".pubs-venue").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      update();
    });
    yearSelect.addEventListener("change", update);
    // bibsearch.js filters on the same events; update after it has run
    const later = () => setTimeout(update, 50);
    input.addEventListener("input", later);
    window.addEventListener("hashchange", later);
    later();

    clear.addEventListener("click", () => {
      input.value = "";
      if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      yearSelect.value = "";
      venue = "";
      venueBox.querySelectorAll(".pubs-venue").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.venue === "")));
      later();
      input.focus();
    });
  }
});
