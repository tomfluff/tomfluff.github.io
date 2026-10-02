module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    standard: [
      "collapse",
      "collapsing",
      "show",
      "dropdown-menu",
      "dropdown-item",
      "table",
      "table-dark",
      "table-hover",
      "table-responsive",
      "af-tooltip",
      "af-popover",
      "font-weight-bold",
      "font-weight-medium",
      "font-weight-lighter",
      // medium-zoom injects these at runtime, so they never appear in the static
      // HTML PurgeCSS scans; without them the zoom overlay's z-index rule is purged
      // and page chrome (scroll-progress bar, ToC) bleeds through a zoomed image.
      "medium-zoom-overlay",
      "medium-zoom-image--opened",
    ],
    // Display settings (assets/js/site.js) put these attributes on <html> at runtime,
    // building the names in code, so PurgeCSS never sees them in the HTML or JS.
    greedy: [/data-text-size/, /data-line-spacing/, /data-line-length/, /data-contrast/],
  },
};
