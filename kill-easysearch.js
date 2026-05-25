/* Supprime activement tout élément injecté par EasySearch YMM (Mon Garage + bandeau de compatibilité) */
(function () {
  'use strict';

  var TEXT_MATCH = /(Vous voyez les pi[eè]ces compatibles|MON GARAGE|Mon Garage|Mon GARAGE)/i;
  var ATTR_MATCH = /(easysearch|ymm|fitment|es-garage|es-vehicle)/i;

  function isEasySearchEl(el) {
    if (!el || el.nodeType !== 1) return false;
    var cls = (el.className && el.className.toString) ? el.className.toString() : '';
    var id = el.id || '';
    if (ATTR_MATCH.test(cls) || ATTR_MATCH.test(id)) return true;
    if (el.dataset) {
      for (var k in el.dataset) {
        if (ATTR_MATCH.test(k) || ATTR_MATCH.test(el.dataset[k] || '')) return true;
      }
    }
    return false;
  }

  function killByContent(root) {
    if (!root) return;
    var nodes = root.querySelectorAll('div, section, aside, span, p, a');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el.parentNode) continue;
      if (el.closest('.search-bar, .header__vtype, .pdz-cat, header.site-header > .header__main')) continue;
      var t = (el.textContent || '').trim();
      if (t.length > 0 && t.length < 200 && TEXT_MATCH.test(t)) {
        var top = el;
        for (var j = 0; j < 4; j++) {
          if (!top.parentNode || top.parentNode === document.body) break;
          if (top.parentNode.children.length === 1) top = top.parentNode;
          else break;
        }
        try { top.remove(); } catch (e) {}
      }
    }
  }

  function killByAttr(root) {
    if (!root) return;
    var all = root.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (isEasySearchEl(all[i])) {
        try { all[i].remove(); } catch (e) {}
      }
    }
  }

  function sweep() {
    killByAttr(document);
    killByContent(document);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sweep);
  else sweep();

  setTimeout(sweep, 500);
  setTimeout(sweep, 1500);
  setTimeout(sweep, 3000);

  if (window.MutationObserver) {
    var obs = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.addedNodes && m.addedNodes.length) {
          for (var j = 0; j < m.addedNodes.length; j++) {
            var n = m.addedNodes[j];
            if (n.nodeType === 1) {
              if (isEasySearchEl(n)) { try { n.remove(); } catch (e) {} continue; }
              if (n.querySelectorAll) {
                killByAttr(n);
                var txt = (n.textContent || '');
                if (TEXT_MATCH.test(txt)) killByContent(n);
              }
            }
          }
        }
      }
    });
    obs.observe(document.documentElement || document.body, { childList: true, subtree: true });
  }
})();
