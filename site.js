/* TC_SHOP — the single store config (the shop + the checkout read this) */
window.TC_SHOP = {
    paypalBusiness: 'oroboroslabs.ai@gmail.com',
    handsPro: 69.00,
    extAddon: 29.00
};
/* ============================================================
   TOTALCONTROL site runtime — one cached file, every page.
   Theme (lite) · plain-beauty motion · link prefetch (instant nav)
   · download counter · the cover slider. Loaded with defer.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- theme: one source, all pages ---------- */
  function setFaviconLite(on) {
    const f = document.querySelector('link[rel="icon"]');
    if (f) f.href = on ? 'favicon-light.png' : 'favicon.png';
  }
  function writeLite(on) {
    try { localStorage.setItem('tc-lite', on ? '1' : ''); } catch (e) {}
    try { localStorage.setItem('oa-theme', on ? 'light' : 'dark'); } catch (e) {}
    try { sessionStorage.setItem('tc-lite', on ? '1' : ''); } catch (e) {}
    try { document.cookie = 'tc-lite=' + (on ? '1' : '0') + '; path=/; max-age=31536000; SameSite=Lax'; } catch (e) {}
    try { document.cookie = 'oa-theme=' + (on ? 'light' : 'dark') + '; path=/; max-age=31536000; SameSite=Lax'; } catch (e) {}
  }
  function readLite() {
    try { const v = localStorage.getItem('tc-lite'); if (v !== null && v !== '') return v; } catch (e) {}
    try { const v = sessionStorage.getItem('tc-lite'); if (v) return v; } catch (e) {}
    try { const m = document.cookie.match(/(?:^|;\s*)tc-lite=([^;]*)/); if (m && m[1]) return m[1]; } catch (e) {}
    return document.documentElement.classList.contains('light') ? '1' : '';
  }
  window.toggleLite = function () {
    const on = document.body.classList.toggle('light');
    document.documentElement.classList.toggle('light', on);
    writeLite(on);
    setFaviconLite(on);
  };
  if (readLite() === '1') {
    document.body.classList.add('light');
    document.documentElement.classList.add('light');
    setFaviconLite(true);
  }

  /* ---------- plain-beauty motion ---------- */
  try {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      }), { threshold: 0.08 });
      document.querySelectorAll('section, .prod, .card, .glass, .slider').forEach(el => {
        el.classList.add('reveal'); io.observe(el);
      });
    }
  } catch (e) {}

  /* ---------- instant navigation: prefetch on intent ---------- */
  const cache = new Map();
  function prefetch(url) {
    if (cache.has(url) || cache.size > 24) return;
    try { cache.set(url, fetch(url, { priority: 'low' }).then(r => r.text()).catch(() => '')); } catch (e) {}
  }
  document.addEventListener('mouseover', e => {
    const a = e.target.closest && e.target.closest('a[href$=".html"]');
    if (a && !a.target) prefetch(a.getAttribute('href'));
  }, { passive: true });
  document.addEventListener('touchstart', e => {
    const a = e.target.closest && e.target.closest('a[href$=".html"]');
    if (a && !a.target) prefetch(a.getAttribute('href'));
  }, { passive: true });
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href$=".html"]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    (cache.get(href) || Promise.resolve('')).catch(() => '');
    setTimeout(() => { location.href = href; }, 90);
  }, { passive: false });

  /* ---------- the download counter (any page with [data-dl]) ---------- */
  (async function dlCount() {
    const els = document.querySelectorAll('[data-dl]');
    if (!els.length) return;
    try {
      let v = null, t = 0;
      try { v = localStorage.getItem('tc-dl-count'); t = parseInt(localStorage.getItem('tc-dl-ts') || '0', 10); } catch (e) {}
      if (!v || Date.now() - t > 1800000) {
        const r = await fetch('https://api.github.com/repos/oroboroslabs-ai/totalcontrol-core-harness/releases/latest');
        const d = await r.json();
        const a = (d.assets || []).find(x => /TotalControl-Free-Core.*\.zip/i.test(x.name || ''));
        if (a) {
          v = a.download_count;
          try { localStorage.setItem('tc-dl-count', v); localStorage.setItem('tc-dl-ts', String(Date.now())); } catch (e) {}
        }
      }
      if (v != null) els.forEach(el => { el.textContent = Number(v).toLocaleString() + ' downloads'; el.style.display = 'inline-flex'; });
    } catch (e) {}
  })();

  /* ---------- the cover slider (if present) ---------- */
  const slides = document.querySelectorAll('.sslide');
  if (slides.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const dots = document.getElementById('sdots');
    if (dots) {
      slides.forEach((_, i) => { const d = document.createElement('i'); if (!i) d.classList.add('on'); d.onclick = () => show(i); dots.appendChild(d); });
      let cur = 0, timer = null;
      const show = i => { slides[cur].classList.remove('on'); dots.children[cur].classList.remove('on'); cur = i % slides.length; slides[cur].classList.add('on'); dots.children[cur].classList.add('on'); restart(); };
      const next = () => show(cur + 1);
      const restart = () => { if (timer) clearInterval(timer); timer = setInterval(next, 5200); };
      const nx = document.getElementById('snext'), pv = document.getElementById('sprev');
      if (nx) nx.onclick = next;
      if (pv) pv.onclick = () => show((cur || slides.length) - 1);
      restart();
    }
  }
})();