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
   │ content     → HTML complet de l'article                     │
   └─────────────────────────────────────────────────────────────┘

   CHAMPS OPTIONNELS :
   ┌─────────────────────────────────────────────────────────────┐
   │ featured    → true  (un seul à la fois, sinon auto)         │
   │ excerpt     → string (sinon auto-extrait du content)        │
   └─────────────────────────────────────────────────────────────┘

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
  'mma':                  { label: 'MMA',                  group: 'principal',  emoji: '🥊' },
  'boxe':                 { label: 'Boxe',                  group: 'striking',   emoji: '🥊' },
  'kickboxing':           { label: 'Kickboxing',            group: 'striking',   emoji: '🦵' },
  'muay-thai':            { label: 'Muay-Thaï',             group: 'striking',   emoji: '🦵' },
  'karate':               { label: 'Karaté',                group: 'striking',   emoji: '🥋' },
  'taekwondo':            { label: 'Taekwondo',             group: 'striking',   emoji: '🦵' },
  'savate':               { label: 'Savate',                group: 'striking',   emoji: '👟' },
  'lethwei':              { label: 'Lethwei',               group: 'striking',   emoji: '💀' },
  'sanda':                { label: 'Sanda',                 group: 'striking',   emoji: '🥊' },
  'grappling':            { label: 'Grappling',             group: 'grappling',  emoji: '🤼' },
  'brazilian-jiu-jitsu':  { label: 'BJJ',                   group: 'grappling',  emoji: '🤼' },
  'luta-livre':           { label: 'Luta Livre',            group: 'grappling',  emoji: '🤼' },
  'judo':                 { label: 'Judo',                  group: 'grappling',  emoji: '🥋' },
  'sambo':                { label: 'Sambo',                 group: 'grappling',  emoji: '🦅' },
  'catch-wrestling':      { label: 'Catch Wrestling',       group: 'grappling',  emoji: '🤼' },
  'lutte-libre':          { label: 'Lutte libre',           group: 'grappling',  emoji: '🤼' },
  'lutte-greco-romaine':  { label: 'Lutte gréco-romaine',   group: 'grappling',  emoji: '🤼' },
  'equipement':           { label: 'Équipement',            group: 'equipement', emoji: '🛒' },
};

/* ─────────────────────────────────────────────────────────
   UTILITAIRES INTERNES
───────────────────────────────────────────────────────── */
function _extractExcerpt(html) {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim().slice(0, 220);
}

function _readTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.round(words / 200))} min`;
}

function _buildTags(category, sport) {
  const sportMeta = SPORTS_META[sport] || { label: sport, emoji: '🥊' };
  const catMap = {
    'analyse-combat':       [{ label: 'Analyse',    cls: '' }],
    'analyse':              [{ label: 'Analyse',    cls: '' }],
    'guide-debutant':       [{ label: 'Guide',      cls: 'gold' }, { label: 'Débutant', cls: '' }],
    'conseil-entrainement': [{ label: 'Conseil',    cls: 'gold' }, { label: 'Entraînement', cls: '' }],
    'guide-equipement':     [{ label: 'Équipement', cls: 'gold' }],
    'actualite':            [{ label: 'Actualité',  cls: '' }],
    'portrait':             [{ label: 'Portrait',   cls: '' }],
    'bilan':                [{ label: 'Bilan',      cls: '' }],
  };
  return [
    { label: sportMeta.label, cls: 'red' },
    ...(catMap[category] || [{ label: category, cls: '' }]),
  ];
}

function _normalize(a) {
  const meta = SPORTS_META[a.sport] || { label: a.sport, emoji: '🥊' };
  return {
    slug:       a.id,
    discipline: meta.label,
    category:   a.category,
    title:      a.title,
    excerpt:    a.excerpt || _extractExcerpt(a.content),
    date:       a.date,
    readTime:   _readTime(a.content),
    emoji:      meta.emoji,
    tags:       _buildTags(a.category, a.sport),
    content:    a.content,
    featured:   a.featured || false,
    sport:      a.sport,
    sportLabel: meta.label,
    sportGroup: meta.group || 'autre',
  };
}

/* ══════════════════════════════════════════════════════════
   ARTICLES — TABLEAU UNIQUE
   Ordre : MMA → Boxe → Muay-Thaï → Équipement
══════════════════════════════════════════════════════════ */
const _RAW_ARTICLES = [

/* ══ MMA ════════════════════════════════════════════════ */

{ id:"mma-merab-dvalishvili-champion-coqs", sport:"mma",
  title:"Merab Dvalishvili, champion UFC coqs : la machine géorgienne qui a brisé O'Malley",
  category:"analyse-combat", date:"Octobre 2024", featured:true,
  content:`<p>Le 28 septembre 2024, à l'UFC 306 dans la Sphère de Las Vegas, Merab Dvalishvili a mis fin au règne de Sean O'Malley par TKO au premier round. Une domination sans appel qui n'a surpris que ceux qui avaient analysé le match-up : un frappeur brillant contre un lutteur au cardio illimité, le second écrase toujours le premier.</p>
<h2>Pourquoi cette victoire était logique</h2>
<p>Son taux d'activité record à l'UFC et sa capacité à enchaîner les takedowns sans jamais ralentir en faisaient le pire adversaire possible pour O'Malley — un frappeur de génie dont le grappling défensif était la faille identifiée depuis longtemps. Dvalishvili l'a rendu à distance nulle en moins d'une minute.</p>
<h2>Qui peut le battre en 2026 ?</h2>
<p>Umar Nurmagomedov, invaincu et issu de l'école dagestanaise, est le prétendant logique numéro un. Son background wrestling combiné à une boxe propre en fait le challenger le plus crédible. La division coqs n'a jamais été aussi compétitive.</p>`},

{ id:"mma-dricus-du-plessis-champion-moyens", sport:"mma",
  title:"Dricus du Plessis, champion poids moyens : l'Africain qui a soumis Adesanya dans son pays",
  category:"analyse-combat", date:"Septembre 2024",
  content:`<p>Le 17 août 2024 à Perth, Dricus du Plessis a soumis Israel Adesanya par triangle au cinquième round de l'UFC 305. Dans la salle même où la foule était venue soutenir son champion, le Sudafricain a imposé un combat physique et rugueux qui a neutralisé les qualités de distance d'Adesanya.</p>
<h2>Comment du Plessis a battu Adesanya</h2>
<p>Adesanya est à son meilleur quand il contrôle la distance depuis l'extérieur. Du Plessis l'en a privé dès le premier round — pression constante, angles inattendus, clinch répété. Sa résistance physique lui a permis d'avancer sous les coups propres d'Adesanya jusqu'au cinquième round décisif.</p>
<h2>Les défis en 2026</h2>
<p>Rob Whittaker, classé numéro un contendeur, est le prochain défi logique. Un combat du Plessis vs Whittaker en Australie ou en Afrique du Sud serait un événement commercial et sportif de premier plan.</p>`},

{ id:"mma-jones-aspinall-poids-lourds", sport:"mma",
  title:"Jon Jones vs Tom Aspinall : le combat des poids lourds que l'UFC doit organiser en 2026",
  category:"analyse-combat", date:"Mars 2026",
  content:`<p>Jones détient la ceinture titulaire des poids lourds depuis sa victoire sur Ciryl Gane en janvier 2023, mais des blessures répétées l'ont maintenu à l'écart depuis. Tom Aspinall, champion intérimaire invaincu, clame légitimement sa place de meilleur lourd en activité. L'UFC doit trancher.</p>
<h2>Les styles sur le papier</h2>
<p>Jones est probablement le combattant le plus accompli de l'histoire de l'UFC — intelligence tactique, wrestling de classe mondiale, reach exceptionnel. Mais il n'a plus combattu depuis plus de deux ans. Aspinall, lui, est explosif, extrêmement rapide pour 110 kg.</p>
<h2>Conclusion</h2>
<p>Jones doit se battre ou rendre sa ceinture. 2026 doit être l'année de ce combat — ou l'année où Jones est officiellement destitué. Aspinall a attendu assez longtemps.</p>`},

{ id:"mma-belal-muhammad-champion-welters", sport:"mma",
  title:"Belal Muhammad, champion welters UFC : le champion discret qui mérite son titre",
  category:"analyse-combat", date:"Août 2024",
  content:`<p>Le 27 juillet 2024 à Manchester, Belal Muhammad a battu Leon Edwards par décision unanime à l'UFC 304 et est devenu le nouveau champion des poids welters. Un résultat logique au regard de la progression des deux hommes.</p>
<h2>Pourquoi Muhammad méritait sa chance</h2>
<p>Muhammad a construit l'une des séries de victoires les plus impressionnantes de l'UFC welter depuis 2019. Un seul résultat négatif — un no-contest avec Edwards en 2021 — avait retardé son statut de challenger numéro un.</p>
<h2>Les défis devant lui</h2>
<p>Jack Della Maddalena, invaincu et extrêmement dangereux en boxe, est le challenger le plus convaincant. Shavkat Rakhmonov, invaincu depuis ses débuts UFC avec un grappling d'élite, représente peut-être le défi le plus périlleux.</p>`},

{ id:"mma-ilia-topuria-champion-plumes", sport:"mma",
  title:"Ilia Topuria, champion des poids plumes : le KO artiste qui a mis fin au règne de Volkanovski",
  category:"analyse-combat", date:"Mars 2024",
  content:`<p>Le 17 février 2024, à l'UFC 298, Ilia Topuria a mis fin au règne de cinq ans d'Alexander Volkanovski par KO au deuxième round. Un coup de poing droit parfaitement placé sur un échange — la marque de fabrique d'un combattant qui génère une puissance exceptionnelle.</p>
<h2>Comment Topuria a battu l'imbattable</h2>
<p>Volkanovski abordait ce combat comme favori. Topuria avait promis un KO et personne n'y croyait vraiment. Ce qui s'est passé est une démonstration de timing pur : Topuria a absorbé quelques coups au premier round, puis placé son droit au deuxième avec une précision implacable.</p>
<h2>La division en 2026</h2>
<p>Topuria est le champion incontesté mais la division plumes regorge de challengers de qualité. La montée aux légers est régulièrement évoquée — ce serait l'une des grandes histoires de 2026.</p>`},

{ id:"mma-islam-makhachev-champion-legers", sport:"mma",
  title:"Islam Makhachev : la domination continue des légers et l'héritage de l'école dagestanaise",
  category:"analyse-combat", date:"Mars 2026",
  content:`<p>Champion des poids légers depuis sa victoire sur Charles Oliveira à l'UFC 280 (octobre 2022), Islam Makhachev a régné sur la division avec une régularité et une sophistication impressionnantes. En 2026, il figure systématiquement dans le Top 3 livre-pour-livre UFC.</p>
<h2>Un système technique complet</h2>
<p>L'erreur est de réduire Makhachev à un lutteur. Son jab est excellent, son kick game s'est développé au fil des années, et sa capacité à enchaîner debout-clinch-sol-debout est parmi les meilleures du sport.</p>
<h2>La division et le prochain challenger</h2>
<p>Arman Tsarukyan est le prétendant le plus logique en 2026 — leur premier combat s'était conclu par une décision serrée en faveur de Makhachev. Un rematch serait le choc de la division.</p>`},

{ id:"mma-alex-pereira-mi-lourds", sport:"mma",
  title:"Alex Pereira : champion mi-lourds, le parcours le plus improbable de l'histoire récente de l'UFC",
  category:"portrait", date:"Mars 2026",
  content:`<p>Champion du monde de kickboxing GLORY, champion UFC poids moyens, puis champion mi-lourds. Alex Pereira a réussi ce que personne ne faisait dans le sport : devenir double champion avec un arsenal essentiellement debout.</p>
<h2>Le kickboxer qui a appris le MMA</h2>
<p>Pereira a pris la ceinture des poids moyens à Adesanya à l'UFC 281. Son crochet gauche est parmi les plus puissants de l'histoire des sports de combat.</p>
<h2>Ses limites et les challengers en 2026</h2>
<p>Son grappling reste le point faible structurel. Magomed Ankalaev et Procházka sont les challengers les plus menaçants dans sa division à 37 ans en 2026.</p>`},

{ id:"mma-fiorot-analyse-style", sport:"mma",
  title:"Manon Fiorot : décryptage technique de la meilleure combattante française en activité",
  category:"portrait", date:"Mars 2026",
  content:`<p>Ancienne championne du monde de kickboxing ISKA, Manon Fiorot s'est convertie au MMA à 27 ans. Quatre ans plus tard, elle figure dans le Top 5 mondial des poids mouches féminins UFC.</p>
<h2>Son évolution en MMA</h2>
<p>La transition vers le MMA a demandé du temps sur le grappling. Ses premières sorties UFC montraient des lacunes au sol. Mais au fil des combats, elle a développé une défense fonctionnelle qui lui permet de revenir debout rapidement.</p>
<h2>Sa place dans la division</h2>
<p>La division des poids mouches féminins est dominée par Valentina Shevchenko. Fiorot est le challenger le plus intéressant stylistiquement — un combat Shevchenko vs Fiorot serait le test ultime.</p>`},

{ id:"mma-debut-mma-guide-complet", sport:"mma",
  title:"Commencer le MMA à zéro : le guide complet pour les débutants",
  category:"guide-debutant", date:"Mars 2026",
  content:`<p>Le MMA est souvent perçu comme inaccessible aux débutants. Cette idée reçue est fausse. La plupart des salles sérieuses ont des créneaux spécifiquement conçus pour les personnes sans background sportif de combat.</p>
<h2>MMA directement ou discipline d'abord ?</h2>
<p>La première école préconise de commencer directement le MMA dans une salle avec des cours débutants complets. La seconde recommande 12 à 18 mois dans une discipline spécifique avant d'intégrer le MMA. Si vous avez un objectif compétitif à moyen terme, la seconde est souvent plus efficace.</p>
<h2>Comment choisir sa salle et son équipement</h2>
<p>Une bonne salle se reconnaît à ses entraîneurs qualifiés, ses cours séparés par niveau, sa culture du sparring léger et son ambiance inclusive.</p>`},

{ id:"mma-wrestling-importance", sport:"mma",
  title:"Le wrestling en MMA : pourquoi maîtriser la lutte reste la compétence la plus stratégique",
  category:"conseil-entrainement", date:"Mars 2026",
  content:`<p>Si vous demandez à n'importe quel entraîneur MMA professionnel quelle compétence développer en priorité, la réponse est quasi universelle : le contrôle du niveau. Savoir amener le combat là où vous êtes le plus fort est la compétence maîtresse du MMA.</p>
<h2>Les chiffres qui parlent</h2>
<p>Sur les vingt dernières années d'UFC, plus de 65 % des champions ont eu un background significatif en lutte. Khabib, St-Pierre, Cormier, Usman, Makhachev ont tous en commun une domination du contrôle positionnel.</p>
<h2>Comment l'intégrer en France</h2>
<p>Le wrestling pur est moins disponible en France qu'aux États-Unis. Le judo est l'alternative la plus accessible. Le grappling sportif, de plus en plus disponible en clubs, combine éléments wrestling et BJJ dans un format adapté.</p>`},

/* ══ BOXE ════════════════════════════════════════════════ */

{ id:"boxe-usyk-champion-unifie-lourds", sport:"boxe",
  title:"Oleksandr Usyk, champion unifié des poids lourds : deux victoires contre Fury qui redéfinissent l'ère",
  category:"analyse-combat", date:"Janvier 2025",
  content:`<p>Le 18 mai 2024 à Riyad, Oleksandr Usyk a battu Tyson Fury par décision partagée, devenant le premier champion unifié des poids lourds depuis Lennox Lewis. Le 21 décembre 2024, lors du rematch, il a mis Fury KO au neuvième round. Deux combats, deux victoires sans ambiguïté.</p>
<h2>Pourquoi Usyk est si difficile à battre</h2>
<p>Usyk est un paradoxe : un ex-cruiserweight qui domine la division la plus lourde. Sa vitesse de mains est anormale pour 102 kg. Son volume de frappes dépasse celui de presque tous ses adversaires. Son cardio lui permet de maintenir ce niveau sur 12 rounds complets.</p>
<h2>Les challengers en 2026</h2>
<p>Daniel Dubois, champion IBF depuis sa victoire sur Joshua à Wembley en septembre 2024, est le seul avec un titre majeur pour demander une unification. Un combat Usyk vs Dubois serait la grande affiche unificatrice de 2026.</p>`},

{ id:"boxe-dubois-champion-ibf", sport:"boxe",
  title:"Daniel Dubois, champion IBF : le KO sur Joshua à Wembley qui a tout changé",
  category:"analyse-combat", date:"Octobre 2024",
  content:`<p>Le 21 septembre 2024, devant 96 000 spectateurs à Wembley, Daniel Dubois a mis KO Anthony Joshua au cinquième round et s'est emparé de la ceinture IBF des poids lourds.</p>
<h2>Pourquoi ce KO a été une surprise relative</h2>
<p>Joshua restait sur une victoire convaincante sur Ngannou. Dubois avait une réputation de fragilité mentale après ses défaites précédentes. Ce qu'il a montré à Wembley contredit ce narratif : calme, discipliné, efficace dès les premiers rounds.</p>
<h2>L'unification avec Usyk : l'horizon logique</h2>
<p>Usyk détient WBC, WBA et WBO. Un combat d'unification avec Dubois (IBF) est inévitable et commercial. Usyk est clairement favori mais Dubois a le profil du challenger qui peut surprendre.</p>`},

{ id:"boxe-crawford-canelo-analyse", sport:"boxe",
  title:"Crawford vs Canelo : ce que la victoire de 'Bud' change pour la boxe mondiale",
  category:"analyse-combat", date:"Octobre 2025",
  content:`<p>Le 13 septembre 2025, Terence Crawford a battu Canelo Álvarez par décision partagée dans l'un des combats les plus regardés de la décennie sur Netflix. Un résultat qui redistribue les cartes au sommet de la boxe mondiale.</p>
<h2>Ce qui s'est passé dans le ring</h2>
<p>Crawford a utilisé ses changements de position orthodoxe/southpaw pour trouver les angles. À partir du cinquième round, le direct gauche southpaw de Crawford a commencé à trouver la garde de Canelo.</p>
<h2>La controverse et la suite</h2>
<p>Deux juges ont donné la victoire à Crawford, un à Canelo. La marge était ténue. Canelo a les arguments sportifs et commerciaux pour exiger un rematch en 2026.</p>`},

{ id:"boxe-fury-bilan-carriere", sport:"boxe",
  title:"Tyson Fury : le bilan d'une carrière hors-norme après deux défaites contre Usyk",
  category:"bilan", date:"Mars 2026",
  content:`<p>Deux défaites consécutives contre Usyk en 2024 ont mis fin au règne de Tyson Fury. Grand champion, pas GOAT incontesté.</p>
<h2>Les qualités qui restent vraies</h2>
<p>À 2,06 m pour 118-125 kg, son jeu de jambes était extraordinaire. Son jab long et précis, son uppercut gauche dévastateur et sa défense épaule-nuque lui ont permis de battre Klitschko et Wilder trois fois.</p>
<h2>L'héritage</h2>
<p>Les défaites contre Usyk n'effacent pas ce qui précède. La trilogie contre Wilder reste l'une des plus grandes séries de l'histoire récente. Sa place dans l'histoire : top 5 de l'ère moderne des poids lourds.</p>`},

{ id:"boxe-inoue-naoya-analyse", sport:"boxe",
  title:"Naoya Inoue : le 'Monster' qui domine les super poids coqs avec une régularité effrayante",
  category:"analyse", date:"Mars 2026",
  content:`<p>Naoya Inoue est champion unifié WBC, WBA, IBF et WBO des super poids coqs (122 lbs). Il a dominé les poids coqs pendant plusieurs années avant de monter de catégorie en 2023 — et d'y régner avec la même autorité.</p>
<h2>Pourquoi il est dans une catégorie à part</h2>
<p>Inoue combine des qualités rarement vues simultanément : vitesse de mains exceptionnelle, puissance de KO anormale (KO ratio proche de 80 %), précision chirurgicale et lecture défensive.</p>
<h2>Les challengers sérieux et la suite</h2>
<p>Marlon Tapales et Stephen Fulton sont les challengers les plus crédibles. La montée aux super-plumes (130 lbs) est régulièrement évoquée.</p>`},

{ id:"boxe-tank-davis-style", sport:"boxe",
  title:"Gervonta Davis : décryptage du boxeur le plus redouté de sa génération aux légers",
  category:"analyse", date:"Mars 2026",
  content:`<p>Gervonta Davis est peut-être le boxeur le plus redouté pound-for-pound de sa génération. Champion WBA des poids légers, son KO ratio dépasse 90 % sur l'ensemble de sa carrière.</p>
<h2>Son système technique</h2>
<p>Davis combat en southpaw avec une mobilité qui trompe sur sa taille. Sa puissance vient d'une rotation du bassin exceptionnelle. Son crochet gauche est son coup signature, utilisé pour finir plusieurs adversaires dans des positions a priori défensives.</p>
<h2>Ce qui peut le battre</h2>
<p>Davis peut être exposé par des boxeurs qui maintiennent une distance propre sur 12 rounds avec un jab long et actif, évitant d'être aspirés dans les échanges courts.</p>`},

{ id:"boxe-mayweather-style-defensif", sport:"boxe",
  title:"Floyd Mayweather Jr. : pourquoi son style défensif reste le plus étudié de l'histoire",
  category:"analyse", date:"Mars 2026",
  content:`<p>Floyd Mayweather Jr. a terminé sa carrière à 50-0, sans défaite, sans blessure sérieuse dans un sport où les dommages physiques sont la norme.</p>
<h2>Le shoulder roll : l'arme défensive principale</h2>
<p>La technique signature de Mayweather est le shoulder roll (ou Philly shell) : la main gauche est basse, l'épaule gauche levée et penchée vers l'avant. Quand le croisé adverse frappe, il atterrit sur l'épaule, pas sur la mâchoire.</p>
<h2>Ce qui est enseignable et ce qui ne l'est pas</h2>
<p>Le shoulder roll peut être enseigné. Mais la vitesse de réflexe de Mayweather, sa lecture du combat et son timing de contre sont en partie des qualités naturelles. On peut apprendre le système, on ne peut pas copier l'homme.</p>`},

{ id:"boxe-jab-guide-technique", sport:"boxe",
  title:"Maîtriser le jab en boxe : le coup le plus important que vous n'entraînez pas assez",
  category:"conseil-entrainement", date:"Mars 2026",
  content:`<p>Si vous ne deviez travailler qu'un seul coup en boxe, ce serait le jab. Tous les grands coaches s'accordent : le jab est la fondation de tout le reste.</p>
<h2>À quoi sert vraiment le jab</h2>
<p>Contrôle de la distance, préparation des coups puissants, capteur d'information sur la défense adverse. La plupart des débutants le négligent au profit des coups spectaculaires.</p>
<h2>La mécanique correcte et les exercices</h2>
<p>Un jab correct part de la garde, s'étend en ligne droite avec rotation du poing, et revient immédiatement en garde. Outils recommandés : double end bag, pads avec entraîneur, shadow devant miroir.</p>`},

{ id:"boxe-debutant-premier-club", sport:"boxe",
  title:"Commencer la boxe anglaise : comment choisir son premier club et éviter les pièges",
  category:"guide-debutant", date:"Mars 2026",
  content:`<p>Commencer la boxe anglaise est l'une des meilleures décisions sportives que vous puissiez prendre. Mais votre progression dépendra en grande partie de la qualité de votre première salle.</p>
<h2>Les critères d'une bonne salle de boxe</h2>
<p>Encadrement qualifié, cours débutants séparés des confirmés, culture de la sécurité avec sparring encadré, atmosphère inclusive. Visitez minimum deux ou trois salles avant de vous engager.</p>
<h2>Les pièges à éviter</h2>
<p>Les salles qui vous mettent en sparring dès la première séance. Les entraîneurs focalisés sur leurs combattants plutôt que votre progression. Pour l'équipement, protège-dents et gants 16 oz suffisent au début.</p>`},

{ id:"boxe-poids-lourd-histoire", sport:"boxe",
  title:"L'histoire de la boxe lourde : de Sullivan à Usyk, la division reine du noble art",
  category:"analyse", date:"Mars 2026",
  content:`<p>Aucune division dans aucun sport de combat n'a le même poids mythologique que la boxe lourde. Les champions des poids lourds ont été pendant des décennies les athlètes les plus célèbres au monde.</p>
<h2>L'âge d'or : de Dempsey à Foreman</h2>
<p>Jack Dempsey, Joe Louis, Rocky Marciano, Muhammad Ali, Joe Frazier, George Foreman — chaque nom correspond à une époque. La trilogie Ali-Frazier reste le sommet dramatique de l'histoire de la division.</p>
<h2>L'ère moderne et le règne Usyk</h2>
<p>Tyson, Holyfield, Lennox Lewis, les frères Klitschko, puis Joshua, Fury, et finalement Usyk — champion unifié incontesté en 2026. Usyk représente la victoire de la technique sur la puissance brute.</p>`},

/* ══ MUAY-THAÏ ══════════════════════════════════════════ */

{ id:"muay-thai-debutant-guide", sport:"muay-thai",
  title:"Débuter le Muay-Thaï : tout ce que vous devez savoir avant votre première séance",
  category:"guide-debutant", date:"Mars 2026",
  content:`<p>Le Muay-Thaï est l'art des 8 membres — poings, coudes, genoux, pieds — et l'un des sports de contact les plus complets qui existent. Contrairement à ce que son image de discipline brutale peut suggérer, il accueille des débutants de tous âges et niveaux.</p>
<h2>Ce qui vous attend au premier cours</h2>
<p>Échauffement (corde à sauter, déplacements), apprentissage des positions de garde et des frappes de base (jab, croisé, low kick), travail sur pads avec un entraîneur. Pas de sparring dès le premier cours dans une salle sérieuse.</p>
<h2>L'équipement pour débuter</h2>
<p>Cours 1-2 : short de sport et protège-dents suffisent. Semaines 2-4 : gants de Muay-Thaï 10-14 oz, protège-chevilles. Budget équipement de base : 80 à 150 €.</p>`},

{ id:"muay-thai-clinch-technique", sport:"muay-thai",
  title:"Le clinch en Muay-Thaï : maîtriser la phase la plus méconnue de l'art des 8 membres",
  category:"conseil-entrainement", date:"Mars 2026",
  content:`<p>Le clinch est l'une des dimensions les plus distinctives du Muay-Thaï par rapport aux autres arts de frappe. En Muay-Thaï, c'est une phase de combat à part entière, riche en techniques offensives.</p>
<h2>Les fondamentaux du clinch Muay-Thaï</h2>
<p>La prise de nuque (double collar tie) est la position de contrôle de référence. Depuis cette position, les genoux au corps et au visage sont les armes principales.</p>
<h2>Comment le travailler efficacement</h2>
<p>Le clinch se développe par la répétition avec un partenaire — pas sur sac. Les Thaïlandais y consacrent une part majeure de leur entraînement quotidien.</p>`},

{ id:"muay-thai-coup-pied-circulaire", sport:"muay-thai",
  title:"Le coup de pied circulaire en Muay-Thaï : technique et puissance au service du combat",
  category:"conseil-entrainement", date:"Mars 2026",
  content:`<p>Le coup de pied circulaire est l'arme signature du Muay-Thaï. Frappant avec le tibia plutôt que le pied, il génère une puissance traumatique considérable.</p>
<h2>La mécanique correcte</h2>
<p>Le coup de pied circulaire part d'un pivot sur la jambe d'appui, la hanche tourne vers la cible, la jambe frappante s'étend en fouet et l'impact se fait avec le tibia. Erreur classique : frapper avec le pied, perdre la rotation des hanches.</p>
<h2>Comment développer sa puissance et sa résistance</h2>
<p>La résistance des tibias se développe progressivement par l'entraînement. 3 à 6 mois suffisent pour commencer à avoir un tibia fonctionnel pour le sparring.</p>`},

{ id:"muay-thai-buakaw-analyse", sport:"muay-thai",
  title:"Buakaw Banchamek : l'icône du Muay-Thaï qui a conquis le monde",
  category:"portrait", date:"Mars 2026",
  content:`<p>Buakaw Banchamek est probablement le combattant de Muay-Thaï le plus connu en dehors de Thaïlande. Ses deux victoires au tournoi K-1 World MAX (2004, 2006) l'ont établi comme le visage du Muay-Thaï moderne.</p>
<h2>Ce qui le rend unique techniquement</h2>
<p>Buakaw est un athlète de puissance dans une discipline qui valorise la technique. Son low kick est l'un des plus dévastateurs jamais vus en compétition internationale.</p>
<h2>Son héritage</h2>
<p>Buakaw a contribué à la popularisation mondiale du Muay-Thaï comme aucun autre combattant de sa génération. Dans les salles françaises, son nom est connu de pratiquement tous les élèves.</p>`},

{ id:"muay-thai-rodtang-analyse", sport:"muay-thai",
  title:"Rodtang Jitmuangnon : pourquoi le champion ONE est le combattant le plus divertissant du Muay-Thaï actuel",
  category:"analyse", date:"Mars 2026",
  content:`<p>Rodtang Jitmuangnon, surnommé « The Iron Man », est champion ONE Championship poids paille Muay-Thaï. Il est aussi probablement le combattant de Muay-Thaï le plus regardé sur les réseaux sociaux.</p>
<h2>Son style : le chaos organisé</h2>
<p>Rodtang se bat vers l'avant. Il prend des coups pour en placer. Sa tolérance à la douleur est exceptionnelle, et sa capacité à continuer à frapper après avoir absorbé des coups propres est l'une des caractéristiques les plus distinctives de son style.</p>
<h2>Ce qui peut le battre</h2>
<p>Rodtang peut être exposé par des combattants qui maintiennent une distance propre et utilisent le teep pour le remettre à distance avant qu'il entre dans son espace de confort.</p>`},

{ id:"muay-thai-low-kick", sport:"muay-thai",
  title:"Le low kick en Muay-Thaï : comment cette frappe usante peut gagner des combats",
  category:"conseil-entrainement", date:"Mars 2026",
  content:`<p>Le low kick — coup de pied en tibia visant la cuisse externe ou interne de l'adversaire — est l'une des armes les plus stratégiquement efficaces du Muay-Thaï.</p>
<h2>Pourquoi le low kick est si efficace</h2>
<p>La cuisse externe est difficile à protéger sans exposer d'autres zones. Un seul low kick propre ne change rien — mais l'accumulation sur 3 à 5 rounds peut engourdir la jambe et ralentir les déplacements.</p>
<h2>Comment l'intégrer dans son jeu</h2>
<p>Le low kick se place après une frappe de tête, après un feint, ou en contre-attaque. Il ne doit pas être utilisé systématiquement et prévisiblement.</p>`},

/* ══ ÉQUIPEMENT ══════════════════════════════════════════ */

{ id:"equip-gants-boxe-choisir", sport:"equipement",
  title:"Quel gant de boxe choisir pour débuter ? Guide complet 2026",
  category:"guide-equipement", date:"Mars 2026",
  content:`<p>Choisir ses premiers gants de boxe est souvent la première décision d'équipement d'un pratiquant de sports de combat. Ce guide vous aide à choisir selon votre sport, votre niveau et votre budget.</p>
<h2>Le poids de gants : quelle taille choisir ?</h2>
<p>8-10 oz : gants de compétition. 12 oz : sparring léger pour moins de 65 kg. 14 oz : sparring général pour 65-80 kg. 16 oz : sparring lourd, recommandé pour les débutants et tous ceux de plus de 80 kg. En règle générale pour débuter : prenez 16 oz.</p>
<h2>Les marques fiables pour débuter (50-100 €)</h2>
<p>Venum Contender, Hayabusa T3, Fairtex BGV1 et Title Boxing Classic sont des références fiables. Évitez les gants à moins de 30 € : la mousse est insuffisante.</p>`},

{ id:"equip-gants-mma-choisir", sport:"equipement",
  title:"Choisir ses gants de MMA : guide complet pour ne pas se tromper",
  category:"guide-equipement", date:"Mars 2026",
  content:`<p>Les gants de MMA sont très différents des gants de boxe : plus fins, avec les doigts découverts, et conçus pour permettre à la fois les frappes debout et le grappling au sol.</p>
<h2>Les trois types de gants MMA</h2>
<p>Gants d'entraînement (7 oz) : pour le travail sur pads et sac léger. Gants de sparring (5-7 oz avec plus de mousse). Gants de compétition (4 oz) : réglementaires, à n'utiliser qu'en compétition.</p>
<h2>Notre recommandation selon l'usage</h2>
<p>Pour débuter : Venum Challenger ou Hayabusa T3 MMA en 7 oz. Ne faites jamais de sparring avec des gants de compétition 4 oz.</p>`},

{ id:"equip-protege-tibias-muay-thai", sport:"equipement",
  title:"Top 5 des protège-tibias pour le Muay-Thaï : notre sélection pour le sparring",
  category:"guide-equipement", date:"Mars 2026",
  content:`<p>Les protège-tibias sont l'équipement le plus spécifique au Muay-Thaï — et souvent celui que les débutants achètent en dernier alors qu'il devrait être une priorité dès le début du sparring.</p>
<h2>Critères de sélection</h2>
<p>Protection du tibia ET du cou-de-pied, maintien stable pendant les kicks et le clinch, facilité d'enfilage, taille adaptée à votre morphologie.</p>
<h2>Sélection fiable</h2>
<p>Fairtex SP5 : référence premium. Venum Kontact : bon rapport qualité/prix pour les débutants (40-60 €). Twins Special : marque thaïlandaise de référence.</p>`},

{ id:"equip-bandes-boxe", sport:"equipement",
  title:"Bandes de boxe : comment les utiliser correctement pour protéger vos poignets",
  category:"guide-equipement", date:"Mars 2026",
  content:`<p>Les bandes de boxe sont l'équipement le moins glamour et l'un des plus importants. Elles protègent les os de la main, les articulations des doigts et le poignet contre les micro-traumatismes répétés.</p>
<h2>Les deux types de bandes</h2>
<p>Bandes traditionnelles (3,5 à 4,5 m) : protection maximale, demandent un apprentissage du bandage. Bandes rapides (quick wraps) : pratiques mais protection moindre.</p>
<h2>La technique de bandage de base</h2>
<p>Commencez par le pouce, faites trois tours de poignet pour stabiliser, passez entre chaque doigt, revenez sur le poignet et finissez avec le velcro. Demandez à votre entraîneur de vous montrer lors de votre première séance.</p>`},

{ id:"equip-sac-frappe-choisir", sport:"equipement",
  title:"Quel sac de frappe choisir pour s'entraîner à la maison ou en salle ?",
  category:"guide-equipement", date:"Mars 2026",
  content:`<p>Le sac de frappe est l'équipement de home training le plus populaire pour les sports de combat. Ce guide couvre les critères essentiels pour ne pas se tromper.</p>
<h2>Les types de sacs et leur usage</h2>
<p>Sac lourd cylindrique (25-45 kg) : polyvalent. Sac banane (150-170 cm) : idéal pour le Muay-Thaï. Sac de frappe debout : solution sans fixation au plafond. Sac de corps (teardrop) : axé sur le travail du corps.</p>
<h2>Poids, rembourrage et installation</h2>
<p>Règle générale : le sac devrait peser environ la moitié de votre poids corporel. Pour l'installation à domicile, vérifiez la solidité du support — un sac de 30 kg mal fixé est un danger réel.</p>`},

{ id:"equip-equipement-debutant-budget", sport:"equipement",
  title:"Kit équipement complet pour débuter : sélection petits et grands budgets 2026",
  category:"guide-equipement", date:"Mars 2026",
  content:`<p>Démarrer les sports de combat demande un investissement initial en équipement. Ce guide propose deux sélections complètes pour débuter le MMA, la boxe ou le Muay-Thaï.</p>
<h2>Kit débutant budget serré (100-150 €)</h2>
<p>Protège-dents Shock Doctor 100 (15 €), gants Venum Contender 16 oz (50 €), bandes de boxe 3,5 m (8 €), short de combat (25 €). Total : ~100 €.</p>
<h2>Kit débutant budget confortable (200-300 €)</h2>
<p>Protège-dents Shock Doctor Gel Max (25 €), gants Hayabusa T3 16 oz (90 €), bandes (20 €), protège-tibias Venum Kontact (50 €), short Venum ou Scramble (50 €). Total : ~235 €.</p>`},

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
   DISC_MAP — copier dans le <script> inline de index.html
   pour remplacer l'ancien DISC_MAP
══════════════════════════════════════════════════════════ */
const DISC_MAP = {
  'mma':                  'MMA',
  'boxe':                 'Boxe',
  'muay-thai':            'Muay-Thaï',
  'equipement':           'Équipement',
  'kickboxing':           'Kickboxing',
  'karate':               'Karaté',
  'taekwondo':            'Taekwondo',
  'savate':               'Savate',
  'lethwei':              'Lethwei',
  'sanda':                'Sanda',
  'grappling':            'Grappling',
  'brazilian-jiu-jitsu':  'BJJ',
  'luta-livre':           'Luta Livre',
  'judo':                 'Judo',
  'sambo':                'Sambo',
  'catch-wrestling':      'Catch Wrestling',
  'lutte-libre':          'Lutte libre',
  'lutte-greco-romaine':  'Lutte gréco-romaine',
};

/* ══════════════════════════════════════════════════════════
   API PUBLIQUE — helpers utilisables dans index.html
══════════════════════════════════════════════════════════ */

/** Retourne les articles d'un sport (clé slug ou label discipline) */
function getArticlesBySport(sportKeyOrLabel) {
  return ARTICLES.filter(a =>
    a.sport === sportKeyOrLabel || a.discipline === sportKeyOrLabel
  );
}

/** Retourne les articles d'un groupe (striking / grappling / principal / equipement) */
function getArticlesByGroup(group) {
  return ARTICLES.filter(a => a.sportGroup === group);
}

// console.log(`✅ Front Kick — ${ARTICLES.length} articles chargés`);
