// js/utils.js
/* ======================================================
   FRONT KICK — utils.js
   Fonctions utilitaires pour le site
======================================================= */

window.catLabel = function(cat) {
  const map = {
    'analyse-combat': 'Analyse combat',
    'analyse': 'Analyse',
    'guide-debutant': 'Guide débutant',
    'conseil-entrainement': 'Conseil',
    'equipement': 'Équipement',
    'guide-equipement': 'Équipement',
    'actualite': 'Actualité',
    'portrait': 'Portrait',
    'bilan': 'Bilan'
  };
  return map[cat] || cat;
};

window.catClass = function(cat) {
  if (!cat) return '';
  if (cat.includes('combat') || cat.includes('actu')) return 't-actu';
  if (cat.includes('conseil') || cat.includes('guide')) return 't-conseil';
  if (cat.includes('analyse') || cat.includes('portrait') || cat.includes('bilan')) return 't-analyse';
  if (cat.includes('equip')) return 't-equip';
  return 't-conseil';
};

window.disciplineToSlug = function(disc) {
  const map = {
    'MMA': 'mma',
    'Boxe': 'boxe',
    'Muay-Thaï': 'muay-thai',
    'Équipement': 'equipement',
    'Kickboxing': 'kickboxing',
    'Karaté': 'karate',
    'Taekwondo': 'taekwondo',
    'Savate': 'savate',
    'Lethwei': 'lethwei',
    'Sanda': 'sanda',
    'Grappling': 'grappling',
    'BJJ': 'brazilian-jiu-jitsu',
    'Luta Livre': 'luta-livre',
    'Judo': 'judo',
    'Sambo': 'sambo',
    'Catch Wrestling': 'catch-wrestling',
    'Lutte libre': 'lutte-libre',
    'Lutte gréco-romaine': 'lutte-greco-romaine'
  };
  return map[disc] || disc.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

window.slugToDiscipline = function(slug) {
  const map = {
    'mma': 'MMA',
    'boxe': 'Boxe',
    'muay-thai': 'Muay-Thaï',
    'equipement': 'Équipement',
    'kickboxing': 'Kickboxing',
    'karate': 'Karaté',
    'taekwondo': 'Taekwondo',
    'savate': 'Savate',
    'lethwei': 'Lethwei',
    'sanda': 'Sanda',
    'grappling': 'Grappling',
    'brazilian-jiu-jitsu': 'BJJ',
    'luta-livre': 'Luta Livre',
    'judo': 'Judo',
    'sambo': 'Sambo',
    'catch-wrestling': 'Catch Wrestling',
    'lutte-libre': 'Lutte libre',
    'lutte-greco-romaine': 'Lutte gréco-romaine',
    'autres-sports': 'Autres sports',
    'actualites': 'Actualités'
  };
  return map[slug] || slug;
};

// Pour obtenir le nombre d'articles par groupe (grappling, etc.)
window.getArticlesByGroup = function(group) {
  if (group === 'grappling') {
    return ARTICLES.filter(a =>
      ['grappling', 'brazilian-jiu-jitsu', 'luta-livre', 'judo', 'sambo', 'catch-wrestling', 'lutte-libre', 'lutte-greco-romaine'].includes(a.sport)
    );
  }
  return ARTICLES.filter(a => a.sport === group);
};
