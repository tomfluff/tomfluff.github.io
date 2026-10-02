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

  // Display panel: text size, line spacing, line length, theme and contrast. Settings
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
        ["text-size", "line-spacing", "line-length", "contrast"].forEach((key) => apply(key, "default"));
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

  // Publication filter: say how many entries match, and offer a way out when none do.
  const input = document.getElementById("bibsearch");
  const status = document.getElementById("bibsearch-status");
  const clear = document.querySelector(".bibsearch-clear");
  if (input && status && clear) {
    const entries = () => document.querySelectorAll(".publications ol.bibliography > li");
    const report = () => {
      const query = input.value.trim();
      const all = entries().length;
      const shown = Array.from(entries()).filter((li) => !li.classList.contains("unloaded")).length;
      if (!query) {
        status.textContent = "";
      } else if (shown === 0) {
        status.textContent = `No publications match “${query}”.`;
      } else {
        status.textContent = `Showing ${shown} of ${all} publications.`;
      }
      clear.hidden = !query;
    };
    // bibsearch.js filters on the same events; report after it has run
    const later = () => setTimeout(report, 50);
    input.addEventListener("input", later);
    window.addEventListener("hashchange", later);
    later();

    clear.addEventListener("click", () => {
      input.value = "";
      if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
  }
});
