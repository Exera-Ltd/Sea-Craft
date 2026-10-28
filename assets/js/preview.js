/* Preview-only behaviour. None of this is needed for the WordPress build
   except, optionally, the sticky-header class toggle. */
(function () {
  'use strict';

  // Sticky header shadow
  var header = document.getElementById('header');
  var onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Palette switcher — swaps the data-theme attribute only.
  var root = document.documentElement;
  var opts = document.querySelectorAll('.pv-opt');
  opts.forEach(function (btn) {
    btn.addEventListener('click', function () {
      root.setAttribute('data-theme', btn.dataset.set);
      opts.forEach(function (o) {
        o.setAttribute('aria-pressed', String(o === btn));
      });
      var tip = document.querySelector('.pv-tip');
      if (tip) tip.remove();
    });
  });

  // ?theme=client|balanced|lagoon  and  ?ui=0  for clean screenshots
  var q = new URLSearchParams(location.search);
  var t = q.get('theme');
  if (t) {
    root.setAttribute('data-theme', t);
    opts.forEach(function (o) {
      o.setAttribute('aria-pressed', String(o.dataset.set === t));
    });
  }
  if (q.get('ui') === '0') root.setAttribute('data-ui', 'off');
})();
