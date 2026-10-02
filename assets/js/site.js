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
