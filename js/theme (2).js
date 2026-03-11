/* ══════════════════════════════════════════════════════════
   FRONT KICK — data/recos.js
   Recommandations par sport et niveau.
   Utilisé par renderRecos() dans pages.js.

   SLUGS SPORT VALIDES (doivent correspondre aux clés de SPORTS_META) :
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
  // ... (contenu existant inchangé)
]; // fin RECOS

// MODIF : exposition globale
window.RECOS = RECOS;

// MODIF : validation des références (s'exécute après le chargement)
(function validateRecos() {
  // On attend un court instant pour être sûr que window.ARTICLES et window.GUIDES soient définis
  setTimeout(() => {
    const articles = window.ARTICLES || [];
    const guides = window.GUIDES || {};
    const articleSlugs = new Set(articles.map(a => a.slug));
    const guideIds = new Set(Object.keys(guides));

    RECOS.forEach((r, i) => {
      if (r.slug && !articleSlugs.has(r.slug)) {
        console.error(`❌ Reco #${i} (${r.title}) references non-existent article slug: ${r.slug}`);
      }
      if (r.guideId && !guideIds.has(r.guideId)) {
        console.error(`❌ Reco #${i} (${r.title}) references non-existent guide id: ${r.guideId}`);
      }
    });
  }, 100); // 100ms suffit
})();