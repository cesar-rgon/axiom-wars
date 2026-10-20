// Idioma de la web (por defecto, el del sistema si está soportado; si no, inglés). El HTML está escrito en inglés (idioma por defecto); cada
// otro idioma vive en su propio fichero, assets/i18n/<idioma>.js, que se carga
// al elegirlo (es, fr, it, de, ru, zh, ja). Cada elemento traducible lleva
// data-i18n="clave" (su contenido HTML), data-i18n-alt (texto alternativo de
// una imagen), data-i18n-aria (aria-label), data-i18n-phase (atributo
// data-phase que usa el CSS para "Fase N"), data-i18n-title, data-i18n-src o
// data-i18n-href (enlace a la versión de cada idioma). El inglés se toma del
// propio HTML al cargar; una clave que falte en el fichero de un idioma se
// queda en inglés (p. ej. el grafo de daños, que sólo existe en en/es).
(function () {
  var LANGS = ['en', 'es', 'fr', 'it', 'de', 'ru', 'zh', 'ja'];
  var HTML_LANG = { en: 'en', es: 'es', fr: 'fr', it: 'it', de: 'de', ru: 'ru', zh: 'zh-Hans', ja: 'ja' };
  var VERSION = '20261020';

  // [atributo del elemento, cómo leer/escribir el texto]
  var KINDS = [
    ['data-i18n', function (el) { return el.innerHTML; }, function (el, v) { el.innerHTML = v; }],
    ['data-i18n-alt', function (el) { return el.alt; }, function (el, v) { el.alt = v; }],
    ['data-i18n-aria', function (el) { return el.getAttribute('aria-label'); }, function (el, v) { el.setAttribute('aria-label', v); }],
    ['data-i18n-phase', function (el) { return el.getAttribute('data-phase'); }, function (el, v) { el.setAttribute('data-phase', v); }],
    ['data-i18n-title', function (el) { return el.title; }, function (el, v) { el.title = v; }],
    ['data-i18n-src', function (el) { return el.getAttribute('src'); }, function (el, v) { el.setAttribute('src', v); }],
    ['data-i18n-href', function (el) { return el.getAttribute('href'); }, function (el, v) { el.setAttribute('href', v); }]
  ];
  var EN = {};
  var meta = document.querySelector('meta[name="description"]');
  var META_EN = meta ? meta.content : '';
  KINDS.forEach(function (k) {
    document.querySelectorAll('[' + k[0] + ']').forEach(function (el) {
      var key = el.getAttribute(k[0]);
      if (!(key in EN)) EN[key] = k[1](el);
    });
  });

  var current = 'en';
  function apply(lang) {
    var data = lang === 'en' ? null : (window.AW_I18N || {})[lang];
    var dict = data ? data.dict : {};
    KINDS.forEach(function (k) {
      document.querySelectorAll('[' + k[0] + ']').forEach(function (el) {
        var key = el.getAttribute(k[0]);
        var v = dict[key];
        if (v == null) v = EN[key];
        if (v != null) k[2](el, v);
      });
    });
    document.documentElement.lang = HTML_LANG[lang] || lang;
    if (meta) meta.content = data && data.meta ? data.meta : META_EN;
    var sel = document.getElementById('lang');
    if (sel) sel.value = lang;
    current = lang;
  }

  // Carga el fichero del idioma (una sola vez) y aplica; si no carga, se queda
  // en el idioma actual.
  function setLang(lang, remember) {
    if (LANGS.indexOf(lang) < 0) lang = 'en';
    if (remember) { try { localStorage.setItem('axiomwars-lang', lang); } catch (e) {} }
    if (lang === 'en' || (window.AW_I18N || {})[lang]) { apply(lang); return; }
    var s = document.createElement('script');
    s.src = 'assets/i18n/' + lang + '.js?v=' + VERSION;
    s.onload = function () { if ((window.AW_I18N || {})[lang]) apply(lang); };
    s.onerror = function () { var sel = document.getElementById('lang'); if (sel) sel.value = current; };
    document.head.appendChild(s);
  }

  // Idioma del sistema: el primero de las preferencias del navegador (que
  // salen del sistema operativo) que la web soporte. El chino sólo se da por
  // soportado en simplificado (zh, zh-CN, zh-SG, zh-Hans): el tradicional
  // (zh-TW, zh-HK, zh-MO, zh-Hant) cuenta como no soportado. Si no hay
  // ninguno, o el navegador no lo dice, inglés.
  function systemLang() {
    var prefs = [];
    try { prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]; } catch (e) {}
    for (var i = 0; i < prefs.length; i++) {
      var tag = String(prefs[i] || '').toLowerCase().replace('_', '-'), base = tag.split('-')[0];
      if (LANGS.indexOf(base) < 0) continue;
      if (base === 'zh' && /(^|-)(tw|hk|mo|hant)(-|$)/.test(tag)) continue;
      return base;
    }
    return 'en';
  }

  // Prioridad: ?lang=xx en la URL (para compartir enlaces), luego la última
  // elección guardada, luego el idioma del sistema, y si no, inglés. La
  // detección no se guarda: sólo lo hace una elección expresa en el selector.
  var q = null, saved = null;
  try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  try { saved = localStorage.getItem('axiomwars-lang'); } catch (e) {}
  setLang(LANGS.indexOf(q) >= 0 ? q : LANGS.indexOf(saved) >= 0 ? saved : systemLang(), false);

  var sel = document.getElementById('lang');
  if (sel) sel.addEventListener('change', function () { setLang(sel.value, true); });
})();
