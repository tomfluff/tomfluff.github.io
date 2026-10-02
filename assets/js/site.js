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

  // Display panel: text size, line spacing, theme and contrast. Settings
  // are attributes on <html> (an inline script in the head applies them before first
  // paint) and are saved in localStorage. Theme goes through theme.js's setThemeSetting.
  const displayToggle = document.getElementById("display-toggle");
  const displayPanel = document.getElementById("display-panel");
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
    const setOpen = (open) => {
      displayPanel.hidden = !open;
      displayToggle.setAttribute("aria-expanded", String(open));
      if (open) {
        markPressed();
        displayPanel.querySelector("[aria-pressed='true']")?.focus();
      }
    };

    displayToggle.addEventListener("click", () => setOpen(displayPanel.hidden));
    displayPanel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-display-setting]");
      if (button) apply(button.dataset.displaySetting, button.dataset.value);
      if (event.target.closest(".display-reset")) {
        ["text-size", "line-spacing", "contrast"].forEach((key) => apply(key, "default"));
        apply("theme", "system");
      }
    });
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
  // plus a year menu and venue chips built from the list itself. An entry shows only when
  // it passes all three; a year heading hides when none of its entries show.
  const input = document.getElementById("bibsearch");
  const status = document.getElementById("bibsearch-status");
  const clear = document.querySelector(".bibsearch-clear");
  const list = document.querySelector(".publications-page .publications");
  if (input && status && clear && list) {
    const entries = Array.from(list.querySelectorAll("ol.bibliography > li"));
    const rowOf = (li) => li.querySelector(":scope > .row");
    const yearOf = (li) => rowOf(li)?.dataset.year || "";
    const venueOf = (li) => rowOf(li)?.dataset.venue || "";
    const total = entries.length;

    // Summary line: number of papers, first year, and awards
    const years = entries.map(yearOf).filter(Boolean);
    const awards = entries.filter((li) => rowOf(li)?.hasAttribute("data-award")).length;
    const summary = document.querySelector("[data-pubs-summary]");
    if (summary && total && years.length) {
      const first = Math.min(...years.map(Number));
      summary.textContent = `${total} papers since ${first}` + (awards ? `, ${awards} of them with awards.` : ".");
    }

    // Year menu
    const yearSelect = document.getElementById("pubs-year");
    const yearCounts = {};
    years.forEach((y) => (yearCounts[y] = (yearCounts[y] || 0) + 1));
    Object.keys(yearCounts)
      .sort((a, b) => b - a)
      .forEach((y) => yearSelect.add(new Option(`${y} (${yearCounts[y]})`, y)));

    // Venue chips: venues with two or more papers get their own chip, the rest share one
    const venueCounts = {};
    entries.forEach((li) => {
      const v = venueOf(li);
      if (v) venueCounts[v] = (venueCounts[v] || 0) + 1;
    });
    const mainVenues = Object.keys(venueCounts)
      .filter((v) => venueCounts[v] > 1)
      .sort((a, b) => venueCounts[b] - venueCounts[a] || a.localeCompare(b));
    const otherCount = entries.length - mainVenues.reduce((n, v) => n + venueCounts[v], 0);
    const venueBox = document.querySelector(".pubs-venues");
    const chip = (value, label, count, style) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pubs-venue" + (style ? " pubs-venue-coloured" : "");
      button.dataset.venue = value;
      button.setAttribute("aria-pressed", String(value === ""));
      if (style) button.setAttribute("style", style);
      button.innerHTML = `${label} <span>${count}</span>`;
      venueBox.appendChild(button);
    };
    chip("", "All", total);
    mainVenues.forEach((v) => {
      const sample = entries.find((li) => venueOf(li) === v)?.querySelector(".pub-venue");
      chip(v, v, venueCounts[v], sample?.getAttribute("style") || "");
    });
    if (otherCount > 0) chip("other", "Other venues", otherCount);
    document.querySelector("[data-pubs-controls]").hidden = false;

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
