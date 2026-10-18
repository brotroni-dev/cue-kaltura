/* Cue prototype. Same pattern as the Tastewise prototype:
   one STATES list, render(), go(), and one delegated click router on data-* attributes.
   Rule of every screen: show little by default, reveal detail on hover. */
(function () {
  var ic = window.CueIcons.ic;
  var MARK = window.CueIcons.MARK;
  var C = window.CueCharts;

  /* People. Color = their photo's background, snapped to the chart palette (see tokens.css) */
  var P = {
    noa: { name: 'Noa Levin', first: 'Noa', role: 'Sales team lead' },
    dana: { name: 'Dana', full: 'Dana Brooks' },
    sam: { name: 'Sam', full: 'Sam Rivera', role: 'Account executive' },
    lucia: { name: 'Lucia', full: 'Lucia Moreno' },
    omar: { name: 'Daniel', full: 'Daniel Shaw', role: 'Account executive' },
    theo: { name: 'Theo', full: 'Theo Walsh' },
    kofi: { name: 'Kofi', full: 'Kofi Mensah' },
    hana: { name: 'Hana', full: 'Hana Weiss' },
    mark: { name: 'Mark Ellis' },
    claire: { name: 'Claire Novak' },
    elias: { name: 'Elias Haddad' },
    grace: { name: 'Grace Lin' },
    ira: { name: 'Ira', full: 'Ira Klein', role: 'Head of enablement' }
  };
  var TEAM = ['dana', 'sam', 'lucia', 'omar', 'theo', 'kofi', 'hana'];

  /* Full names wherever a name labels a person (rows, lists, headers). Sentences use first names */
  function fullName(id) { return P[id].full || P[id].name; }
  function ava(id, size) {
    return '<img class="cue-avatar' + (size ? ' cue-avatar--' + size : '') + '" src="assets/people/' + id + '.jpg" alt="' + P[id].name.split(' ')[0] + '" data-component="Avatar">';
  }
  function avas(ids) {
    return '<span class="cue-avatars">' + ids.map(function (id) { return ava(id, 'sm'); }).join('') + '</span>';
  }
  function delta(dir, text) {
    return '<span class="cue-delta cue-delta--' + dir + '" data-component="Delta/' + dir + '">' + ic(dir) + text + '</span>';
  }

  /* Home data */
  var STATS = [
    { label: 'Sold this quarter', value: '$1.73M', small: 'of $2.4M', tone: 'up',
      tip: '72% of goal, 3 weeks left', spark: [52, 61, 58, 70, 66, 81, 77, 90, 86, 98, 104, 112] },
    { label: 'Win rate', value: '24%', delta: ['down', '3'], tone: 'down',
      tip: 'Down from 27% in September', spark: [28, 29, 27, 28, 27, 26, 27, 25, 26, 24, 25, 24] },
    { label: 'Open deals', value: '$3.1M', small: '38 deals', tone: 'calm',
      tip: '9 deals are about to talk price', spark: [31, 33, 34, 32, 35, 36, 35, 37, 36, 38, 37, 38] }
  ];

  var INSIGHTS = [
    { people: ['sam', 'lucia', 'omar', 'theo'], tag: 'Pricing',
      num: '$420K', unit: 'at risk',
      title: '4 people lose deals when price comes up',
      tone: 'down',
      essence: 'They offer a discount before the buyer hears the value.',
      detail: 'That’s why 58% of their deals are lost at price, twice the rest of the team. 9 deals worth $420K reach that talk in the next two weeks.',
      btn: 'Build practice', btnIcon: 'sparkle', go: 2, why: 1 },
    { people: ['kofi', 'hana'], tag: 'New people',
      num: '$260K', unit: 'stuck',
      title: 'First calls end too early',
      tone: 'calm',
      essence: 'They hang up before the buyer shares a real need.',
      detail: 'Kofi and Hana end first calls at 14 minutes. The top 3 stay 32, long enough to find it. $260K is stuck after call one.',
      btn: 'Build practice', btnIcon: 'sparkle', toast: 'Would draft a first-call practice for Kofi and Hana. This walkthrough follows the pricing one.' },
    { people: ['dana'], tag: 'Worth sharing', good: true,
      num: '2x', unit: 'bigger deals',
      title: 'Dana brings more buyers into each deal',
      tone: 'up',
      essence: 'Dana brings finance and IT in early, so no one blocks the deal later.',
      detail: '5 buyers join her deals, against 2 for the team. Her deals close twice as big.',
      btn: 'Share Dana’s call', btnIcon: 'share', toast: 'Would share a 40 second clip of Dana’s call with the team.' }
  ];

  var SKILLS = [
    { name: 'Asking good questions', change: 12, s: { dana: 88, sam: 72, lucia: 64, omar: 66, theo: 70, kofi: 58, hana: 52 } },
    { name: 'Talking value before price', change: -6, s: { dana: 79, sam: 34, lucia: 38, omar: 36, theo: 31, kofi: 48, hana: 45 } },
    { name: 'Handling “too expensive”', change: -4, s: { dana: 74, sam: 30, lucia: 36, omar: 33, theo: 28, kofi: 42, hana: 40 } },
    { name: 'Setting a clear next step', change: 3, s: { dana: 90, sam: 78, lucia: 72, omar: 70, theo: 76, kofi: 68, hana: 64 } },
    { name: 'Bringing more people in', change: 0, s: { dana: 92, sam: 44, lucia: 50, omar: 48, theo: 46, kofi: 38, hana: 40 } }
  ];
  SKILLS.forEach(function (k) {
    var sum = 0; TEAM.forEach(function (id) { sum += k.s[id]; });
    k.score = Math.round(sum / TEAM.length);
  });

  var ui = { step: 0, toastTimer: null, autoTimer: null, callTimer: null, clockTimer: null };
  if (/[?&]capture/.test(location.search)) document.documentElement.setAttribute('data-capture', '');

  /* Views */
  function side(active, who) {
    active = active || 'home';
    who = who || 'noa';
    var me = P[who];
    return '<aside class="cue-side" data-component="Sidebar">' +
      '<div class="cue-logo">' + MARK + '<b>Cue</b></div>' +
      '<nav class="cue-nav" aria-label="Main">' +
        navItem('home', 'Home', active === 'home') +
        (who === 'noa' ? navItem('team', 'Team', active === 'team') : '') +
        navItem('practice', 'Practice', active === 'practice', who === 'noa' ? '1' : '') +
        navItem('results', who === 'sam' ? 'Progress' : 'Impact', active === 'results') +
        navItem('library', 'Library', active === 'library') +
      '</nav>' +
      '<div class="cue-me" data-component="Profile" data-toast="Profile and settings are not part of this walkthrough.">' + ava(who, 'md') +
        '<div class="cue-me-text"><b>' + (me.full || me.name) + '</b><span>' + me.role + '</span></div></div>' +
    '</aside>';
  }
  function navItem(icon, label, active, count) {
    return '<a class="cue-nav-item' + (active ? ' is-active' : '') + '" data-component="Nav item' + (active ? '/Active' : '') + '"' +
      (active ? ' aria-current="page"' : (icon === 'home' ? ' data-go="0"' : ' data-toast="' + (label === 'Impact' ? 'Impact across all your practices, to compare them. Not part of this walkthrough.' : label + ' is not part of this walkthrough.') + '"')) + '>' +
      ic(icon) + '<span>' + label + '</span>' + (count ? '<span class="cue-nav-count">' + count + '</span>' : '') + '</a>';
  }

  function stat(s, i) {
    return '<div class="cue-stat cue-rise" style="--i:' + i + '" data-tip="' + s.tip + '" data-component="Stat">' +
      '<div class="cue-stat-text"><span class="cue-stat-label">' + s.label + '</span>' +
        '<span class="cue-stat-value">' + s.value + (s.delta ? delta(s.delta[0], s.delta[1]) : '') + (s.small ? '<small>' + s.small + '</small>' : '') + '</span></div>' +
      C.spark(s.spark, s.label + ', last 12 weeks', s.tone) +
    '</div>';
  }

  function insight(o, i) {
    return '<article class="cue-insight cue-rise" style="--i:' + (i + 3) + ';--tone:var(--viz-' + o.tone + ')" tabindex="0" data-component="Insight card">' +
      '<div class="cue-insight-top">' + avas(o.people) + '<span class="cue-insight-tag">' + o.tag + '</span></div>' +
      '<div class="cue-insight-stack">' +
        '<div class="cue-insight-num">' + o.num + '<small>' + o.unit + '</small></div>' +
        '<h3>' + o.title + '</h3>' +
      '</div>' +
      /* On hover: the whole card turns its color and tells the essence of the insight. The buttons stay */
      '<div class="cue-insight-face">' +
        '<p class="cue-insight-essence">' + o.essence + '</p>' +
        '<p class="cue-insight-detail">' + o.detail + '</p>' +
      '</div>' +
      '<div class="cue-insight-actions">' +
        '<button class="cue-btn' + (o.good ? ' cue-btn--secondary' : '') + '" data-component="Button/' + (o.good ? 'Secondary' : 'Primary') + '" ' +
          (o.go !== undefined ? 'data-go="' + o.go + '"' : 'data-toast="' + o.toast + '"') + '>' + ic(o.btnIcon) + o.btn + '</button>' +
        '<button class="cue-link" ' + (o.why !== undefined ? 'data-go="' + o.why + '" data-hint' : 'data-toast="This insight opens the same way as the first one."') + '>Why' + ic('arrowRight') + '</button>' +
      '</div>' +
    '</article>';
  }

  function skill(k, i) {
    var dir = k.change > 0 ? 'up' : k.change < 0 ? 'down' : 'flat';
    var people = TEAM.map(function (id) {
      return '<img class="cue-skill-person" src="assets/people/' + id + '.jpg" alt="' + fullName(id) + ' ' + k.s[id] + '" title="' + fullName(id) + ' · ' + k.s[id] + '" style="--value:' + k.s[id] + '%;--c:var(--person-' + id + ')" data-toast="' + P[id].name + '’s page is not part of this walkthrough.">';
    }).join('');
    return '<div class="cue-skill cue-rise" style="--i:' + (i + 6) + '" data-component="Skill row">' +
      '<span class="cue-skill-name">' + k.name + '</span>' +
      '<span class="cue-skill-bar"><span class="cue-skill-track"><i class="cue-skill-fill cue-skill-fill--' + dir + '" style="--value:' + k.score + '%;--i:' + i + '"></i></span>' +
        '<span class="cue-skill-people">' + people + '</span></span>' +
      '<span class="cue-skill-score">' + k.score + '</span>' +
      '<span class="cue-skill-end">' + delta(dir, String(Math.abs(k.change))) +
        '<button class="cue-link" data-toast="Would draft a practice for this skill. This walkthrough follows the pricing card.">Practice' + ic('arrowRight') + '</button></span>' +
    '</div>';
  }

  function home() {
    return '<header class="cue-topbar" data-component="Top bar">' +
        '<h1 class="cue-title">Good morning, ' + P.noa.first + '</h1>' +
        '<span class="cue-date">Thu, Oct 16</span>' +
        '<div class="cue-search" data-toast="Ask Cue answers questions about your team. Not part of this walkthrough." data-component="Search">' + ic('sparkle', 'cue-ic--sm') + '<span>Ask Cue</span><kbd>⌘K</kbd></div>' +
        /* The page's main action: build a new practice */
        '<button class="cue-icon-btn cue-icon-btn--primary" aria-label="Build new practice" data-tip="Build new practice" data-toast="Starts a practice from a template or from scratch. This walkthrough begins from the pricing insight." data-component="Icon button/Primary">' + ic('plus') + '</button>' +
        '<button class="cue-icon-btn" aria-label="Notifications" data-toast="Notifications are not part of this walkthrough.">' + ic('bell') + '<span class="cue-dot"></span></button>' +
      '</header>' +
      '<div class="cue-stats" data-component="Stats">' + STATS.map(stat).join('') + '</div>' +
      '<section class="cue-section">' +
        '<div class="cue-section-head"><h2>Worth your time</h2></div>' +
        '<div class="cue-insights">' + INSIGHTS.map(insight).join('') + '</div>' +
      '</section>' +
      '<section class="cue-section" data-component="Skill table">' +
        '<div class="cue-section-head"><h2>Team skills</h2><span>Points out of 100</span></div>' +
        '<div class="cue-skills">' + SKILLS.map(skill).join('') + '</div>' +
      '</section>';
  }

  /* The first time Noa's home opens, the first insight card shows its essence once, like onboarding,
     so it's clear the cards open up. Not again after Back or Start over */
  function homeAfter() {
    if (ui.peeked) return;
    clearTimeout(ui.peekTimer);
    ui.peekTimer = setTimeout(function () {
      var card = main.querySelector('.cue-insight');
      if (ui.step !== 0 || !card || card.matches(':hover')) return;
      ui.peeked = true;
      card.classList.add('is-peek');
      ui.peekTimer = setTimeout(function () { card.classList.remove('is-peek'); }, 1600);
    }, 1400);
  }

  /* Shared bits for inner pages */
  function pagehead(back, backGo, actions) {
    return '<header class="cue-pagebar" data-component="Page bar">' +
      '<button class="cue-back" data-go="' + backGo + '">' + ic('arrowLeft', 'cue-ic--sm') + back + '</button>' +
      '<div class="cue-pagebar-actions">' + (actions || '') + '</div>' +
    '</header>';
  }
  function card(title, body, extra) {
    return '<section class="cue-card" data-component="Card">' +
      '<div class="cue-card-head"><h2>' + title + '</h2>' + (extra || '') + '</div>' + body + '</section>';
  }
  function play(len, label) {
    return '<button class="cue-play" data-play aria-label="Play ' + label + '">' + ic('play', 'cue-ic--sm') +
      '<span class="cue-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="cue-play-len">' + len + '</span></button>';
  }

  /* Screen 2: the insight */
  var STEPS_LOST = [['First call', 14, 12], ['Demo', 21, 18], ['Price', 58, 27]];
  /* Who: deals lost once price came up, and their average discount */
  var WHO = [
    ['sam', '5 of 8', '21%'],
    ['lucia', '6 of 11', '18%'],
    ['omar', '4 of 7', '19%'],
    ['theo', '3 of 5', '22%']
  ];
  var MOMENTS = [
    ['sam', 'Acme Logistics', '4:12', '“We can do 15% off if you sign this month.”'],
    ['lucia', 'Northline Foods', '2:40', 'Offered a discount before the buyer asked.'],
    ['theo', 'Brightline Retail', '1:55', 'Gave the price in the first two minutes.']
  ];
  var DEALS = [
    ['Acme Logistics', 'sam', '$120K', 'Thu, Oct 23'],
    ['Northline Foods', 'lucia', '$90K', 'Mon, Oct 20'],
    ['Brightline Retail', 'theo', '$70K', 'Tue, Oct 21']
  ];

  function insightPage() {
    /* Lost once price comes up: two bars, each labeled, nothing to decode */
    var price = STEPS_LOST[2];
    var chart = '<div class="cue-vs" data-component="Compare bars">' +
        '<div class="cue-vs-row is-focus"><span class="cue-vs-name">These 4</span><span class="cue-vs-bar"><i style="--value:' + price[1] + '%;--i:0"></i></span><b>' + price[1] + '%</b></div>' +
        '<div class="cue-vs-row"><span class="cue-vs-name">Rest of team</span><span class="cue-vs-bar"><i style="--value:' + price[2] + '%;--i:1"></i></span><b>' + price[2] + '%</b></div>' +
      '</div>' +
      '<p class="cue-vs-note">At the first call and the demo, they lose about as many as everyone else.</p>';

    /* The whole insight in a few plain sentences, for a manager who only scans */
    var brief = '<p class="cue-brief">These 4 people lose <b>58%</b> of their deals once price comes up. The rest of your team loses 27%. ' +
      'The reason: they name the price before the buyer sees the value. It happened in <b>9 of 12</b> lost calls. ' +
      '9 open deals worth <b>$420K</b> get to the price talk in the next two weeks.</p>';

    var who = '<div class="cue-who-table" data-component="Who table">' +
      '<div class="cue-who-row cue-who-row--head"><span></span><span>Lost at price</span><span>Avg discount</span></div>' +
      WHO.map(function (w) {
        return '<div class="cue-who-row" data-component="Person row"><span class="cue-who-person">' + ava(w[0], 'sm') + fullName(w[0]) + '</span>' +
          '<b>' + w[1] + '</b><b>' + w[2] + '</b></div>';
      }).join('') + '</div>';

    var why = '<div class="cue-rows">' + MOMENTS.map(function (m) {
        return '<div class="cue-moment" data-component="Call moment">' + ava(m[0], 'sm') +
          '<div class="cue-moment-text"><span>' + fullName(m[0]) + ' · ' + m[1] + ' · ' + m[2] + '</span><b>' + m[3] + '</b></div>' +
          play('0:20', P[m[0]].name + '’s call') + '</div>';
      }).join('') +
      /* The positive turn: what the best person on the team does differently */
      '<div class="cue-moment cue-moment--works" data-component="Call moment/What works">' + ava('dana', 'sm') +
        '<div class="cue-moment-text"><span>' + ic('up', 'cue-ic--xs') + 'What Dana does differently</span><b>Shows what doing nothing costs before saying a price.</b></div>' +
        play('0:40', 'Dana’s call') + '</div>' +
      '</div>';

    var deals = '<div class="cue-rows cue-rows--deals">' + DEALS.map(function (d) {
      return '<div class="cue-row" data-component="Deal row"><span class="cue-row-name"><b>' + d[0] + '</b><span>' + ava(d[1], 'xs') + fullName(d[1]) + ' · price call ' + d[3].split(',')[0] + '</span></span>' +
        '<b class="cue-row-num">' + d[2] + '</b></div>';
    }).join('') + '</div>' +
      '<button class="cue-link" data-toast="The full list of deals is not part of this walkthrough.">6 more deals' + ic('arrowRight') + '</button>';

    return pagehead('Home', 0,
        '<button class="cue-btn cue-btn--secondary" data-toast="Practice is the faster fix here. 1:1s come after the results.">' + ic('calendar') + 'Plan 1:1s</button>' +
        '<button class="cue-btn" data-go="2" data-hint>' + ic('sparkle') + 'Build practice</button>') +
      '<div class="cue-pagehead cue-rise">' +
        '<div class="cue-insight-top">' + avas(['sam', 'lucia', 'omar', 'theo']) + '<span class="cue-insight-tag">Pricing · 4 people</span></div>' +
        '<h1 class="cue-h1">4 people lose deals when price comes up</h1>' +
      '</div>' +
      '<div class="cue-grid cue-rise" style="--i:1">' +
        '<div class="cue-col">' + card('In short', brief) + card('Lost once price comes up', chart) + card('Why', why) + '</div>' +
        '<div class="cue-col cue-col--side">' + card('Who', who) + card('Deals at risk', deals) + '</div>' +
      '</div>';
  }

  /* Screen 3: building */
  var BUILD = ['Reading 12 lost calls', 'Using Ira’s Pricing template', 'Finding Dana’s best moments', 'Writing the buyer'];
  function building() {
    return '<div class="cue-building" data-component="Building">' +
      '<span class="cue-building-mark">' + ic('sparkle') + '</span>' +
      '<h1 class="cue-h1">Building your practice</h1>' +
      '<span class="cue-building-bar"><i></i></span>' +
      '<ul class="cue-checklist">' + BUILD.map(function (t, i) {
        return '<li data-build="' + i + '"><span class="cue-check">' + ic('check', 'cue-ic--sm') + '</span>' + t + '</li>';
      }).join('') + '</ul>' +
    '</div>';
  }
  function buildingAfter() {
    BUILD.forEach(function (t, i) {
      setTimeout(function () {
        var li = main.querySelector('[data-build="' + i + '"]');
        if (li) li.classList.add('is-done');
      }, 450 + i * 650);
    });
  }

  /* Screen 4: the draft */
  var MOODS = {
    friendly: 'Open and curious. Likes the product, but needs a reason to pay more.',
    doubtful: 'Busy and doubtful. Short answers until you earn more.',
    tough: 'Short on time and pushing hard for a discount. Ready to walk away.'
  };
  /* The avatar library: a face, a name, and the voice it comes with */
  var AVATARS = [['mark', 'Mark Ellis', 0], ['claire', 'Claire Novak', 1], ['elias', 'Elias Haddad', 2], ['grace', 'Grace Lin', 3]];
  var VOICES = ['Calm and low', 'Warm and clear', 'Quick and direct', 'Soft and steady'];
  ui.avatar = 'mark';
  ui.voice = 0;
  function av() { return AVATARS.filter(function (a) { return a[0] === ui.avatar; })[0]; }
  function avFirst() { return av()[1].split(' ')[0]; }
  var MOOD_NOTES = { friendly: 'Open, needs a reason to pay more', doubtful: 'Busy, short answers', tough: 'Pushes hard, ready to walk away' };
  function cap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }
  var VOICE_NOTES = ['Slow, few words', 'Friendly, easy to follow', 'Fast, gets to the point', 'Quiet, even pace'];
  var VOICE_BARS = [[40, 60, 50, 65, 45], [45, 80, 100, 80, 45], [95, 35, 100, 30, 85], [40, 45, 40, 45, 40]];
  function voiceGlyph(i) {
    return '<span class="cue-vglyph" aria-hidden="true">' + VOICE_BARS[i].map(function (h) { return '<i style="height:' + h + '%"></i>'; }).join('') + '</span>';
  }
  /* Reference calls: real call snippets reps watch before the practice.
     The creator keeps, removes, finds and adds them */
  var REFS = {
    dana: ['dana', 'Dana Brooks \u00b7 Kestrel Shipping', '0:40', 'Shows what doing nothing costs before the price', 'Dana\u2019s call'],
    dana2: ['dana', 'Dana Brooks \u00b7 Northwind Freight', '1:10', 'Gets the COO into the next call', 'Dana\u2019s call'],
    model: ['ira', 'Model call \u00b7 Pricing template', '2:30', 'By Ira Klein, enablement. From value to price to next step', 'Model call'],
    ben: ['BO', 'Ben Ortiz \u00b7 East team', '0:55', 'Turns \u201ctoo expensive\u201d into a cost per year', 'Ben\u2019s call']
  };
  ui.refs = ['dana'];
  function refFace(r) {
    return r[0].length === 2 ? '<span class="cue-ref-initials">' + r[0] + '</span>' : '<img src="assets/people/' + r[0] + '.jpg" alt="">';
  }
  function refRow(id, on) {
    var r = REFS[id];
    return '<div class="cue-ref"' + (ui.refFlash === id ? ' data-flash' : '') + (on ? '' : ' data-find="' + (r[1] + ' ' + r[3]).toLowerCase().replace(/"/g, '') + '"') + ' data-component="Reference call">' +
      '<button class="cue-ref-play" data-play aria-label="Play ' + r[1] + '">' + refFace(r) +
        '<span class="cue-ref-hover">' + ic('play', 'cue-ic--xs') + '</span>' +
        '<span class="cue-ref-wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>' +
      '<span class="cue-dd-text"><b>' + r[1] + '</b><span>' + r[2] + ' \u00b7 ' + r[3] + '</span></span>' +
      (on ? '<button class="cue-ref-act" data-ref-remove="' + id + '" aria-label="Remove ' + r[1] + '">' + ic('close', 'cue-ic--xs') + '</button>'
          : '<button class="cue-ref-act cue-ref-act--add" data-ref-add="' + id + '">' + ic('plus', 'cue-ic--xs') + 'Add</button>') +
    '</div>';
  }
  function refCalls() {
    var open = ui.dd === 'refs';
    var picked = ui.refs;
    var rest = Object.keys(REFS).filter(function (id) { return picked.indexOf(id) < 0; });
    var faces = [];
    picked.forEach(function (id) { var f = REFS[id][0]; if (f.length > 2 && faces.indexOf(f) < 0) faces.push(f); });
    var value = !picked.length ? 'Add a call' : picked.length === 1 ? REFS[picked[0]][4] : picked.length + ' calls';
    return '<span class="cue-dd' + (open ? ' is-open' : '') + '">' +
      '<button class="cue-meta-item" data-dd="refs" aria-haspopup="dialog" aria-expanded="' + open + '"' + (ui.flash === 'refs' ? ' data-flash' : '') + '>' +
        '<span>Reference calls</span>' + (faces.length ? '<span class="cue-avatars">' + faces.map(function (f) { return ava(f, 'xs'); }).join('') + '</span>' : '') +
        value + ic('chevronDown', 'cue-ic--xs') + '</button>' +
      (open ? '<div class="cue-dd-menu cue-refs' + (ui.ddStill ? ' is-still' : '') + '" role="dialog" aria-label="Reference calls" data-component="Reference calls">' +
        '<p class="cue-refs-label">In this practice<span>Reps watch these before the call</span></p>' +
        (picked.length ? picked.map(function (id) { return refRow(id, true); }).join('') : '<p class="cue-refs-empty">No reference calls yet. Add one below.</p>') +
        '<label class="cue-refs-search">' + ic('search', 'cue-ic--sm') + '<input type="text" data-ref-search placeholder="Find a call, like \u201clate fees\u201d"></label>' +
        (rest.length ? '<p class="cue-refs-label">Suggested<span>Won calls on price, across teams</span></p>' + rest.map(function (id) { return refRow(id, false); }).join('') : '') +
        '<p class="cue-refs-empty" data-ref-none hidden>No calls match.</p>' +
      '</div>' : '') +
    '</span>';
  }

  /* A part: one small editable block, a bold name and its text. Hover shows edit and remove */
  function partHTML(name, text) {
    return '<div class="cue-part" data-component="Part">' +
      '<p class="cue-part-text" contenteditable="true" spellcheck="false"><b>' + name + '</b> ' + text + '</p>' +
      '<span class="cue-part-tools">' + ic('pencil', 'cue-ic--xs') +
        '<button class="cue-part-del" data-remove-part aria-label="Remove this part">' + ic('close', 'cue-ic--xs') + '</button></span>' +
    '</div>';
  }
  function parts(key, list) {
    return '<div class="cue-parts" data-keep="' + key + '">' + kept(key, list.map(function (x) { return partHTML(x[0], x[1]); }).join('')) + '</div>' +
      '<button class="cue-add-part" data-add-part="' + key + '">' + ic('plus', 'cue-ic--xs') + 'Add a part</button>';
  }
  /* Text the manager edits survives re-renders (a dropdown opening redraws the screen) */
  ui.keep = {};
  function kept(key, html) { return ui.keep[key] || html; }
  function saveKeep(el) { ui.keep[el.getAttribute('data-keep')] = el.innerHTML.replace(/ data-flash=""/g, ''); }
  function flashEl(el) { if (!el) return; el.removeAttribute('data-flash'); void el.offsetWidth; el.setAttribute('data-flash', ''); }
  function setMood(m) {
    ui.mood = m;
    if (ui.keep.buyer) ui.keep.buyer = ui.keep.buyer.replace(/(<span data-mood-text[^>]*>)[\s\S]*?(<\/span>)/, '$1' + MOODS[m] + '$2');
  }
  var SCORECARD = [
    ['Asks about the problem first', '“What happens when a shipment is late?”'],
    ['Puts a number on the value', '“So late fees cost you about $80K a year.”'],
    ['Handles “too expensive” without a discount', '“Let’s compare what each option costs you over a year.”'],
    ['Agrees on a next step', '“Can we book 20 minutes with your COO on Tuesday?”']
  ];
  /* Who gets it: each person's next price call (deal, day index in DAYS, time). No deal = no price call this week */
  var WHO_INFO = {
    sam: ['Acme', 5, '11:00'], lucia: ['Northline', 2, '10:00'], omar: ['Pinecrest', 6, '09:30'], theo: ['Brightline', 3, '14:00'],
    kofi: ['Ridgeway', 4, '15:00'], hana: [null, 6], dana: [null, 6]
  };
  var WHO_EXTRA = { kofi: 'New on the team \u00b7 price call Wed', hana: 'New on the team', dana: 'Top of the team on price' };
  ui.whoList = ['sam', 'lucia', 'omar', 'theo'];
  ui.due = { sam: 5, lucia: 2, omar: 6, theo: 3 };
  ui.mood = 'doubtful';
  ui.who = { sam: true, lucia: true, omar: true, theo: true };
  ui.weights = [20, 30, 30, 20];
  ui.pass = 80;
  ui.length = 8;
  ui.lang = 0;
  ui.flash = null;
  var LANGS = ['English', 'Español', 'Deutsch', 'Français', 'עברית'];
  var LENGTHS = [5, 8, 10, 15];
  var TEMPLATES = [
    ['pricing', 'Pricing', 'By Ira Klein, enablement \u00b7 used by 5 teams'],
    ['discovery', 'Discovery questions', 'By Ira Klein, enablement \u00b7 used by 3 teams'],
    ['firstcalls', 'First calls that land', 'By Ira Klein, enablement \u00b7 used by 4 teams'],
    ['scratch', 'Start from scratch', 'Cue drafts from your team\u2019s lost calls only']
  ];
  ui.template = 'pricing';
  ui.dd = null;

  /* A real dropdown: a button, and a small menu under it while open */
  function dropdown(key, label, value, items, cls) {
    var open = ui.dd === key;
    return '<span class="cue-dd' + (open ? ' is-open' : '') + '">' +
      '<button class="' + (cls || 'cue-meta-item') + '" data-dd="' + key + '" aria-haspopup="listbox" aria-expanded="' + open + '"' + (ui.flash === key ? ' data-flash' : '') + '>' +
        label + value + ic('chevronDown', 'cue-ic--xs') + '</button>' +
      (open ? '<span class="cue-dd-menu" role="listbox" data-component="Dropdown menu">' + items.map(function (it) {
        return '<button class="cue-dd-item' + (it.on ? ' is-on' : '') + '" role="option" aria-selected="' + !!it.on + '" data-dd-pick="' + key + '|' + it.v + '">' +
          (it.lead || '') + '<span class="cue-dd-text"><b>' + it.title + '</b>' + (it.sub ? '<span>' + it.sub + '</span>' : '') + '</span>' +
          (it.on ? ic('check', 'cue-ic--sm') : '') + '</button>';
      }).join('') + '</span>' : '') +
    '</span>';
  }
  var WEIGHT_COLORS = ['var(--viz-calm)', 'var(--viz-up)', 'var(--viz-down)', '#f3d38b'];
  function whoCount() { return Object.keys(ui.who).filter(function (k) { return ui.who[k]; }).length; }

  var DAYS = [['Thu', '16'], ['Fri', '17'], ['Mon', '20'], ['Tue', '21'], ['Wed', '22'], ['Thu', '23'], ['Fri', '24']];
  ui.aiOpen = false;
  function dayLabel(i) { return DAYS[i][0] + ', Oct ' + DAYS[i][1]; }

  /* Who and when (in the Send sheet): one row per person. Checkbox to include,
     their price call for context, and a due date you can change. Add people at the end */
  function recipients() {
    var rows = ui.whoList.map(function (id) {
      var on = !!ui.who[id];
      var info = WHO_INFO[id];
      var last = info[0] ? info[1] : 6;
      var items = [];
      for (var k = 1; k <= last; k++) {
        items.push({ v: k, title: dayLabel(k), on: ui.due[id] === k,
          sub: k === last ? (info[0] ? 'Before the ' + info[0] + ' call \u00b7 Suggested' : 'End of the week \u00b7 Suggested') : '' });
      }
      return '<div class="cue-who' + (on ? '' : ' is-off') + '"' + (ui.whoFlash === id ? ' data-flash' : '') + ' data-component="Recipient">' +
        '<label class="cue-who-pick"><input type="checkbox" data-who="' + id + '"' + (on ? ' checked' : '') + '>' +
          '<span class="cue-checkbox">' + ic('check', 'cue-ic--sm') + '</span>' +
          '<img src="assets/people/' + id + '.jpg" alt="">' +
          '<span class="cue-who-name"><b>' + fullName(id) + '</b><span>' +
            (info[0] ? info[0] + ' price call \u00b7 ' + DAYS[info[1]][0] + ' ' + info[2] : 'No price call this week') + '</span></span></label>' +
        dropdown('due-' + id, '<span>Due</span>', dayLabel(ui.due[id]), items, 'cue-meta-item cue-who-due') +
        '<span class="cue-who-off">Not included</span>' +
      '</div>';
    }).join('');
    var more = Object.keys(WHO_EXTRA).filter(function (id) { return ui.whoList.indexOf(id) < 0; });
    return '<div class="cue-whos" data-component="Recipients">' + rows + '</div>' +
      (more.length ? '<div class="cue-who-add">' + dropdown('addwho', ic('plus', 'cue-ic--xs') + 'Add people', '', more.map(function (id) {
        return { v: id, title: fullName(id), sub: WHO_EXTRA[id], lead: ava(id, 'sm') };
      })) + '</div>' : '');
  }

  function draft() {
    var n = whoCount();

    /* The buyer. Controls for what the avatar is (face, mood, voice, language),
       one text for who they play: the manager can rename, add or delete any part */
    var avatarPick = dropdown('avatar', '', '<img class="cue-persona-photo" src="assets/people/' + ui.avatar + '.jpg" alt=""><b>' + av()[1] + '</b>',
      AVATARS.map(function (a) {
        return { v: a[0], title: a[1], sub: VOICES[a[2]] + ' voice', on: a[0] === ui.avatar, lead: '<img class="cue-dd-face" src="assets/people/' + a[0] + '.jpg" alt="">' };
      }).concat([{ v: 'more', title: 'More avatars', sub: 'From the Kaltura avatar library', lead: '<span class="cue-dd-lead">' + ic('plus', 'cue-ic--sm') + '</span>' }]),
      'cue-persona-pick');
    /* Mood, voice, language: one row of dropdowns. Each voice has its own little wave; hover one in the menu to listen */
    var voiceSet = '<div class="cue-persona-set" data-component="Avatar settings">' +
      dropdown('mood', '<span>Mood</span>', cap(ui.mood), ['friendly', 'doubtful', 'tough'].map(function (m) {
        return { v: m, title: cap(m), sub: MOOD_NOTES[m], on: m === ui.mood };
      })) +
      dropdown('voice', '<span>Voice</span>', VOICES[ui.voice], VOICES.map(function (v, i) {
        return { v: i, title: v, sub: VOICE_NOTES[i] + (i === av()[2] ? ' \u00b7 Made for ' + avFirst() : ''), on: i === ui.voice,
          lead: '<span class="cue-dd-lead cue-voice-lead" data-play role="button" tabindex="0" aria-label="Listen to ' + v + '">' + voiceGlyph(i) + ic('play', 'cue-ic--xs') + '</span>' };
      })) +
      dropdown('lang', '<span>Language</span>', LANGS[ui.lang], LANGS.map(function (l, i) { return { v: i, title: l, on: i === ui.lang }; })) +
    '</div>';
    var buyer = '<section class="cue-panel cue-persona" data-component="Panel/Buyer">' +
      '<div class="cue-panel-head"><h2>The buyer</h2><span class="cue-card-note" data-tip="Company and deal size change to match each person’s real deal">What the AI avatar plays</span></div>' +
      '<div class="cue-persona-head">' + avatarPick + '</div>' +
      voiceSet +
      parts('buyer', [
        ['Role.', 'CFO of a 300-person logistics company.'],
        ['Mood.', '<span data-mood-text>' + MOODS[ui.mood] + '</span>'],
        ['Wants.', 'Lower shipping costs, without a risky switch.'],
        ['Knows.', 'There’s a cheaper quote. A past vendor let them down.'],
        ['Decides with.', 'The COO, who signs off on anything over $50K.'],
        ['Shares only if asked.', 'Two big clients left after late deliveries.'],
        ['Pushes back with.', '“Your price is 20% higher than the other quote.”'],
        ['Gives in when.', 'You show what late fees really cost.']
      ]) +
    '</section>';

    /* The rep brief: what each person reads before the call, in the same editable parts */
    var brief = '<section class="cue-panel" data-component="Panel/Rep brief">' +
      '<div class="cue-panel-head"><h2>Rep brief</h2><span class="cue-card-note" data-tip="Deal names and dates match each person\u2019s own deal">What each person reads before the call</span></div>' +
      parts('brief', [
        ['The situation.', 'Second call. ' + avFirst() + ' has a 20% cheaper quote.'],
        ['Your goal.', 'Show what late fees cost before you talk price.'],
        ['You know.', 'Late fees cost them about $80K a year.'],
        ['Rules.', 'No discount above 5%.']
      ]) +
    '</section>';

    /* The scorecard: one split bar, one block per line, weights you can step */
    var score = '<section class="cue-panel" data-component="Panel/Scorecard">' +
      '<div class="cue-panel-head"><h2>Scored on</h2><span class="cue-card-note">Points add up to 100</span>' +
        dropdown('pass', '<span>Pass at</span>', ui.pass + '<span>of 100</span>', [60, 65, 70, 75, 80, 85, 90, 95].map(function (v) { return { v: v, title: 'Pass at ' + v, sub: v === 80 ? 'Suggested for this template' : '', on: v === ui.pass }; }), 'cue-meta-item cue-pass-pick') + '</div>' +
      '<div class="cue-split-bar' + (ui.flash === 'weights' ? ' is-flash' : '') + '" role="img" aria-label="Points: ' + ui.weights.join(', ') + '">' +
        ui.weights.map(function (w, i) { return '<i data-seg-i="' + i + '" style="width:' + w + '%;background:' + WEIGHT_COLORS[i] + '"></i>'; }).join('') + '</div>' +
      '<ol class="cue-wlist">' + SCORECARD.map(function (r, i) {
        return '<li class="cue-wrow" data-row-i="' + i + '" data-tip="Good: ' + r[1].replace(/"/g, '&quot;') + '"><span class="cue-wdot" style="background:' + WEIGHT_COLORS[i] + '"></span>' +
          '<span class="cue-wname" contenteditable="true" spellcheck="false" data-keep="score' + i + '">' + kept('score' + i, r[0]) + '</span>' +
          '<span class="cue-weight' + (ui.flash === 'weights' ? ' is-flash' : '') + '"><button data-weight="' + i + '|-5" aria-label="Fewer points">−</button><b>' + ui.weights[i] + '<span>pts</span></b><button data-weight="' + i + '|5" aria-label="More points">+</button></span></li>';
      }).join('') + '</ol>' +
    '</section>';

    /* Ask Cue: a small input that grows when you click it, then shows ideas */
    var ai = '<div class="cue-ai" data-component="AI input">' +
      '<div class="cue-ai-chips"><span>Try</span>' +
        '<button data-ai="tough">Make ' + avFirst() + ' tougher</button>' +
        '<button data-ai="value">Weigh the value line higher</button>' +
        '<button data-ai="short">Make it 5 minutes</button>' +
      '</div>' +
      '<label class="cue-ai-input">' + ic('sparkle', 'cue-ic--sm') +
        '<input type="text" data-ai-input placeholder="Ask Cue to change this practice">' +
        '<button class="cue-ai-send" data-ai="text" aria-label="Apply">' + ic('arrowRight', 'cue-ic--sm') + '</button></label>' +
    '</div>';

    var tpl = TEMPLATES.filter(function (t) { return t[0] === ui.template; })[0];
    var meta = '<div class="cue-meta">' +
      dropdown('template', '<span>Template</span>', ava('ira', 'xs') + tpl[1], TEMPLATES.map(function (t) {
        return { v: t[0], title: t[1], sub: t[2], on: t[0] === ui.template, lead: t[0] === 'scratch' ? '<span class="cue-dd-lead">' + ic('sparkle', 'cue-ic--sm') + '</span>' : ava('ira', 'sm') };
      })) +
      dropdown('length', '', ui.length + ' min', LENGTHS.map(function (l) { return { v: l, title: l + ' minutes', on: l === ui.length }; })) +
      refCalls() +
    '</div>';

    return pagehead('Pricing insight', 1,
        '<button class="cue-btn cue-btn--secondary" data-toast="You’ll see the call exactly as Sam does, at step 8.">' + ic('play') + 'Try it yourself</button>' +
        '<button class="cue-btn" data-go="4" data-hint data-send-label>' + ic('send') + 'Send to ' + n + ' people</button>') +
      '<div class="cue-pagehead cue-rise">' +
        '<div class="cue-titlerow"><h1 class="cue-h1 cue-editable" contenteditable="true" spellcheck="false" data-keep="title">' + kept('title', 'Hold your price') + '</h1>' +
          '<span class="cue-pill" data-tip="Built from Ira’s Pricing template and 12 of your team’s lost calls">' + ic('sparkle', 'cue-ic--xs') + 'Draft by Cue</span></div>' +
        meta +
      '</div>' +
      '<div class="cue-grid cue-grid--fill cue-rise" style="--i:1">' +
        '<div class="cue-col cue-col--even">' + buyer + '</div>' +
        '<div class="cue-col cue-col--even">' + brief + score + '</div>' +
      '</div>' + ai;
  }

  /* Apply a change to the draft and show what moved */
  function changeDraft(field) {
    ui.flash = field;
    ui.still = true;
    render();
    ui.flash = null;
  }
  function moveWeight(i, d) {
    var w = ui.weights.slice();
    if (d > 0) {
      var from = -1;
      w.forEach(function (v, k) { if (k !== i && v > 5 && (from < 0 || v > w[from])) from = k; });
      if (from < 0) return;
      w[i] += 5; w[from] -= 5;
    } else {
      if (w[i] <= 5) return;
      var to = -1;
      w.forEach(function (v, k) { if (k !== i && (to < 0 || v < w[to])) to = k; });
      w[i] -= 5; w[to] += 5;
    }
    ui.weights = w;
    changeDraft('weights');
  }
  function aiChange(kind, text) {
    ui.aiOpen = false;
    if (kind === 'tough') { setMood('tough'); changeDraft('mood'); flashEl(main.querySelector('[data-mood-text]')); toast(avFirst() + ' is tougher now: pushes harder and is ready to walk away.'); }
    if (kind === 'value') { ui.weights = [15, 40, 30, 15]; changeDraft('weights'); toast('“Puts a number on the value” is now worth 40 points.'); }
    if (kind === 'short') { ui.length = 5; changeDraft('length'); toast('The practice is now 5 minutes.'); }
    if (kind === 'text') { changeDraft('objection'); toast(text ? 'Cue updated the draft: ' + text : 'Type what you want to change.'); }
  }

  /* Screen 5: send (a sheet over the draft) */
  function sendSheet() {
    var n = whoCount();
    return '<div class="cue-sheet" role="dialog" aria-label="Send" data-component="Sheet/Send">' +
      '<div class="cue-sheet-body" data-send-body>' +
        '<div class="cue-card-head"><h2 data-send-count>Send to ' + n + ' people</h2><button class="cue-icon-btn cue-icon-btn--plain" data-go="3" aria-label="Close">' + ic('close') + '</button></div>' +
        '<div class="cue-field"><span class="cue-field-label">Send by</span>' +
          '<div class="cue-channels">' +
            '<label class="cue-channel"><input type="checkbox" checked>' + '<span class="cue-logo-sm">' + window.CueIcons.SLACK + '</span>Slack<span class="cue-checkbox">' + ic('check', 'cue-ic--sm') + '</span></label>' +
            '<label class="cue-channel"><input type="checkbox" checked>' + '<span class="cue-logo-sm">' + window.CueIcons.GMAIL + '</span>Email<span class="cue-checkbox">' + ic('check', 'cue-ic--sm') + '</span></label>' +
          '</div></div>' +
        '<div class="cue-field"><span class="cue-field-label">Message <em>' + ic('sparkle', 'cue-ic--xs') + 'Drafted by Cue</em></span>' +
          '<div class="cue-message" contenteditable="true" spellcheck="false" data-keep="message">' + kept('message', 'Hi <span class="cue-token" contenteditable="false">first name</span>, your <span class="cue-token" contenteditable="false">deal</span> price call is on <span class="cue-token" contenteditable="false">day</span>. Here’s an 8 minute practice with a tough CFO. Rounds are private, share your best one. Noa') + '</div></div>' +
        '<div class="cue-field"><span class="cue-field-label">Who and when <em>Due before each person\u2019s price call. Change any date.</em></span>' +
          recipients() + '</div>' +
        '<div class="cue-sheet-foot"><button class="cue-link" data-go="3">Cancel</button><button class="cue-btn" data-sent data-hint' + (n ? '' : ' disabled') + '>' + ic('send') + 'Send</button></div>' +
      '</div>' +
    '</div>';
  }
  function sentState() {
    return '<div class="cue-sent">' +
      '<span class="cue-sent-mark">' + ic('check') + '</span>' +
      '<h2>Sent to ' + whoCount() + ' people</h2>' +
      '<p>In Slack and email. Results show up here as people finish.</p>' +
      '<div class="cue-sheet-foot"><button class="cue-link" data-go="0">Back to home</button>' +
      '<button class="cue-btn" data-next-screen>' + 'See what Sam gets' + ic('arrowRight') + '</button></div>' +
    '</div>';
  }

  /* ===== Sam's side ===== */

  /* Screen 6: Slack and Gmail. Built to look like the real apps. */
  ui.channel = 'slack';
  var NOA_NOTE = 'Hi Sam, your Acme price call is on Thursday. Here’s an 8 minute practice with a tough CFO. Rounds are private, share your best one.';
  function ms(name, cls) { return '<span class="ms' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' + name + '</span>'; }

  function slackView() {
    var item = function (icon, label, cls) { return '<div class="sl-it' + (cls ? ' ' + cls : '') + '">' + icon + '<span>' + label + '</span></div>'; };
    var dm = function (id, label) { return '<div class="sl-it sl-sub"><img src="assets/people/' + id + '.jpg" alt="">' + '<span>' + label + '</span></div>'; };
    return '<div class="sl" data-component="Slack window">' +
      '<div class="sl-top"><div class="sl-lights"><i></i><i></i><i></i></div>' +
        '<div class="sl-hist">' + ic('arrowLeft', 'cue-ic--sm') + ic('arrowRight', 'cue-ic--sm') + ic('clock', 'cue-ic--sm') + '</div>' +
        '<div class="sl-search">' + ic('search', 'cue-ic--sm') + 'Search Relay</div>' +
        '<div class="sl-top-end">' + ic('help', 'cue-ic--sm') + '<img src="assets/people/sam.jpg" alt=""></div></div>' +
      '<div class="sl-body">' +
        '<div class="sl-rail"><div class="sl-ws">R</div>' +
          '<div class="sl-rail-it is-on">' + ic('home', 'cue-ic--sm') + '<span>Home</span></div>' +
          '<div class="sl-rail-it">' + ic('chat', 'cue-ic--sm') + '<span>DMs</span></div>' +
          '<div class="sl-rail-it">' + ic('bell', 'cue-ic--sm') + '<span>Activity</span></div>' +
          '<div class="sl-rail-it">' + ic('bookmark', 'cue-ic--sm') + '<span>Later</span></div>' +
          '<div class="sl-rail-it">' + ic('more', 'cue-ic--sm') + '<span>More</span></div></div>' +
        '<div class="sl-side">' +
          '<div class="sl-ws-name">Relay ' + ic('chevronDown', 'cue-ic--xs') + '<span class="sl-new">' + ic('pencil', 'cue-ic--sm') + '</span></div>' +
          item(ic('chat', 'cue-ic--sm'), 'Threads') + item(ic('headphones', 'cue-ic--sm'), 'Huddles') + item(ic('send', 'cue-ic--sm'), 'Drafts &amp; sent') +
          '<div class="sl-sec">' + ic('chevronDown', 'cue-ic--xs') + 'Channels</div>' +
          item(ic('hash', 'cue-ic--sm'), 'sales-team', 'sl-sub sl-bold') + item(ic('hash', 'cue-ic--sm'), 'deal-acme', 'sl-sub') + item(ic('hash', 'cue-ic--sm'), 'general', 'sl-sub') +
          '<div class="sl-sec">' + ic('chevronDown', 'cue-ic--xs') + 'Direct messages</div>' +
          dm('noa', 'Noa Levin') + dm('dana', 'Dana Brooks') + dm('lucia', 'Lucia Moreno') +
          '<div class="sl-sec">' + ic('chevronDown', 'cue-ic--xs') + 'Apps</div>' +
          '<div class="sl-it sl-sub is-on"><span class="sl-app">' + MARK + '</span><span>Cue</span></div>' +
        '</div>' +
        '<div class="sl-main">' +
          '<div class="sl-head"><span class="sl-app sl-app--md">' + MARK + '</span><b>Cue</b><span class="sl-apptag">APP</span>' + ic('chevronDown', 'cue-ic--xs') + '</div>' +
          '<div class="sl-tabs"><span class="is-on">' + ic('chat', 'cue-ic--xs') + 'Messages</span><span>About</span></div>' +
          '<div class="sl-msgs">' +
            '<div class="sl-day"><span>Monday, October 13</span></div>' +
            '<div class="sl-msg sl-msg--dim"><span class="sl-app sl-app--lg">' + MARK + '</span><div class="sl-msg-body">' +
              '<div class="sl-who"><b>Cue</b><span class="sl-apptag">APP</span><span class="sl-ts">8:30 AM</span></div>' +
              '<div class="sl-txt">Your week: 2 price calls coming up. Nothing to practice yet.</div></div></div>' +
            '<div class="sl-day"><span>Today</span></div>' +
            '<div class="sl-msg"><span class="sl-app sl-app--lg">' + MARK + '</span><div class="sl-msg-body">' +
              '<div class="sl-who"><b>Cue</b><span class="sl-apptag">APP</span><span class="sl-ts">9:14 AM</span></div>' +
              '<div class="sl-txt"><b>Noa Levin</b> sent you a practice.</div>' +
              '<div class="sl-block" data-component="Slack card">' +
                '<div class="sl-block-title">Hold your price · 8 min</div>' +
                '<div class="sl-block-ctx">' + ic('calendar', 'cue-ic--xs') + 'Before your Acme Logistics call, Thu 11:00</div>' +
                '<div class="sl-quote"><img src="assets/people/noa.jpg" alt=""><div><b>Noa Levin</b><p>' + NOA_NOTE + '</p></div></div>' +
                '<div class="sl-btns"><button class="sl-btn sl-btn--primary" data-go="6" data-hint>Start practice</button><button class="sl-btn" data-toast="Cue will remind Sam tomorrow at 9:00.">Remind me tomorrow</button></div>' +
                '<div class="sl-foot">' + ic('lock', 'cue-ic--xs') + 'Only you see your rounds until you share one.</div>' +
              '</div>' +
            '</div></div>' +
          '</div>' +
          '<div class="sl-comp"><div class="sl-comp-in">Message Cue</div><div class="sl-comp-bar">' + ic('plus', 'cue-ic--sm') + '<span class="sl-fmt"><b>B</b><i>I</i><s>S</s></span><span class="sl-grow"></span>' + ic('send', 'cue-ic--sm') + '</div></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function gmailView() {
    var nav = function (icon, label, on, n) { return '<div class="gm-it' + (on ? ' is-on' : '') + '">' + ms(icon) + '<span>' + label + '</span>' + (n ? '<b>' + n + '</b>' : '') + '</div>'; };
    return '<div class="gm" data-component="Gmail window">' +
      '<div class="gm-top">' + ms('menu', 'gm-ic') + '<span class="gm-logo"><i>' + window.CueIcons.GMAIL + '</i>Gmail</span>' +
        '<div class="gm-search">' + ms('search') + '<span>Search mail</span>' + ms('tune', 'gm-tune') + '</div>' +
        '<div class="gm-top-end">' + ms('help', 'gm-ic') + ms('settings', 'gm-ic') + ms('apps', 'gm-ic') + '<img src="assets/people/sam.jpg" alt=""></div></div>' +
      '<div class="gm-body">' +
        '<div class="gm-nav"><div class="gm-compose">' + ms('edit') + 'Compose</div>' +
          nav('inbox', 'Inbox', true, '6') + nav('star', 'Starred') + nav('schedule', 'Snoozed') + nav('send', 'Sent') + nav('draft', 'Drafts', false, '2') + nav('expand_more', 'More') +
        '</div>' +
        '<div class="gm-panel">' +
          '<div class="gm-tools">' + ms('arrow_back') + '<span class="gm-sep"></span>' + ms('archive') + ms('report') + ms('delete') + '<span class="gm-sep"></span>' + ms('mail') + ms('schedule') + ms('more_vert') + '<span class="gm-pager">1 of 6</span></div>' +
          '<div class="gm-subj">Before your Acme call: Hold your price (8 min) <span class="gm-tag">Inbox ×</span></div>' +
          '<div class="gm-from"><span class="gm-av">' + MARK + '</span><div><b>Cue</b> <span class="gm-addr">&lt;practice@cue.app&gt;</span><div class="gm-to">to me ' + ms('arrow_drop_down') + '</div></div>' +
            '<div class="gm-from-end"><span>9:14 AM (2 minutes ago)</span>' + ms('star') + ms('reply') + ms('more_vert') + '</div></div>' +
          '<div class="gm-mail" data-component="Email card">' +
            '<div class="gm-card">' +
              '<div class="gm-card-brand">' + MARK + '<b>Cue</b></div>' +
              '<p class="gm-card-kicker">Noa Levin sent you a practice</p>' +
              '<h2>Hold your price</h2>' +
              '<p class="gm-card-meta">8 min · Before your Acme Logistics call, Thu 11:00</p>' +
              '<div class="gm-quote"><img src="assets/people/noa.jpg" alt=""><p>' + NOA_NOTE + '</p></div>' +
              '<button class="gm-cta" data-go="6" data-hint>Start practice</button>' +
              '<p class="gm-card-foot">Only you see your rounds until you share one.</p>' +
            '</div>' +
          '</div>' +
          '<div class="gm-reply"><span>' + ms('reply') + 'Reply</span><span>' + ms('forward') + 'Forward</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  function channelView() { return ui.channel === 'gmail' ? gmailView() : slackView(); }
  function channelSwitch() {
    return '<span class="shell-switch" role="group" aria-label="Channel">' +
      '<button data-channel="slack" aria-pressed="' + (ui.channel === 'slack') + '">Slack</button>' +
      '<button data-channel="gmail" aria-pressed="' + (ui.channel === 'gmail') + '">Gmail</button></span>';
  }

  /* Screen 7: before the call. Shows the first reference call Noa kept */
  function refMoment(r) {
    return '<div class="cue-moment cue-moment--good">' + (r[0].length === 2 ? '<span class="cue-ref-initials">' + r[0] + '</span>' : ava(r[0], 'sm')) +
      '<div class="cue-moment-text"><span>Reference call \u00b7 ' + r[1].split(' \u00b7 ')[0] + ' \u00b7 ' + r[2] + '</span><b>What good sounds like</b></div>' + play(r[2], r[1]) + '</div>';
  }
  function beforeCall() {
    var score = '<ol class="cue-score">' + SCORECARD.map(function (r, i) {
      return '<li data-tip="Good: ' + r[1] + '"><span>' + r[0] + '</span><b class="cue-wt">' + ui.weights[i] + ' pts</b></li>';
    }).join('') + '</ol>';
    return pagehead('Back', 5, '') +
      '<div class="cue-prep cue-rise">' +
        '<figure class="cue-portrait" data-component="Avatar portrait">' +
          '<img src="assets/people/mark-full.jpg" alt="Mark Ellis">' +
          '<figcaption><b>Mark Ellis</b><span>CFO · Acme Logistics</span></figcaption>' +
          '<span class="cue-portrait-tag">AI avatar</span>' +
        '</figure>' +
        '<div class="cue-prep-text">' +
          '<div><h1 class="cue-h1">Hold your price</h1><p class="cue-sub">Before your Acme call · Thu 11:00 · 8 min</p></div>' +
          /* The rep brief Noa wrote, as one paragraph: the setting, then the mission */
          '<div class="cue-prep-block cue-prep-brief"><span class="cue-field-label">Your brief</span><p>This is your second call with Mark Ellis, CFO of Acme Logistics. ' +
            'He’s busy, doubtful, and holding a quote that’s 20% cheaper, so he’ll open by asking why you cost more. ' +
            'What he won’t say unless you ask: late shipments cost Acme about $80K a year in fees, and two big clients left after late deliveries. ' +
            'Your mission is to get him talking about that problem, put a number on it, and only then talk price. ' +
            'Don’t go above a 5% discount, and end with a clear next step.</p></div>' +
          '<div class="cue-prep-block"><span class="cue-field-label">You’re scored on</span>' + score + '</div>' +
          (ui.refs.length ? refMoment(REFS[ui.refs[0]]) : '') +
          '<div class="cue-prep-foot"><button class="cue-btn" data-go="7" data-hint>' + ic('mic') + 'Start call</button><button class="cue-btn cue-btn--secondary" data-toast="Your mic sounds good.">Test mic</button>' +
            '<span class="cue-private">' + ic('lock', 'cue-ic--sm') + 'Rounds are private. You choose which one Noa sees.</span></div>' +
        '</div>' +
      '</div>';
  }

  /* Screen 8: the call */
  var LINES = [
    ['mark', 'Your price is 20% higher than the other quote. Why should I pay more?'],
    ['sam', 'Fair question. What does a late shipment cost you today?'],
    ['mark', 'Honestly? Around $80K a year in fees. Maybe more.'],
    ['sam', 'Then let’s compare what each option costs you over a year.']
  ];
  ui.callPhase = 'call';
  function callView() {
    if (ui.callPhase === 'scoring') return scoringView();
    return '<div class="cue-call" data-component="Avatar call">' +
      '<div class="cue-call-top"><div><b>Mark Ellis</b><span>CFO, Acme Logistics · AI avatar</span></div>' +
        '<span class="cue-pill">Round 2 · Private</span><span class="cue-call-time"><span data-call-time>03:12</span> / 08:00</span></div>' +
      '<div class="cue-call-stage">' +
        '<div class="cue-call-video is-talking" data-call-mark><img src="assets/people/mark-full.jpg" alt="Mark Ellis, AI avatar">' +
          '<span class="cue-call-wave" aria-hidden="true">' + new Array(15).join('<i></i>') + '</span></div>' +
        '<div class="cue-call-self" data-call-sam><img src="assets/people/sam.jpg" alt="Sam"><span class="cue-call-wave cue-call-wave--sm" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><b>You</b></div>' +
      '</div>' +
      '<p class="cue-call-caption" data-call-caption aria-live="polite"><b>Mark</b> ' + LINES[0][1] + '</p>' +
      '<div class="cue-call-controls">' +
        '<button class="cue-round-btn" data-toast="Muted. Mark waits for you.">' + ic('mic') + '<span>Mute</span></button>' +
        '<button class="cue-btn" data-end-call data-hint>End call</button>' +
      '</div>' +
    '</div>';
  }
  /* After "End call": a calm dark moment. One number, one line at a time, a bar that fills */
  function scoringView() {
    var segs = ui.weights.map(function (w, i) {
      return '<i style="width:' + w + '%;--c:' + WEIGHT_COLORS[i] + ';--d:' + (0.5 + i * 0.8) + 's"><b></b></i>';
    }).join('');
    return '<div class="cue-call cue-calm" data-component="Scoring">' +
      '<img class="cue-calm-bg" src="assets/people/mark-full.jpg" alt="" aria-hidden="true">' +
      '<div class="cue-calm-center">' +
        '<span class="cue-calm-label">Scoring your round</span>' +
        '<b class="cue-calm-num" data-calm-num>0</b>' +
        '<div class="cue-calm-bar" aria-hidden="true">' + segs + '</div>' +
        '<p class="cue-calm-line" data-calm-line aria-live="polite">Listening back to your round</p>' +
      '</div>' +
    '</div>';
  }
  function scoringAfter() {
    ui.scoreTimers = [];
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var num = main.querySelector('[data-calm-num]');
    if (reduce) { if (num) num.textContent = '84'; }
    else {
      var t0 = null, dur = 3400;
      ui.scoreTimers.push(setTimeout(function () {
        function tick(t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / dur);
          if (num && num.isConnected) num.textContent = Math.round(84 * (1 - Math.pow(1 - k, 2)));
          if (k < 1 && num && num.isConnected) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, 400));
    }
    var lines = SCORECARD.map(function (r, i) { return r[0] + '<span>' + SCORES[i][1] + '</span>'; }).concat(['3 moments to replay']);
    lines.forEach(function (txt, k) {
      ui.scoreTimers.push(setTimeout(function () {
        var el = main.querySelector('[data-calm-line]');
        if (!el) return;
        el.classList.remove('is-in');
        void el.offsetWidth;
        el.innerHTML = txt;
        el.classList.add('is-in');
      }, 500 + k * 800));
    });
    var here = ui.step;
    ui.scoreTimers.push(setTimeout(function () { if (ui.step === here && ui.callPhase === 'scoring') go(here + 1); }, 4900));
  }

  function callAfter() {
    if (ui.callPhase === 'scoring') { scoringAfter(); return; }
    var i = 0, sec = 192;
    var timeEl = main.querySelector('[data-call-time]');
    clearInterval(ui.callTimer);
    clearInterval(ui.clockTimer);
    ui.clockTimer = setInterval(function () {
      sec++;
      if (timeEl) timeEl.textContent = ('0' + Math.floor(sec / 60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2);
    }, 1000);
    ui.callTimer = setInterval(function () {
      i = (i + 1) % LINES.length;
      var who = LINES[i][0];
      var cap = main.querySelector('[data-call-caption]');
      if (!cap) return;
      cap.innerHTML = '<b>' + (who === 'mark' ? 'Mark' : 'You') + '</b> ' + LINES[i][1];
      main.querySelector('[data-call-mark]').classList.toggle('is-talking', who === 'mark');
      main.querySelector('[data-call-sam]').classList.toggle('is-talking', who === 'sam');
    }, 3600);
  }

  /* Screen 9: feedback */
  var SCORES = [['Asks about the problem first', 90], ['Puts a number on the value', 78], ['Handles “too expensive” without a discount', 82], ['Agrees on a next step', 86]];
  var FIX = [
    ['2:05', 'up', 'You asked what late shipments cost them. Great start.'],
    ['4:40', 'up', 'You named a number: “$80K a year in late fees.” Strong.'],
    ['6:12', 'down', 'You almost offered a discount. Try: “Let’s compare what each option costs you over a year.”']
  ];
  function feedback() {
    var rows = '<div class="cue-rows">' + SCORES.map(function (r, i) {
      var pass = r[1] >= 80;
      return '<div class="cue-row cue-row--score" data-tip="Good: ' + SCORECARD[i][1] + '"><span class="cue-row-name">' + r[0] + '</span>' +
        '<span class="cue-minibar cue-minibar--wide"><i style="--value:' + r[1] + '%;--c:' + (pass ? 'var(--viz-up)' : 'var(--viz-calm)') + ';--i:' + i + '"></i></span>' +
        '<b class="cue-row-num">' + r[1] + '</b></div>';
    }).join('') + '</div>';
    var moments = '<div class="cue-rows">' + FIX.map(function (m) {
      return '<div class="cue-moment"><span class="cue-dot-tone" style="--c:var(--viz-' + m[1] + ')"></span>' +
        '<div class="cue-moment-text"><span>' + m[0] + '</span><b>' + m[2] + '</b></div>' + play(m[0], 'the moment at ' + m[0]) + '</div>';
    }).join('') + '</div>';
    return pagehead('Practice', 6,
        '<button class="cue-btn cue-btn--secondary" data-go="7">' + ic('replay') + 'Try again</button>' +
        '<button class="cue-btn" data-shared data-hint>' + ic('share') + 'Share this round with Noa</button>') +
      '<div class="cue-pagehead cue-rise">' +
        '<div class="cue-score-hero"><span class="cue-big">84</span><div><span class="cue-pill cue-pill--pass">' + ic('check', 'cue-ic--xs') + 'Passed</span>' +
          '<p class="cue-sub">Round 2 · Round 1 was 71 ' + delta('up', '13') + '</p></div></div>' +
        '<h1 class="cue-h1">Hold your price</h1>' +
      '</div>' +
      roundTimeline() +
      '<div class="cue-grid cue-rise" style="--i:2">' +
        '<div class="cue-col cue-col--even">' + card('Your scores', rows, '<span class="cue-card-note">Pass at 80 of 100</span>') + '</div>' +
        '<div class="cue-col cue-col--even">' + card('Three moments', moments, '<span class="cue-card-note">Click to replay</span>') + '</div>' +
      '</div>';
  }

  /* The whole round as a timeline, with the three moments pinned on it */
  function roundTimeline() {
    var bars = '';
    for (var i = 0; i < 120; i++) {
      var h = 18 + Math.abs(Math.sin(i * 0.9) * 0.55 + Math.sin(i * 0.37 + 1) * 0.45) * 82;
      bars += '<i style="height:' + h.toFixed(0) + '%"></i>';
    }
    var pins = FIX.map(function (m) {
      var p = m[0].split(':'), sec = +p[0] * 60 + +p[1];
      return '<button class="cue-pin" style="--x:' + (sec / 480 * 100).toFixed(1) + '%;--c:var(--viz-' + m[1] + ')" data-tip="' + m[0] + ' · ' + m[2].replace(/"/g, '&quot;') + '" data-play aria-label="Replay ' + m[0] + '"><span>' + m[0] + '</span></button>';
    }).join('');
    return '<section class="cue-card cue-rise" style="--i:1" data-component="Round timeline">' +
      '<div class="cue-card-head"><h2>Your round</h2><span class="cue-card-note">8:00</span></div>' +
      '<div class="cue-timeline"><div class="cue-timeline-wave">' + bars + '</div>' + pins + '</div>' +
      '<div class="cue-timeline-axis"><span>0:00</span><span>4:00</span><span>8:00</span></div>' +
    '</section>';
  }

  /* Screen 10: Sam's home, the next morning. The practice is one item, not the whole page. */
  var WEEK = [
    ['Tue', '21', 'Harborview Health', 'Demo', '$45K · 10:00', 'suggest'],
    ['Thu', '23', 'Acme Logistics', 'Price call', '$120K · 11:00', 'ready'],
    ['Fri', '24', 'Fieldline Supply', 'First call', '$30K · 14:30', 'none']
  ];
  var SUGGEST = [
    ['practice', 'Practice · 6 min', 'Handle “we’ll think about it”', 'For your Harborview demo'],
    ['clip', 'Clip · 40 sec', 'Dana’s discovery call', 'Top call on the team this month'],
    ['practice', 'Practice · 5 min', 'Bring more buyers in', 'Your lowest skill']
  ];
  var DONE = [
    ['First calls that land', 'Sep 29', 79],
    ['Discovery questions', 'Sep 12', 81]
  ];
  var SAM_NOW = { 'Asking good questions': 74, 'Talking value before price': 62, 'Handling “too expensive”': 58 };

  function samHome() {
    var week = '<div class="cue-rows">' + WEEK.map(function (w) {
      var status = w[5] === 'ready'
        ? '<span class="cue-ready" data-tip="You practiced this yesterday. Score 84.">' + ic('check', 'cue-ic--xs') + 'Ready · 84</span>'
        : w[5] === 'suggest'
          ? '<button class="cue-btn cue-btn--secondary cue-btn--sm" data-toast="Opens a 6 minute practice built for this demo.">' + ic('practice') + 'Practice · 6 min</button>'
          : '<span class="cue-row-quiet">Nothing needed</span>';
      return '<div class="cue-row cue-week" data-component="Week row">' +
        '<span class="cue-day"><span>' + w[0] + '</span><b>' + w[1] + '</b></span>' +
        '<span class="cue-row-name"><b>' + w[2] + ' · ' + w[3] + '</b><span>' + w[4] + '</span></span>' + status + '</div>';
    }).join('') + '</div>';

    var suggest = '<div class="cue-suggest">' + SUGGEST.map(function (g, i) {
      return '<button class="cue-sg" data-component="Suggestion card" data-toast="Opens ' + g[2].replace(/"/g, '&quot;') + '.">' +
        '<span class="cue-sg-type">' + (g[0] === 'clip' ? ava('dana', 'xs') : ic('practice', 'cue-ic--sm')) + g[1] + '</span>' +
        '<b>' + g[2] + '</b><span class="cue-sg-why">' + g[3] + '</span></button>';
    }).join('') + '</div>';

    var done = '<div class="cue-rows">' +
      '<div class="cue-done cue-done--open" data-component="Done row">' +
        '<div class="cue-done-line"><span class="cue-row-name"><b>Hold your price</b><span>Yesterday · shared with Noa</span></span><b class="cue-row-num">84</b></div>' +
        '<div class="cue-done-note">' + ava('noa', 'xs') + '<span><b>Noa Levin</b> · last night</span><p>Nice round. Watch your 6:12 moment before Thursday.</p>' +
          '<button class="cue-play" data-play aria-label="Replay your 6:12 moment">' + ic('play', 'cue-ic--sm') + '<span class="cue-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="cue-play-len">6:12</span></button></div>' +
      '</div>' +
      DONE.map(function (d) {
        return '<div class="cue-done" data-component="Done row"><div class="cue-done-line"><span class="cue-row-name"><b>' + d[0] + '</b><span>' + d[1] + '</span></span><b class="cue-row-num">' + d[2] + '</b></div></div>';
      }).join('') + '</div>';

    var skills = '<div class="cue-myskills">' + SKILLS.map(function (k, i) {
      var before = k.s.sam, now = SAM_NOW[k.name] || before, ch = now - before;
      return '<div class="cue-myskill" data-component="My skill">' +
        '<span class="cue-myskill-name">' + k.name + '</span>' +
        '<div class="cue-myskill-line"><span class="cue-myskill-bar"><i style="--value:' + now + '%;--i:' + i + '"></i><em style="--team:' + k.score + '%" data-team-tip="Team average ' + k.score + '"></em></span>' +
          '<b>' + now + '</b>' + delta(ch > 0 ? 'up' : ch < 0 ? 'down' : 'flat', String(Math.abs(ch))) + '</div>' +
      '</div>';
    }).join('') + '</div>';

    return '<header class="cue-topbar"><h1 class="cue-title">Hi Sam</h1><span class="cue-date">Fri, Oct 17</span>' +
        '<div class="cue-search" data-toast="Ask Cue answers questions about your team. Not part of this walkthrough.">' + ic('sparkle', 'cue-ic--sm') + '<span>Ask Cue</span><kbd>⌘K</kbd></div>' +
        '<button class="cue-icon-btn" aria-label="Notifications" data-toast="Notifications are not part of this walkthrough.">' + ic('bell') + '<span class="cue-dot"></span></button></header>' +
      '<div class="cue-split">' +
        '<div class="cue-split-main">' +
          '<section class="cue-section cue-rise"><div class="cue-section-head"><h2>This week</h2><span>Your calls, and if you’re ready</span></div>' + week + '</section>' +
          '<section class="cue-section cue-rise" style="--i:1"><div class="cue-section-head"><h2>Suggested for you</h2></div>' + suggest + '</section>' +
          '<section class="cue-section cue-rise" style="--i:2"><div class="cue-section-head"><h2>Done lately</h2></div>' + done + '</section>' +
        '</div>' +
        '<aside class="cue-split-side cue-rise" style="--i:3">' +
          '<div class="cue-section-head"><h2>My skills</h2><span>Points out of 100</span></div>' +
          '<div class="cue-legend cue-legend--plain"><span><i class="is-you"></i>You</span><span><i class="is-team"></i>Team average</span></div>' +
          skills +
        '</aside>' +
      '</div>';
  }

  /* ===== Coach and Prove ===== */
  /* One reusable "confirm" button: shows a toast, then turns into a done pill and a next button */
  function confirmBtn(label, icon, toastMsg, doneText, nextLabel, nextGo, secondary) {
    return '<button class="cue-btn' + (secondary ? ' cue-btn--secondary' : '') + '" data-confirm="' + [toastMsg, doneText, nextLabel, nextGo].join('|') + '"' + (secondary ? '' : ' data-hint') + '>' + ic(icon) + label + '</button>';
  }
  function tone(v) { return v >= 80 ? 'up' : v < 70 ? 'down' : 'calm'; }

  /* A filter row that belongs to one page (under the tabs, not on them) */
  function filterBar(html) { return '<div class="cue-filterbar cue-rise" data-component="Filter bar">' + html + '</div>'; }
  /* One header for every object page (a practice, a template): breadcrumb to its list,
     title, status, and the switch between its pages. A tab goes to a step, or shows a note */
  function objectHead(o) {
    var tabs = o.tabs.map(function (t) {
      var on = o.page === t[0];
      return '<button class="cue-tab' + (on ? ' is-active' : '') + '"' +
        (on ? ' aria-current="page"' : (typeof t[2] === 'number' ? ' data-go="' + t[2] + '"' : ' data-toast="' + t[2] + '"')) +
        (o.hint === t[0] ? ' data-hint' : '') + '>' + t[1] + '</button>';
    }).join('');
    return '<header class="cue-pagebar" data-component="Page bar">' +
        '<nav class="cue-crumbs" aria-label="Breadcrumb" data-component="Breadcrumb">' +
          '<button class="cue-crumb" data-toast="' + o.crumbNote + '">' + o.crumb + '</button></nav>' +
        '<div class="cue-pagebar-actions">' + (o.actions || '') + '</div>' +
      '</header>' +
      '<div class="cue-pagehead cue-rise"><h1 class="cue-h1">' + o.title + '</h1><p class="cue-sub">' + o.sub + '</p></div>' +
      '<nav class="cue-tabs cue-rise" aria-label="' + o.title + ' pages" data-component="Page tabs">' + tabs + '</nav>';
  }
  /* The 3 dots menu: more actions for a page, next to its main button. Opens downward */
  var MENUS = {
    practice: [
      ['pencil', 'Edit practice', 'Opens the practice to edit. Changes reach people on their next round.'],
      ['replay', 'Send another round', 'Sends a harder round to everyone who passed.'],
      ['plus', 'Add people', 'Pick more people to send it to.'],
      ['copy', 'Duplicate', 'Makes a copy you can change for another team.'],
      ['archive', 'Archive', 'Moves the practice to the archive. Not part of this walkthrough.', true]
    ],
    person: [
      ['replay', 'Send a harder round', 'Sends Daniel a tougher Mark, due before Friday.'],
      ['share', 'Share the plan with Daniel', 'Daniel gets the 1:1 plan before Thursday.'],
      ['play', 'See all 3 rounds', 'All of Daniel\u2019s rounds. Not part of this walkthrough.'],
      ['chat', 'Message Daniel', 'Opens a chat with Daniel. Not part of this walkthrough.']
    ]
  };
  function moreMenu(key) {
    return '<span class="cue-more" data-component="More menu">' +
      '<button class="cue-icon-btn" data-more aria-haspopup="menu" aria-expanded="false" aria-label="More actions">' + ic('more') + '</button>' +
      '<span class="cue-dd-menu" role="menu">' + MENUS[key].map(function (m, i) {
        return (m[3] ? '<span class="cue-more-sep" role="separator"></span>' : '') +
          '<button class="cue-dd-item" role="menuitem" data-more-pick="' + key + '|' + i + '">' + ic(m[0], 'cue-ic--sm') + '<span class="cue-dd-text"><b>' + m[1] + '</b></span></button>';
      }).join('') + '</span>' +
    '</span>';
  }
  function closeMore(box) {
    box.classList.remove('is-open');
    box.querySelector('[data-more]').setAttribute('aria-expanded', 'false');
  }

  /* The practice: Overview, Results, Impact */
  function practiceHead(page, actions, hint) {
    return objectHead({
      crumb: 'Practice', crumbNote: 'All your team\u2019s practices. This walkthrough skips the list.',
      title: 'Hold your price', sub: 'Sent Oct 16 to 4 people \u00b7 <b>4 of 4</b> done \u00b7 Average <b>76</b>',
      tabs: [['overview', 'Overview', 12], ['results', 'Results', 10], ['impact', 'Impact', 13]],
      page: page, actions: (actions || '') + moreMenu('practice'), hint: hint
    });
  }

  /* Screen 11: results */
  var RESULTS = [
    ['sam', 84, 2, [90, 78, 82, 86], 'Ready', 'up'],
    ['lucia', 81, 2, [86, 74, 80, 84], 'Ready', 'up'],
    ['theo', 74, 2, [78, 62, 72, 84], 'Close', 'calm'],
    ['omar', 68, 3, [74, 50, 66, 78], 'Needs a 1:1', 'down']
  ];
  function results() {
    var head = '<div class="cue-row cue-result cue-result-head" aria-hidden="true"><span class="cue-row-name">Person</span>' +
      '<span class="cue-ticks-h">Scorecard</span><span class="cue-row-num--lg">Score</span><span class="cue-result-status">Status</span><span class="cue-result-gap"></span></div>';
    var people = '<div class="cue-rows cue-rows--table">' + head + RESULTS.map(function (r) {
      var lines = SCORECARD.map(function (l, i) { return l[0].replace(/“|”/g, '') + ' ' + r[3][i]; }).join(' · ');
      return '<div class="cue-row cue-result" data-tip="' + lines + '" data-component="Result row">' + ava(r[0], 'md') +
        '<span class="cue-row-name"><b>' + fullName(r[0]) + '</b><span>' + r[2] + ' rounds · best round shared</span></span>' +
        '<span class="cue-ticks" aria-hidden="true">' + r[3].map(function (v) { return '<i style="--value:' + v + '%;--c:var(--viz-' + tone(v) + ')"></i>'; }).join('') + '</span>' +
        '<b class="cue-row-num cue-row-num--lg">' + r[1] + '</b>' +
        '<span class="cue-status-pill cue-status-pill--' + r[5] + '">' + r[4] + '</span>' +
        (r[0] === 'omar' ? '<button class="cue-btn cue-btn--sm" data-go="11" data-hint>' + ic('calendar') + 'Plan 1:1</button>' : '<span class="cue-result-gap"></span>') +
      '</div>';
    }).join('') + '</div>';
    var team = '<div class="cue-skills cue-skills--lines">' + SCORECARD.map(function (l, i) {
      var vals = RESULTS.map(function (r) { return r[3][i]; });
      var avg = Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
      var dots = RESULTS.map(function (r) {
        return '<img class="cue-skill-person" src="assets/people/' + r[0] + '.jpg" alt="' + fullName(r[0]) + ' ' + r[3][i] + '" title="' + fullName(r[0]) + ' · ' + r[3][i] + '" style="--value:' + r[3][i] + '%;--c:var(--person-' + r[0] + ')">';
      }).join('');
      var dir = avg >= 80 ? 'up' : avg < 70 ? 'down' : 'flat';
      return '<div class="cue-skill" data-component="Skill row"><span class="cue-skill-name">' + l[0] + '</span>' +
        '<span class="cue-skill-bar"><span class="cue-skill-track"><i class="cue-skill-fill cue-skill-fill--' + dir + '" style="--value:' + avg + '%;--i:' + i + '"></i></span><span class="cue-skill-people">' + dots + '</span></span>' +
        '<span class="cue-skill-score">' + avg + '</span>' +
        '<span class="cue-skill-end">' + (avg < 70 ? '<span class="cue-status-pill cue-status-pill--down">Weakest</span>' : '') + '</span></div>';
    }).join('') + '</div>';
    return practiceHead('results', '') +
      '<section class="cue-section cue-rise" style="--i:1"><div class="cue-section-head"><h2>By person</h2><span>Pass at 80 of 100 \u00b7 Up 12 from the first rounds</span></div>' + people + '</section>' +
      '<section class="cue-section cue-rise" style="--i:2"><div class="cue-section-head"><h2>By scorecard line</h2><span>Points out of 100</span></div>' + team + '</section>';
  }

  /* Screen 12: Daniel and the 1:1 plan */
  function omarTimeline() {
    var bars = '';
    for (var i = 0; i < 120; i++) {
      var h = 18 + Math.abs(Math.sin(i * 1.1 + 2) * 0.5 + Math.sin(i * 0.29) * 0.5) * 82;
      bars += '<i style="height:' + h.toFixed(0) + '%"></i>';
    }
    var pins = [['1:48', 'Price came up before the problem'], ['5:20', 'Agreed to “think about it”']].map(function (m) {
      var p = m[0].split(':'), sec = +p[0] * 60 + +p[1];
      return '<button class="cue-pin" style="--x:' + (sec / 480 * 100).toFixed(1) + '%;--c:var(--viz-down)" data-tip="' + m[0] + ' · ' + m[1].replace(/"/g, '&quot;') + '" data-play aria-label="Replay ' + m[0] + '"><span>' + m[0] + '</span></button>';
    }).join('');
    return '<div class="cue-timeline"><div class="cue-timeline-wave">' + bars + '</div>' + pins + '</div>' +
      '<div class="cue-timeline-axis"><span>0:00</span><span>Best round · 68</span><span>8:00</span></div>';
  }
  function omar() {
    var plan = '<ol class="cue-plan">' +
      '<li><span class="cue-plan-n">1</span><div><b>Watch Dana’s clip together</b><span>40 sec · how Dana shows the cost before the price</span></div>' + play('0:40', 'Dana’s clip') + '</li>' +
      '<li><span class="cue-plan-n">2</span><div><b>Practice one line out loud</b><span class="cue-editable" contenteditable="true" spellcheck="false">“What does a late shipment cost you?”</span></div></li>' +
      '<li><span class="cue-plan-n">3</span><div><b>One harder round with Mark</b><span>Before the Pinecrest price call on Friday</span></div></li>' +
    '</ol>';
    var scores = '<div class="cue-myskills">' + SCORECARD.map(function (l, i) {
      var v = RESULTS[3][3][i];
      var avg = Math.round(RESULTS.reduce(function (a, r) { return a + r[3][i]; }, 0) / RESULTS.length);
      return '<div class="cue-myskill"><span class="cue-myskill-name">' + l[0] + '</span>' +
        '<div class="cue-myskill-line"><span class="cue-myskill-bar"><i style="--value:' + v + '%;--i:' + i + ';background:color-mix(in srgb, var(--person-omar) 40%, white)"></i><em style="--team:' + avg + '%" data-team-tip="Team average ' + avg + '"></em></span><b>' + v + '</b></div></div>';
    }).join('') + '</div>';
    return pagehead('Results', 10,
        confirmBtn('Add to Thursday’s 1:1', 'calendar', 'Added to your 1:1 with Daniel, Thu 10:00.', 'In Thursday’s 1:1', 'One week later', 12) +
        moreMenu('person')) +
      '<div class="cue-split">' +
        '<div class="cue-split-main">' +
          '<div class="cue-person-head cue-rise">' + '<img class="cue-avatar cue-avatar--xl" src="assets/people/omar.jpg" alt="Daniel Shaw">' +
            '<div><h1 class="cue-h1">Daniel Shaw</h1><p class="cue-sub">Account executive · Best round <b>68</b> · 3 rounds</p></div></div>' +
          '<p class="cue-summary cue-rise" style="--i:1">Daniel asks good questions, but brings up price in the first 3 minutes. No number on the value yet.</p>' +
          '<section class="cue-card cue-rise" style="--i:2"><div class="cue-card-head"><h2>Two moments to watch</h2></div>' + omarTimeline() + '</section>' +
          '<section class="cue-card cue-rise" style="--i:3"><div class="cue-card-head"><h2>1:1 plan · 15 min</h2><span class="cue-card-note">' + ic('sparkle', 'cue-ic--xs') + ' Drafted by Cue, edit anything</span></div>' + plan + '</section>' +
        '</div>' +
        '<aside class="cue-split-side cue-rise" style="--i:3">' +
          '<div class="cue-section-head"><h2>Daniel’s scores</h2><span>Points out of 100</span></div>' +
          '<div class="cue-legend cue-legend--plain"><span><i class="is-you" style="background:var(--person-omar)"></i>Daniel</span><span><i class="is-team"></i>Team average</span></div>' +
          scores +
          '<div class="cue-side-deal"><span class="cue-field-label">Next real call</span><b>Pinecrest Supply · Price call</b><span>Fri, Oct 24 · $60K</span></div>' +
        '</aside>' +
      '</div>';
  }

  /* Screen 13: the practice overview, one week later. Noa opens it from her home (not shown); the breadcrumb says where it sits */
  var REAL = [
    ['sam', 'Acme Logistics', [['Value before price', 1], ['No discount', 1], ['Next step set', 1]], 'Moved to contract', 'Oct 23'],
    ['lucia', 'Northline Foods', [['Value before price', 1], ['5% discount (team: 18%)', 1], ['Next step set', 1]], 'In negotiation', 'Oct 20'],
    ['theo', 'Brightline Retail', [['Price came up early', 0], ['Next step set', 1]], 'Follow-up Tue', 'Oct 21'],
    ['omar', 'Pinecrest Supply', null, 'Price call Fri, after the 1:1', '']
  ];
  function realCalls() {
    var rows = '<div class="cue-rows cue-rows--table">' + REAL.map(function (r) {
      var checks = r[2] ? r[2].map(function (c) {
        return '<span class="cue-check-chip">' + ic(c[1] ? 'check' : 'close', 'cue-ic--xs cue-check-' + (c[1] ? 'yes' : 'no')) + c[0] + '</span>';
      }).join('') : '<span class="cue-row-quiet">Not yet</span>';
      return '<div class="cue-row cue-real"' + (r[4] ? ' data-tip="From the call recording, ' + r[4] + '"' : '') + ' data-component="Real call row">' + ava(r[0], 'md') +
        '<span class="cue-row-name"><b>' + fullName(r[0]) + ' · ' + r[1] + '</b><span class="cue-checks">' + checks + '</span></span>' +
        '<span class="cue-real-out">' + r[3] + '</span>' +
        (r[4] ? play('0:30', P[r[0]].name + '’s call') : '<span class="cue-real-gap"></span>') +
      '</div>';
    }).join('') + '</div>';
    return practiceHead('overview', '', 'impact') +
      '<section class="cue-signal cue-rise" data-component="Early signal">' +
        '<div><span class="cue-field-label">Early signal \u00b7 one week in</span><h2>Lost when price comes up</h2><p class="cue-sub">These 4, before and after the practice</p></div>' +
        '<div class="cue-signal-bars">' +
          '<div class="cue-compare-row"><span>Before</span><span class="cue-compare-track"><i class="is-down" style="--value:58%;transform:none"></i></span><b>58%</b></div>' +
          '<div class="cue-compare-row"><span>This week</span><span class="cue-compare-track"><i class="is-up" style="--value:46%;transform:none"></i></span><b>46%</b></div>' +
        '</div>' +
      '</section>' +
      '<section class="cue-section cue-rise" style="--i:1"><div class="cue-section-head"><h2>How the real calls went</h2><span>Checked from call recordings, not from practice</span></div>' + rows + '</section>';
  }

  /* Screen 14: monthly impact */
  function impact() {
    var tiles = [
      ['Deals won when price comes up', '41%', '26%', 41, 26],
      ['Average discount', '9%', '17%', 9, 17],
      ['Deals saved', '$310K', '', 0, 0]
    ].map(function (t, i) {
      return '<div class="cue-stat cue-stat--impact cue-rise" style="--i:' + i + '" data-component="Impact tile">' +
        '<div class="cue-stat-text"><span class="cue-stat-label">' + t[0] + '</span><span class="cue-stat-value">' + t[1] + (t[2] ? '<small>vs ' + t[2] + ' not yet</small>' : '<small>in 3 deals</small>') + '</span></div>' +
        (t[2] ? '<div class="cue-pair"><i style="--value:' + (t[3] / 50 * 100) + '%;background:var(--viz-up)"></i><i style="--value:' + (t[4] / 50 * 100) + '%;background:var(--viz-base)"></i></div>' : '') +
      '</div>';
    }).join('');
    var chart = C.area({
      id: 'impact', w: 900, h: 200, yMin: 20, yMax: 45, ticks: [25, 35, 45], unit: '%',
      x: ['Sep 15', '', 'Sep 29', '', 'Oct 13', '', 'Oct 27'],
      tipX: ['Week of Sep 15', 'Week of Sep 22', 'Week of Sep 29', 'Week of Oct 6', 'Week of Oct 13', 'Week of Oct 20', 'Week of Oct 27'],
      marker: { i: 4, text: 'Practice' },
      label: 'Deals won when price comes up, by week. People who practiced rose from 27% to 41%. People who have not practiced yet stayed near 26%.',
      series: [
        { name: 'Practiced', kind: 'focus', values: [27, 28, 26, 27, 31, 37, 41] },
        { name: 'Not yet', kind: 'base', values: [28, 27, 28, 26, 27, 26, 26] }
      ]
    });
    return practiceHead('impact',
        '<button class="cue-btn cue-btn--secondary" data-toast="Link copied. Send it to your VP or your team.">' + ic('share') + 'Share</button>' +
        '<button class="cue-btn" data-go="14" data-hint>See Ira\u2019s view' + ic('arrowRight') + '</button>') +
      filterBar(dropdown('period', '<span>Period</span>', 'October', [{ v: 'oct', title: 'October', sub: 'Since the practice was sent', on: true }, { v: 'quarter', title: 'This quarter' }, { v: 'sep', title: 'September', sub: 'Before the practice' }])) +
      '<div class="cue-stats">' + tiles + '</div>' +
      '<section class="cue-card cue-rise" style="--i:3"><div class="cue-card-head"><h2>Holding price, week by week</h2></div>' +
        '<div class="cue-legend cue-legend--plain"><span><i class="is-up"></i>Practiced \u00b7 4 people</span><span><i class="is-base"></i>Not yet \u00b7 3 people</span></div>' + chart +
        '<div class="cue-skills-hint">' + ic('info', 'cue-ic--sm') + 'Early signal: 4 people, 2 weeks. We check again at quarter end.</div>' +
      '</section>';
  }

  /* Screen 15: across teams (Ira) */
  var TEAMS = [['Noa Levin’s team', 15, '27% → 42%', 'noa'], ['Mid-market West', 12, '24% → 36%'], ['Enterprise', 9, '31% → 40%'], ['Mid-market East', 7, '25% → 32%'], ['EMEA', 4, '29% → 33%'], ['Partners', 2, '22% → 24%']];
  var WORKS = [['Doubtful buyers teach more', 9, ['Doubtful', 14], ['Friendly', 5]], ['Two rounds beat one', 6, ['Two rounds', 13], ['One round', 7]], ['Practice close to the real call', 5, ['Within 2 days', 12], ['Earlier', 7]]];
  function acrossTeams() {
    var teams = '<div class="cue-rows">' + TEAMS.map(function (t, i) {
      return '<div class="cue-row" data-tip="Deals won when price comes up: ' + t[2] + '" data-component="Team row">' +
        (t[3] ? ava(t[3], 'sm') : '<span class="cue-team-dot"></span>') +
        '<span class="cue-row-name">' + t[0] + '</span>' +
        '<span class="cue-minibar cue-minibar--lift"><i style="--value:' + (t[1] / 16 * 100) + '%;--c:var(--viz-up);--i:' + i + '"></i></span>' +
        '<b class="cue-row-num">+' + t[1] + '</b></div>';
    }).join('') + '</div>';
    var works = '<div class="cue-works">' + WORKS.map(function (w) {
      return '<div class="cue-work" data-component="What works row"><div class="cue-work-top"><span>' + w[0] + '</span>' + delta('up', w[1] + ' pts') + '</div>' +
        '<div class="cue-work-more">' +
          '<div class="cue-compare-row"><span>' + w[2][0] + '</span><span class="cue-compare-track"><i class="is-up" style="--value:' + (w[2][1] / 16 * 100) + '%"></i></span><b>+' + w[2][1] + '</b></div>' +
          '<div class="cue-compare-row"><span>' + w[3][0] + '</span><span class="cue-compare-track"><i class="is-base" style="--value:' + (w[3][1] / 16 * 100) + '%"></i></span><b>+' + w[3][1] + '</b></div>' +
        '</div></div>';
    }).join('') + '</div>';
    var trend = C.area({
      id: 'template', w: 900, h: 200, yMin: 20, yMax: 45, ticks: [25, 35, 45], unit: '%',
      x: ['Aug 25', '', 'Sep 8', '', 'Sep 22', '', 'Oct 6', '', 'Oct 20'],
      tipX: ['Week of Aug 25', 'Week of Sep 1', 'Week of Sep 8', 'Week of Sep 15', 'Week of Sep 22', 'Week of Sep 29', 'Week of Oct 6', 'Week of Oct 13', 'Week of Oct 20'],
      markers: [{ i: 1, text: '2 teams' }, { i: 4, text: '4 teams' }, { i: 7, text: '6 teams' }],
      label: 'Deals won when price comes up, by week, all 6 teams. People who practiced rose from 27% to 38% and held there as more teams joined. People who have not practiced yet stayed near 27%.',
      series: [
        { name: 'Practiced', kind: 'focus', values: [27, 30, 32, 34, 35, 36, 37, 38, 38] },
        { name: 'Not yet', kind: 'base', values: [27, 26, 27, 26, 27, 26, 27, 26, 27] }
      ]
    });
    return objectHead({
        crumb: 'Library', crumbNote: 'All of Ira\u2019s templates. This walkthrough skips the list.',
        title: 'Pricing template', sub: 'Used by 6 teams \u00b7 31 people practiced \u00b7 By Ira Klein, enablement',
        tabs: [
          ['setup', 'Setup', 'The master buyer, brief, scorecard and reference calls, and what team leads may change. Not part of this walkthrough.'],
          ['teams', 'Teams', 'Which teams use it, who leads each, and how many finished. Not part of this walkthrough.'],
          ['impact', 'Impact', 14]
        ],
        page: 'impact',
        actions: '<button class="cue-btn cue-btn--secondary" data-toast="Rolled out to 3 more teams. Their leads get a draft to approve.">' + ic('team') + 'Roll out to 3 more teams</button>' +
          confirmBtn('Update the template', 'sparkle', 'Template updated: doubtful buyer, two rounds, due 2 days before the call.', 'Template updated', 'Start over', 0)
      }) +
      filterBar(dropdown('tperiod', '<span>Period</span>', 'This quarter', [{ v: 'q', title: 'This quarter', on: true }, { v: 'oct', title: 'October' }, { v: 'all', title: 'Since launch' }])) +
      '<section class="cue-card cue-rise" data-component="Trend card"><div class="cue-card-head"><h2>Holding price, week by week</h2></div>' +
        '<div class="cue-legend cue-legend--plain"><span><i class="is-up"></i>Practiced \u00b7 31 people</span><span><i class="is-base"></i>Not yet \u00b7 22 people</span></div>' + trend + '</section>' +
      '<div class="cue-grid cue-grid--match cue-rise" style="--i:1">' +
        '<div class="cue-col cue-col--even">' + card('How much each team improved', teams, '<span class="cue-card-note">Points</span>') + '</div>' +
        '<div class="cue-col cue-col--even">' + card('What works', works, '<span class="cue-card-note">' + ic('sparkle', 'cue-ic--xs') + ' Cue compares versions on its own</span>') + '</div>' +
      '</div>';
  }

  var STATES = [
    { id: 'home', loop: 0, nav: 'home', url: 'cue.app/home', caption: 'Noa, a sales team lead, opens Cue on Thursday morning.', render: home, after: homeAfter },
    { id: 'insight', loop: 0, nav: 'home', url: 'cue.app/insights/pricing', caption: 'Noa opens the insight to see why deals are lost.', render: insightPage },
    { id: 'building', loop: 1, nav: 'practice', url: 'cue.app/practice/new', caption: 'Cue drafts a practice from Ira’s template and the lost calls.', render: building, after: buildingAfter, auto: 3400 },
    { id: 'draft', loop: 1, nav: 'practice', url: 'cue.app/practice/hold-your-price', caption: 'Noa checks the draft and edits anything.', render: draft },
    { id: 'send', loop: 1, nav: 'practice', url: 'cue.app/practice/hold-your-price', caption: 'One message, in Slack and email, due before each real call.', render: draft, overlay: sendSheet },
    { id: 'channel', loop: 2, frame: function () { return ui.channel; }, url: function () { return ui.channel === 'gmail' ? 'mail.google.com/mail/u/0/#inbox' : 'Slack'; }, caption: 'Sam gets the practice where Sam already works.', render: channelView, extra: channelSwitch },
    { id: 'before', loop: 2, nav: 'practice', who: 'sam', url: 'cue.app/practice/hold-your-price', caption: 'Sam sees who the buyer is and how the call is scored.', render: beforeCall },
    { id: 'call', loop: 2, nav: 'practice', who: 'sam', frame: 'call', url: function () { return ui.callPhase === 'scoring' ? 'cue.app/practice/hold-your-price/round-2' : 'cue.app/practice/hold-your-price/call'; }, caption: function () { return ui.callPhase === 'scoring' ? 'Cue scores the round line by line and finds the moments to fix.' : 'An 8 minute call with Mark, an AI avatar built on Kaltura.'; }, render: callView, after: callAfter },
    { id: 'feedback', loop: 2, nav: 'practice', who: 'sam', url: 'cue.app/practice/hold-your-price/round-2', caption: 'Sam gets a score and three moments to fix, then shares the best round.', render: feedback },
    { id: 'samhome', loop: 2, nav: 'home', who: 'sam', url: 'cue.app/home', caption: 'The next morning: Sam\u2019s week, and Noa\u2019s note on the round.', render: samHome },
    { id: 'results', loop: 3, nav: 'practice', url: 'cue.app/practice/hold-your-price/results', caption: 'Back to Noa. Everyone is done, and Cue shows where each person stands.', render: results },
    { id: 'omar', loop: 3, nav: 'team', url: 'cue.app/team/daniel', caption: 'Noa gets a ready plan for the 1:1 with Daniel.', render: omar },
    { id: 'real', loop: 4, nav: 'practice', url: 'cue.app/practice/hold-your-price', caption: 'A week later, Noa opens the practice from her home to see how the real calls went.', render: realCalls },
    { id: 'impact', loop: 4, nav: 'practice', url: 'cue.app/practice/hold-your-price/impact', caption: 'End of October. The practice\u2019s Impact page shows if the numbers moved, and how sure we are.', render: impact },
    { id: 'teams', loop: 4, nav: 'library', who: 'ira', url: 'cue.app/library/pricing-template', caption: 'Ira, head of enablement, sees what works and updates the template. The loop closes.', render: acrossTeams }
  ];

  /* Shell */
  var root = document.getElementById('cue-proto');
  root.innerHTML =
    '<div class="cue-window" data-component="Browser window">' +
      '<div class="cue-chrome"><div class="cue-chrome-dots"><i></i><i></i><i></i></div>' +
        '<div class="cue-chrome-url">' + ic('lock') + '<span class="cue-url-text"></span></div><div class="cue-chrome-end"></div></div>' +
      '<div class="cue-app">' + side() + '<main class="cue-main"></main></div>' +
    '</div>';
  var win = root.querySelector('.cue-window');
  var main = root.querySelector('.cue-main');

  /* The first screen of each move: Spot, Build, Practice, Coach, Prove (see content.md) */
  var ACT_START = [0, 2, 5, 10, 12];
  var TOTAL = 15;

  /* Menus open downward. Only when there is no room left in the window, they open upward */
  function flipMenus() {
    var bottom = win.getBoundingClientRect().bottom - 12;
    root.querySelectorAll('.cue-dd-menu').forEach(function (m) {
      if (m.getBoundingClientRect().bottom > bottom) m.classList.add('is-up');
    });
  }
  function render() {
    var s = STATES[ui.step];
    clearInterval(ui.callTimer);
    clearInterval(ui.clockTimer);
    (ui.scoreTimers || []).forEach(clearTimeout);
    ui.scoreTimers = [];
    var frame = typeof s.frame === 'function' ? s.frame() : (s.frame || 'cue');
    win.setAttribute('data-frame', frame);
    var sideEl = root.querySelector('.cue-side');
    if (sideEl) sideEl.outerHTML = side(s.nav, s.who);
    main.innerHTML = s.render();
    var still = !!ui.still;
    main.classList.toggle('is-still', still);
    if (!still) main.scrollTop = 0;
    ui.still = false;
    document.querySelectorAll('[data-proto-extra]').forEach(function (el) { el.innerHTML = s.extra ? s.extra() : ''; });
    var oldToast = win.querySelector('.cue-toast');
    if (oldToast) oldToast.remove();
    if (s.toast) setTimeout(function () { toast(s.toast); }, 250);
    var old = root.querySelector('.cue-overlay');
    var stay = !!old && still && !!s.overlay;
    if (old) old.remove();
    if (s.overlay) {
      var ov = document.createElement('div');
      ov.className = 'cue-overlay' + (stay ? ' is-still' : '');
      ov.innerHTML = s.overlay();
      root.querySelector('.cue-app').appendChild(ov);
    }
    flipMenus();
    if (s.after) s.after();
    clearTimeout(ui.autoTimer);
    if (s.auto) {
      var here = ui.step;
      ui.autoTimer = setTimeout(function () { if (ui.step === here) go(here + 1); }, s.auto);
    }
    root.querySelector('.cue-url-text').textContent = typeof s.url === 'function' ? s.url() : s.url;
    if (protoPage && history.replaceState) history.replaceState(null, '', '#step-' + (ui.step + 1));
    document.querySelectorAll('[data-proto-caption]').forEach(function (el) { el.textContent = typeof s.caption === 'function' ? s.caption() : s.caption; });
    document.querySelectorAll('[data-proto-step]').forEach(function (el) { el.textContent = 'Step ' + (ui.step + 1) + ' of ' + TOTAL; });
    document.querySelectorAll('.shell-loop [data-act]').forEach(function (b) {
      var i = +b.getAttribute('data-act');
      b.classList.toggle('is-current', i === s.loop);
      b.disabled = ACT_START[i] >= STATES.length;
      b.title = b.disabled ? 'Coming in the next build step' : '';
    });
    document.querySelectorAll('[data-proto="prev"]').forEach(function (b) { b.disabled = ui.step === 0; });
    document.querySelectorAll('[data-proto="next"]').forEach(function (b) { b.disabled = ui.step >= STATES.length - 1; });
    if (protoPage) {
      /* The progress line, and Next pulses when the screen itself has nothing to click */
      document.querySelectorAll('.proto-caption').forEach(function (el) { el.style.setProperty('--p', (ui.step + 1) / TOTAL); });
      var lead = !root.querySelector('[data-hint]') && !s.auto && ui.step < STATES.length - 1;
      document.querySelectorAll('[data-proto="next"]').forEach(function (b) { b.toggleAttribute('data-hint', lead); });
    }
    fit();
  }

  function toast(msg) {
    var old = win.querySelector('.cue-toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.className = 'cue-toast';
    el.setAttribute('role', 'status');
    el.innerHTML = ic('arrowRight', 'cue-ic--sm') + '<span></span>';
    el.querySelector('span').textContent = msg;
    win.appendChild(el);
    clearTimeout(ui.toastTimer);
    ui.toastTimer = setTimeout(function () { el.remove(); }, 2600);
  }

  /* Scale the 1280px window to fit the stage, or the whole screen in full screen */
  var html = document.documentElement;
  var fitBox = document.querySelector('.shell-stage-fit');
  /* prototype.html: the prototype on its own page (index.html does not set this) */
  var protoPage = html.hasAttribute('data-proto-page');
  function fit() {
    if (!fitBox) return;
    var s;
    if (protoPage) {
      var box = fitBox.parentElement;
      s = Math.min(1, (box.clientWidth - 48) / 1280, (box.clientHeight - 48) / win.offsetHeight);
      fitBox.style.width = Math.floor(1280 * s) + 'px';
    } else if (html.classList.contains('is-full')) {
      s = Math.min(1, (window.innerWidth - 48) / 1280, (window.innerHeight - 72 - 24) / win.offsetHeight);
      fitBox.style.width = Math.floor(1280 * s) + 'px';
    } else {
      fitBox.style.width = '';
      s = Math.min(1, fitBox.clientWidth / 1280);
    }
    win.style.transform = s < 1 ? 'scale(' + s + ')' : '';
    fitBox.style.height = Math.ceil(win.offsetHeight * s) + 'px';
  }
  window.addEventListener('resize', fit);

  function full(on) {
    html.classList.toggle('is-full', on);
    fit();
  }

  /* One click router for the product */
  root.addEventListener('click', function (e) {
    if (ui.dd && !e.target.closest('.cue-dd')) { ui.dd = null; changeDraft(null); }
    root.querySelectorAll('.cue-more.is-open').forEach(function (m) { if (!m.contains(e.target)) closeMore(m); });
    var t = e.target.closest('[data-more],[data-more-pick],[data-dd],[data-dd-pick],[data-end-call],[data-toast],[data-go],[data-play],[data-sent],[data-next-screen],[data-shared],[data-confirm],[data-weight],[data-ai],[data-ai-open],[data-add-part],[data-remove-part],[data-ref-add],[data-ref-remove]');
    if (!t) return;
    e.stopPropagation();
    if (t.hasAttribute('data-more')) {
      var mbox = t.parentNode;
      if (mbox.classList.contains('is-open')) { closeMore(mbox); return; }
      mbox.classList.add('is-open');
      t.setAttribute('aria-expanded', 'true');
      return;
    }
    if (t.hasAttribute('data-more-pick')) {
      var mp = t.getAttribute('data-more-pick').split('|');
      closeMore(t.closest('.cue-more'));
      toast(MENUS[mp[0]][+mp[1]][2]);
      return;
    }
    if (t.hasAttribute('data-go')) { go(+t.getAttribute('data-go')); return; }
    if (t.hasAttribute('data-play')) {
      /* A short fake playback: the wave moves for 3 seconds, one at a time */
      root.querySelectorAll('[data-play].is-playing').forEach(function (b) { if (b !== t) b.classList.remove('is-playing'); });
      t.classList.add('is-playing');
      setTimeout(function () { t.classList.remove('is-playing'); }, 3000);
      return;
    }
    if (t.hasAttribute('data-add-part')) {
      /* A new part at the end, its name selected so you can type over it */
      var list = main.querySelector('[data-keep="' + t.getAttribute('data-add-part') + '"]');
      list.insertAdjacentHTML('beforeend', partHTML('New part.', 'Write it here.'));
      var block = list.lastElementChild;
      var para = block.querySelector('[contenteditable]');
      para.focus();
      var range = document.createRange();
      range.selectNodeContents(para.firstChild);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      flashEl(block);
      saveKeep(list);
      return;
    }
    if (t.hasAttribute('data-ref-add') || t.hasAttribute('data-ref-remove')) {
      var rid = t.getAttribute('data-ref-add') || t.getAttribute('data-ref-remove');
      if (t.hasAttribute('data-ref-add')) { ui.refs.push(rid); ui.refFlash = rid; }
      else ui.refs = ui.refs.filter(function (x) { return x !== rid; });
      ui.ddStill = true;
      changeDraft('refs');
      ui.ddStill = false;
      ui.refFlash = null;
      return;
    }
    if (t.hasAttribute('data-remove-part')) {
      var gone = t.closest('.cue-part');
      var from = gone.parentNode;
      gone.classList.add('is-leaving');
      setTimeout(function () { gone.remove(); saveKeep(from); }, 200);
      return;
    }
    if (t.hasAttribute('data-ai-open')) {
      ui.aiOpen = true;
      changeDraft(null);
      var box = root.querySelector('[data-ai-input]');
      if (box) box.focus();
      return;
    }
    if (t.hasAttribute('data-end-call')) { ui.callPhase = 'scoring'; ui.still = true; render(); return; }
    if (t.hasAttribute('data-weight')) { var wv = t.getAttribute('data-weight').split('|'); moveWeight(+wv[0], +wv[1]); return; }
    if (t.hasAttribute('data-ai')) {
      var inp = root.querySelector('[data-ai-input]');
      aiChange(t.getAttribute('data-ai'), inp ? inp.value.trim() : '');
      return;
    }
    if (t.hasAttribute('data-dd')) {
      var key = t.getAttribute('data-dd');
      ui.dd = ui.dd === key ? null : key;
      changeDraft(null);
      return;
    }
    if (t.hasAttribute('data-dd-pick')) {
      var pk = t.getAttribute('data-dd-pick').split('|');
      ui.dd = null;
      if (pk[0] === 'length') ui.length = +pk[1];
      if (pk[0] === 'pass') ui.pass = +pk[1];
      if (pk[0] === 'voice') ui.voice = +pk[1];
      if (pk[0] === 'period') { changeDraft(null); if (pk[1] !== 'oct') toast('This walkthrough shows October.'); return; }
      if (pk[0] === 'tperiod') { changeDraft(null); if (pk[1] !== 'q') toast('This walkthrough shows this quarter.'); return; }
      if (pk[0].indexOf('due-') === 0) ui.due[pk[0].slice(4)] = +pk[1];
      if (pk[0] === 'addwho') {
        ui.whoList.push(pk[1]);
        ui.who[pk[1]] = true;
        ui.due[pk[1]] = WHO_INFO[pk[1]][0] ? WHO_INFO[pk[1]][1] : 6;
        ui.whoFlash = pk[1];
        changeDraft('who');
        ui.whoFlash = null;
        return;
      }
      if (pk[0] === 'mood') { setMood(pk[1]); changeDraft('mood'); flashEl(main.querySelector('[data-mood-text]')); return; }
      if (pk[0] === 'avatar') {
        if (pk[1] === 'more') { changeDraft(null); toast('Opens the Kaltura avatar library.'); return; }
        if (pk[1] === ui.avatar) { changeDraft(null); return; }
        var was = avFirst();
        ui.avatar = pk[1];
        ui.voice = av()[2];
        ['brief', 'buyer'].forEach(function (k) { if (ui.keep[k]) ui.keep[k] = ui.keep[k].split(was).join(avFirst()); });
        changeDraft('avatar');
        flashEl(main.querySelector('[data-dd="voice"]'));
        toast(avFirst() + ' plays the buyer now, with a ' + VOICES[ui.voice].toLowerCase() + ' voice.');
        return;
      }
      if (pk[0] === 'lang') { if (ui.lang !== +pk[1]) toast(avFirst() + ' speaks 30+ languages, powered by Kaltura avatars.'); ui.lang = +pk[1]; }
      if (pk[0] === 'template' && pk[1] !== ui.template) { changeDraft(null); toast('Switching templates rebuilds the draft. This walkthrough stays on Pricing.'); return; }
      changeDraft(pk[0]);
      return;
    }
    if (t.hasAttribute('data-confirm')) {
      var c = t.getAttribute('data-confirm').split('|');
      toast(c[0]);
      t.outerHTML = '<span class="cue-pill cue-pill--pass cue-pill--lg">' + ic('check', 'cue-ic--xs') + c[1] + '</span>' +
        '<button class="cue-btn" data-go="' + c[3] + '" data-hint>' + c[2] + ic('arrowRight') + '</button>';
      return;
    }
    if (t.hasAttribute('data-shared')) {
      toast('Shared with Noa.');
      t.outerHTML = '<span class="cue-pill cue-pill--pass cue-pill--lg">' + ic('check', 'cue-ic--xs') + 'Shared with Noa</span>' +
        '<button class="cue-btn" data-go="9" data-hint>Go to my home' + ic('arrowRight') + '</button>';
      return;
    }
    if (t.hasAttribute('data-sent')) {
      var body = root.querySelector('[data-send-body]');
      if (body) body.innerHTML = sentState();
      return;
    }
    if (t.hasAttribute('data-next-screen')) {
      if (ui.step + 1 < STATES.length) go(ui.step + 1);
      else toast('Sam\u2019s side comes in the next build step.');
      return;
    }
    toast(t.getAttribute('data-toast'));
  });
  C.bindTips(root);
  root.addEventListener('mouseover', function (e) {
    var row = e.target.closest && e.target.closest('[data-row-i]');
    root.querySelectorAll('[data-seg-i]').forEach(function (seg) {
      seg.classList.toggle('is-dim', !!row && seg.getAttribute('data-seg-i') !== row.getAttribute('data-row-i'));
    });
  });
  root.addEventListener('input', function (e) {
    var keep = e.target.closest && e.target.closest('[data-keep]');
    if (keep) saveKeep(keep);
    if (e.target.hasAttribute && e.target.hasAttribute('data-ref-search')) {
      var q = e.target.value.trim().toLowerCase();
      var menu = e.target.closest('.cue-refs');
      var shown = 0;
      menu.querySelectorAll('.cue-ref[data-find]').forEach(function (row) {
        var hit = !q || row.getAttribute('data-find').indexOf(q) >= 0;
        row.hidden = !hit;
        if (hit) shown++;
      });
      menu.querySelector('[data-ref-none]').hidden = shown > 0;
    }
    if (!e.target.hasAttribute || !e.target.hasAttribute('data-pass')) return;
    ui.pass = +e.target.value;
    e.target.style.setProperty('--p', ((ui.pass - 60) / 35 * 100) + '%');
    var lab = root.querySelector('[data-pass-label]');
    if (lab) lab.textContent = ui.pass;
  });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.hasAttribute && e.target.hasAttribute('data-ai-input')) {
      e.preventDefault();
      aiChange('text', e.target.value.trim());
    }
  });
  root.addEventListener('change', function (e) {
    var w = e.target.getAttribute && e.target.getAttribute('data-who');
    if (!w) return;
    ui.who[w] = e.target.checked;
    var n = whoCount();
    var row = e.target.closest('.cue-who');
    if (row) row.classList.toggle('is-off', !e.target.checked);
    root.querySelectorAll('[data-send-label]').forEach(function (b) { b.lastChild.textContent = 'Send to ' + n + ' people'; });
    root.querySelectorAll('[data-send-count]').forEach(function (h) { h.textContent = 'Send to ' + n + ' people'; });
    root.querySelectorAll('[data-sent]').forEach(function (b) { b.disabled = !n; });
  });

  /* Shell controls: Back, Next, Start over, Full screen, and the five moves */
  document.addEventListener('click', function (e) {
    var ch = e.target.closest('[data-channel]');
    if (ch) { ui.channel = ch.getAttribute('data-channel'); render(); return; }
    var c = e.target.closest('[data-proto],[data-act]');
    if (!c || c.disabled) return;
    if (c.hasAttribute('data-act')) { go(ACT_START[+c.getAttribute('data-act')]); return; }
    var a = c.getAttribute('data-proto');
    if (a === 'prev') go(ui.step - 1);
    if (a === 'next') go(ui.step + 1);
    if (a === 'restart') go(0);
    if (a === 'full') full(!html.classList.contains('is-full'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ui.dd) { ui.dd = null; changeDraft(null); return; }
    var openMore = root.querySelector('.cue-more.is-open');
    if (e.key === 'Escape' && openMore) { closeMore(openMore); openMore.querySelector('[data-more]').focus(); return; }
    if (e.key === 'Escape' && document.activeElement && document.activeElement.hasAttribute('data-ai-input')) { document.activeElement.blur(); return; }
    if (e.key === 'Escape' && html.classList.contains('is-full')) full(false);
    if (!html.classList.contains('is-full') && !protoPage) return;
    if (protoPage && e.target.closest && e.target.closest('input, textarea, [contenteditable="true"]')) return;
    if (e.key === 'ArrowRight') go(ui.step + 1);
    if (e.key === 'ArrowLeft') go(ui.step - 1);
  });

  function go(i) {
    ui.aiOpen = false;
    ui.dd = null;
    ui.callPhase = 'call';
    var next = Math.max(0, Math.min(STATES.length - 1, i));
    if (next === ui.step && main.innerHTML) return;
    ui.step = next;
    render();
  }

  window.cueProto = { go: go, fit: fit, full: full };
  /* On its own page, a link can open any step: prototype.html#step-8 */
  function stepFromHash() {
    var m = /^#step-(\d+)$/.exec(location.hash);
    return m ? Math.max(0, Math.min(STATES.length - 1, +m[1] - 1)) : -1;
  }
  if (protoPage) {
    if (stepFromHash() >= 0) ui.step = stepFromHash();
    window.addEventListener('hashchange', function () { var k = stepFromHash(); if (k >= 0) go(k); });
  }
  render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
