(function () {
  var bar = document.querySelector(".topbar");
  var root = document.documentElement;

  /* ---- theme: one control, works on every page ---- */
  function applyTheme(on) {
    if (root.hasAttribute("data-theme")) {
      root.setAttribute("data-theme", on ? "light" : "dark");
      return;
    }
    root.classList.toggle("light", on);
    if (document.body) document.body.classList.toggle("light", on);
    var icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.href = on ? "favicon-light.png" : "favicon.png";
  }

  function readTheme() {
    try {
      var v = localStorage.getItem("tc-lite");
      if (v !== null) return v === "1";
    } catch (e) {}
    try {
      var m = document.cookie.match(/(?:^|;\s*)tc-lite=([^;]*)/);
      if (m) return m[1] === "1";
    } catch (e) {}
    return root.classList.contains("light") || root.getAttribute("data-theme") === "light";
  }

  function writeTheme(on) {
    try { localStorage.setItem("tc-lite", on ? "1" : ""); } catch (e) {}
    try { document.cookie = "tc-lite=" + (on ? "1" : "0") + "; path=/; max-age=31536000; SameSite=Lax"; } catch (e) {}
  }

  var initial = readTheme();
  if (initial) applyTheme(true);

  var lite = document.querySelector(".lite");
  if (lite) {
    lite.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var on = root.hasAttribute("data-theme")
        ? root.getAttribute("data-theme") !== "light"
        : !root.classList.contains("light");
      applyTheme(on);
      writeTheme(on);
    });
  }

  /* ---- bar condense ---- */
  if (!bar) return;
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset || 0;
      bar.classList.toggle("condensed", y > 40);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a.brandimg") : null;
    if (!link) return;
    event.preventDefault();
    window.location.href = link.getAttribute("href") || "index.html";
  });
})();
