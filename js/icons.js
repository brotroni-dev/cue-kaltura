/* Cue line icons. 24px grid, 1.5px stroke, round caps.
   Each one becomes a Figma icon component with the same name. */
(function () {
  var P = {
    home: 'M3.5 10.5 12 3.5l8.5 7M5.5 9v11h4.75v-6h3.5v6h4.75V9',
    team: 'M15.5 20v-1.5a3.5 3.5 0 0 0-3.5-3.5H7a3.5 3.5 0 0 0-3.5 3.5V20M9.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20.5 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 4.6a3.5 3.5 0 0 1 0 6.8',
    practice: 'M4 10v4M8 7v10M12 4v16M16 8v8M20 10.5v3',
    results: 'M4 4v16h16M7.5 15l3.5-4 3 2.5 5-6',
    library: 'M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2ZM12 6.5v14',
    settings: 'M4 7h8M16 7h4M4 17h2M10 17h10M14 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4M8 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.5M12 16.8h.01',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M20 20l-4-4',
    sparkle: 'M11 4c.6 4 2.6 6 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5C8.4 10 10.4 8 11 4ZM18.5 15c.25 1.4.85 2 2.25 2.25-1.4.25-2 .85-2.25 2.25-.25-1.4-.85-2-2.25-2.25 1.4-.25 2-.85 2.25-2.25Z',
    bell: 'M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15ZM10 20.5a2 2 0 0 0 4 0',
    arrowRight: 'M5 12h14M13 6l6 6-6 6',
    arrowUpRight: 'M7 17 17 7M8.5 7H17v8.5',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    checkCircle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M8 12.5l2.7 2.7L16 10',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2',
    lock: 'M6.5 11h11v9h-11ZM9 11V8.5a3 3 0 0 1 6 0V11',
    share: 'M12 15V3.5M7.5 8 12 3.5 16.5 8M5 13v7h14v-7',
    play: 'M8 5.5v13l10.5-6.5Z',
    info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 11v5.5M12 7.8h.01',
    arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
    pencil: 'M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3ZM13.5 7.5l3 3',
    close: 'M6 6l12 12M18 6 6 18',
    calendar: 'M5 6h14v14H5ZM5 10h14M9 4v4M15 4v4',
    send: 'M4 12 20 4l-6 16-3-7Z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M5 20a7 7 0 0 1 14 0',
    mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3M18.5 11a6.5 6.5 0 0 1-13 0M12 17.5V21',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    chevronDown: 'M6 9l6 6 6-6',
    hash: 'M5 9h14M5 15h14M10 3 8 21M16 3l-2 18',
    plus: 'M12 5v14M5 12h14',
    chat: 'M4 5h16v11H9l-5 4Z',
    headphones: 'M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4ZM17 15h3v5h-3Z',
    bookmark: 'M6.5 4h11v16.5L12 17l-5.5 3.5Z',
    replay: 'M4 4v5h5M4.6 13a7.5 7.5 0 1 0 1.8-6.5L4 9',
    copy: 'M9 9h11v11H9ZM15 9V4H4v11h5',
    archive: 'M3.5 4.5h17v4h-17ZM5 8.5V20h14V8.5M10 12.5h4'
  };
  /* Filled marks for change chips, like the reference "Results" card */
  var F = {
    up: 'M12 6.5 18 16.5H6Z',
    down: 'M12 17.5 6 7.5H18Z',
    flat: 'M6 11h12v2H6Z'
  };

  function ic(name, cls) {
    if (F[name]) {
      return '<svg class="cue-ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + F[name] + '"/></svg>';
    }
    return '<svg class="cue-ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + P[name] + '"/></svg>';
  }

  /* The Cue mark: an open C with a dot, a cue to speak */
  var MARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#0b0b0b"/><path d="M16.1 8A6 6 0 1 0 16.1 16" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="17.3" cy="12" r="1.65" fill="#fff"/></svg>';

  /* Real brand marks for Slack and Gmail (same as the Tastewise build) */
  var SLACK = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="6" y="1.5" width="4" height="11" rx="2" fill="#36C5F0"/><path d="M5 9.5v3H3a2 2 0 1 1 0-4h2z" fill="#36C5F0"/>' +
    '<rect x="11.5" y="6" width="11" height="4" rx="2" fill="#2EB67D"/><path d="M14.5 5h-3V3a2 2 0 1 1 4 0v2z" fill="#2EB67D"/>' +
    '<rect x="14" y="11.5" width="4" height="11" rx="2" fill="#E01E5A"/><path d="M19 11.5v3h2a2 2 0 1 0 0-4h-2z" fill="#E01E5A"/>' +
    '<rect x="1.5" y="14" width="11" height="4" rx="2" fill="#ECB22E"/><path d="M9.5 19h3v2a2 2 0 1 1-4 0v-2z" fill="#ECB22E"/></svg>';
  var GMAIL = '<svg viewBox="52 42 88 66" aria-hidden="true"><path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#FBBC04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg>';

  window.CueIcons = { ic: ic, MARK: MARK, SLACK: SLACK, GMAIL: GMAIL };
})();
