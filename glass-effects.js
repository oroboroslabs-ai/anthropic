(function () {
  var bar = document.querySelector(".topbar");
  var root = document.documentElement;

  function applyTheme(on) {
    root.classList.toggle("light", on);
    if (document.body) document.body.classList.toggle("light", on);
    var icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.href = on ? "favicon-light.png" : "favicon.png";
  }
  function readTheme() {
    try { var v = localStorage.getItem("tc-lite"); if (v !== null) return v === "1"; } catch (e) {}
    try { var m = document.cookie.match(/(?:^|;\\s*)tc-lite=([^;]*)/); if (m) return m[1] === "1"; } catch (e) {}
    return root.classList.contains("light");
  }
  function writeTheme(on) {
    try { localStorage.setItem("tc-lite", on ? "1" : ""); } catch (e) {}
    try { document.cookie = "tc-lite=" + (on ? "1" : "0") + "; path=/; max-age=31536000; SameSite=Lax"; } catch (e) {}
  }
  if (readTheme()) applyTheme(true);
  var liteBtn = document.querySelector(".lite");
  if (liteBtn) {
    liteBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var on = !root.classList.contains("light");
      applyTheme(on);
      writeTheme(on);
    });
  }
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset || 0;
      if (bar) bar.classList.toggle("condensed", y > 40);
      var p = Math.min(1, y / 1400);
      document.documentElement.style.setProperty("--desat", p.toFixed(3));
      document.documentElement.style.setProperty("--scroll", String(Math.round(y)));
      ticking = false;
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a.brandimg") : null;
    if (!link) return;
    event.preventDefault();
    window.location.href = link.getAttribute("href") || "index.html";
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("in");
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12 });
    var nodes = document.querySelectorAll("section.block h2, section.block .card, .prod, .preview, .cap");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add("reveal");
      io.observe(nodes[i]);
    }
  }
})();
