(function () {
  "use strict";
  if (document.getElementById("unifiedHeader")) return;

  var links = [
    ["HARNESS", "/harness.html"],
    ["GLASSWING", "/glasswing.html"],
    ["PRO", "/set/index.html"],
    ["CORE HARNESS", "/shop.html#desktop"],
    ["SCREENS", "/screens.html"],
    ["SHOP", "/shop.html"],
    ["CLI", "/cli.html"],
    ["JHANNA", "/jhanna.html"],
    ["CHAT", "/chat-anthropic.html"],
    ["HUGGINGFACE", "/huggingface.html"],
    ["SERVICES", "/all-services.html"],
    ["CLAUDE VOICE", "/claude-communications/"],
    ["MANUAL", "/operations.html"]
  ];

  function pathNow() {
    var p = location.pathname.replace(/\/index\.html$/i, "/").replace(/\/+$/, "");
    return p || "/";
  }

  function isHere(href, label) {
    if (label === "CORE HARNESS") return false;
    var clean = href.split("#")[0].replace(/\/+$/, "") || "/";
    var p = pathNow();
    if (clean === "/") return p === "/";
    if (clean === "/set/index.html") return p === "/set" || p.indexOf("/set/") === 0;
    return p === clean || (clean !== "/" && p.indexOf(clean + "/") === 0);
  }

  if (!document.getElementById("site-theme-css")) {
    var themeCss = document.createElement("link");
    themeCss.id = "site-theme-css";
    themeCss.rel = "stylesheet";
    themeCss.href = "/site-theme.css";
    document.head.appendChild(themeCss);
  }  function build() {
    if (document.getElementById("unifiedHeader")) return;
    var header = document.createElement("header");
    header.id = "unifiedHeader";
    var nav = links.map(function (pair) {
      var cls = isHere(pair[1], pair[0]) ? ' class="uh-here"' : "";
      return '<a href="' + pair[1] + '"' + cls + ">" + pair[0] + "</a>";
    }).join("");
    header.innerHTML =
      '<div class="uh-inner">' +
        '<a class="uh-brand" href="/" aria-label="Oroboros / Anthropic">' +
          '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-dasharray="209 24" transform="rotate(-118 50 50)"/></svg>' +
          '<span>OROBOROS <em>/ ANTHROPIC</em></span>' +
        '</a>' +
        '<nav aria-label="Site">' + nav + '</nav>' +
        '<button class="uh-lite" id="uh-lite" type="button" aria-pressed="false" title="White mode" aria-label="White mode"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5 8.6 8.6 0 1 0 20.5 14.6z" fill="currentColor"/></svg></button>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);

    var light = false;
    try { light = localStorage.getItem("tc-lite") === "1"; } catch (e) {}
    if (light) document.documentElement.classList.add("light");
    var btn = header.querySelector("#uh-lite");
    if (btn) {
      btn.setAttribute("aria-pressed", light ? "true" : "false");
      btn.addEventListener("click", function () {
        var on = !document.documentElement.classList.contains("light");
        document.documentElement.classList.toggle("light", on);
        try { localStorage.setItem("tc-lite", on ? "1" : "0"); } catch (e) {}
        try { sessionStorage.setItem("tc-lite", on ? "1" : "0"); } catch (e) {}
        try { document.cookie = "tc-lite=" + (on ? "1" : "0") + "; path=/; max-age=31536000"; } catch (e) {}
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        try { window.dispatchEvent(new Event("site-theme")); } catch (e) {}
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build, { once: true });
  } else {
    build();
  }
})();

(function () {
  var raf = 0;
  function paint() {
    raf = 0;
    if (document.documentElement.classList.contains("light")) {
      document.body.style.removeProperty("background");
      return;
    }
    var vh = window.innerHeight || 800;
    var max = Math.max(1, (document.body.scrollHeight || 0) - vh);
    var p = Math.min(1, Math.max(0, (window.scrollY - vh * 0.55) / (vh * 0.95)));
    var d = Math.min(1, Math.max(0, (window.scrollY - vh * 1.35) / Math.max(1, max - vh * 1.35)));
    var base = [44, 45, 47], warm = [98, 67, 51], dark = [6, 6, 7];
    var r = base[0] + (warm[0] - base[0]) * p * 0.55;
    var g = base[1] + (warm[1] - base[1]) * p * 0.55;
    var b = base[2] + (warm[2] - base[2]) * p * 0.55;
    r = Math.round(r + (dark[0] - r) * d * 0.88);
    g = Math.round(g + (dark[1] - g) * d * 0.88);
    b = Math.round(b + (dark[2] - b) * d * 0.88);
    var orange = (0.01 + p * 0.18).toFixed(3);
    document.body.style.setProperty("background",
      "radial-gradient(1200px 900px at 50% 0%, rgba(217,119,87," + orange + ") 0%, rgba(217,119,87,0) 62%), rgb(" + r + "," + g + "," + b + ")",
      "important");
  }
  function onScroll() { if (!raf) raf = window.requestAnimationFrame(paint); }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("site-theme", onScroll);
  paint();
})();






