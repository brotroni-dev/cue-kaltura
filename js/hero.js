/* Hero background: a rising pastel chart with the team riding on it (people + numbers).
   Color comes only from the graphs and the people photos. */
(function () {
  var W = 1440, H = 440;
  var host = document.querySelector('.shell-hero-bg');
  if (!host) return;

  var STOPS = '<stop offset="0" stop-color="#f2a6a0"/><stop offset=".5" stop-color="#a9b9f2"/><stop offset="1" stop-color="#8fd3a2"/>';
  var PERSON = { kofi: '#e34948', sam: '#2a78d6', lucia: '#eb6834', dana: '#1baf7a' };

  function smooth(pts) {
    var d = 'M' + pts[0][0] + ',' + pts[0][1].toFixed(1);
    for (var k = 0; k < pts.length - 1; k++) {
      var p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ',' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ',' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' +
        p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }
  function defs() {
    return '<defs>' +
      '<linearGradient id="hz" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + W + '" y2="0">' + STOPS + '</linearGradient>' +
      '<linearGradient id="fadeV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".15"/></linearGradient>' +
      '<mask id="areaMask"><rect width="' + W + '" height="' + H + '" fill="url(#fadeV)"/></mask>' +
    '</defs>';
  }

  function line() {
    var V = [56, 78, 66, 104, 92, 136, 120, 170, 156, 204, 228, 214, 262, 290, 278, 328];
    var step = W / (V.length - 1);
    var pts = V.map(function (v, i) { return [i * step, H - v]; });
    var d = smooth(pts);
    var out = '<svg class="hero hero--line" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax meet" aria-hidden="true">' + defs() +
      '<path class="hero-area" d="' + d + ' L' + W + ',' + H + ' L0,' + H + ' Z" fill="url(#hz)" mask="url(#areaMask)"/>' +
      '<path class="hero-stroke" d="' + d + '" pathLength="1" fill="none" stroke="url(#hz)" stroke-width="2.5" stroke-linecap="round"/>';
    pts.forEach(function (p, i) {
      if (i === 0 || i === pts.length - 1) return;
      out += '<circle class="hero-dot" style="--i:' + i + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4.5" fill="#fff" stroke="url(#hz)" stroke-width="2.5"/>';
    });
    /* The team rides the line */
    [['kofi', 3], ['sam', 7], ['lucia', 10], ['dana', 14]].forEach(function (a, k) {
      var p = pts[a[1]], r = 24;
      out += '<g class="hero-person" style="--i:' + k + '">' +
        '<clipPath id="cp-' + a[0] + '"><circle cx="' + p[0].toFixed(1) + '" cy="' + (p[1] - 40).toFixed(1) + '" r="' + r + '"/></clipPath>' +
        '<line x1="' + p[0].toFixed(1) + '" x2="' + p[0].toFixed(1) + '" y1="' + (p[1] - 14).toFixed(1) + '" y2="' + (p[1] - 6).toFixed(1) + '" stroke="#c9c8c2" stroke-width="1.5"/>' +
        '<circle cx="' + p[0].toFixed(1) + '" cy="' + (p[1] - 40).toFixed(1) + '" r="' + (r + 4) + '" fill="#fff" stroke="' + PERSON[a[0]] + '" stroke-width="2"/>' +
        '<image href="assets/people/' + a[0] + '.jpg" x="' + (p[0] - r).toFixed(1) + '" y="' + (p[1] - 40 - r).toFixed(1) + '" width="' + r * 2 + '" height="' + r * 2 + '" clip-path="url(#cp-' + a[0] + ')" preserveAspectRatio="xMidYMid slice"/>' +
      '</g>';
    });
    return out + '</svg>';
  }

  host.innerHTML = line();
})();
