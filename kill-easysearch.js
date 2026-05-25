/* Supprime activement tout élément injecté par EasySearch YMM (Mon Garage + bandeau de compatibilité) */
(function () {
  'use strict';

  var TEXT_MATCH = /(Vous voyez les pi[eè]ces compatibles|MON GARAGE|Mon Garage)/i;
  var ATTR_MATCH = /(easysearch|ymm|fitment|es-garage|es-vehicle|garage-widget|vehicle-banner)/i;

  /* Conteneurs que l'on ne doit JAMAIS supprimer (on supprime seulement leurs enfants parasites). */
  var SAFE_CONTAINERS = 'header.site-header, .site-header, .header__main, .header__inner, main, body, html';

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

  function safeRemove(el) {
    if (!el || !el.parentNode) return;
    if (el.matches && el.matches(SAFE_CONTAINERS)) return;
    /* Ne pas supprimer notre propre barre de recherche / sélecteur véhicule. */
    if (el.matches && el.matches('.search-bar, .search-bar *, .header__vtype, .header__vtype *, .pdz-cat, .pdz-cat *')) return;
    try { el.remove(); } catch (e) {}
  }

  /* Trouve le plus petit conteneur "widget" autour d'un nœud texte parasite. */
  function bubbleWidget(el) {
    var top = el;
    for (var j = 0; j < 6; j++) {
      if (!top.parentNode || top.parentNode === document.body) break;
      var p = top.parentNode;
      if (p.matches && p.matches(SAFE_CONTAINERS)) break;
      /* Si on remonte dans la search-bar, on s'arrête juste avant pour ne supprimer que le widget invasif, pas la search-bar. */
      if (p.matches && p.matches('.search-bar, .header__vtype, .pdz-cat')) break;
      top = p;
    }
    return top;
  }

  function killByContent(root) {
    if (!root || !root.querySelectorAll) return;
    var nodes = root.querySelectorAll('div, section, aside, span, p, a, button');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el.parentNode) continue;
      var t = (el.textContent || '').trim();
      if (t.length === 0 || t.length > 200) continue;
      if (!TEXT_MATCH.test(t)) continue;
      /* Ne pas supprimer le label "MON COMPTE" et compagnie : on exige strictement MON GARAGE / Mon Garage. */
      safeRemove(bubbleWidget(el));
    }
  }

  function killByAttr(root) {
    if (!root || !root.querySelectorAll) return;
    var all = root.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (isEasySearchEl(all[i])) safeRemove(all[i]);
    }
  }

  function sweep() {
    killByAttr(document);
    killByContent(document);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sweep);
  else sweep();

  /* Plusieurs passes : l'app peut s'injecter tardivement. */
  [100, 300, 600, 1200, 2500, 5000, 10000].forEach(function (ms) { setTimeout(sweep, ms); });

  if (window.MutationObserver) {
    var obs = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (!m.addedNodes || !m.addedNodes.length) continue;
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j];
          if (n.nodeType !== 1) continue;
          if (isEasySearchEl(n)) { safeRemove(n); continue; }
          if (n.querySelectorAll) {
            killByAttr(n);
            var txt = (n.textContent || '');
            if (TEXT_MATCH.test(txt)) killByContent(n);
          } else {
            var txt2 = (n.textContent || '');
            if (TEXT_MATCH.test(txt2)) safeRemove(bubbleWidget(n));
          }
        }
      }
    });
    obs.observe(document.documentElement || document.body, { childList: true, subtree: true, characterData: true });
  }
})();
