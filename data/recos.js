/* ══════════════════════════════════════════════════════════
   FRONT KICK — data/recos.js
   Recommandations par sport et niveau.
   Utilisé par renderRecos() dans pages.js.

   SLUGS SPORT VALIDES (clés de SPORTS_META dans articles.js) :
   'mma' 'boxe' 'kickboxing' 'muay-thai' 'grappling'
   'brazilian-jiu-jitsu' 'judo' 'sambo' 'karate'
   'savate' 'lethwei' 'equipement'

   NIVEAUX VALIDES :
   'debutant' | 'intermediaire' | 'avance'

   CHAMPS :
   sport      → slug sport (voir liste ci-dessus)
   level      → niveau du public cible
   icon       → emoji affiché
   sportLabel → nom affiché du sport
   title      → titre de la reco
   desc       → description courte
   type       → label du badge type ('Guide','Analyse','Équipement'…)
   typeClass  → classe CSS ('t-conseil','t-analyse','t-actu','t-equip')
   slug       → id de l'article lié (depuis _RAW_ARTICLES) ou null
   guideId    → clé du guide lié (depuis GUIDES) ou null
══════════════════════════════════════════════════════════ */

const RECOS = [

  /* ───────────────────────────
     MMA
  ─────────────────────────── */
  {
    sport:      'mma',
    level:      'debutant',
    icon:       '🥊',
    sportLabel: 'MMA',
    title:      'MMA : le sport de combat le plus complet au monde',
    desc:       'Comprendre pourquoi le MMA combine toutes les disciplines et comment débuter avec les bons fondamentaux.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       'mma-discipline-complete',
    guideId:    null,
  },
  {
    sport:      'mma',
    level:      'debutant',
    icon:       '🥊',
    sportLabel: 'MMA',
    title:      'Guide MMA complet : de zéro à la première séance',
    desc:       'Histoire, techniques de base, équipement et conseils pour démarrer le MMA dans les meilleures conditions.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       null,
    guideId:    'mma',
  },
  {
    sport:      'mma',
    level:      'debutant',
    icon:       '🛒',
    sportLabel: 'MMA',
    title:      'Quel équipement MMA acheter en 2026 ?',
    desc:       'Gants, shorts, rashguards et protections : le guide d\'achat complet pour débuter sans se tromper.',
    type:       'Équipement',
    typeClass:  't-equip',
    slug:       'mma-gants-guide-achat',
    guideId:    null,
  },

  /* ───────────────────────────
     BOXE
  ─────────────────────────── */
  {
    sport:      'boxe',
    level:      'debutant',
    icon:       '🥊',
    sportLabel: 'Boxe',
    title:      'La garde en boxe : maîtrisez les fondamentaux',
    desc:       'Position des pieds, des mains, du menton — construire une garde solide est la première étape de tout boxeur.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       'boxe-garde-fondamentale',
    guideId:    null,
  },
  {
    sport:      'boxe',
    level:      'debutant',
    icon:       '🥊',
    sportLabel: 'Boxe',
    title:      'Guide boxe anglaise complet pour débuter',
    desc:       'Histoire, technique des quatre coups fondamentaux, équipement et conseils pratiques.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       null,
    guideId:    'boxe',
  },
  {
    sport:      'boxe',
    level:      'intermediaire',
    icon:       '🥊',
    sportLabel: 'Boxe',
    title:      'Le jab : l\'arme numéro un du boxeur',
    desc:       'Technique détaillée, utilisations tactiques et exercices pour perfectionner le coup le plus important de la boxe.',
    type:       'Conseil',
    typeClass:  't-conseil',
    slug:       'boxe-jab-technique',
    guideId:    null,
  },

  /* ───────────────────────────
     MUAY-THAÏ
  ─────────────────────────── */
  {
    sport:      'muay-thai',
    level:      'debutant',
    icon:       '🦵',
    sportLabel: 'Muay-Thaï',
    title:      'Guide Muay-Thaï : l\'art des 8 membres expliqué',
    desc:       'Histoire thaïlandaise, les 8 armes, équipement spécifique et conseils pour débuter dans les meilleures conditions.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       null,
    guideId:    'muay',
  },
  {
    sport:      'muay-thai',
    level:      'intermediaire',
    icon:       '🦵',
    sportLabel: 'Muay-Thaï',
    title:      'Maîtriser le roundhouse kick thaïlandais',
    desc:       'Mécanique complète du coup de pied circulaire, conditionnement des tibias et erreurs fréquentes à corriger.',
    type:       'Conseil',
    typeClass:  't-conseil',
    slug:       'muay-thai-roundhouse-kick',
    guideId:    null,
  },
  {
    sport:      'muay-thai',
    level:      'intermediaire',
    icon:       '🦵',
    sportLabel: 'Muay-Thaï',
    title:      'Histoire et culture du Muay-Thaï',
    desc:       'Des guerriers thaïlandais aux champions de l\'ONE Championship : l\'histoire fascinante d\'un art martial millénaire.',
    type:       'Analyse',
    typeClass:  't-analyse',
    slug:       'muay-thai-histoire-culture',
    guideId:    null,
  },

  /* ───────────────────────────
     BJJ
  ─────────────────────────── */
  {
    sport:      'brazilian-jiu-jitsu',
    level:      'debutant',
    icon:       '🤼',
    sportLabel: 'BJJ',
    title:      'BJJ : le guide complet du débutant',
    desc:       'Positions, soumissions, rolling, gi vs no-gi — tout ce qu\'un débutant doit savoir avant de poser le pied sur le tatami.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       'bjj-guide-debutant',
    guideId:    null,
  },
  {
    sport:      'brazilian-jiu-jitsu',
    level:      'debutant',
    icon:       '🤼',
    sportLabel: 'BJJ',
    title:      'Guide BJJ complet : de la ceinture blanche à la maîtrise',
    desc:       'Histoire des Gracie, concepts fondamentaux, équipement et conseils pour progresser en BJJ.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       null,
    guideId:    'bjj',
  },
  {
    sport:      'brazilian-jiu-jitsu',
    level:      'intermediaire',
    icon:       '🤼',
    sportLabel: 'BJJ',
    title:      'Le système de ceintures en BJJ : tout comprendre',
    desc:       'Du blanc au noir : comprendre la progression, les galons et pourquoi la ceinture noire BJJ est si rare et respectée.',
    type:       'Analyse',
    typeClass:  't-analyse',
    slug:       'bjj-ceintures-progression',
    guideId:    null,
  },

  /* ───────────────────────────
     JUDO
  ─────────────────────────── */
  {
    sport:      'judo',
    level:      'debutant',
    icon:       '🥋',
    sportLabel: 'Judo',
    title:      'Les projections fondamentales du judo',
    desc:       'O-soto-gari, seoi-nage, tai-otoshi : les projections incontournables pour tout judoka débutant.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       'judo-projections-bases',
    guideId:    null,
  },
  {
    sport:      'judo',
    level:      'debutant',
    icon:       '🥋',
    sportLabel: 'Judo',
    title:      'Guide judo complet : de Kano à la compétition',
    desc:       'Histoire du judo, techniques fondamentales (tachi-waza et ne-waza), équipement et conseils pratiques.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       null,
    guideId:    'judo',
  },

  /* ───────────────────────────
     KARATÉ
  ─────────────────────────── */
  {
    sport:      'karate',
    level:      'debutant',
    icon:       '🥋',
    sportLabel: 'Karaté',
    title:      'Guide karaté complet pour débuter',
    desc:       'Shotokan, Kyokushin, katas et kumite : comprendre les styles et commencer avec les bons fondamentaux.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       null,
    guideId:    'karate',
  },
  {
    sport:      'karate',
    level:      'intermediaire',
    icon:       '🥋',
    sportLabel: 'Karaté',
    title:      'Kyokushin : le karaté de contact plein',
    desc:       'Mas Oyama, règles spécifiques et pourquoi le kyokushin forme des combattants d\'élite : l\'analyse complète.',
    type:       'Analyse',
    typeClass:  't-analyse',
    slug:       'karate-kyokushin-guide',
    guideId:    null,
  },

  /* ───────────────────────────
     KICKBOXING
  ─────────────────────────── */
  {
    sport:      'kickboxing',
    level:      'debutant',
    icon:       '🦵',
    sportLabel: 'Kickboxing',
    title:      'Kickboxing pour les nuls : tout comprendre avant de commencer',
    desc:       'Différences avec le muay-thaï, formats K-1, full-contact, low-kick : le guide de démarrage en kickboxing.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       'kickboxing-debutant-guide',
    guideId:    null,
  },

  /* ───────────────────────────
     GRAPPLING
  ─────────────────────────── */
  {
    sport:      'grappling',
    level:      'debutant',
    icon:       '🤼',
    sportLabel: 'Grappling',
    title:      'Grappling no-gi : la discipline de combat au sol la plus dynamique',
    desc:       'Heel hooks, positions, différences avec le BJJ et pourquoi le no-gi est essentiel pour le MMA.',
    type:       'Guide',
    typeClass:  't-conseil',
    slug:       'grappling-no-gi-guide',
    guideId:    null,
  },

  /* ───────────────────────────
     ÉQUIPEMENT
  ─────────────────────────── */
  {
    sport:      'equipement',
    level:      'debutant',
    icon:       '🛒',
    sportLabel: 'Équipement',
    title:      'Comment choisir son protège-dents pour la boxe',
    desc:       'Thermoformable, sur mesure, double protection : comparatif complet pour choisir la meilleure protection dentaire.',
    type:       'Équipement',
    typeClass:  't-equip',
    slug:       'choisir-protege-dents',
    guideId:    null,
  },
  {
    sport:      'equipement',
    level:      'debutant',
    icon:       '🛒',
    sportLabel: 'Équipement',
    title:      'Équipement MMA 2026 : le guide d\'achat complet',
    desc:       'Gants de sparring, protège-tibias, rashguard : tout ce qu\'il faut acheter pour bien s\'équiper en MMA.',
    type:       'Équipement',
    typeClass:  't-equip',
    slug:       'mma-gants-guide-achat',
    guideId:    null,
  },

]; // fin RECOS

/* ── Exposition globale ── */
window.RECOS = RECOS;

/* ══════════════════════════════════════════════════════
   VALIDATION DES RÉFÉRENCES
══════════════════════════════════════════════════════ */
(function validateRecos() {
  function _validate() {
    const articles     = window.ARTICLES || [];
    const guides       = window.GUIDES   || {};
    const articleSlugs = new Set(articles.map(a => a.slug));
    const guideIds     = new Set(Object.keys(guides));

    let errCount = 0;
    RECOS.forEach((r, i) => {
      if (!r.sport || !r.level || !r.title) {
        console.error(`❌ Reco #${i} manque un champ obligatoire (sport/level/title)`);
        errCount++;
      }
      if (r.slug && !articleSlugs.has(r.slug)) {
        console.error(`❌ Reco #${i} ("${r.title}") → slug article inexistant : "${r.slug}"`);
        errCount++;
      }
      if (r.guideId && !guideIds.has(r.guideId)) {
        console.error(`❌ Reco #${i} ("${r.title}") → guideId inexistant : "${r.guideId}"`);
        errCount++;
      }
      if (!r.slug && !r.guideId) {
        console.warn(`⚠️  Reco #${i} ("${r.title}") n'a ni slug ni guideId — lien inactif`);
      }
    });

    if (errCount === 0 && RECOS.length > 0) {
      console.log(`✅ Front Kick — ${RECOS.length} recommandation(s) validée(s)`);
    }
  }

  if (document.readyState === 'complete') {
    _validate();
  } else {
    window.addEventListener('load', _validate, { once: true });
  }
})();
