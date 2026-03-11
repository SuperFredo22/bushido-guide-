// js/utils.js
/* ======================================================
   FRONT KICK — utils.js
   Fonctions utilitaires globales de la SPA

   CORRECTIONS :
   - disciplineToSlug : gestion complète des accents (NFD)
   - getArticlesByGroup : couvre tous les sous-sports grappling
   - Toutes les fonctions window.* sont définies ici
======================================================= */

/* ── Labels lisibles pour les catégories ── */
window.catLabel = function (cat) {
  const map = {
    'analyse-combat':       'Analyse combat',
    'analyse':              'Analyse',
    'guide-debutant':       'Guide débutant',
    'conseil-entrainement': 'Conseil',
    'equipement':           'Équipement',
    'guide-equipement':     'Équipement',
    'actualite':            'Actualité',
    'portrait':             'Portrait',
    'bilan':                'Bilan',
  };
  return map[cat] || cat;
};

/* ── Classe CSS de badge selon la catégorie ── */
window.catClass = function (cat) {
  if (!cat) return '';
  if (cat.includes('combat') || cat.includes('actu'))                               return 't-actu';
  if (cat.includes('conseil') || cat.includes('guide'))                             return 't-conseil';
  if (cat.includes('analyse') || cat.includes('portrait') || cat.includes('bilan')) return 't-analyse';
  if (cat.includes('equip'))                                                         return 't-equip';
  return 't-conseil';
};

/**
 * Convertit un nom de discipline en slug d'URL.
 * CORRECTION : normalisation NFD pour gérer tous les accents.
 * Exemples : "Muay-Thaï" → "muay-thai" | "Karaté" → "karate"
 *
 * @param {string} disc  Nom de la discipline (avec ou sans accents)
 * @returns {string}     Slug URL-safe
 */
window.disciplineToSlug = function (disc) {
  if (!disc) return '';

  // Table de correspondance explicite (prioritaire)
  const exactMap = {
    'MMA':                  'mma',
    'Boxe':                 'boxe',
    'Muay-Thaï':            'muay-thai',
    'Muay-Thai':            'muay-thai',
    'Kickboxing':           'kickboxing',
    'Karaté':               'karate',
    'Karate':               'karate',
    'Taekwondo':            'taekwondo',
    'Savate':               'savate',
    'Lethwei':              'lethwei',
    'Sanda':                'sanda',
    'Grappling':            'grappling',
    'BJJ':                  'brazilian-jiu-jitsu',
    'Luta Livre':           'luta-livre',
    'Judo':                 'judo',
    'Sambo':                'sambo',
    'Catch Wrestling':      'catch-wrestling',
    'Lutte libre':          'lutte-libre',
    'Lutte Libre':          'lutte-libre',
    'Lutte gréco-romaine':  'lutte-greco-romaine',
    'Lutte greco-romaine':  'lutte-greco-romaine',
    'Équipement':           'equipement',
    'Equipement':           'equipement',
  };

  // Cherche d'abord une correspondance exacte (insensible à la casse)
  const discLower = disc.toLowerCase();
  for (const key in exactMap) {
    if (key.toLowerCase() === discLower) return exactMap[key];
  }

  // Sinon : suppression des accents (NFD) + transformation générique
  return disc
    .normalize('NFD')                    // décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '')     // supprime les diacritiques
    .toLowerCase()
    .replace(/\s+/g, '-')               // espaces → tirets
    .replace(/[^a-z0-9-]/g, '');        // supprime tout sauf lettres, chiffres, tirets
};

/**
 * Convertit un slug d'URL en nom affiché de discipline.
 * @param {string} slug  ex. 'muay-thai'
 * @returns {string}     ex. 'Muay-Thaï'
 */
window.slugToDiscipline = function (slug) {
  const map = {
    'mma':                  'MMA',
    'boxe':                 'Boxe',
    'muay-thai':            'Muay-Thaï',
    'equipement':           'Équipement',
    'kickboxing':           'Kickboxing',
    'karate':               'Karaté',
    'taekwondo':            'Taekwondo',
    'savate':               'Savate',
    'lethwei':              'Lethwei',
    'sanda':                'Sanda',
    'grappling':            'Grappling',
    'brazilian-jiu-jitsu':  'BJJ',
    'luta-livre':           'Luta Livre',
    'judo':                 'Judo',
    'sambo':                'Sambo',
    'catch-wrestling':      'Catch Wrestling',
    'lutte-libre':          'Lutte libre',
    'lutte-greco-romaine':  'Lutte gréco-romaine',
    'autres-sports':        'Autres sports',
    'actualites':           'Actualités',
  };
  return map[slug] || slug;
};

/**
 * Retourne les articles filtrés par groupe.
 * CORRECTION : liste complète de tous les sous-sports grappling.
 *
 * Groupes valides :
 *   'grappling'  → tous les sports sol/saisie
 *   'striking'   → boxe, kick, muay-thai, karate…
 *   'principal'  → MMA
 *   'equipement' → équipement
 *
 * @param {string} group
 * @returns {Array}
 */
window.getArticlesByGroup = function (group) {
  const GRAPPLING_SPORTS = [
    'grappling',
    'brazilian-jiu-jitsu',
    'luta-livre',
    'judo',
    'sambo',
    'catch-wrestling',
    'lutte-libre',
    'lutte-greco-romaine',
  ];

  if (!window.ARTICLES || !window.ARTICLES.length) return [];

  if (group === 'grappling') {
    return window.ARTICLES.filter(a => GRAPPLING_SPORTS.includes(a.sport));
  }

  // Pour les autres groupes, on s'appuie sur sportGroup (défini dans articles.js > _normalize)
  return window.ARTICLES.filter(a => a.sportGroup === group);
};

/* ══════════════════════════════════════════════════════
   SEO — Mise à jour dynamique des balises meta
   Appel : window.updateSEO({ title, description })
   Toutes les propriétés sont optionnelles.
══════════════════════════════════════════════════════ */
window.updateSEO = function ({ title, description } = {}) {
  const SITE_NAME    = 'Front Kick';
  const DEFAULT_DESC = 'Guides, analyses et actualités sur tous les sports de combat : MMA, boxe, kickboxing, muay-thaï et arts martiaux.';

  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Le Média des Sports de Combat`;
  const metaDesc = description || DEFAULT_DESC;

  /* ── <title> ── */
  document.title = fullTitle;

  /* ── <meta name="description"> ── */
  _setMeta('name', 'description', metaDesc);

  /* ── Open Graph ── */
  _setMeta('property', 'og:title',       fullTitle);
  _setMeta('property', 'og:description', metaDesc);
  _setMeta('property', 'og:type',        'website');
  _setMeta('property', 'og:url',         window.location.href);
  _setMeta('property', 'og:site_name',   SITE_NAME);

  /* ── Twitter Card ── */
  _setMeta('name', 'twitter:card',        'summary');
  _setMeta('name', 'twitter:title',       fullTitle);
  _setMeta('name', 'twitter:description', metaDesc);
};

/**
 * Helper interne — crée ou met à jour une balise <meta>.
 * @param {string} attr   'name' ou 'property'
 * @param {string} key    valeur de l'attribut identifiant
 * @param {string} value  contenu
 */
function _setMeta(attr, key, value) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}
