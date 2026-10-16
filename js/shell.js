/* Shell behavior: the nav marks the section you are reading.
   The stage and its caption count as part of Solution. */
(function () {
  var links = document.querySelectorAll('.shell-links a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var parts = [];
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) parts.push([el, id]);
  });
  var stage = document.querySelector('.shell-stage');
  var caption = document.querySelector('.shell-caption');
  if (stage) parts.push([stage, 'solution']);
  if (caption) parts.push([caption, 'solution']);
  if (!('IntersectionObserver' in window) || !parts.length) return;

  var seen = new Map();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { seen.set(e.target, e.isIntersecting); });
    var current = null;
    parts.forEach(function (p) { if (!current && seen.get(p[0])) current = p[1]; });
    links.forEach(function (a) { a.removeAttribute('aria-current'); });
    if (current) map[current].setAttribute('aria-current', 'true');
  }, { rootMargin: '-40% 0px -55% 0px' });
  parts.forEach(function (p) { io.observe(p[0]); });
})();
