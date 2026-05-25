/* AutoPièces DZ — Filtre de compatibilité véhicule
 *
 * Quand un véhicule est mémorisé dans localStorage (clé "pdz_vehicle" — alimentée
 * par les sélecteurs make/model/engine), ce script :
 *
 *   1. Intercepte le formulaire de recherche du header. À la soumission, il
 *      ajoute automatiquement `tag:compat-<marque>-<modele>` à la requête.
 *      Résultat : la recherche de "frein" affiche UNIQUEMENT les freins
 *      compatibles avec le véhicule sélectionné.
 *
 *   2. Intercepte les clics sur les liens /collections/<handle> et y ajoute
 *      `filter.p.tag=compat-<marque>-<modele>` (filtre Storefront natif de
 *      Shopify). Résultat : naviguer dans une catégorie n'affiche que les
 *      pièces compatibles.
 *
 * Convention : les produits doivent porter un tag au format
 *   compat-<marque-slug>-<modele-slug>
 * où "marque-slug" et "modele-slug" sont obtenus en minuscules, sans accent,
 * espaces → tirets. Exemples :
 *   BMW + "Série 3"  → compat-bmw-serie-3
 *   Peugeot + "206"  → compat-peugeot-206
 *   Volkswagen + "Golf" → compat-volkswagen-golf
 *
 * Ce comportement est totalement transparent : si aucun véhicule n'est
 * mémorisé, le script ne fait rien et la recherche/navigation se déroule
 * normalement.
 */
(function () {
  'use strict';

  var KEY = 'pdz_vehicle';

  function slug(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function getVehicle() {
    try { return JSON.parse(localStorage.getItem(KEY)); }
    catch (e) { return null; }
  }

  function compatTag(v) {
    if (!v || !v.make || !v.model) return '';
    return 'compat-' + slug(v.make) + '-' + slug(v.model);
  }

  /* === 1. Recherche du header : préfixe q avec le tag de compatibilité === */
  function wireSearchForms() {
    var forms = document.querySelectorAll('form.search-bar, form[action="/search"], form[action^="/search"]');
    forms.forEach(function (form) {
      if (form.dataset.pdzVehicleWired === '1') return;
      form.dataset.pdzVehicleWired = '1';
      form.addEventListener('submit', function () {
        var v = getVehicle();
        var tag = compatTag(v);
        if (!tag) return;
        var qInput = form.querySelector('input[name="q"]');
        if (!qInput) return;
        var current = (qInput.value || '').trim();
        /* Évite la double-application si l'utilisateur soumet plusieurs fois */
        if (current.indexOf('tag:' + tag) !== -1) return;
        qInput.value = (current ? current + ' ' : '') + 'tag:' + tag;
      }, true);
    });
  }

  /* === 2. Liens /collections/<handle> : ajoute filter.p.tag=compat-... === */
  function appendTagFilter(href, tag) {
    if (!href || !tag) return href;
    var hasQuery = href.indexOf('?') !== -1;
    /* N'ajoute pas si le filtre est déjà présent */
    if (href.indexOf('filter.p.tag=' + tag) !== -1) return href;
    return href + (hasQuery ? '&' : '?') + 'filter.p.tag=' + encodeURIComponent(tag);
  }

  function wireCollectionLinks() {
    document.addEventListener('click', function (e) {
      var v = getVehicle();
      var tag = compatTag(v);
      if (!tag) return;
      var a = e.target.closest && e.target.closest('a[href*="/collections/"]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      /* Ignore les liens externes ou ancres */
      if (href.charAt(0) === '#' || /^https?:/i.test(href)) return;
      /* Évite les liens "voir tout" qui pointent vers /collections (index) */
      if (/^\/collections\/?($|\?)/.test(href)) return;
      var newHref = appendTagFilter(href, tag);
      if (newHref !== href) a.setAttribute('href', newHref);
    }, true);
  }

  function init() {
    wireSearchForms();
    wireCollectionLinks();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* Re-câble les formulaires si le header est ré-injecté dynamiquement */
  if (window.MutationObserver) {
    var obs = new MutationObserver(function () { wireSearchForms(); });
    obs.observe(document.documentElement || document.body, { childList: true, subtree: true });
  }
})();
