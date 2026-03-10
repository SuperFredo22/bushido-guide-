/* ══════════════════════════════════════════════════════════
   FRONT KICK — data/recos.js
   Recommandations par sport et niveau.
   Utilisé par renderRecos() dans index.html.

   AJOUTER UNE RECOMMANDATION :
   Ajouter un objet dans le tableau RECOS ci-dessous.

   CHAMPS :
   sport      → clé sport ('mma','boxe','muay','bjj','judo','karate','niche')
   level      → 'debutant' | 'intermediaire' | 'avance' | 'confirmé'
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
  {sport:'mma',level:'debutant',icon:'🥊',sportLabel:'MMA',
    title:'Comment débuter le MMA en 2025 : le guide complet',
    desc:"Par où commencer, comment choisir sa salle, à quoi s'attendre les premiers mois.",
    type:'Guide',typeClass:'t-conseil',slug:'mma-debut-mma-guide-complet',guideId:null},

  {sport:'mma',level:'debutant',icon:'🛒',sportLabel:'MMA',
    title:'Quel équipement acheter pour commencer le MMA ?',
    desc:"Gants, short, protège-dents — ce qu'il faut vraiment dès le premier cours.",
    type:'Équipement',typeClass:'t-equip',slug:'equip-equipement-debutant-budget',guideId:null},

  {sport:'mma',level:'debutant',icon:'📖',sportLabel:'MMA',
    title:'Guide débutant MMA — toutes les bases expliquées',
    desc:'Histoire, disciplines, timeline de progression, équipement.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'mma'},

  {sport:'mma',level:'intermediaire',icon:'💪',sportLabel:'MMA',
    title:'Wrestling et MMA : pourquoi la lutte est la clé du succès',
    desc:'Comprendre pourquoi le contrôle du niveau est la compétence la plus précieuse.',
    type:'Analyse',typeClass:'t-analyse',slug:'mma-wrestling-importance',guideId:null},

  {sport:'mma',level:'avance',icon:'🏆',sportLabel:'MMA',
    title:'Alex Pereira champion mi-lourds — décryptage tactique',
    desc:'Gestion des rounds, adaptation stratégique en temps réel.',
    type:'Analyse combat',typeClass:'t-actu',slug:'mma-alex-pereira-mi-lourds',guideId:null},

  {sport:'boxe',level:'debutant',icon:'🥊',sportLabel:'Boxe',
    title:"Débuter la boxe anglaise : comment choisir son premier club",
    desc:'Ce que vous allez ressentir les premières semaines et comment choisir son club.',
    type:'Guide',typeClass:'t-conseil',slug:'boxe-debutant-premier-club',guideId:null},

  {sport:'boxe',level:'debutant',icon:'📖',sportLabel:'Boxe',
    title:"Guide débutant Boxe anglaise — de zéro au premier sparring",
    desc:"Les 4 coups, le jeu de jambes, l'équipement, comment choisir son club.",
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'boxe'},

  {sport:'boxe',level:'avance',icon:'🏆',sportLabel:'Boxe',
    title:'Crawford vs Canelo : analyse tactique du combat du siècle',
    desc:'Deux visions opposées de la boxe — à décortiquer techniquement.',
    type:'Analyse combat',typeClass:'t-actu',slug:'boxe-crawford-canelo-analyse',guideId:null},

  {sport:'muay',level:'debutant',icon:'📖',sportLabel:'Muay-Thaï',
    title:'Guide débutant Muay-Thaï : les 8 armes expliquées de zéro',
    desc:'Culture, techniques, équipement, comment trouver une salle sérieuse.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'muay'},

  {sport:'bjj',level:'debutant',icon:'📖',sportLabel:'BJJ',
    title:'Guide débutant BJJ : la philosophie du sol expliquée',
    desc:'Comprendre le jiu-jitsu brésilien avant votre première séance.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'bjj'},

  {sport:'judo',level:'debutant',icon:'📖',sportLabel:'Judo',
    title:'Guide débutant Judo : la voie de la souplesse',
    desc:'Histoire, philosophie, premières techniques, équipement, trouver un dojo.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'judo'},

  {sport:'karate',level:'debutant',icon:'📖',sportLabel:'Karaté',
    title:"Guide débutant Karaté : bien plus qu'un art scolaire",
    desc:'Les 4 styles, les katas, la progression en ceintures.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'karate'},

  {sport:'niche',level:'debutant',icon:'📖',sportLabel:'Savate',
    title:'Guide Savate : la boxe française expliquée de zéro',
    desc:'La discipline la plus méconnue de France — histoire, techniques, clubs.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'savate'},

  {sport:'niche',level:'avance',icon:'📖',sportLabel:'Lethwei',
    title:'Guide Lethwei : la boxe birmane sans gants',
    desc:'Règles uniques, culture, quelle base préalable est indispensable.',
    type:'Guide complet',typeClass:'t-conseil',slug:null,guideId:'lethwei'},
];
