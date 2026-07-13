module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // medium-zoom is loaded from a CDN <script> tag, never a local file, so its
  // classes never appear in the _site/**/*.js PurgeCSS scans (it adds them to
  // the DOM at click-time). Without this, PurgeCSS deletes our
  // .medium-zoom-overlay / .medium-zoom-image--opened z-index rule as "unused".
  safelist: [/^medium-zoom/],
};
