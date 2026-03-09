/* ══════════════════════════════════════════════════════════════
   BUSHIDOGUIDE — articles.js
   Couche de conversion entre l'ancien format et le nouveau routeur.

   ┌─────────────────────────────────────────────────────────┐
   │  COMMENT AJOUTER UN ARTICLE                             │
   │                                                         │
   │  1. Ouvrez le fichier correspondant à la discipline :   │
   │     • articles-mma.js       → MMA / UFC                 │
   │     • articles-boxe.js      → Boxe anglaise             │
   │     • articles-muay-equip.js → Muay-Thaï + Équipement   │
   │                                                         │
   │  2. Ajoutez un objet au tableau avec ce format :        │
   │     {                                                   │
   │       id: "mon-slug-unique",    ← devient l'URL         │
   │       title: "Mon titre",                               │
   │       category: "analyse-combat",                       │
   │       discipline: "MMA",        ← MMA|Boxe|Muay-Thaï|   │
   │                                    Équipement           │
   │       date: "Mars 2026",                                │
   │       content: `<h2>...</h2><p>...</p>`                 │
   │     }                                                   │
   │                                                         │
   │  3. L'article apparaît automatiquement dans :           │
   │     • La liste de sa discipline                         │
   │     • La recherche par catégorie                        │
   │     • Les articles récents de la sidebar               │
   │     • La page Recommandations (si ajouté à RECOS)       │
   │                                                         │
   │  Pour le mettre en une : mettez featured: true          │
   │  (un seul article featured à la fois)                   │
   └─────────────────────────────────────────────────────────┘

   CATÉGORIES DISPONIBLES :
   • analyse-combat          → badge rouge  "Analyse combat"
   • analyse                 → badge bleu   "Analyse"
   • guide-debutant          → badge gold   "Guide débutant"
   • conseil-entrainement    → badge gold   "Conseil"
   • guide-equipement        → badge vert   "Équipement"
   • actualite               → badge rouge  "Actualité"
   • portrait                → badge bleu   "Portrait"
   • bilan                   → badge bleu   "Bilan"

══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   EMOJIS PAR DISCIPLINE
───────────────────────────────────────────────────────── */
const DISC_EMOJI = {
  'MMA':        '🥊',
  'Boxe':       '🥊',
  'Muay-Thaï':  '🦵',
  'Équipement': '🛒',
};

/* ─────────────────────────────────────────────────────────
   TAGS PAR CATÉGORIE
───────────────────────────────────────────────────────── */
function buildTags(category, discipline) {
  const disc = {label: discipline, cls: 'red'};
  const map = {
    'analyse-combat':       [{label:'Analyse',cls:''}],
    'analyse':              [{label:'Analyse',cls:''}],
    'guide-debutant':       [{label:'Guide',cls:'gold'},{label:'Débutant',cls:''}],
    'conseil-entrainement': [{label:'Conseil',cls:'gold'},{label:'Entraînement',cls:''}],
    'guide-equipement':     [{label:'Équipement',cls:'gold'}],
    'actualite':            [{label:'Actualité',cls:''}],
    'portrait':             [{label:'Portrait',cls:''}],
    'bilan':                [{label:'Bilan',cls:''}],
  };
  return [disc, ...(map[category] || [{label: category, cls:''}])];
}

/* ─────────────────────────────────────────────────────────
   EXTRACTION DU RÉSUMÉ (excerpt)
   → Prend le premier <p> du contenu HTML
───────────────────────────────────────────────────────── */
function extractExcerpt(html) {
  const match = html.match(/<p[^>]*>(.*?)<\/p>/s);
  if (!match) return '';
  // Nettoyer les balises HTML restantes
  return match[1]
    .replace(/<[^>]+>/g,'')
    .replace(/&nbsp;/g,' ')
    .trim()
    .slice(0, 200)
    + (match[1].length > 200 ? '…' : '');
}

/* ─────────────────────────────────────────────────────────
   ESTIMATION DU TEMPS DE LECTURE
   → ~200 mots/minute en français
───────────────────────────────────────────────────────── */
function estimateReadTime(html) {
  const text  = html.replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins  = Math.max(3, Math.round(words / 200));
  return `${mins} min`;
}

/* ─────────────────────────────────────────────────────────
   CONVERTISSEUR PRINCIPAL
   Transforme l'ancien format { id, title, category, discipline, date, content }
   vers le nouveau format attendu par le routeur
───────────────────────────────────────────────────────── */
function convertArticle(a) {
  return {
    slug:       a.id,
    discipline: a.discipline,
    category:   a.category,
    title:      a.title,
    excerpt:    extractExcerpt(a.content),
    date:       a.date,
    readTime:   estimateReadTime(a.content),
    emoji:      DISC_EMOJI[a.discipline] || '🥊',
    tags:       buildTags(a.category, a.discipline),
    content:    a.content,
    featured:   a.featured || false,
  };
}

/* ══════════════════════════════════════════════════════════
   CONSTRUCTION DU TABLEAU ARTICLES GLOBAL
   
   Les tableaux ARTICLES_MMA, ARTICLES_BOXE, ARTICLES_MUAY,
   ARTICLES_EQUIP sont définis dans les fichiers .js chargés
   avant celui-ci dans index.html.
══════════════════════════════════════════════════════════ */

// Sécurité : si un fichier n'est pas chargé, on utilise un tableau vide
const _mma   = (typeof ARTICLES_MMA   !== 'undefined') ? ARTICLES_MMA   : [];
const _boxe  = (typeof ARTICLES_BOXE  !== 'undefined') ? ARTICLES_BOXE  : [];
const _muay  = (typeof ARTICLES_MUAY  !== 'undefined') ? ARTICLES_MUAY  : [];
const _equip = (typeof ARTICLES_EQUIP !== 'undefined') ? ARTICLES_EQUIP : [];

// Conversion + fusion dans un tableau unique
const ARTICLES = [
  ..._mma.map(convertArticle),
  ..._boxe.map(convertArticle),
  ..._muay.map(convertArticle),
  ..._equip.map(convertArticle),
];

// Le premier article (MMA) devient l'article featured (à la une)
// Pour changer : mettez featured: true sur l'article désiré dans son fichier
// et supprimez cette ligne
if (ARTICLES.length > 0 && !ARTICLES.some(a => a.featured)) {
  ARTICLES[0].featured = true;
}

/* ══════════════════════════════════════════════════════════
   DEBUG (facultatif — décommentez en dev)
══════════════════════════════════════════════════════════ */
// console.log(`✅ BushidoGuide — ${ARTICLES.length} articles chargés`);
// console.log('  MMA:', _mma.length, '| Boxe:', _boxe.length, '| Muay-Thaï:', _muay.length, '| Équipement:', _equip.length);
