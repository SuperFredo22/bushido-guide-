// js/pages.js
/* ======================================================
   FRONT KICK — pages.js
   Rendu de toutes les pages de la SPA

   CORRECTIONS :
   - renderHome : guard si ARTICLES vide (évite crash)
   - renderArticle : déjà protégé via renderNotFound
   - renderList : fallback si getArticlesByGroup absent
   - Tous les accès window.ARTICLES sécurisés
======================================================= */

/* ─────────────────────────────────────────────────────
   GUARD GLOBAL
   Si ARTICLES n'est pas encore chargé, on renvoie []
───────────────────────────────────────────────────── */
function _articles() {
  return window.ARTICLES || [];
}

/* ─────────────────────────────────────────────────────
   HELPERS IMAGE
───────────────────────────────────────────────────── */
function getImageStyle(article) {
  if (article && article.image) {
    return `background-image: url('${article.image}'); background-size: cover; background-position: center;`;
  }
  const gradients = {
    mma:                   'linear-gradient(135deg, #0F172A 0%, #1E88E5 100%)',
    boxe:                  'linear-gradient(135deg, #7f1d1d 0%, #DC2626 100%)',
    kickboxing:            'linear-gradient(135deg, #064e3b 0%, #10B981 100%)',
    'muay-thai':           'linear-gradient(135deg, #78350f 0%, #F59E0B 100%)',
    grappling:             'linear-gradient(135deg, #1e3a8a 0%, #3B82F6 100%)',
    'brazilian-jiu-jitsu': 'linear-gradient(135deg, #1e3a8a 0%, #6366F1 100%)',
    judo:                  'linear-gradient(135deg, #1a1a1a 0%, #4B5563 100%)',
    default:               'linear-gradient(135deg, #0F172A 0%, #38BDF8 100%)',
  };
  const key = article && article.sport;
  return `background: ${gradients[key] || gradients.default};`;
}

function getImageHTML(article) {
  const style = getImageStyle(article);
  const emoji = (article && article.emoji) || '🥊';
  if (article && article.image) {
    return `<div class="art-image" style="${style}">
      <span class="art-cat-tag">${window.catLabel(article.category)}</span>
    </div>`;
  }
  return `<div class="art-image" style="${style}; display:flex; align-items:center; justify-content:center;">
    <span style="font-size:2.8rem; filter:drop-shadow(0 2px 8px rgba(0,0,0,.3));">${emoji}</span>
    <span class="art-cat-tag">${window.catLabel(article.category)}</span>
  </div>`;
}

/* ─────────────────────────────────────────────────────
   HELPER : grille de cards articles
───────────────────────────────────────────────────── */
function renderCards(articles) {
  if (!articles || !articles.length) {
    return `<div class="empty-state">
      <span class="emoji">📭</span>
      <h3>Pas encore d'articles</h3>
      <p>Le contenu pour cette section arrive bientôt. Découvrez nos guides en attendant.</p>
      <a href="#/guides" class="btn">📖 Consulter les guides →</a>
    </div>`;
  }
  return articles.map(a => `
    <a href="#/article/${a.slug}" class="art-card">
      ${getImageHTML(a)}
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

/* ══════════════════════════════════════════════════════
   PAGE ACCUEIL
   CORRECTION : guard si ARTICLES est vide
══════════════════════════════════════════════════════ */
window.renderHome = function (app) {
  window.updateSEO({
    title:       'Le Média des Sports de Combat',
    description: 'Guides, analyses et actualités MMA, boxe, kickboxing, muay-thaï et arts martiaux.',
  });

  const articles = _articles();

  // ── Guard : aucun article publié ──
  if (!articles.length) {
    app.innerHTML = `
    <div class="empty-state" style="margin-top:40px;">
      <span class="emoji">🥊</span>
      <h3>Front Kick arrive bientôt</h3>
      <p>Le contenu est en cours de rédaction. Revenez vite pour découvrir nos guides et analyses.</p>
      <a href="#/guides" class="btn">📖 Voir les guides →</a>
    </div>`;
    return;
  }

  const featured = articles.find(a => a.featured) || articles[0];
  const sidebar  = articles.filter(a => a !== featured).slice(0, 4);
  const recent   = articles.filter(a => a !== featured).slice(0, 6);

  const disciplineCards = [
    { key: 'mma',           name: 'MMA',           emoji: '🥊', origin: 'Mixed Martial Arts · Mondial' },
    { key: 'boxe',          name: 'Boxe anglaise',  emoji: '🥊', origin: 'Boxing · Grande-Bretagne' },
    { key: 'kickboxing',    name: 'Kickboxing',     emoji: '🦵', origin: 'Full contact · USA / Japon' },
    { key: 'muay-thai',     name: 'Muay-Thaï',      emoji: '🦵', origin: 'Art martial · Thaïlande' },
    { key: 'grappling',     name: 'Grappling',      emoji: '🤼', origin: 'BJJ · Judo · Wrestling · Sambo' },
    { key: 'autres-sports', name: 'Autres sports',  emoji: '🥋', origin: 'Karaté · Savate · Lethwei · Kali…' },
  ];

  const featStyle = getImageStyle(featured);

  app.innerHTML = `
  <div class="hero">
    <a href="#/article/${featured.slug}" class="featured-card">
      <div class="featured-image" style="${featStyle}">
        ${!featured.image ? `<span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:4rem;z-index:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));">${featured.emoji || '🥊'}</span>` : ''}
        <span class="fi-badge">🔥 À la une</span>
      </div>
      <div class="featured-body">
        <div class="feat-meta">
          <span>${window.catLabel(featured.category)}</span>
          <span>${featured.date}</span>
          <span>${featured.readTime}</span>
        </div>
        <h2 class="feat-h1">${featured.title}</h2>
        <p class="feat-desc">${featured.excerpt || ''}</p>
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
    <h2>Disciplines</h2>
    <div class="sec-line"></div>
  </div>
  <div class="sports-hub">
    ${disciplineCards.map(d => `
    <a href="#/${d.key}" class="sport-hub-card">
      <div class="sport-hub-top">
        <span class="sport-emoji">${d.emoji}</span>
        <div>
          <div class="sport-name">${d.name}</div>
          <div class="sport-origin">${d.origin}</div>
        </div>
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
        <h2>Dernières publications</h2>
        <div class="sec-line"></div>
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

/* ══════════════════════════════════════════════════════
   PAGE LISTE PAR DISCIPLINE
══════════════════════════════════════════════════════ */
window.renderList = function (app, disciplineKey) {
  const articles = _articles();
  let list;

  if (disciplineKey === 'grappling') {
    list = (typeof window.getArticlesByGroup === 'function')
      ? window.getArticlesByGroup('grappling')
      : articles.filter(a => ['grappling', 'brazilian-jiu-jitsu', 'luta-livre', 'judo', 'sambo',
          'catch-wrestling', 'lutte-libre', 'lutte-greco-romaine'].includes(a.sport));
  } else if (disciplineKey === 'autres-sports') {
    const mainSports = ['mma', 'boxe', 'kickboxing', 'muay-thai', 'grappling',
      'brazilian-jiu-jitsu', 'luta-livre', 'judo', 'sambo', 'catch-wrestling',
      'lutte-libre', 'lutte-greco-romaine'];
    list = articles.filter(a => !mainSports.includes(a.sport));
  } else {
    list = articles.filter(a => a.sport === disciplineKey);
  }

  const label   = (window.DISC_MAP && window.DISC_MAP[disciplineKey])
    || window.slugToDiscipline(disciplineKey)
    || disciplineKey;
  const dEmojis = { mma: '🥊', boxe: '🥊', kickboxing: '🦵', 'muay-thai': '🦵', grappling: '🤼', 'autres-sports': '🥋' };
  const dEmoji  = dEmojis[disciplineKey] || '🥋';

  window.updateSEO({
    title:       `${label} — Articles et analyses`,
    description: `Retrouvez tous les articles, guides et analyses sur ${label} — Front Kick, le média des sports de combat.`,
  });

  const countText = list.length > 0
    ? `${list.length} article${list.length > 1 ? 's' : ''} disponible${list.length > 1 ? 's' : ''}`
    : 'Retrouvez bientôt nos articles sur cette discipline.';

  const cats = ['Tous', ...new Set(list.map(a => window.catLabel(a.category)))];

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero">
      <h1>${dEmoji} ${label}</h1>
      <p>${countText}</p>
    </div>
    ${list.length === 0
      ? `<div class="empty-state">
          <span class="emoji">${dEmoji}</span>
          <h3>Articles bientôt disponibles</h3>
          <p>Cette discipline sera bientôt enrichie de guides, analyses et actualités. Revenez vite !</p>
          <a href="#/guides" class="btn">📖 Voir les guides →</a>
        </div>`
      : `<div class="filter-bar" id="filter-bar">
          ${cats.map((c, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`).join('')}
        </div>
        <div class="list-grid" id="article-list">
          ${renderCards(list)}
        </div>`
    }
  </div>`;

  if (list.length > 0) {
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
      filterBar.addEventListener('click', e => {
        if (!e.target.matches('.filter-btn')) return;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const cat      = e.target.dataset.cat;
        const filtered = cat === 'Tous' ? list : list.filter(a => window.catLabel(a.category) === cat);
        const grid     = document.getElementById('article-list');
        if (grid) grid.innerHTML = renderCards(filtered);
      });
    }
  }
};

/* ══════════════════════════════════════════════════════
   PAGE ARTICLE
   Déjà protégé : appelle renderNotFound si slug inconnu
══════════════════════════════════════════════════════ */
window.renderArticle = function (app, slug) {
  const articles = _articles();
  const idx = articles.findIndex(a => a.slug === slug);

  // CORRECTION : slug introuvable → page 404 propre
  if (idx === -1) {
    window.renderNotFound(app, `L'article "${slug}" est introuvable.`);
    return;
  }

  const art  = articles[idx];
  const prev = articles[idx - 1] || null;
  const next = articles[idx + 1] || null;

  window.updateSEO({
    title:       art.title.replace(/<[^>]+>/g, ''),
    description: art.excerpt || '',
  });

  const discKey  = art.sport || window.disciplineToSlug(art.discipline);
  const tagHtml  = (art.tags || []).map(t => `<span class="art-tag ${t.cls || ''}">${t.label}</span>`).join('');
  const heroStyle = getImageStyle(art);
  const heroHtml  = art.image
    ? `<div style="height:380px; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:32px; ${heroStyle} background-size:cover; background-position:center; box-shadow:var(--shadow-lg);"></div>`
    : '';

  // Articles connexes (même discipline, hors article courant)
  const related = articles
    .filter(a => a.discipline === art.discipline && a.slug !== slug)
    .slice(0, 4);

  app.innerHTML = `
  <div class="article-wrap">
    <div class="art-main">
      <a href="#/${discKey}" class="back-btn">← Retour à ${art.discipline}</a>
      ${heroHtml}
      <div class="art-tags">${tagHtml}</div>
      <h1 class="art-h1">${art.title}</h1>
      <p class="art-lead">${art.excerpt || ''}</p>
      <div class="art-meta-row">
        <span>✍ <strong>Front Kick</strong></span>
        <span>📅 <strong>${art.date}</strong></span>
        <span>⏱ <strong>${art.readTime} de lecture</strong></span>
      </div>
      <div class="art-content">${art.content}</div>
      <div class="art-nav">
        ${prev ? `<a href="#/article/${prev.slug}" class="art-nav-btn">← Précédent<small>${prev.title.replace(/<[^>]+>/g, '').slice(0, 55)}…</small></a>` : ''}
        ${next ? `<a href="#/article/${next.slug}" class="art-nav-btn right">Suivant →<small>${next.title.replace(/<[^>]+>/g, '').slice(0, 55)}…</small></a>` : ''}
      </div>
    </div>
    <aside class="art-sidebar">
      <div class="widget">
        <div class="widget-head">📰 Articles connexes</div>
        <div class="widget-body">
          ${related.length
            ? related.map(a => `
              <div style="margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid var(--border);">
                <div style="font-size:0.7rem; color:var(--blue); font-weight:600; text-transform:uppercase; letter-spacing:.04em; margin-bottom:4px;">${a.date}</div>
                <a href="#/article/${a.slug}" style="font-size:0.88rem; font-weight:500; color:var(--text); line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; transition:color .2s;"
                   onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--text)'">${a.title.replace(/<[^>]+>/g, '')}</a>
              </div>`).join('')
            : `<p style="font-size:0.85rem; color:var(--text-light);">D'autres articles ${art.discipline} arrivent bientôt.</p>`
          }
        </div>
      </div>
      <div class="ad-slot ad-rect">AdSense 300×250</div>
    </aside>
  </div>`;
};

/* ══════════════════════════════════════════════════════
   PAGE ACTUALITÉS
══════════════════════════════════════════════════════ */
window.renderActualites = function (app) {
  window.updateSEO({
    title:       'Actualités & Analyses',
    description: 'Toute l\'actualité des sports de combat : résultats, analyses de combats, portraits de champions.',
  });

  const articles = _articles();
  const actus    = articles.filter(a =>
    ['actualite', 'analyse-combat', 'analyse', 'portrait', 'bilan'].includes(a.category)
  );
  const display  = actus.length > 0 ? actus : articles;
  const cats     = ['Tous', ...new Set(display.map(a => window.catLabel(a.category)))];

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero">
      <h1>📰 Actualités & Analyses</h1>
      <p>${display.length} article${display.length > 1 ? 's' : ''}</p>
    </div>
    <div class="filter-bar" id="actu-filter">
      ${cats.map((c, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
    <div class="list-grid" id="actu-list">
      ${renderCards(display)}
    </div>
  </div>`;

  const filter = document.getElementById('actu-filter');
  if (filter) {
    filter.addEventListener('click', e => {
      if (!e.target.matches('.filter-btn')) return;
      document.querySelectorAll('#actu-filter .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat      = e.target.dataset.cat;
      const filtered = cat === 'Tous' ? display : display.filter(a => window.catLabel(a.category) === cat);
      const list     = document.getElementById('actu-list');
      if (list) list.innerHTML = renderCards(filtered);
    });
  }
};

/* ══════════════════════════════════════════════════════
   PAGE GUIDES — liste
══════════════════════════════════════════════════════ */
window.renderGuides = function (app) {
  window.updateSEO({
    title:       'Guides débutants par discipline',
    description: 'Guides complets pour débuter le MMA, la boxe, le muay-thaï, le BJJ, le judo et plus encore.',
  });

  const guideList = [
    { id: 'mma',     name: 'MMA',           emoji: '🥊', banner: 'linear-gradient(135deg, #0F172A 0%, #1E88E5 100%)', desc: 'Grappling, frappes, wrestling — le sport de combat le plus complet au monde.',      level: 'Tous niveaux' },
    { id: 'boxe',    name: 'Boxe anglaise',  emoji: '🥊', banner: 'linear-gradient(135deg, #7f1d1d 0%, #DC2626 100%)', desc: 'Deux siècles de science du poing condensés en quatre coups fondamentaux.',         level: 'Tous niveaux' },
    { id: 'muay',    name: 'Muay-Thaï',      emoji: '🦵', banner: 'linear-gradient(135deg, #78350f 0%, #F59E0B 100%)', desc: "L'art des 8 membres — poings, pieds, genoux, coudes. Brutal et élégant.",          level: 'Tous niveaux' },
    { id: 'bjj',     name: 'BJJ',            emoji: '🤼', banner: 'linear-gradient(135deg, #1e3a8a 0%, #3B82F6 100%)', desc: 'La technique prime sur la force. Combat au sol, étranglements, soumissions.',    level: 'Tous niveaux' },
    { id: 'judo',    name: 'Judo',           emoji: '🥋', banner: 'linear-gradient(135deg, #1a1a1a 0%, #4B5563 100%)', desc: 'Sport olympique. Projections spectaculaires et immobilisations au sol.',           level: 'Tous niveaux' },
    { id: 'karate',  name: 'Karaté',         emoji: '🥋', banner: 'linear-gradient(135deg, #0a2a1a 0%, #059669 100%)', desc: 'Katas, kumite — bien plus qu\'un art enseigné à l\'école primaire.',               level: 'Tous niveaux' },
    { id: 'savate',  name: 'Savate',         emoji: '👟', banner: 'linear-gradient(135deg, #0c1a2e 0%, #0284C7 100%)', desc: 'La boxe française — discipline méconnue, technique et élégante.',                  level: 'Tous niveaux' },
    { id: 'lethwei', name: 'Lethwei',        emoji: '💀', banner: 'linear-gradient(135deg, #3b0a0a 0%, #991B1B 100%)', desc: 'Boxe birmane sans gants, coups de tête autorisés. Pas pour débutants.',            level: 'Confirmé requis' },
  ];

  const guides = window.GUIDES || {};

  app.innerHTML = `
  <div class="guides-page">
    <div class="list-hero">
      <h1>📖 Guides par discipline</h1>
      <p>Histoire, techniques fondamentales, équipement et progression — de zéro à la compétition.</p>
    </div>
    <div class="guides-grid">
      ${guideList.map(g => `
      <a href="#/guides/${g.id}" class="guide-card">
        <div class="guide-banner" style="background:${g.banner};">
          <span style="font-size:3.2rem; position:relative; z-index:1; filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));">${g.emoji}</span>
          <span class="guide-level">${g.level}</span>
        </div>
        <div class="guide-body">
          <div class="guide-sport">${g.name}</div>
          <div class="guide-desc">${g.desc}</div>
          <div class="guide-meta">
            <span>${guides[g.id]?.toc?.length || 0} sections</span>
            <span class="guide-arrow">Lire le guide →</span>
          </div>
        </div>
      </a>`).join('')}
    </div>
  </div>`;
};

/* ══════════════════════════════════════════════════════
   PAGE GUIDE DÉTAIL
══════════════════════════════════════════════════════ */
window.renderGuideDetail = function (app, id) {
  const g = window.GUIDES && window.GUIDES[id];
  if (!g) { window.renderNotFound(app, `Le guide "${id}" est introuvable.`); return; }

  window.updateSEO({
    title:       `Guide débutant ${g.sport}`,
    description: `Guide complet pour débuter ${g.sport} : histoire, techniques fondamentales, équipement et progression.`,
  });

  const tocHtml = (g.toc || []).map((t, i) =>
    `<div class="toc-item" onclick="document.getElementById('g-s${i + 1}')?.scrollIntoView({behavior:'smooth'})">${i + 1}. ${t}</div>`
  ).join('');

  app.innerHTML = `
  <div class="guide-wrap">
    <a href="#/guides" class="back-btn">← Tous les guides</a>
    <div class="guide-intro-banner" style="background:${g.banner}; height:200px; display:flex; align-items:center; justify-content:center; font-size:5rem; filter:drop-shadow(0 8px 24px rgba(0,0,0,.2));">${g.emoji}</div>
    <div class="toc-box">
      <div class="toc-title">📋 Sommaire</div>
      <div class="toc-items">${tocHtml}</div>
    </div>
    <div class="art-content">${g.html || ''}</div>
    <div style="margin-top:3rem;">
      <a href="#/guides" class="back-btn">← Tous les guides</a>
    </div>
  </div>`;
};

/* ══════════════════════════════════════════════════════
   PAGE RECOMMANDATIONS
══════════════════════════════════════════════════════ */
window.renderRecos = function (app) {
  window.updateSEO({
    title:       'Recommandations par sport et niveau',
    description: 'Articles et guides recommandés selon votre discipline et votre niveau : débutant, intermédiaire ou confirmé.',
  });

  const recos = window.RECOS || [];

  const SPORT_LABELS = {
    'mma':                  '🥊 MMA',
    'boxe':                 '🥊 Boxe',
    'kickboxing':           '🦵 Kickboxing',
    'muay-thai':            '🦵 Muay-Thaï',
    'grappling':            '🤼 Grappling',
    'brazilian-jiu-jitsu':  '🤼 BJJ',
    'judo':                 '🥋 Judo',
    'sambo':                '🦅 Sambo',
    'karate':               '🥋 Karaté',
    'savate':               '👟 Savate',
    'lethwei':              '💀 Lethwei',
    'equipement':           '🛒 Équipement',
  };
  const LEVEL_LABELS = {
    debutant:      '🟢 Débutant',
    intermediaire: '🟡 Intermédiaire',
    avance:        '🔴 Avancé',
  };

  const sports = ['tous', ...new Set(recos.map(r => r.sport))];
  const levels = ['tous', ...new Set(recos.map(r => r.level))];

  function recoCard(r) {
    const href = r.guideId
      ? `href="#/guides/${r.guideId}"`
      : r.slug
        ? `href="#/article/${r.slug}"`
        : '';
    return `
    <a ${href} class="reco-card" data-sport="${r.sport}" data-level="${r.level}" style="
      display:flex; flex-direction:column; gap:10px;
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius-lg); padding:20px;
      box-shadow:var(--shadow-sm); text-decoration:none; color:inherit;
      transition:transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    " onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow-lg)';this.style.borderColor='var(--blue)'"
       onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow-sm)';this.style.borderColor='var(--border)'">
      <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
        <span style="font-size:1.4rem;">${r.icon}</span>
        <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em;
              background:var(--blue-tint); color:var(--blue); padding:3px 10px; border-radius:20px;">
          ${r.sportLabel}
        </span>
        <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.04em;
              background:#f1f5f9; color:var(--text-light); padding:3px 10px; border-radius:20px;">
          ${LEVEL_LABELS[r.level] || r.level}
        </span>
        <span class="atype ${r.typeClass}" style="margin-left:auto;">${r.type}</span>
      </div>
      <div style="font-size:0.98rem; font-weight:700; line-height:1.35; color:var(--text);">${r.title}</div>
      <div style="font-size:0.85rem; color:var(--text-light); line-height:1.55; flex:1;">${r.desc}</div>
      <div style="font-size:0.8rem; font-weight:700; color:var(--blue); margin-top:4px;">
        ${r.guideId ? '📖 Lire le guide →' : '📝 Lire l\'article →'}
      </div>
    </a>`;
  }

  function renderFilteredRecos(sport, level) {
    const filtered = recos.filter(r =>
      (sport === 'tous' || r.sport === sport) &&
      (level === 'tous' || r.level === level)
    );
    const grid = document.getElementById('reco-grid');
    if (!grid) return;
    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
        <span class="emoji">🔎</span>
        <h3>Aucune recommandation</h3>
        <p>Aucun contenu ne correspond à cette combinaison de filtres.</p>
      </div>`;
      return;
    }
    grid.innerHTML = filtered.map(recoCard).join('');
  }

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero">
      <h1>⭐ Recommandations</h1>
      <p>Articles et guides sélectionnés selon votre discipline et votre niveau.</p>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:28px; align-items:center;">
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--text-light);">Sport</label>
        <div style="display:flex; flex-wrap:wrap; gap:8px;" id="reco-sport-filters">
          ${sports.map((s, i) => `
          <button class="filter-btn${i === 0 ? ' active' : ''}" data-sport="${s}">
            ${s === 'tous' ? '🌐 Tous les sports' : (SPORT_LABELS[s] || s)}
          </button>`).join('')}
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--text-light);">Niveau</label>
        <div style="display:flex; flex-wrap:wrap; gap:8px;" id="reco-level-filters">
          ${levels.map((l, i) => `
          <button class="filter-btn${i === 0 ? ' active' : ''}" data-level="${l}">
            ${l === 'tous' ? '📊 Tous niveaux' : (LEVEL_LABELS[l] || l)}
          </button>`).join('')}
        </div>
      </div>
    </div>
    <div id="reco-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px,1fr)); gap:20px;">
      ${recos.map(recoCard).join('')}
    </div>
  </div>`;

  let activeSport = 'tous';
  let activeLevel = 'tous';

  const sf = document.getElementById('reco-sport-filters');
  const lf = document.getElementById('reco-level-filters');

  if (sf) {
    sf.addEventListener('click', e => {
      if (!e.target.matches('.filter-btn')) return;
      sf.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeSport = e.target.dataset.sport;
      renderFilteredRecos(activeSport, activeLevel);
    });
  }
  if (lf) {
    lf.addEventListener('click', e => {
      if (!e.target.matches('.filter-btn')) return;
      lf.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeLevel = e.target.dataset.level;
      renderFilteredRecos(activeSport, activeLevel);
    });
  }
};

/* ══════════════════════════════════════════════════════
   PAGE AUTRES SPORTS
══════════════════════════════════════════════════════ */
window.renderDisciplines = function (app) {
  window.renderList(app, 'autres-sports');
};

/* ══════════════════════════════════════════════════════
   PAGE RECHERCHE
══════════════════════════════════════════════════════ */
window.renderSearch = function (app, query) {
  const q       = (query || '').toLowerCase().trim();
  const results = _articles().filter(a =>
    a.title.toLowerCase().includes(q) ||
    (a.excerpt || '').toLowerCase().includes(q) ||
    (a.content || '').toLowerCase().includes(q)
  );

  window.updateSEO({
    title:       `Recherche : ${query}`,
    description: `${results.length} résultat(s) pour "${query}" sur Front Kick.`,
  });

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero">
      <h1>🔍 Recherche : « ${query} »</h1>
      <p>${results.length} résultat${results.length !== 1 ? 's' : ''} trouvé${results.length !== 1 ? 's' : ''}</p>
    </div>
    ${results.length === 0
      ? `<div class="empty-state">
          <span class="emoji">🔎</span>
          <h3>Aucun résultat</h3>
          <p>Votre recherche « <strong>${query}</strong> » n'a retourné aucun article. Essayez d'autres mots-clés.</p>
          <a href="#/" class="btn">← Retour à l'accueil</a>
        </div>`
      : `<div class="list-grid">${renderCards(results)}</div>`
    }
  </div>`;
};

/* ══════════════════════════════════════════════════════
   PAGE 404
   CORRECTION : accepte un message optionnel
══════════════════════════════════════════════════════ */
window.renderNotFound = function (app, message) {
  window.updateSEO({ title: '404 — Page introuvable' });
  const detail = message ? `<p style="font-size:0.82rem; color:var(--text-muted); margin-top:8px;">${message}</p>` : '';
  app.innerHTML = `
  <div class="empty-state">
    <span class="emoji">😕</span>
    <h3>404 — Page introuvable</h3>
    <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
    ${detail}
    <a href="#/" class="btn">← Retour à l'accueil</a>
  </div>`;
};
