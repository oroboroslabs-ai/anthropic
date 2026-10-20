document.documentElement.classList.add('js');

/* Theme: the same tc-lite key as the main /anthropic site. */
function readLite() {
  try {
    var v = localStorage.getItem('tc-lite');
    if (v !== null && v !== '') return v;
  } catch (e) {}
  try {
    var s = sessionStorage.getItem('tc-lite');
    if (s) return s;
  } catch (e) {}
  try {
    var m = document.cookie.match(/(?:^|;\s*)tc-lite=([^;]*)/);
    if (m && m[1]) return m[1];
  } catch (e) {}
  return document.documentElement.classList.contains('light') ? '1' : '';
}

function writeLite(on) {
  try { localStorage.setItem('tc-lite', on ? '1' : ''); } catch (e) {}
  try { sessionStorage.setItem('tc-lite', on ? '1' : ''); } catch (e) {}
  try { document.cookie = 'tc-lite=' + (on ? '1' : '0') + '; path=/; max-age=31536000; SameSite=Lax'; } catch (e) {}
}

function syncLiteButton(on) {
  var button = document.getElementById('lite-toggle');
  if (button) {
    button.textContent = on ? 'DARK' : 'LITE';
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
    button.setAttribute('aria-label', on ? 'Switch to dark mode' : 'Switch to light mode');
  }
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', on ? '#ffffff' : '#111111');
}

function applyLite(on) {
  document.documentElement.classList.toggle('light', on);
  document.body.classList.toggle('light', on);
  syncLiteButton(on);
}

window.toggleLite = function () {
  var on = !document.documentElement.classList.contains('light');
  applyLite(on);
  writeLite(on);
};

applyLite(readLite() === '1' || document.documentElement.classList.contains('light'));

/* Checkout dialog fallback (kept for any legacy data-checkout link). */
var dialog = document.getElementById('checkout-dialog');
document.querySelectorAll('[data-checkout]').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  });
});
if (dialog) {
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
}

var nav = document.getElementById('nav');
if (nav) {
  var onScroll = function () {
    nav.classList.toggle('scrolled', window.scrollY > 14);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

var year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

var reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { observer.observe(el); });
  setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }, 2400);
} else {
  reveals.forEach(function (el) { el.classList.add('in'); });
}
