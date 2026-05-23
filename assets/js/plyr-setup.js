document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    Plyr.setup("video");
  }
});
