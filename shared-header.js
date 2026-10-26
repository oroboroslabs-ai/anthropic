(function () {
  "use strict";
  if (document.getElementById("unifiedHeader")) return;

  var links = [
    ["HOME", "/"],
    ["HARNESS", "/harness.html"],
    ["GLASSWING", "/glasswing.html"],
    ["PRO", "/set/index.html"],
    ["CORE HARNESS", "/shop.html#desktop"],
    ["SCREENS", "/screens.html"],
    ["CLAUDE COMMS", "/claude-communications/"],
    ["SHOP", "/shop.html"],
    ["CLI", "/cli.html"],
    ["JHANNA", "/jhanna.html"],
    ["CHAT", "/chat-anthropic.html"],
    ["HUGGINGFACE", "/huggingface.html"],
    ["SERVICES", "/all-services.html"],
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

  function build() {
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
        '<button class="uh-lite" id="uh-lite" type="button" aria-pressed="false">LITE</button>' +
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
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build, { once: true });
  } else {
    build();
  }
})();
