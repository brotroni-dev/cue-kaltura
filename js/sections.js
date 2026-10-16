/* The thread: a thin pastel line in the left margin that draws as you scroll, with a dot
   at each section. Its color moves from soft red (Problem) to green (Results), the story
   of going from losing deals to winning them. Colors come from the graph palette. */
(function () {
  var main = document.getElementById('top');
  var IDS = ['problem', 'insight', 'solution', 'results'];
  var COLORS = ['#f2a6a0', '#b8b3f0', '#8fd3d8', '#8fd3a2'];
  var sections = IDS.map(function (id) { return document.getElementById(id); });
  if (!main || sections.some(function (s) { return !s; })) return;

  /* ---------- thread ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'shell-thread');
  svg.setAttribute('aria-hidden', 'true');
  main.insertBefore(svg, main.firstChild);
  var geo = null;

  function layoutThread() {
    var mainTop = main.getBoundingClientRect().top + window.scrollY;
    var wrap = document.querySelector('.shell-section .shell-wrap');
    var x = wrap ? Math.round(wrap.getBoundingClientRect().left + 22) : 24;
    var cover = document.querySelector('.shell-cover');
    var y0 = cover.getBoundingClientRect().bottom + window.scrollY - mainTop - 40;
    var dots = sections.map(function (s) {
      var label = s.querySelector('.shell-label');
      var r = label.getBoundingClientRect();
      return r.top + window.scrollY - mainTop + r.height / 2;
    });
    var last = sections[3].getBoundingClientRect().bottom + window.scrollY - mainTop - 40;
    var h = main.offsetHeight;
    svg.setAttribute('width', String(x + 12));
    svg.setAttribute('height', String(h));
    svg.setAttribute('viewBox', '0 0 ' + (x + 12) + ' ' + h);
    var span = last - y0;
    var stops = '<stop offset="0" stop-color="' + COLORS[0] + '" stop-opacity="0"/>' +
      dots.map(function (d, i) { return '<stop offset="' + ((d - y0) / span).toFixed(3) + '" stop-color="' + COLORS[i] + '"/>'; }).join('') +
      '<stop offset="1" stop-color="' + COLORS[3] + '" stop-opacity="0"/>';
    svg.innerHTML =
      '<defs><linearGradient id="thread-grad" gradientUnits="userSpaceOnUse" x1="0" y1="' + y0 + '" x2="0" y2="' + last + '">' + stops + '</linearGradient></defs>' +
      '<line class="shell-thread-ghost" x1="' + x + '" x2="' + x + '" y1="' + y0 + '" y2="' + last + '"/>' +
      '<line class="shell-thread-line" pathLength="1" x1="' + x + '" x2="' + x + '" y1="' + y0 + '" y2="' + last + '" stroke="url(#thread-grad)"/>' +
      dots.map(function (d, i) {
        return '<circle class="shell-thread-dot" data-i="' + i + '" cx="' + x + '" cy="' + d.toFixed(1) + '" r="6" fill="' + COLORS[i] + '"/>';
      }).join('');
    geo = { top: mainTop, y0: y0, last: last, dots: dots };
  }
  function drawThread() {
    if (!geo) return;
    var reach = window.scrollY + window.innerHeight * 0.62 - geo.top;
    var p = Math.max(0, Math.min(1, (reach - geo.y0) / (geo.last - geo.y0)));
    var line = svg.querySelector('.shell-thread-line');
    if (line) line.style.strokeDashoffset = String(1 - p);
    svg.querySelectorAll('.shell-thread-dot').forEach(function (c) {
      c.classList.toggle('is-on', geo.dots[+c.getAttribute('data-i')] < reach);
    });
  }

  function update() { drawThread(); }
  function relayout() { layoutThread(); update(); }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', relayout);
  window.addEventListener('load', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

  window.cueSections = { relayout: relayout };
  setTimeout(relayout, 30);
})();
