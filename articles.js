/* ══════════════════════════════════════════════════════════════
   FRONT KICK — articles.js (fichier unique)

   AJOUTER UN ARTICLE :
   Ajoutez un objet dans le tableau _RAW_ARTICLES ci-dessous.

   CHAMPS OBLIGATOIRES :
   ┌─────────────────────────────────────────────────────────────┐
   │ id          → string unique, devient l'URL (#/article/id)   │
   │ title       → string, peut contenir <em>italique</em>       │
   │ sport       → voir SPORTS_META ci-dessous                   │
   │ category    → voir CATEGORIES ci-dessous                    │
   │ date        → string libre ("Mars 2026")                    │
   │ content     → HTML complet de l'article (ou "structured")   │
   └─────────────────────────────────────────────────────────────┘

   CHAMPS OPTIONNELS :
   ┌─────────────────────────────────────────────────────────────┐
   │ featured    → true  (un seul à la fois, sinon auto)         │
   │ excerpt     → string (sinon auto-extrait du content)        │
   │ structured  → objet (alternative à content)                 │
   └─────────────────────────────────────────────────────────────┘

   STRUCTURE POUR "structured" :
   {
     intro: "texte d'introduction",
     sections: [
       { type: "h2", text: "Titre section" },
       { type: "p",  text: "Paragraphe" },
       { type: "ul", items: ["item1", "item2"] },
       { type: "ol", items: ["étape 1", "étape 2"] },
       { type: "faq", items: [{ q: "Question ?", a: "Réponse." }] }
     ],
     conclusion: "texte de conclusion"
   }

   SPORTS DISPONIBLES :
   ── Disciplines principales ──
   "mma" "boxe" "kickboxing" "muay-thai" "grappling"
   ── Striking ──
   "karate" "taekwondo" "savate" "lethwei" "sanda"
   ── Grappling ──
   "brazilian-jiu-jitsu" "luta-livre" "judo" "sambo"
   "catch-wrestling" "lutte-libre" "lutte-greco-romaine"
   ── Autre ──
   "equipement"

   CATEGORIES DISPONIBLES :
   "analyse-combat"       → badge rouge  "Analyse combat"
   "analyse"              → badge bleu   "Analyse"
   "guide-debutant"       → badge or     "Guide débutant"
   "conseil-entrainement" → badge or     "Conseil"
   "guide-equipement"     → badge vert   "Équipement"
   "actualite"            → badge rouge  "Actualité"
   "portrait"             → badge bleu   "Portrait"
   "bilan"                → badge bleu   "Bilan"
══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   RÉFÉRENTIEL SPORTS
   Chaque sport → label affiché, groupe, emoji
───────────────────────────────────────────────────────── */
const SPORTS_META = {
  'mma':                  { label: 'MMA',                group: 'principal',  emoji: '🥊' },
  'boxe':                 { label: 'Boxe',               group: 'striking',   emoji: '🥊' },
  'kickboxing':           { label: 'Kickboxing',         group: 'striking',   emoji: '🦵' },
  'muay-thai':            { label: 'Muay-Thaï',          group: 'striking',   emoji: '🦵' },
  'karate':               { label: 'Karaté',             group: 'striking',   emoji: '🥋' },
  'taekwondo':            { label: 'Taekwondo',          group: 'striking',   emoji: '🦵' },
  'savate':               { label: 'Savate',             group: 'striking',   emoji: '👟' },
  'lethwei':              { label: 'Lethwei',            group: 'striking',   emoji: '💀' },
  'sanda':                { label: 'Sanda',              group: 'striking',   emoji: '🥊' },
  'grappling':            { label: 'Grappling',          group: 'grappling',  emoji: '🤼' },
  'brazilian-jiu-jitsu':  { label: 'BJJ',                group: 'grappling',  emoji: '🤼' },
  'luta-livre':           { label: 'Luta Livre',         group: 'grappling',  emoji: '🤼' },
  'judo':                 { label: 'Judo',               group: 'grappling',  emoji: '🥋' },
  'sambo':                { label: 'Sambo',              group: 'grappling',  emoji: '🦅' },
  'catch-wrestling':      { label: 'Catch Wrestling',    group: 'grappling',  emoji: '🤼' },
  'lutte-libre':          { label: 'Lutte libre',        group: 'grappling',  emoji: '🤼' },
  'lutte-greco-romaine':  { label: 'Lutte gréco-romaine',group: 'grappling',  emoji: '🤼' },
  'equipement':           { label: 'Équipement',         group: 'equipement', emoji: '🛒' },
};

/* ─────────────────────────────────────────────────────────
   UTILITAIRES INTERNES
───────────────────────────────────────────────────────── */
function _extractExcerpt(html) {
  if (!html) return '';
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim().slice(0, 220);
}

function _readTime(html) {
  if (!html) return '3 min';
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.round(words / 200))} min`;
}

function _buildTags(category, sport) {
  const sportMeta = SPORTS_META[sport] || { label: sport, emoji: '🥊' };
  const catMap = {
    'analyse-combat':       [{ label: 'Analyse',     cls: '' }],
    'analyse':              [{ label: 'Analyse',     cls: '' }],
    'guide-debutant':       [{ label: 'Guide',       cls: 'gold' }, { label: 'Débutant', cls: '' }],
    'conseil-entrainement': [{ label: 'Conseil',     cls: 'gold' }, { label: 'Entraînement', cls: '' }],
    'guide-equipement':     [{ label: 'Équipement',  cls: 'gold' }],
    'actualite':            [{ label: 'Actualité',   cls: '' }],
    'portrait':             [{ label: 'Portrait',    cls: '' }],
    'bilan':                [{ label: 'Bilan',       cls: '' }],
  };
  return [
    { label: sportMeta.label, cls: 'red' },
    ...(catMap[category] || [{ label: category, cls: '' }]),
  ];
}

/**
 * Génère un HTML structuré à partir d'un objet "structured".
 * Permet de créer des articles SEO sans écrire le HTML à la main.
 *
 * Structure cible générée :
 *   <p class="art-lead">  → intro
 *   <h2>                  → sections type "h2"
 *   <p>                   → sections type "p"
 *   <ul> / <ol>           → sections type "ul" / "ol"
 *   .faq-section          → sections type "faq" avec Schema.org
 *   <p><strong>Conclusion → conclusion
 */
function _generateStructuredHTML(struct) {
  if (!struct) return '';
  let html = '';

  if (struct.intro) {
    html += `<p class="art-lead">${struct.intro}</p>`;
  }

  if (struct.sections && Array.isArray(struct.sections)) {
    struct.sections.forEach(s => {
      switch (s.type) {
        case 'h2':
          html += `<h2>${s.text}</h2>`;
          break;
        case 'h3':
          html += `<h3>${s.text}</h3>`;
          break;
        case 'p':
          html += `<p>${s.text}</p>`;
          break;
        case 'ul':
          html += '<ul>' + (s.items || []).map(i => `<li>${i}</li>`).join('') + '</ul>';
          break;
        case 'ol':
          html += '<ol>' + (s.items || []).map(i => `<li>${i}</li>`).join('') + '</ol>';
          break;
        case 'blockquote':
          html += `<blockquote>${s.text}</blockquote>`;
          break;
        case 'faq':
          // Données structurées Schema.org FAQPage pour le SEO
          html += '<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">';
          (s.items || []).forEach(item => {
            html += `<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">`;
            html += `<h3 itemprop="name">${item.q}</h3>`;
            html += `<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">`;
            html += `<div itemprop="text">${item.a}</div>`;
            html += `</div></div>`;
          });
          html += '</div>';
          break;
        default:
          // Type inconnu : on ignore silencieusement
          break;
      }
    });
  }

  if (struct.conclusion) {
    html += `<p><strong>Conclusion :</strong> ${struct.conclusion}</p>`;
  }

  return html;
}

function _normalize(a) {
  const meta    = SPORTS_META[a.sport] || { label: a.sport, emoji: '🥊', group: 'autre' };
  // Priorité : "structured" > "content"
  const content = a.structured ? _generateStructuredHTML(a.structured) : (a.content || '');
  return {
    slug:       a.id,
    discipline: meta.label,
    category:   a.category,
    title:      a.title,
    excerpt:    a.excerpt || _extractExcerpt(content),
    date:       a.date,
    readTime:   _readTime(content),
    emoji:      meta.emoji,
    tags:       _buildTags(a.category, a.sport),
    content:    content,
    featured:   a.featured || false,
    sport:      a.sport,
    sportLabel: meta.label,
    sportGroup: meta.group || 'autre',
    image:      a.image || null,
  };
}

/* ══════════════════════════════════════════════════════════
   ARTICLES — TABLEAU UNIQUE
   Ordre suggéré : MMA → Boxe → Muay-Thaï → Kickboxing →
                   Grappling → BJJ → Judo → Équipement
══════════════════════════════════════════════════════════ */
const _RAW_ARTICLES = [
  // ── EXEMPLE d'article avec "content" (HTML libre) ──
  // {
  //   id:       'decouverte-mma',
  //   title:    'MMA : la discipline <em>complète</em>',
  //   sport:    'mma',
  //   category: 'guide-debutant',
  //   date:     'Mars 2026',
  //   featured: true,
  //   content:  `<p class="art-lead">Le MMA est le sport de combat le plus complet...</p>
  //              <h2>Les origines</h2><p>...</p>`,
  // },

  // ── EXEMPLE d'article avec "structured" (génération auto SEO) ──
  // {
  //   id:       'guide-boxe-debutant',
  //   title:    'Boxe anglaise : guide complet pour débuter',
  //   sport:    'boxe',
  //   category: 'guide-debutant',
  //   date:     'Mars 2026',
  //   structured: {
  //     intro: "La boxe anglaise est l'un des sports de combat les plus accessibles pour débuter.",
  //     sections: [
  //       { type: 'h2', text: 'Pourquoi choisir la boxe ?' },
  //       { type: 'p',  text: 'Sport olympique depuis 1904, la boxe développe...' },
  //       { type: 'ul', items: ['Cardio exceptionnel', 'Autodéfense efficace', 'Discipline mentale'] },
  //       { type: 'h2', text: 'Les 4 coups fondamentaux' },
  //       { type: 'ol', items: ['Le jab', 'Le direct', 'Le crochet', 'L\'uppercut'] },
  //       { type: 'faq', items: [
  //           { q: 'Quel âge pour commencer la boxe ?', a: 'Dès 6 ans pour les cours enfants, sans limite supérieure.' },
  //           { q: 'Faut-il être musclé pour boxer ?', a: 'Non. La technique prime sur la force physique.' },
  //       ]},
  //     ],
  //     conclusion: "La boxe est accessible à tous. Trouvez un club proche de chez vous et lancez-vous !"
  //   },
  // },
]; // fin _RAW_ARTICLES


/* ══════════════════════════════════════════════════════════
   CONSTRUCTION DU TABLEAU FINAL
══════════════════════════════════════════════════════════ */
const ARTICLES = _RAW_ARTICLES.map(_normalize);

// Si aucun article n'a featured:true → le premier devient featured par défaut
if (ARTICLES.length > 0 && !ARTICLES.some(a => a.featured)) {
  ARTICLES[0].featured = true;
}

/* ══════════════════════════════════════════════════════════
   EXPOSITION GLOBALE
   CORRECTION : window.ARTICLES, SPORTS_META et helpers
   doivent être accessibles depuis tous les autres scripts.
══════════════════════════════════════════════════════════ */
window.ARTICLES   = ARTICLES;
window.SPORTS_META = SPORTS_META;

/* ══════════════════════════════════════════════════════════
   VALIDATION DES ARTICLES
   Vérifie l'unicité des slugs, les caractères autorisés,
   et l'existence du sport. Console uniquement (non bloquant).
══════════════════════════════════════════════════════════ */
(function validateArticles() {
  const slugs = new Set();
  _RAW_ARTICLES.forEach((a, index) => {
    // Champs obligatoires
    if (!a.id || !a.title || !a.sport || !a.category || !a.date) {
      console.error(`❌ Article #${index} manque un champ obligatoire (id/title/sport/category/date)`);
    }
    // Unicité des slugs
    if (slugs.has(a.id)) {
      console.error(`❌ ID dupliqué : "${a.id}" (index ${index})`);
    } else {
      slugs.add(a.id);
    }
    // Caractères valides pour l'URL
    if (a.id && !/^[a-z0-9-]+$/.test(a.id)) {
      console.warn(`⚠️  ID "${a.id}" contient des caractères invalides (utiliser minuscules, chiffres, tirets)`);
    }
    // Sport connu
    if (a.sport && !SPORTS_META[a.sport]) {
      console.warn(`⚠️  Sport inconnu "${a.sport}" dans l'article "${a.id}"`);
    }
    // Contenu présent
    if (!a.content && !a.structured) {
      console.warn(`⚠️  Article "${a.id}" n'a ni "content" ni "structured"`);
    }
  });

  if (_RAW_ARTICLES.length === 0) {
    console.info('ℹ️  Front Kick — Aucun article dans _RAW_ARTICLES. Ajoutez du contenu pour démarrer.');
  } else {
    console.log(`✅ Front Kick — ${ARTICLES.length} article(s) chargé(s)`);
  }
})();

/* ══════════════════════════════════════════════════════════
   API PUBLIQUE
   Ces helpers sont disponibles globalement sous window.*
   CORRECTION : exposés sur window (au lieu de fonctions locales)
══════════════════════════════════════════════════════════ */

/**
 * Retourne les articles d'un sport (clé slug ou label discipline).
 * @param {string} sportKeyOrLabel  ex. 'mma' ou 'MMA'
 * @returns {Array}
 */
window.getArticlesBySport = function (sportKeyOrLabel) {
  return window.ARTICLES.filter(a =>
    a.sport === sportKeyOrLabel || a.discipline === sportKeyOrLabel
  );
};

// Note : window.getArticlesByGroup est défini dans utils.js (chargé après)
// et gère correctement tous les sous-sports du grappling.
// Ne pas redéfinir ici pour éviter le conflit.
