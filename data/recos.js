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
  // ── Exemple de recommandation ──
  // {
  //   sport:      'mma',
  //   level:      'debutant',
  //   icon:       '🥊',
  //   sportLabel: 'MMA',
  //   title:      'Débuter le MMA : par où commencer ?',
  //   desc:       'Guide complet pour les débutants : choix du club, équipement minimal, disciplines à maîtriser.',
  //   type:       'Guide',
  //   typeClass:  't-conseil',
  //   slug:       null,
  //   guideId:    'mma',
  // },
]; // fin RECOS

/* ── Exposition globale ── */
window.RECOS = RECOS;

/* ══════════════════════════════════════════════════════
   VALIDATION DES RÉFÉRENCES
   CORRECTION : utilise un listener sur window 'load'
   au lieu d'un setTimeout fragile.
   Les scripts articles.js et guides.js sont chargés
   avant recos.js (cf. ordre dans index.html), donc
   window.ARTICLES et window.GUIDES sont déjà définis
   au moment où ce script s'exécute.
   On valide quand même après 'load' pour couvrir
   tout cas de chargement asynchrone futur.
══════════════════════════════════════════════════════ */
(function validateRecos() {
  function _validate() {
    const articles     = window.ARTICLES || [];
    const guides       = window.GUIDES   || {};
    const articleSlugs = new Set(articles.map(a => a.slug));
    const guideIds     = new Set(Object.keys(guides));

    let errCount = 0;
    RECOS.forEach((r, i) => {
      // Champs obligatoires
      if (!r.sport || !r.level || !r.title) {
        console.error(`❌ Reco #${i} manque un champ obligatoire (sport/level/title)`);
        errCount++;
      }
      // Référence article
      if (r.slug && !articleSlugs.has(r.slug)) {
        console.error(`❌ Reco #${i} ("${r.title}") → slug article inexistant : "${r.slug}"`);
        errCount++;
      }
      // Référence guide
      if (r.guideId && !guideIds.has(r.guideId)) {
        console.error(`❌ Reco #${i} ("${r.title}") → guideId inexistant : "${r.guideId}"`);
        errCount++;
      }
      // Ni slug ni guideId (lien mort)
      if (!r.slug && !r.guideId) {
        console.warn(`⚠️  Reco #${i} ("${r.title}") n'a ni slug ni guideId — lien inactif`);
      }
    });

    if (errCount === 0 && RECOS.length > 0) {
      console.log(`✅ Front Kick — ${RECOS.length} recommandation(s) validée(s)`);
    }
  }

  // Lancer la validation dès que possible
  if (document.readyState === 'complete') {
    _validate();
  } else {
    window.addEventListener('load', _validate, { once: true });
  }
})();
