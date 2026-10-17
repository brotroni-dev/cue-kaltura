/* Small inline SVG charts for Cue.
   Rules (from the dataviz method): 2px lines, dots of 8px or more with a 2px paper ring,
   soft area wash, hairline grid, one axis, text in ink tokens (never in the data color),
   a legend whenever there are two series, and a hover layer on every plot. */
(function () {
  function smooth(pts) {
    /* Catmull-Rom to Bezier, same math as the Tastewise chart */
    var d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for (var k = 0; k < pts.length - 1; k++) {
      var p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ',' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ',' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' +
        p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }

  /* Sparkline for a stat: one pastel series colored by direction (up, down, calm).
     One series, so no legend; the stat label names it. */
  function spark(values, label, tone) {
    var w = 96, h = 36, pad = 5;
    var min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    var span = max - min || 1;
    var pts = values.map(function (v, i) {
      return [pad + i * (w - pad * 2) / (values.length - 1), h - pad - (v - min) / span * (h - pad * 2)];
    });
    var last = pts[pts.length - 1];
    return '<svg class="cue-spark cue-spark--' + (tone || 'calm') + '" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + label + '">' +
      '<path class="line" d="' + smooth(pts) + '" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1;animation:cue-draw 1.2s var(--ease-out) .3s forwards"/>' +
      '<circle cx="' + last[0].toFixed(1) + '" cy="' + last[1].toFixed(1) + '" r="4"/>' +
      '</svg>';
  }

  /* Area chart with two series: focus (ink, gradient wash, dots) and base (gray) */
  function area(cfg) {
    var w = cfg.w || 300, h = cfg.h || 150;
    var L = 26, R = 34, T = 18, B = 20;
    var yMin = cfg.yMin, yMax = cfg.yMax;
    var n = cfg.x.length;
    var X = function (i) { return L + i * (w - L - R) / (n - 1); };
    var Y = function (v) { return T + (1 - (v - yMin) / (yMax - yMin)) * (h - T - B); };
    var id = cfg.id;
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + cfg.label + '">' +
      '<defs><linearGradient id="' + id + '-wash" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" style="stop-color:var(--viz-up);stop-opacity:.45"/><stop offset="1" style="stop-color:var(--viz-up);stop-opacity:0"/></linearGradient></defs>';

    cfg.ticks.forEach(function (t) {
      out += '<line class="grid" x1="' + L + '" x2="' + (w - R + 6) + '" y1="' + Y(t).toFixed(1) + '" y2="' + Y(t).toFixed(1) + '"/>' +
        '<text x="' + (L - 6) + '" y="' + (Y(t) + 3).toFixed(1) + '" text-anchor="end">' + t + cfg.unit + '</text>';
    });
    out += '<line class="grid base" x1="' + L + '" x2="' + (w - R + 6) + '" y1="' + (h - B) + '" y2="' + (h - B) + '"/>';

    cfg.x.forEach(function (lab, i) {
      if (lab) out += '<text x="' + X(i).toFixed(1) + '" y="' + (h - 6) + '" text-anchor="middle">' + lab + '</text>';
    });

    /* One marker, or several (like teams joining over time) */
    (cfg.markers || (cfg.marker ? [cfg.marker] : [])).forEach(function (m) {
      var mx = X(m.i).toFixed(1);
      out += '<line class="marker" x1="' + mx + '" x2="' + mx + '" y1="' + (T - 6) + '" y2="' + (h - B) + '"/>' +
        '<text class="marker-text" x="' + (+mx + 4) + '" y="' + (T - 1) + '">' + m.text + '</text>';
    });

    var series = cfg.series.map(function (s) {
      var pts = s.values.map(function (v, i) { return [X(i), Y(v)]; });
      return { s: s, pts: pts, d: smooth(pts) };
    });

    /* base first, focus on top */
    series.slice().reverse().forEach(function (o) {
      var kind = o.s.kind;
      var last = o.pts[o.pts.length - 1];
      if (kind === 'focus') {
        out += '<path class="area" d="' + o.d + ' L' + last[0].toFixed(1) + ',' + (h - B) + ' L' + o.pts[0][0].toFixed(1) + ',' + (h - B) + ' Z" fill="url(#' + id + '-wash)"/>';
      }
      out += '<path class="line draw is-' + kind + '" pathLength="1" d="' + o.d + '"/>';
      o.pts.forEach(function (p, i) {
        if (kind === 'focus' || i === o.pts.length - 1) {
          out += '<circle class="dot is-' + kind + '" style="--i:' + i + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (i === o.pts.length - 1 ? 4.5 : 3.5) + '"/>';
        }
      });
      out += '<text class="end-label' + (kind === 'base' ? ' is-base' : '') + '" x="' + (last[0] + 9).toFixed(1) + '" y="' + (last[1] + 4).toFixed(1) + '">' + o.s.values[o.s.values.length - 1] + cfg.unit + '</text>';
    });

    /* Hover layer: one hit column per point, a crosshair, and a shared tooltip */
    var colW = (w - L - R) / (n - 1);
    for (var i = 0; i < n; i++) {
      var x = X(i);
      out += '<rect class="hit" data-chart="' + id + '" data-i="' + i + '" x="' + (x - colW / 2).toFixed(1) + '" y="' + T + '" width="' + colW.toFixed(1) + '" height="' + (h - T - B) + '"/>' +
        '<line class="cross" x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + T + '" y2="' + (h - B) + '"/>';
    }
    out += '</svg>';

    /* Keep what the tooltip needs */
    AREA[id] = { cfg: cfg, w: w, h: h, X: X, Y: Y };
    return '<div class="cue-chart" data-chart-root="' + id + '">' + out + '<div class="cue-tip" role="status"></div></div>';
  }

  var AREA = {};

  function bindTips(root) {
    root.addEventListener('mouseover', function (e) {
      var hit = e.target.closest && e.target.closest('.hit');
      if (!hit) return;
      var id = hit.getAttribute('data-chart');
      var i = +hit.getAttribute('data-i');
      var A = AREA[id];
      var wrap = root.querySelector('[data-chart-root="' + id + '"]');
      if (!A || !wrap) return;
      var tip = wrap.querySelector('.cue-tip');
      var top = Math.min.apply(null, A.cfg.series.map(function (s) { return A.Y(s.values[i]); }));
      var html = '<b>' + A.cfg.tipX[i] + '</b>';
      A.cfg.series.forEach(function (s) {
        html += '<br><i style="background:' + (s.kind === 'focus' ? 'var(--viz-up)' : '#b5b4ac') + '"></i>' + s.name + ': <b>' + s.values[i] + A.cfg.unit + '</b>';
      });
      tip.innerHTML = html;
      tip.style.left = (A.X(i) / A.w * 100) + '%';
      tip.style.top = (top / A.h * 100) + '%';
      tip.classList.add('is-on');
    });
    root.addEventListener('mouseout', function (e) {
      var hit = e.target.closest && e.target.closest('.hit');
      if (!hit) return;
      var wrap = root.querySelector('[data-chart-root="' + hit.getAttribute('data-chart') + '"]');
      if (wrap) wrap.querySelector('.cue-tip').classList.remove('is-on');
    });
  }

  window.CueCharts = { spark: spark, area: area, bindTips: bindTips };
})();
