// js/pages.js
/* ======================================================
   FRONT KICK — pages.js (version visuelle améliorée)
======================================================= */

// Helper : style d'image pour un article (image ou placeholder)
function getImageStyle(article) {
  if (article.image) {
    return `background-image: url('${article.image}'); background-size: cover; background-position: center;`;
  }
  // Placeholder gradient basé sur la discipline
  const gradients = {
    mma: 'linear-gradient(135deg, #0F172A, #1E88E5)',
    boxe: 'linear-gradient(135deg, #991B1B, #DC2626)',
    kickboxing: 'linear-gradient(135deg, #065F46, #10B981)',
    'muay-thai': 'linear-gradient(135deg, #92400E, #F59E0B)',
    grappling: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
    default: 'linear-gradient(135deg, #0F172A, #38BDF8)'
  };
  const gradient = gradients[article.sport] || gradients.default;
  return `background: ${gradient}; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; content: '${article.emoji || '🥊'}';`;
}

// Helper : rend une grille de cards
function renderCards(articles) {
  if (!articles.length) return '<p style="color:var(--text-light);padding:2rem 0">Aucun article pour l\'instant.</p>';
  return articles.map(a => `
    <a href="#/article/${a.slug}" class="art-card">
      <div class="art-image" style="${getImageStyle(a)}">
        <span class="art-cat-tag">${window.catLabel(a.category)}</span>
      </div>
      <div class="art-body">
        <div class="art-title-sm">${a.title.replace(/<[^>]+>/g, '')}</div>
        <div class="art-excerpt">${a.excerpt || ''}</div>
        <div class="art-foot">
          <span>${a.date}</span>
          <span class="atype ${window.catClass(a.category)}">${window.catLabel(a.category)}</span>
        </div>
      </div>
    </a>
  `).join('');
}

// PAGE ACCUEIL
window.renderHome = function(app) {
  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const sidebar  = ARTICLES.filter(a => !a.featured).slice(0, 4);
  const recent   = ARTICLES.filter(a => a !== featured).slice(0, 6);

  const disciplineCards = [
    {key:'mma', name:'MMA', emoji:'🥊', origin:'Mixed Martial Arts · Mondial'},
    {key:'boxe', name:'Boxe anglaise', emoji:'🥊', origin:'Boxing · Grande-Bretagne'},
    {key:'kickboxing', name:'Kickboxing', emoji:'🦵', origin:'Full contact · USA / Japon'},
    {key:'muay-thai', name:'Muay-Thaï', emoji:'🦵', origin:'Art martial · Thaïlande'},
    {key:'grappling', name:'Grappling', emoji:'🤼', origin:'BJJ · Judo · Wrestling · Sambo'},
    {key:'autres-sports', name:'Autres sports', emoji:'🥋', origin:'Karaté · Savate · Lethwei · Kali…'},
  ];

  app.innerHTML = `
  <div class="hero">
    <a href="#/article/${featured.slug}" class="featured-card">
      <div class="featured-image" style="${getImageStyle(featured)}">
        <span class="fi-badge">🔥 À la une</span>
      </div>
      <div class="featured-body">
        <div class="feat-meta">
          <span>${window.catLabel(featured.category)}</span>
          <span>${featured.date}</span>
          <span>· ${featured.readTime}</span>
        </div>
        <h2 class="feat-h1">${featured.title}</h2>
        <p class="feat-desc">${featured.excerpt}</p>
        <div class="feat-footer"><span class="read-more">Lire l'article →</span></div>
      </div>
    </a>
    <div class="hero-sidebar">
      ${sidebar.map(a => `
      <a href="#/article/${a.slug}" class="mini-card">
        <div class="mini-icon">${a.emoji || '🥊'}</div>
        <div>
          <div class="mini-cat">${a.discipline} · ${window.catLabel(a.category)}</div>
          <div class="mini-title">${a.title.replace(/<[^>]+>/g, '')}</div>
          <div class="mini-date">${a.date}</div>
        </div>
      </a>`).join('')}
    </div>
  </div>

  <div class="sec-bar">
    <h2>Disciplines</h2><div class="sec-line"></div>
  </div>
  <div class="sports-hub">
    ${disciplineCards.map(d => `
    <a href="#/${d.key}" class="sport-hub-card">
      <div class="sport-hub-top">
        <span class="sport-emoji">${d.emoji}</span>
        <div><div class="sport-name">${d.name}</div><div class="sport-origin">${d.origin}</div></div>
      </div>
      <div class="sport-links">
        <div class="sport-link"><span>📝 Articles</span></div>
        <div class="sport-link"><span>📖 Guide →</span></div>
      </div>
    </a>`).join('')}
  </div>

  <div class="main-layout">
    <main>
      <div class="sec-bar">
        <h2>Dernières publications</h2><div class="sec-line"></div>
        <a href="#/mma" class="see-all">Voir tout →</a>
      </div>
      <div class="art-grid">
        ${renderCards(recent)}
      </div>
    </main>
    <aside class="sidebar-col">
      <div class="nl-widget">
        <div class="widget-head">📬 Newsletter hebdo</div>
        <p>Les meilleurs articles de la semaine. Gratuit.</p>
        <input class="nl-input" type="email" placeholder="votre@email.com"/>
        <button class="nl-btn">S'abonner</button>
      </div>
      <div class="widget">
        <div class="widget-head">🏆 Prochains événements</div>
        <div class="widget-body">
          <div class="ev-item"><div class="ev-date">12 Avr</div><div>UFC 314 — Miami</div></div>
          <div class="ev-item"><div class="ev-date">10 Mai</div><div>UFC 315 — Montréal</div></div>
          <div class="ev-item"><div class="ev-date">06 Sep</div><div>UFC Paris 2025</div></div>
        </div>
      </div>
      <div class="ad-slot ad-rect">AdSense 300×250</div>
    </aside>
  </div>`;
};

// PAGE LISTE PAR DISCIPLINE
window.renderList = function(app, disciplineKey) {
  let list;
  if (disciplineKey === 'grappling') {
    list = (typeof window.getArticlesByGroup === 'function')
      ? window.getArticlesByGroup('grappling')
      : ARTICLES.filter(a => ['grappling','brazilian-jiu-jitsu','luta-livre','judo','sambo','catch-wrestling','lutte-libre','lutte-greco-romaine'].includes(a.sport));
  } else {
    list = ARTICLES.filter(a => a.sport === disciplineKey);
  }

  const label = window.DISC_MAP?.[disciplineKey] || window.slugToDiscipline(disciplineKey) || disciplineKey;
  const h = `🥋 ${label} — Tous les articles`;
  const p = list.length > 0 ? `${list.length} article(s) disponible(s)` : 'Aucun article pour le moment.';

  const cats = ['Tous', ...new Set(list.map(a => window.catLabel(a.category)))];

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero"><h1>${h}</h1><p>${p}</p></div>
    ${list.length === 0
      ? `<div class="empty-state">
          <div style="font-size:3rem;">🥋</div>
          <p>Les articles arrivent bientôt.</p>
          <a href="#/guides" class="back-btn">📖 Consulter les guides</a>
        </div>`
      : `<div class="filter-bar" id="filter-bar">
          ${cats.map((c,i)=>`<button class="filter-btn${i===0?' active':''}" data-cat="${c}">${c}</button>`).join('')}
        </div>
        <div class="list-grid" id="article-list">
          ${renderCards(list)}
        </div>`
    }
  </div>`;

  if (list.length > 0) {
    document.getElementById('filter-bar').addEventListener('click', e => {
      if (!e.target.matches('.filter-btn')) return;
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.dataset.cat;
      const filtered = cat === 'Tous' ? list : list.filter(a => window.catLabel(a.category) === cat);
      document.getElementById('article-list').innerHTML = renderCards(filtered);
    });
  }
};

// PAGE ARTICLE
window.renderArticle = function(app, slug) {
  const idx = ARTICLES.findIndex(a => a.slug === slug);
  if (idx === -1) { window.renderNotFound(app); return; }
  const art  = ARTICLES[idx];
  const prev = ARTICLES[idx-1];
  const next = ARTICLES[idx+1];
  const discKey = art.sport || window.disciplineToSlug(art.discipline);
  const tagHtml = (art.tags||[]).map(t=>`<span class="art-tag ${t.cls||''}">${t.label}</span>`).join('');

  app.innerHTML = `
  <div class="article-wrap">
    <div class="art-main">
      <a href="#/${discKey}" class="back-btn">← Retour à ${art.discipline}</a>
      <div class="art-tags">${tagHtml}</div>
      <h1 class="art-h1">${art.title}</h1>
      <p class="art-lead">${art.excerpt}</p>
      <div class="art-meta-row">
        <span>✍ <strong>Front Kick</strong></span>
        <span>📅 <strong>${art.date}</strong></span>
        <span>⏱ <strong>${art.readTime} de lecture</strong></span>
      </div>
      <div class="art-content">${art.content}</div>
      <div class="art-nav">
        ${prev ? `<a href="#/article/${prev.slug}" class="art-nav-btn">← Précédent<br><small>${prev.title.replace(/<[^>]+>/g,'').slice(0,50)}…</small></a>` : ''}
        ${next ? `<a href="#/article/${next.slug}" class="art-nav-btn right">Suivant →<br><small>${next.title.replace(/<[^>]+>/g,'').slice(0,50)}…</small></a>` : ''}
      </div>
    </div>
    <aside class="art-sidebar">
      <div class="widget">
        <div class="widget-head">📰 Articles récents</div>
        <div class="widget-body">
          ${ARTICLES.filter(a=>a.discipline===art.discipline && a.slug!==slug).slice(0,4).map(a=>`
          <div style="margin-bottom:1rem;">
            <div style="font-size:0.7rem;color:var(--blue);">${a.date}</div>
            <a href="#/article/${a.slug}" style="font-weight:500;">${a.title.replace(/<[^>]+>/g,'')}</a>
          </div>`).join('')}
        </div>
      </div>
      <div class="ad-slot ad-rect">AdSense 300×250</div>
    </aside>
  </div>`;
};

// PAGE ACTUALITÉS
window.renderActualites = function(app) {
  const actus = ARTICLES.filter(a =>
    ['actualite','analyse-combat','analyse','portrait','bilan'].includes(a.category)
  );
  const display = actus.length > 0 ? actus : ARTICLES;
  const cats = ['Tous', ...new Set(display.map(a => window.catLabel(a.category)))];

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero">
      <h1>📰 Actualités & Analyses</h1>
      <p>${display.length} article(s)</p>
    </div>
    <div class="filter-bar" id="actu-filter">
      ${cats.map((c,i)=>`<button class="filter-btn${i===0?' active':''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
    <div class="list-grid" id="actu-list">
      ${renderCards(display)}
    </div>
  </div>`;

  document.getElementById('actu-filter').addEventListener('click', e => {
    if (!e.target.matches('.filter-btn')) return;
    document.querySelectorAll('#actu-filter .filter-btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.dataset.cat;
    const filtered = cat === 'Tous' ? display : display.filter(a => window.catLabel(a.category) === cat);
    document.getElementById('actu-list').innerHTML = renderCards(filtered);
  });
};

// PAGE GUIDES (liste)
window.renderGuides = function(app) {
  const guideList = [
    {id:'mma', name:'MMA', emoji:'🥊', banner:'linear-gradient(135deg,#1a0a0a,#2d1010)', desc:'Grappling, frappes, wrestling — le sport de combat complet.'},
    {id:'boxe', name:'Boxe anglaise', emoji:'🥊', banner:'linear-gradient(135deg,#0a0f1a,#10182a)', desc:'Deux siècles de science condensés en quatre coups.'},
    {id:'muay', name:'Muay-Thaï', emoji:'🦵', banner:'linear-gradient(135deg,#1a0f00,#2a1800)', desc:"L'art des 8 membres — poings, pieds, genoux, coudes."},
    {id:'bjj', name:'BJJ', emoji:'🤼', banner:'linear-gradient(135deg,#0a0a1a,#101025)', desc:'La technique prime sur la force. Combat au sol.'},
    {id:'judo', name:'Judo', emoji:'🥋', banner:'linear-gradient(135deg,#0f0808,#1e1010)', desc:'Sport olympique. Projections et immobilisations.'},
    {id:'karate', name:'Karaté', emoji:'🥋', banner:'linear-gradient(135deg,#0a0f0a,#101810)', desc:'Katas, kumite — bien plus qu\'un art scolaire.'},
    {id:'savate', name:'Savate', emoji:'👟', banner:'linear-gradient(135deg,#0a1215,#0f1f25)', desc:'Boxe française — la discipline méconnue de France.'},
    {id:'lethwei', name:'Lethwei', emoji:'💀', banner:'linear-gradient(135deg,#1a0808,#2a1010)', desc:'Boxe birmane sans gants. Pas pour débutants.'},
  ];

  app.innerHTML = `
  <div class="guides-page">
    <div class="guides-hero">
      <h1>📖 Guides par discipline</h1>
      <p>Chaque guide couvre l'histoire, les techniques fondamentales, l'équipement et les étapes de progression.</p>
    </div>
    <div class="guides-grid">
      ${guideList.map(g => `
      <a href="#/guides/${g.id}" class="guide-card">
        <div class="guide-banner" style="background:${g.banner}; height:120px; display:flex; align-items:center; justify-content:center; font-size:3rem;">${g.emoji}</div>
        <div class="guide-body">
          <div class="guide-sport">${g.name}</div>
          <div class="guide-desc">${g.desc}</div>
          <div class="guide-meta">
            <span>${GUIDES[g.id]?.toc.length || 0} sections</span>
            <span class="guide-arrow">Lire le guide →</span>
          </div>
        </div>
      </a>`).join('')}
    </div>
  </div>`;
};

// PAGE GUIDE DÉTAIL (similaire, inchangée)
window.renderGuideDetail = function(app, id) {
  const g = GUIDES[id];
  if (!g) { window.renderNotFound(app); return; }
  const tocHtml = g.toc.map((t,i)=>
    `<div class="toc-item" onclick="document.getElementById('g-s${i+1}')?.scrollIntoView({behavior:'smooth'})">${i+1}. ${t}</div>`
  ).join('');

  app.innerHTML = `
  <div class="guide-wrap">
    <a href="#/guides" class="back-btn">← Tous les guides</a>
    <div class="guide-intro-banner" style="background:${g.banner}; height:200px; display:flex; align-items:center; justify-content:center; font-size:5rem;">${g.emoji}</div>
    <div class="toc-box">
      <div class="toc-title">📋 Sommaire</div>
      <div class="toc-items">${tocHtml}</div>
    </div>
    <div class="art-content">${g.html}</div>
    <div style="margin-top:3rem;"><a href="#/guides" class="back-btn">← Tous les guides</a></div>
  </div>`;
};

// PAGE RECOMMANDATIONS (inchangée, mais on pourrait aussi utiliser des cards)
window.renderRecos = function(app) {
  // ... (code existant, inchangé)
};

// PAGE AUTRES SPORTS
window.renderDisciplines = function(app) {
  // ... (code existant, inchangé mais peut être amélioré avec des cards)
};

// PAGE RECHERCHE
window.renderSearch = function(app, query) {
  const q = query.toLowerCase().trim();
  const results = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    (a.content && a.content.toLowerCase().includes(q))
  );

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero">
      <h1>🔍 Recherche : "${query}"</h1>
      <p>${results.length} résultat(s)</p>
    </div>
    ${results.length === 0
      ? `<div class="empty-state"><div style="font-size:3rem;">🔎</div><p>Aucun article trouvé.</p><a href="#/" class="back-btn">← Accueil</a></div>`
      : `<div class="list-grid">${renderCards(results)}</div>`
    }
  </div>`;
};

// PAGE 404
window.renderNotFound = function(app) {
  app.innerHTML = `
  <div class="not-found">
    <h1>404</h1>
    <p>Cette page n'existe pas.</p>
    <a href="#/" class="back-btn">← Retour à l'accueil</a>
  </div>`;
};
