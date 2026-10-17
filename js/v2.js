/* Version 2 of the page (v2.html): four framed slides on one scroll.
   1. The nav marks the slide you are reading.
   2. Present mode: one slide at a time, scaled to the screen, with its own small bar.
   3. Links into the prototype remember where you came from. */
(function () {
  var html = document.documentElement;
  var IDS = ['problem', 'focus', 'solution', 'success'];
  var slides = IDS.map(function (id) { return document.getElementById(id); });
  if (slides.some(function (s) { return !s; })) return;

  /* ---------- 1. nav ---------- */
  var links = {};
  document.querySelectorAll('.shell-links a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var seen = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen.set(e.target, e.isIntersecting); });
      var current = null;
      slides.forEach(function (s) { if (!current && seen.get(s)) current = s.id; });
      Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
      if (current && links[current]) links[current].setAttribute('aria-current', 'true');
    }, { rootMargin: '-40% 0px -55% 0px' });
    slides.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 1b. pictures that appear: play when they come into view, again each time they come back ---------- */
  var appear = [].slice.call(document.querySelectorAll('[data-appear]'));
  /* the call on slide 2: mark the bars before 4:12 as played, and when the playhead reaches each one */
  [].forEach.call(document.querySelectorAll('.call'), function (call) {
    var x = parseFloat(getComputedStyle(call).getPropertyValue('--x')) / 100 || 0.3;
    var bars = call.querySelectorAll('.call-wave i');
    [].forEach.call(bars, function (bar, k) {
      var p = k / (bars.length - 1);
      if (p < x && !bar.classList.contains('is-moment')) { bar.classList.add('is-played'); bar.style.setProperty('--p', (p / x).toFixed(3)); }
    });
  });
  html.classList.add('can-animate');
  function replay(el) { el.classList.remove('is-in'); void el.offsetWidth; el.classList.add('is-in'); }
  if ('IntersectionObserver' in window) {
    var seenAppear = new IntersectionObserver(function (entries) {
      if (html.classList.contains('is-presenting')) return;
      entries.forEach(function (e) {
        if (e.intersectionRatio >= 0.35 && !e.target.classList.contains('is-in')) e.target.classList.add('is-in');
        else if (!e.isIntersecting) e.target.classList.remove('is-in');
      });
    }, { threshold: [0, 0.35] });
    appear.forEach(function (el) { seenAppear.observe(el); });
  } else {
    appear.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 2. Present mode ---------- */
  var current = 0;
  var count = document.querySelector('[data-present-count]');
  var returnY = 0;

  function scaleToFit() {
    var s = Math.min((window.innerWidth - 48) / 1440, (window.innerHeight - 96) / 810);
    html.style.setProperty('--present-scale', String(Math.max(0.3, s)));
  }
  function show(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, k) {
      var on = k === current;
      s.classList.toggle('is-shown', on);
      s.setAttribute('aria-hidden', String(!on));
    });
    /* in Present mode, a slide's picture plays each time the slide is shown */
    slides.forEach(function (s, k) { s.querySelectorAll('[data-appear]').forEach(function (el) { if (k === current) replay(el); else el.classList.remove('is-in'); }); });
    if (count) count.textContent = (current + 1) + ' / ' + slides.length;
    document.querySelectorAll('[data-present-go="-1"]').forEach(function (b) { b.disabled = current === 0; });
    document.querySelectorAll('[data-present-go="1"]').forEach(function (b) { b.disabled = current === slides.length - 1; });
    /* the prototype comes after the slides: its button shows on the last one */
    document.querySelectorAll('[data-present-proto]').forEach(function (b) { b.hidden = current !== slides.length - 1; });
  }
  function present(i) {
    returnY = window.scrollY;
    html.classList.add('is-presenting');
    scaleToFit();
    show(i || 0);
  }
  function stop() {
    html.classList.remove('is-presenting');
    appear.forEach(function (el) { el.classList.add('is-in'); });
    slides.forEach(function (s) { s.classList.remove('is-shown'); s.removeAttribute('aria-hidden'); });
    /* back to the slide you ended on */
    var target = slides[current];
    window.scrollTo({ top: target ? target.getBoundingClientRect().top + window.scrollY - 64 : returnY, behavior: 'instant' });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-present],[data-present-go],[data-present-exit],[data-proto-link]');
    if (!t) return;
    if (t.hasAttribute('data-present')) { present(nearestSlide()); return; }
    if (t.hasAttribute('data-present-go')) { show(current + +t.getAttribute('data-present-go')); return; }
    if (t.hasAttribute('data-present-exit')) { stop(); return; }
    /* ---------- 3. into the prototype: come back to the same place ---------- */
    if (t.hasAttribute('data-proto-link') && html.classList.contains('is-presenting')) {
      var href = t.getAttribute('href');
      var hash = href.indexOf('#') >= 0 ? href.slice(href.indexOf('#')) : '';
      t.setAttribute('href', 'prototype.html?return=present&slide=' + (current + 1) + hash);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (!html.classList.contains('is-presenting') || e.altKey || e.ctrlKey || e.metaKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); show(current + 1); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); show(current - 1); }
    else if (k === 'Home') { e.preventDefault(); show(0); }
    else if (k === 'End') { e.preventDefault(); show(slides.length - 1); }
    else if (k === 'Escape') { e.preventDefault(); stop(); }
  });
  window.addEventListener('resize', function () { if (html.classList.contains('is-presenting')) scaleToFit(); });

  function nearestSlide() {
    var best = 0, bestD = Infinity;
    slides.forEach(function (s, k) {
      var d = Math.abs(s.getBoundingClientRect().top - 80);
      if (d < bestD) { bestD = d; best = k; }
    });
    return window.scrollY < slides[0].getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5 ? 0 : best;
  }

  /* v2.html?present=3 opens Present mode on slide 3 (used when coming back from the prototype).
     While the Present button is hidden, the link opens the normal page instead */
  var presentBtn = document.querySelector('[data-present]');
  var start = presentBtn && presentBtn.hidden ? NaN : parseInt(new URLSearchParams(location.search).get('present'), 10);
  if (start >= 1 && start <= slides.length) present(start - 1);
  window.cueV2 = { present: present, stop: stop, show: show };
})();
