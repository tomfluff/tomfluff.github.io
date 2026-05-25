(function () {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  document.body.appendChild(cursor);

  const INTERACTIVE =
    'a[href], button, [role="button"], input[type="submit"], ' + 'input[type="button"], input[type="reset"], label, .btn, summary, select';

  document.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
    cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    cursor.style.opacity = "1";
  });

  document.addEventListener("mouseover", ({ target }) => {
    cursor.classList.toggle("is-hovering", !!target.closest(INTERACTIVE));
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
})();
