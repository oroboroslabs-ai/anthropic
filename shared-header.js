/* One finished-site bar for every marketing page. */
(function () {
  'use strict';

  var body = document.body;
  if (!body || body.getAttribute('data-app') === 'true') return;
  document.documentElement.style.scrollbarGutter = 'stable';
  if (document.getElementById('unifiedHeader')) return;

  var script = document.currentScript || document.querySelector('script[src$="shared-header.js"]');
  var rawSrc = script ? (script.getAttribute('src') || 'shared-header.js') : 'shared-header.js';
  var up = (rawSrc.match(/\//g) || []).length;
  var base = new URL(up ? new Array(up + 1).join('../') : '.', location.href).pathname;
  if (base.charAt(base.length - 1) !== '/') base += '/';

  var links = [
    { label: 'PRO HARNESS', href: 'set/harness.html', key: 'pro' },
    { label: 'FREE', href: 'harness.html', key: 'free' },
    { label: 'GLASSWING', href: 'glasswing/', key: 'glasswing' },
    { label: 'TEMPORAL', href: 'temporal.html', key: 'temporal' },
    { label: 'SOURCES', href: 'huggingface.html', key: 'sources' },
    { label: 'MEMORY', href: 'index.html#memory', key: 'memory' },
    { label: 'SERVICES', href: 'all-services.html', key: 'services' },
    { label: 'CLI', href: 'cli.html', key: 'cli' },
    { label: 'JHANNA', href: 'jhanna.html', key: 'jhanna' },
    { label: 'VOICE', href: 'claude-communications/', key: 'voice' },
    { label: 'CHAT', href: 'chat-anthropic.html', key: 'chat' },
    { label: 'MANUAL', href: 'operations.html', key: 'manual' },
    { label: 'SHOP', href: 'shop.html', key: 'shop' }
  ];

  function normalized(path) {
    return path.replace(/\/index\.html$/i, '/').replace(/\/+$/, '');
  }

  var here = normalized(location.pathname);
  var hereHash = (location.hash || '').replace(/^#/, '');

  function isHere(item) {
    if (item.key === 'memory') return here === normalized(base + 'index.html') && hereHash === 'memory';
    if (item.key === 'pro') return here.indexOf(normalized(base + 'set')) === 0;
    if (item.key === 'free') return here === normalized(base + 'harness.html');
    if (item.key === 'chat') return here === normalized(base + 'chat-anthropic.html');
    return here === normalized(base + item.href.split('#')[0]);
  }

  var moonSvg = '<svg class="uh-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  var sunSvg = '<svg class="uh-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

  var header = document.createElement('header');
  header.id = 'unifiedHeader';
  header.setAttribute('role', 'banner');

  var nav = '';
  links.forEach(function (item) {
    var url = base + item.href;
    var current = isHere(item) ? ' class="uh-here" aria-current="page"' : '';
    nav += '<a href="' + url + '"' + current + '>' + item.label + '</a>';
  });

  header.innerHTML =
    '<div class="uh-inner">' +
      '<a class="uh-brand" href="' + base + 'index.html" aria-label="Oroboros / Anthropic — home">' +
        '<span>OROBOROS <em>/ ANTHROPIC</em></span>' +
      '</a>' +
      '<nav aria-label="Primary">' + nav + '</nav>' +
      '<button class="uh-theme" type="button" aria-label="Switch to light mode" title="Switch to light mode">' +
        moonSvg + sunSvg +
      '</button>' +
    '</div>';

  body.insertBefore(header, body.firstChild);

  /* ---- theme: one moon/sun, persisted across every page ---- */
  var root = document.documentElement;
  var btn = header.querySelector('.uh-theme');

  function readTheme() {
    try {
      var oa = localStorage.getItem('oa-theme');
      if (oa === 'light') return true;
      if (oa === 'dark') return false;
    } catch (e) {}
    try {
      var v = localStorage.getItem('tc-lite');
      if (v === '1') return true;
      if (v === '0' || v === '') return false;
    } catch (e) {}
    try {
      var s = sessionStorage.getItem('tc-lite');
      if (s === '1') return true;
      if (s === '0' || s === '') return false;
    } catch (e) {}
    try {
      var m = document.cookie.match(/(?:^|;\s*)(?:tc-lite|oa-theme)=([^;]*)/);
      if (m) return m[1] === '1' || m[1] === 'light';
    } catch (e) {}
    return root.classList.contains('light') || root.getAttribute('data-theme') === 'light';
  }

  function writeTheme(on) {
    try { localStorage.setItem('tc-lite', on ? '1' : '0'); } catch (e) {}
    try { localStorage.setItem('oa-theme', on ? 'light' : 'dark'); } catch (e) {}
    try { sessionStorage.setItem('tc-lite', on ? '1' : '0'); } catch (e) {}
    try { document.cookie = 'tc-lite=' + (on ? '1' : '0') + '; path=/; max-age=31536000; SameSite=Lax'; } catch (e) {}
    try { document.cookie = 'oa-theme=' + (on ? 'light' : 'dark') + '; path=/; max-age=31536000; SameSite=Lax'; } catch (e) {}
  }

  function setFavicon(on) {
    var f = document.querySelector('link[rel="icon"]');
    if (f) f.href = on ? 'favicon-light.png' : 'favicon.png';
  }

  function applyTheme(on, persist) {
    root.classList.toggle('light', on);
    body.classList.toggle('light', on);
    root.setAttribute('data-theme', on ? 'light' : 'dark');
    root.style.colorScheme = on ? 'light' : 'dark';
    btn.setAttribute('aria-label', on ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('title', on ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (persist) writeTheme(on);
    if (on) setFavicon(true);
    else if (persist) setFavicon(false);
    try {
      window.dispatchEvent(new CustomEvent('tclitechange', { detail: { light: on } }));
    } catch (e) {}
  }

  applyTheme(readTheme(), false);
  btn.addEventListener('click', function () {
    applyTheme(!root.classList.contains('light'), true);
  });

  /* ---- text-only at the top, fog while scrolled ---- */
  var ticking = false;
  function paintBar() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    header.classList.toggle('uh-scrolled', y > 32);
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paintBar);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('pageshow', paintBar);
  window.addEventListener('popstate', paintBar);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) paintBar();
  });
  paintBar();

  /* ---- keep the memory link honest when the hash changes ---- */
  window.addEventListener('hashchange', function () {
    var memory = header.querySelector('a[href*="index.html#memory"]');
    if (!memory) return;
    memory.classList.toggle('uh-here', normalized(location.pathname) === normalized(base + 'index.html') && location.hash === '#memory');
  });
})();
