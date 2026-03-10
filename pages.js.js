// js/pages.js
/* ======================================================
   FRONT KICK — pages.js
   Fonctions de rendu de chaque page
======================================================= */

// Helper local pour lister les articles (utilisé dans plusieurs fonctions)
function listItems(list) {
  if (!list.length) return '<p style="color:var(--text-muted);padding:2rem 0">Aucun article dans cette catégorie pour l\'instant.</p>';
  return list.map((a,i)=>`
  <a href="#/article/${a.slug}" class="list-item">
    <span class="list-num">${String(i+1).padStart(2,'0')}</span>
    <div class="list-info">
      <div class="list-cat">${a.discipline} · ${window.catLabel(a.category)}</div>
      <div class="list-title">${a.title.replace(/<[^>]+>/g,'')}</div>
      <div class="list-meta">${a.date} · ${a.readTime}</div>
    </div>
    <div class="list-badge"><span class="atype ${window.catClass(a.category)}">${window.catLabel(a.category)}</span></div>
  </a>`).join('');
}

// PAGE ACCUEIL
window.renderHome = function(app) {
  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const sidebar  = ARTICLES.filter(a => !a.featured).slice(0,4);
  const recent   = ARTICLES.filter(a => a !== featured).slice(0,6);

  const disciplineCards = [
    {key:'mma',          name:'MMA',          emoji:'🥊', origin:'Mixed Martial Arts · Mondial'},
    {key:'boxe',         name:'Boxe anglaise', emoji:'🥊', origin:'Boxing · Grande-Bretagne'},
    {key:'kickboxing',   name:'Kickboxing',    emoji:'🦵', origin:'Full contact · USA / Japon'},
    {key:'muay-thai',    name:'Muay-Thaï',     emoji:'🦵', origin:'Art martial · Thaïlande'},
    {key:'grappling',    name:'Grappling',     emoji:'🤼', origin:'BJJ · Judo · Wrestling · Sambo'},
    {key:'autres-sports',name:'Autres sports', emoji:'🥋', origin:'Karaté · Savate · Lethwei · Kali…'},
  ];

  app.innerHTML = `
  <div class="hero">
    <a href="#/article/${featured.slug}" class="featured-card" style="text-decoration:none">
      <div class="featured-img">
        <span class="fi-badge">🔥 À la une</span>
        <span class="fi-sport">${featured.discipline} · ${featured.date}</span>
      </div>
      <div class="featured-body">
        <div class="feat-meta"><span class="cat">${window.catLabel(featured.category)}</span><span>${featured.date}</span><span>· ${featured.readTime}</span></div>
        <h2 class="feat-h1">${featured.title}</h2>
        <p class="feat-desc">${featured.excerpt}</p>
        <div class="feat-footer"><span class="read-more">Lire l'article →</span></div>
      </div>
    </a>
    <div class="hero-sidebar">
      ${sidebar.map(a=>`
      <a href="#/article/${a.slug}" class="mini-card" style="text-decoration:none">
        <div class="mini-icon">${a.emoji||'🥊'}</div>
        <div>
          <div class="mini-cat">${a.discipline} · ${window.catLabel(a.category)}</div>
          <div class="mini-title">${a.title.replace(/<[^>]+>/g,'')}</div>
          <div class="mini-date">${a.date}</div>
        </div>
      </a>`).join('')}
    </div>
  </div>

  <div class="sec-bar">
    <h2>Disciplines</h2><div class="sec-line"></div>
  </div>
  <div class="sports-hub" style="margin-bottom:2.5rem">
    ${disciplineCards.map(d=>`
    <a href="#/${d.key}" class="sport-hub-card" style="text-decoration:none">
      <div class="sport-hub-top">
        <span class="sport-emoji">${d.emoji}</span>
        <div><div class="sport-name">${d.name}</div><div class="sport-origin">${d.origin}</div></div>
      </div>
      <div class="sport-links">
        <div class="sport-link"><span class="sl-icon">📝</span> Articles <span class="sl-count">${
          d.key === 'grappling'
            ? (window.getArticlesByGroup ? window.getArticlesByGroup('grappling').length : 0)
            : d.key === 'autres-sports'
              ? ARTICLES.filter(a => ['karate','taekwondo','savate','lethwei','sanda'].includes(a.sport)).length
              : ARTICLES.filter(a=>a.sport===d.key).length
        } articles</span></div>
        <div class="sport-link"><span class="sl-icon">📖</span> Guide débutant <span class="sl-count">→</span></div>
      </div>
    </a>`).join('')}
  </div>

  <div class="main-layout">
    <main>
      <div class="sec-bar" style="padding:0 0 1rem">
        <h2>Dernières publications</h2><div class="sec-line"></div>
        <a href="#/mma" class="see-all" style="text-decoration:none">Voir tout →</a>
      </div>
      <div class="art-grid">
        ${recent.map(a=>`
        <a href="#/article/${a.slug}" class="art-card" style="text-decoration:none">
          <div class="art-thumb" style="background:linear-gradient(135deg,#1a0a0a,#2d1515)">
            <span>${a.emoji||'🥊'}</span>
            <span class="art-thumb-tag">${a.discipline}</span>
          </div>
          <div class="art-body">
            <div class="art-cat">${window.catLabel(a.category)}</div>
            <div class="art-title-sm">${a.title.replace(/<[^>]+>/g,'')}</div>
            <div class="art-foot"><span>${a.date}</span><span class="atype ${window.catClass(a.category)}">${window.catLabel(a.category)}</span></div>
          </div>
        </a>`).join('')}
      </div>
    </main>
    <aside class="sidebar-col">
      <div class="nl-widget">
        <div class="nl-title">📬 Newsletter hebdo</div>
        <div class="nl-desc">Les meilleurs articles de la semaine. Gratuit.</div>
        <input class="nl-input" type="email" placeholder="votre@email.com"/>
        <button class="nl-btn">S'abonner gratuitement</button>
      </div>
      <div class="widget">
        <div class="widget-head">🏆 Prochains événements</div>
        <div class="widget-body">
          <div class="ev-item"><div class="ev-date"><div class="ev-day">12</div><div class="ev-month">Avr</div></div><div><div class="ev-name">UFC 314 — Miami</div><div class="ev-detail">MMA · Kaseya Center</div></div></div>
          <div class="ev-item"><div class="ev-date"><div class="ev-day">10</div><div class="ev-month">Mai</div></div><div><div class="ev-name">UFC 315 — Montréal</div><div class="ev-detail">MMA · Bell Centre</div></div></div>
          <div class="ev-item"><div class="ev-date"><div class="ev-day">06</div><div class="ev-month">Sep</div></div><div><div class="ev-name">UFC Paris 2025</div><div class="ev-detail">MMA · Accor Arena</div></div></div>
        </div>
      </div>
      <div style="position:relative;padding-top:1.2rem;text-align:center">
        <div style="position:absolute;top:4px;left:50%;transform:translateX(-50%);font-size:.58rem;color:var(--text-muted);letter-spacing:.12em">PUBLICITÉ</div>
        <div class="ad-slot ad-rect">AdSense 300×250</div>
      </div>
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
  const p = list.length > 0
    ? `${list.length} article${list.length !== 1 ? 's' : ''} disponible${list.length !== 1 ? 's' : ''}`
    : `Aucun article disponible pour le moment — du contenu arrive bientôt.`;

  const cats = ['Tous', ...new Set(list.map(a => window.catLabel(a.category)))];

  app.innerHTML = `
  <div class="list-page">
    <div class="list-hero"><h1>${h}</h1><p>${p}</p></div>
    ${list.length === 0
      ? `<div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:8px;padding:2.5rem;text-align:center;margin-top:1rem">
          <div style="font-size:3rem;margin-bottom:1rem">🥋</div>
          <p style="color:var(--text-secondary);margin-bottom:1rem">Les articles pour cette discipline arrivent bientôt.</p>
          <a href="#/guides" class="back-btn" style="display:inline-flex">📖 Consulter les guides débutants →</a>
        </div>`
      : `<div class="filter-bar" id="filter-bar">
      ${cats.map((c,i)=>`<button class="filter-btn${i===0?' active':''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
    <div class="list-grid" id="article-list">
      ${listItems(list)}
    </div>`
    }
  </div>`;

  if (list.length > 0) {
    document.getElementById('filter-bar').addEventListener('click', e => {
      if (!e.target.matches('.filter-btn')) return;
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.dataset.cat;
      const filtered = cat==='Tous' ? list : list.filter(a=>window.catLabel(a.category)===cat);
      document.getElementById('article-list').innerHTML = listItems(filtered);
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
      <div class="art-content" style="margin-top:2rem">${art.content}</div>
      <div class="art-nav">
        ${prev
          ? `<a href="#/article/${prev.slug}" class="art-nav-btn"><div class="nav-dir">← Précédent</div>${prev.title.replace(/<[^>]+>/g,'').slice(0,50)}…</a>`
          : `<a href="#/${discKey}" class="art-nav-btn"><div class="nav-dir">← Retour</div>Liste ${art.discipline}</a>`}
        ${next
          ? `<a href="#/article/${next.slug}" class="art-nav-btn right"><div class="nav-dir">Suivant →</div>${next.title.replace(/<[^>]+>/g,'').slice(0,50)}…</a>`
          : `<a href="#/${discKey}" class="art-nav-btn right"><div class="nav-dir">Retour →</div>Liste ${art.discipline}</a>`}
      </div>
    </div>
    <aside class="art-sidebar">
      <div class="widget">
        <div class="widget-head">📰 Articles récents</div>
        <div class="widget-body">
          ${ARTICLES.filter(a=>a.discipline===art.discipline && a.slug!==slug).slice(0,4).map(a=>`
          <div style="padding:.6rem 0;border-bottom:1px solid var(--border-light)">
            <div style="font-size:.68rem;color:var(--accent-gold);text-transform:uppercase;margin-bottom:.2rem">${a.date}</div>
            <a href="#/article/${a.slug}" style="font-size:.82rem;color:var(--text-primary);line-height:1.4">${a.title.replace(/<[^>]+>/g,'')}</a>
          </div>`).join('')}
        </div>
      </div>
      <div style="position:relative;padding-top:1.2rem;text-align:center">
        <div style="position:absolute;top:4px;left:50%;transform:translateX(-50%);font-size:.58rem;color:var(--text-muted);letter-spacing:.12em">PUBLICITÉ</div>
        <div class="ad-slot ad-rect">AdSense 300×250</div>
      </div>
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
      <h1>📰 Actualités &amp; Analyses</h1>
      <p>${display.length} article${display.length !== 1 ? 's' : ''} — résultats, portraits et décryptages</p>
    </div>
    <div class="filter-bar" id="actu-filter">
      ${cats.map((c,i)=>`<button class="filter-btn${i===0?' active':''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
    <div class="list-grid" id="actu-list">
      ${listItems(display)}
    </div>
  </div>`;

  document.getElementById('actu-filter').addEventListener('click', e => {
    if (!e.target.matches('.filter-btn')) return;
    document.querySelectorAll('#actu-filter .filter-btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.dataset.cat;
    const filtered = cat === 'Tous' ? display : display.filter(a => window.catLabel(a.category) === cat);
    document.getElementById('actu-list').innerHTML = listItems(filtered);
  });
};

// PAGE GUIDES (liste)
window.renderGuides = function(app) {
  const guideList = [
    {id:'mma',    name:'MMA',          emoji:'🥊', banner:'linear-gradient(135deg,#1a0a0a,#2d1010)', diff:'diff-debutant', label:'Tous niveaux',    desc:'Grappling, frappes, wrestling — le sport de combat complet.'},
    {id:'boxe',   name:'Boxe anglaise',emoji:'🥊', banner:'linear-gradient(135deg,#0a0f1a,#10182a)', diff:'diff-debutant', label:'Tous niveaux',    desc:'Deux siècles de science condensés en quatre coups.'},
    {id:'muay',   name:'Muay-Thaï',    emoji:'🦵', banner:'linear-gradient(135deg,#1a0f00,#2a1800)', diff:'diff-debutant', label:'Tous niveaux',    desc:"L'art des 8 membres — poings, pieds, genoux, coudes."},
    {id:'bjj',    name:'BJJ',          emoji:'🤼', banner:'linear-gradient(135deg,#0a0a1a,#101025)', diff:'diff-debutant', label:'Tous niveaux',    desc:'La technique prime sur la force. Combat au sol.'},
    {id:'judo',   name:'Judo',         emoji:'🥋', banner:'linear-gradient(135deg,#0f0808,#1e1010)', diff:'diff-debutant', label:'Tous niveaux',    desc:'Sport olympique. Projections et immobilisations.'},
    {id:'karate', name:'Karaté',       emoji:'🥋', banner:'linear-gradient(135deg,#0a0f0a,#101810)', diff:'diff-debutant', label:'Tous niveaux',    desc:'Katas, kumite — bien plus qu\'un art scolaire.'},
    {id:'savate', name:'Savate',       emoji:'👟', banner:'linear-gradient(135deg,#0a1215,#0f1f25)', diff:'diff-debutant', label:'Tous niveaux',    desc:'Boxe française — la discipline méconnue de France.'},
    {id:'lethwei',name:'Lethwei',      emoji:'💀', banner:'linear-gradient(135deg,#1a0808,#2a1010)', diff:'diff-avance',   label:'Confirmé requis', desc:'Boxe birmane sans gants. Pas pour débutants.'},
  ];

  app.innerHTML = `
  <div class="guides-page">
    <div class="guides-hero">
      <h1>📖 Guides par discipline</h1>
      <p>Chaque guide couvre l'histoire, les techniques fondamentales, l'équipement et les étapes de progression — de zéro à la compétition.</p>
    </div>
    <div class="guides-grid">
      ${guideList.map(g=>`
      <a href="#/guides/${g.id}" class="guide-card" style="text-decoration:none">
        <div class="guide-banner" style="background:${g.banner}">
          <span style="position:relative">${g.emoji}</span>
          <span class="guide-sport-tag">${g.name}</span>
          <span class="${g.diff}" style="position:absolute;top:.75rem;right:.75rem">${g.label}</span>
        </div>
        <div class="guide-body">
          <div class="guide-sport">${g.name}</div>
          <div class="guide-desc">${g.desc}</div>
          <div class="guide-meta">
            <span>${GUIDES[g.id]?.toc.length||0} sections</span>
            <span class="guide-arrow">Lire le guide →</span>
          </div>
        </div>
      </a>`).join('')}
    </div>
  </div>`;
};

// PAGE GUIDE DÉTAIL
window.renderGuideDetail = function(app, id) {
  const g = GUIDES[id];
  if (!g) { window.renderNotFound(app); return; }
  const tocHtml = g.toc.map((t,i)=>
    `<div class="toc-item" onclick="document.getElementById('g-s${i+1}')?.scrollIntoView({behavior:'smooth'})">${i+1}. ${t}</div>`
  ).join('');

  app.innerHTML = `
  <div class="guide-wrap">
    <a href="#/guides" class="back-btn">← Tous les guides</a>
    <div class="guide-intro-banner" style="background:${g.banner}">
      <span style="position:relative;font-size:5rem">${g.emoji}</span>
      <span class="${g.diffClass}" style="position:absolute;top:1rem;right:1rem">${g.diffLabel}</span>
    </div>
    <div class="toc-box">
      <div class="toc-title">📋 Sommaire</div>
      <div class="toc-items">${tocHtml}</div>
    </div>
    <div class="art-content">${g.html}</div>
    <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border-light)">
      <a href="#/guides" class="back-btn">← Tous les guides</a>
    </div>
  </div>`;
};

// PAGE RECOMMANDATIONS
window.renderRecos = function(app) {
  let activeSport = 'all', activeLevel = 'all';

  function buildGrid() {
    const lvlLabel = {debutant:'🟢 Débutant',intermediaire:'🟡 Intermédiaire',avance:'🔴 Avancé','confirmé':'🔴 Confirmé'};
    const lvlClass = {debutant:'lb-debutant',intermediaire:'lb-intermediaire',avance:'lb-avance','confirmé':'lb-avance'};
    const filtered = RECOS.filter(r=>
      (activeSport==='all'||r.sport===activeSport)&&
      (activeLevel==='all'||r.level===activeLevel)
    );
    if (!filtered.length) return '<p style="color:var(--text-muted);padding:2rem 0;grid-column:1/-1">Aucune recommandation dans ces critères.</p>';
    return filtered.map(r=>{
      const href = r.slug ? `#/article/${r.slug}` : r.guideId ? `#/guides/${r.guideId}` : null;
      return `${href
        ? `<a href="${href}" class="reco-card" style="text-decoration:none">`
        : `<div class="reco-card" style="opacity:.6;cursor:default">`}
        <div class="reco-top">
          <span class="reco-sport-icon">${r.icon}</span>
          <div class="reco-badges">
            <span class="reco-sport-tag">${r.sportLabel}</span>
            <span class="level-badge ${lvlClass[r.level]||'lb-debutant'}">${lvlLabel[r.level]||r.level}</span>
          </div>
        </div>
        <div class="reco-title">${r.title}</div>
        <div class="reco-desc">${r.desc}</div>
        <div class="reco-footer">
          <span class="atype ${r.typeClass}">${r.type}</span>
          <span class="reco-cta">${href?'Lire →':'Bientôt →'}</span>
        </div>
      ${href ? '</a>' : '</div>'}`;
    }).join('');
  }

  app.innerHTML = `
  <div class="reco-page">
    <h1>⭐ Recommandations par niveau</h1>
    <p style="color:var(--text-secondary);margin-bottom:1.5rem">Trouvez exactement ce qu'il vous faut selon votre discipline et votre niveau.</p>
    <div class="reco-filters">
      <div class="filter-row">
        <span class="filter-label">Sport</span>
        <button class="filter-btn active" data-sport="all">Tous</button>
        <button class="filter-btn" data-sport="mma">MMA</button>
        <button class="filter-btn" data-sport="boxe">Boxe</button>
        <button class="filter-btn" data-sport="muay">Muay-Thaï</button>
        <button class="filter-btn" data-sport="bjj">BJJ</button>
        <button class="filter-btn" data-sport="judo">Judo</button>
        <button class="filter-btn" data-sport="karate">Karaté</button>
        <button class="filter-btn" data-sport="niche">Autres</button>
      </div>
      <div class="filter-row">
        <span class="filter-label">Niveau</span>
        <button class="filter-btn active" data-level="all">Tous</button>
        <button class="filter-btn" data-level="debutant">🟢 Débutant</button>
        <button class="filter-btn" data-level="intermediaire">🟡 Intermédiaire</button>
        <button class="filter-btn" data-level="avance">🔴 Avancé</button>
      </div>
    </div>
    <div class="reco-grid" id="reco-grid">${buildGrid()}</div>
  </div>`;

  app.querySelector('.reco-page').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    if ('sport' in btn.dataset) {
      app.querySelectorAll('[data-sport]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); activeSport = btn.dataset.sport;
    }
    if ('level' in btn.dataset) {
      app.querySelectorAll('[data-level]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); activeLevel = btn.dataset.level;
    }
    document.getElementById('reco-grid').innerHTML = buildGrid();
  });
};

// PAGE AUTRES SPORTS
window.renderDisciplines = function(app) {
  const niches = [
    {flag:'🥊',name:'Muay-Thaï',origin:'Thaïlande',desc:"L'art des 8 membres. La discipline debout la plus complète.",stats:['Poings','Pieds','Genoux','Coudes'],guide:'muay'},
    {flag:'🤼',name:'Jiu-Jitsu Brésilien',origin:'Brésil',desc:'Combat au sol, soumissions, technique avant tout.',stats:['Sol','Soumissions','Ceintures'],guide:'bjj'},
    {flag:'🥋',name:'Judo',origin:'Japon, 1882',desc:'Projections et immobilisations. Sport olympique depuis 1964.',stats:['Projections','Katamé','Olympique'],guide:'judo'},
    {flag:'🥋',name:'Karaté',origin:'Okinawa / Japon',desc:'Frappes codifiées, katas, kumite. Multiple styles.',stats:['Katas','Kumite','Olympique 2020'],guide:'karate'},
    {flag:'👟',name:'Savate',origin:'France, XIXe',desc:"La boxe française. Pieds et poings, chaussures obligatoires.",stats:['Pieds','Poings','100% français'],guide:'savate'},
    {flag:'💀',name:'Lethwei',origin:'Myanmar (Birmanie)',desc:'La boxe la plus violente. Sans gants, têtes autorisées.',stats:['Sans gants','Têtes','KO ou rien'],guide:'lethwei'},
    {flag:'🤜',name:'Kickboxing',origin:'USA/Japon, 1970s',desc:'Boxe + coups de pied. Nombreux styles et organisations.',stats:['Full contact','K-1','Pieds hauts'],guide:null},
    {flag:'🇮🇳',name:'Kalaripayattu',origin:'Inde du Sud',desc:"L'un des plus anciens arts martiaux du monde.",stats:['Armes','Acrobaties','Millénaire'],guide:null},
    {flag:'🇳🇬',name:'Dambe',origin:"Afrique de l'Ouest",desc:'Boxe traditionnelle nigériane. Un poing redoutable.',stats:['Poing fort','Jambe pivot','Traditionnel'],guide:null},
    {flag:'🇵🇭',name:'Arnis / Kali',origin:'Philippines',desc:'Art martial aux armes (bâtons, couteaux) et à mains nues.',stats:['Armes','Bâtons','Couteaux'],guide:null},
    {flag:'🇺🇿',name:'Kurash',origin:'Asie Centrale',desc:"Lutte debout uzbeke. Présente aux Jeux Asiatiques.",stats:['Lutte','Debout','Asiatique'],guide:null},
    {flag:'🦅',name:'Sambo',origin:'URSS / Russie',desc:'Mélange judo + lutte développé en Union soviétique.',stats:['Projections','Sol','Russie'],guide:null},
  ];

  app.innerHTML = `
  <div class="niche-section">
    <div class="sec-bar" style="padding:0 0 1rem">
      <h2>🥋 Toutes les disciplines</h2><div class="sec-line"></div>
    </div>
    <p style="color:var(--text-secondary);font-size:.9rem;margin-bottom:1.5rem">Des arts martiaux les plus pratiqués aux disciplines les plus rares — Front Kick couvre l'ensemble du spectre des sports de combat.</p>
    <div class="niche-grid">
      ${niches.map(n=>`
      <div class="niche-card" onclick="${n.guide?`location.hash='#/guides/${n.guide}'`:''}">
        <div class="niche-flag">${n.flag}</div>
        <div class="niche-name">${n.name}</div>
        <div class="niche-origin">${n.origin}</div>
        <div class="niche-desc">${n.desc}</div>
        <div class="niche-stats">${n.stats.map(s=>`<span class="niche-stat">${s}</span>`).join('')}</div>
        ${n.guide?'<div style="font-size:.72rem;color:var(--accent-gold);margin-top:.25rem">Guide disponible →</div>':''}
      </div>`).join('')}
    </div>
  </div>`;
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
      <p>${results.length} résultat${results.length !== 1 ? 's' : ''}</p>
    </div>
    ${results.length === 0
      ? `<div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:8px;padding:2.5rem;text-align:center;margin-top:1rem">
          <div style="font-size:3rem;margin-bottom:1rem">🔎</div>
          <p style="color:var(--text-secondary);margin-bottom:1rem">Aucun article ne correspond à votre recherche.</p>
          <a href="#/" class="back-btn" style="display:inline-flex">← Retour à l'accueil</a>
        </div>`
      : `<div class="list-grid" id="search-list">
          ${results.map((a,i)=>`
          <a href="#/article/${a.slug}" class="list-item">
            <span class="list-num">${String(i+1).padStart(2,'0')}</span>
            <div class="list-info">
              <div class="list-cat">${a.discipline} · ${window.catLabel(a.category)}</div>
              <div class="list-title">${a.title.replace(/<[^>]+>/g,'')}</div>
              <div class="list-meta">${a.date} · ${a.readTime}</div>
            </div>
            <div class="list-badge"><span class="atype ${window.catClass(a.category)}">${window.catLabel(a.category)}</span></div>
          </a>`).join('')}
        </div>`
    }
  </div>`;
};

// PAGE 404
window.renderNotFound = function(app) {
  app.innerHTML = `
  <div class="not-found">
    <h1>404</h1>
    <p>Cette page n'existe pas ou l'article n'a pas encore été publié.</p>
    <a href="#/" class="back-btn">← Retour à l'accueil</a>
  </div>`;
};