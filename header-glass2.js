(function () {
  var bar = document.querySelector(".topbar");
  var root = document.documentElement;

  /* ---- theme: one control, works on every page. Default dark. ---- */
  function applyTheme(mode) {
    var light = mode === "light";
    if (root.hasAttribute("data-theme")) {
      root.setAttribute("data-theme", light ? "light" : "dark");
      if (document.body) document.body.classList.toggle("light", light);
    } else {
      root.classList.toggle("light", light);
      if (document.body) document.body.classList.toggle("light", light);
    }
    var icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.href = light ? "favicon-light.png" : "favicon.png";
    var lite = document.querySelector(".lite");
    if (lite) {
      lite.setAttribute("aria-pressed", light ? "true" : "false");
      lite.setAttribute("title", light ? "Switch to dark" : "Switch to light");
    }
  }

  function readTheme() {
    var v = null;
    try { v = localStorage.getItem("oa-theme"); } catch (e) {}
    if (v !== "light" && v !== "dark") {
      try {
        var m = document.cookie.match(/(?:^|;\s*)oa-theme=(light|dark)/);
        v = m ? m[1] : null;
      } catch (e) { v = null; }
    }
    return v === "light" ? "light" : "dark";
  }

  function writeTheme(mode) {
    try { localStorage.setItem("oa-theme", mode); } catch (e) {}
    try { document.cookie = "oa-theme=" + mode + "; path=/; max-age=31536000; SameSite=Lax"; } catch (e) {}
  }

  applyTheme(readTheme());

  var lite = document.querySelector(".lite");
  if (lite) {
    lite.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var isLight = root.getAttribute("data-theme") === "light" ||
                    (!root.hasAttribute("data-theme") && root.classList.contains("light"));
      var next = isLight ? "dark" : "light";
      applyTheme(next);
      writeTheme(next);
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
