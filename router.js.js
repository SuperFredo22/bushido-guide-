// js/router.js
/* ======================================================
   FRONT KICK — router.js
   Routage basé sur le hash et chargement des pages
======================================================= */

// Mapping des disciplines pour les pages de sport
window.DISC_MAP = {
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
};

function updateActiveNav(page, sub) {
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    if (page === '' && l.dataset.page === 'home') { l.classList.add('active'); return; }
    if (l.dataset.page === page) { l.classList.add('active'); return; }
    if (page === 'guides' && l.dataset.page === 'guides') { l.classList.add('active'); return; }
    if (page === 'article' && sub) {
      const art = ARTICLES ? ARTICLES.find(a => a.slug === sub) : null;
      if (art && l.dataset.page === art.sport) { l.classList.add('active'); return; }
    }
  });
}

function showLoader() {
  const loader = document.getElementById('global-loader');
  const app = document.getElementById('app');
  if (loader) loader.style.display = 'block';
  if (app) app.style.opacity = '0.3';
}

function hideLoader() {
  const loader = document.getElementById('global-loader');
  const app = document.getElementById('app');
  if (loader) loader.style.display = 'none';
  if (app) app.style.opacity = '1';
}

window.router = function() {
  showLoader();

  // Petit délai pour laisser le loader s'afficher
  setTimeout(() => {
    const hash  = location.hash || '#/';
    // Extraire le chemin et les paramètres de recherche depuis le hash
    const hashParts = hash.split('?');
    const path = hashParts[0].replace('#','') || '/';
    const queryString = hashParts[1] || '';
    const searchParams = new URLSearchParams(queryString);
    const query = searchParams.get('q');

    const parts = path.split('/').filter(Boolean);
    const page  = parts[0] || '';
    const sub   = parts[1] || '';

    window.scrollTo(0, 0);
    const app = document.getElementById('app');

    updateActiveNav(page, sub);

    if (page === '' || page === undefined) { window.renderHome(app); }
    else if (page === 'article' && sub) { window.renderArticle(app, sub); }
    else if (page === 'guides' && sub) { window.renderGuideDetail(app, sub); }
    else if (page === 'guides') { window.renderGuides(app); }
    else if (page === 'actualites') { window.renderActualites(app); }
    else if (page === 'recommandations') { window.renderRecos(app); }
    else if (page === 'autres-sports') { window.renderDisciplines(app); }
    else if (page === 'recherche') { window.renderSearch(app, query || ''); }
    else if (window.DISC_MAP[page]) { window.renderList(app, page); }
    else { window.renderNotFound(app); }

    hideLoader();
  }, 50);
};

window.addEventListener('hashchange', window.router);
window.addEventListener('load', window.router);