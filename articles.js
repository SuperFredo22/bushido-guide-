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

   SPORTS DISPONIBLES :
   "mma" "boxe" "kickboxing" "muay-thai" "grappling"
   "karate" "taekwondo" "savate" "lethwei" "sanda"
   "brazilian-jiu-jitsu" "luta-livre" "judo" "sambo"
   "catch-wrestling" "lutte-libre" "lutte-greco-romaine"
   "equipement"

   CATEGORIES DISPONIBLES :
   "analyse-combat"       → Analyse combat
   "analyse"              → Analyse
   "guide-debutant"       → Guide débutant
   "conseil-entrainement" → Conseil
   "guide-equipement"     → Équipement
   "actualite"            → Actualité
   "portrait"             → Portrait
   "bilan"                → Bilan
══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   RÉFÉRENTIEL SPORTS
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

function _generateStructuredHTML(struct) {
  if (!struct) return '';
  let html = '';
  if (struct.intro) html += `<p class="art-lead">${struct.intro}</p>`;
  if (struct.sections && Array.isArray(struct.sections)) {
    struct.sections.forEach(s => {
      switch (s.type) {
        case 'h2': html += `<h2>${s.text}</h2>`; break;
        case 'h3': html += `<h3>${s.text}</h3>`; break;
        case 'p':  html += `<p>${s.text}</p>`; break;
        case 'ul': html += '<ul>' + (s.items || []).map(i => `<li>${i}</li>`).join('') + '</ul>'; break;
        case 'ol': html += '<ol>' + (s.items || []).map(i => `<li>${i}</li>`).join('') + '</ol>'; break;
        case 'blockquote': html += `<blockquote>${s.text}</blockquote>`; break;
        case 'faq':
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
        default: break;
      }
    });
  }
  if (struct.conclusion) html += `<p><strong>Conclusion :</strong> ${struct.conclusion}</p>`;
  return html;
}

function _normalize(a) {
  const meta    = SPORTS_META[a.sport] || { label: a.sport, emoji: '🥊', group: 'autre' };
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
   ARTICLES
══════════════════════════════════════════════════════════ */
const _RAW_ARTICLES = [

  /* ─────────────────────────────────────────────
     MMA
  ───────────────────────────────────────────── */
  {
    id:       'mma-discipline-complete',
    title:    'MMA : pourquoi c\'est le sport de combat le plus <em>complet</em> au monde',
    sport:    'mma',
    category: 'guide-debutant',
    date:     'Mars 2026',
    featured: true,
    excerpt:  'Grappling, frappes, wrestling : le MMA combine toutes les disciplines de combat en une seule. Pourquoi cette polyvalence en fait le sport de combat le plus exigeant et le plus complet.',
    structured: {
      intro: 'Le Mixed Martial Arts est souvent perçu comme un sport violent et sans règles. C\'est tout le contraire : le MMA est une discipline codifiée, stratégique, qui exige une maîtrise technique dans tous les domaines du combat.',
      sections: [
        { type: 'h2', text: 'Un sport qui englobe toutes les disciplines' },
        { type: 'p', text: 'Contrairement à la boxe anglaise ou au judo qui imposent un règlement limitant les zones de combat, le MMA permet les frappes debout, les projections et le combat au sol. Un combattant doit être compétent dans au moins trois domaines : striking debout (boxe, muay-thaï), lutte (wrestling, judo) et combat au sol (BJJ, grappling).' },
        { type: 'h2', text: 'Les grandes familles techniques du MMA' },
        { type: 'ul', items: [
          '<strong>Striking debout</strong> : jab, direct, crochet, coups de pied circulaires, coups de genou, coudes',
          '<strong>Clinch et takedowns</strong> : double leg, single leg, hip throw, projections de judo',
          '<strong>Ground and pound</strong> : frappes au sol depuis une position dominante',
          '<strong>Soumissions</strong> : étranglements (rear naked choke, guillotine), clés articulaires (kimura, armbar)'
        ]},
        { type: 'h2', text: 'Pourquoi le MMA attire les pratiquants de toutes disciplines' },
        { type: 'p', text: 'Le MMA a démontré depuis ses débuts que chaque discipline a ses forces et ses lacunes. Un judoka qui ignore le sol sera soumis par un grappler. Un boxeur technique sera renversé par un lutteur. Le MMA force chaque pratiquant à combler ses lacunes et à développer une vision globale du combat.' },
        { type: 'h2', text: 'Par où commencer le MMA ?' },
        { type: 'ol', items: [
          'Choisissez un club avec des cours dédiés aux débutants',
          'Commencez par consolider une base (boxe ou BJJ) pendant 6 mois',
          'Intégrez progressivement les autres disciplines',
          'Pratiquez le sparring contrôlé avec des partenaires de confiance'
        ]},
        { type: 'faq', items: [
          { q: 'Quel est le meilleur sport de base pour commencer le MMA ?', a: 'La boxe anglaise et le BJJ sont les deux bases les plus recommandées. La boxe développe l\'instinct debout et la gestion des distances ; le BJJ enseigne le combat au sol et les soumissions. Un an dans chacune avant de passer au MMA général est un investissement idéal.' },
          { q: 'Le MMA est-il dangereux pour un débutant ?', a: 'Dans un club sérieux, non. Les entraînements sont progressifs. Le sparring est contrôlé et adapté au niveau des pratiquants. Les blessures graves surviennent principalement en compétition professionnelle, pas en salle d\'entraînement.' }
        ]}
      ],
      conclusion: 'Le MMA est bien plus qu\'un sport — c\'est une école de combat totale qui pousse chaque pratiquant à se dépasser, à apprendre l\'humilité et à développer une véritable intelligence tactique.'
    }
  },

  {
    id:       'mma-gants-guide-achat',
    title:    'Quel équipement MMA acheter en 2026 ? Le guide complet',
    sport:    'mma',
    category: 'guide-equipement',
    date:     'Février 2026',
    excerpt:  'Gants, shorts, rashguards, protections : tout ce qu\'il faut savoir pour choisir son équipement MMA sans se tromper, avec les meilleures marques.',
    structured: {
      intro: 'L\'équipement MMA est vaste et peut vite représenter un budget important. Voici ce qui est vraiment indispensable pour débuter, et comment choisir sans se tromper.',
      sections: [
        { type: 'h2', text: 'Les gants MMA : open-finger vs sparring' },
        { type: 'p', text: 'Les gants open-finger (4 à 7 oz) sont utilisés en compétition et pour les exercices techniques. En sparring, des gants de boxe plus lourds (12 à 16 oz) sont indispensables pour protéger votre partenaire et vous-même. Ne faites pas l\'économie d\'une bonne paire de gants de sparring.' },
        { type: 'ul', items: [
          '<strong>Venum Challenger 3.0</strong> : excellent rapport qualité/prix, disponible en 12, 14 et 16 oz',
          '<strong>Hayabusa T3</strong> : haut de gamme, durabilité exceptionnelle',
          '<strong>Fairtex BGV1</strong> : référence thaïlandaise, idéale pour le travail aux mitaines'
        ]},
        { type: 'h2', text: 'Short MMA et rashguard' },
        { type: 'p', text: 'Un short MMA se distingue par l\'absence de fermetures éclair et de poches qui pourraient blesser les partenaires. Il permet une grande liberté de mouvement. Le rashguard est un sous-vêtement technique compression qui protège des frottements au sol et favorise l\'hygiène.' },
        { type: 'h2', text: 'Les protections indispensables' },
        { type: 'ul', items: [
          '<strong>Protège-dents</strong> : investissez dans un modèle thermoformable de qualité',
          '<strong>Coquille</strong> (hommes) : obligatoire pour tout sparring',
          '<strong>Protège-tibias</strong> : pour le travail debout et les coups de pied',
          '<strong>Casque</strong> : recommandé pour les 6 premiers mois de sparring'
        ]},
        { type: 'h2', text: 'Budget recommandé pour débuter' },
        { type: 'p', text: 'Comptez entre 120 et 200 € pour un équipement de départ complet et de qualité correcte. Évitez les kits tout-en-un à bas prix : les protections sous-dimensionnées sont une fausse économie. Achetez moins, mais achetez bien.' }
      ],
      conclusion: 'Un bon équipement protège votre intégrité physique et respecte celle de vos partenaires. C\'est un investissement dans votre pratique à long terme.'
    }
  },

  /* ─────────────────────────────────────────────
     BOXE
  ───────────────────────────────────────────── */
  {
    id:       'boxe-garde-fondamentale',
    title:    'La garde en boxe anglaise : maîtrisez les fondamentaux',
    sport:    'boxe',
    category: 'guide-debutant',
    date:     'Mars 2026',
    excerpt:  'La garde est la base de tout en boxe. Position des pieds, des mains, du menton : voici comment construire une garde solide dès vos premières séances.',
    structured: {
      intro: 'En boxe anglaise, la garde n\'est pas une simple posture défensive : c\'est le point de départ de chaque attaque, le retour après chaque frappe, et le bouclier qui vous protège. Maîtriser sa garde dès le début est l\'investissement le plus rentable d\'un boxeur débutant.',
      sections: [
        { type: 'h2', text: 'Position des pieds' },
        { type: 'p', text: 'Pour un droitier (garde orthodoxe) : pied gauche en avant, pied droit en arrière, légèrement décalé vers la droite. L\'écart entre les pieds est légèrement supérieur à la largeur des épaules. Les genoux sont légèrement fléchis — jamais tendus. Le poids du corps est réparti équitablement entre les deux jambes, avec une légère tendance à se positionner sur l\'avant du pied pour rester mobile.' },
        { type: 'h2', text: 'Position des mains et de la tête' },
        { type: 'ul', items: [
          'Main avant (gauche pour un orthodoxe) : à hauteur de l\'œil, légèrement avancée',
          'Main arrière (droite) : colle à la joue droite, protège le menton',
          'Coudes rentrés vers les côtes : protègent le foie et les côtes',
          'Menton baissé : rentré vers la poitrine, derrière l\'épaule avant',
          'Regard par-dessus les gants : voir sans exposer le visage'
        ]},
        { type: 'h2', text: 'Les erreurs de garde à corriger immédiatement' },
        { type: 'ul', items: [
          'Gants trop bas : le menton exposé, c\'est la chute assurée',
          'Bras tendus : épuisant et inefficace pour les contres',
          'Pieds sur la même ligne : instabilité et difficulté à pivoter',
          'Épaules relevées : crée de la rigidité et masque la vision périphérique'
        ]},
        { type: 'h2', text: 'Exercice pratique pour ancrer la garde' },
        { type: 'p', text: 'Placez-vous devant un miroir pendant 5 minutes par séance. Prenez votre garde, observez-la, corrigez les points faibles. Effectuez des déplacements latéraux et en diagonale sans perdre la structure de votre garde. C\'est l\'exercice le plus simple et le plus efficace pour un débutant.' },
        { type: 'faq', items: [
          { q: 'Quelle différence entre garde orthodoxe et southpaw ?', a: 'Un droitier utilise généralement la garde orthodoxe (gauche devant). Un gaucher adopte la southpaw (droite devant). Le southpaw crée des angles difficiles à gérer pour les adversaires orthodoxes, ce qui est un avantage tactique important.' }
        ]}
      ],
      conclusion: 'Une bonne garde ne se construit pas en une séance. C\'est un travail de semaines et de mois. Soyez patient, et revenez régulièrement devant le miroir pour contrôler votre posture.'
    }
  },

  {
    id:       'boxe-jab-technique',
    title:    'Le jab : l\'arme numéro un du boxeur',
    sport:    'boxe',
    category: 'conseil-entrainement',
    date:     'Février 2026',
    excerpt:  'Sous-estimé par les débutants, le jab est le coup le plus important de la boxe. Technique, utilisation tactique et erreurs à éviter : le guide complet.',
    structured: {
      intro: 'Muhammad Ali, Floyd Mayweather, Tyson Fury : tous ces champions ont en commun un jab exceptionnel. Ce coup, souvent considéré comme "secondaire" par les débutants, est en réalité l\'arme la plus polyvalente et la plus fondamentale de la boxe anglaise.',
      sections: [
        { type: 'h2', text: 'Technique du jab parfait' },
        { type: 'ol', items: [
          'Partez de votre garde : main avant à hauteur de l\'œil, coude rentré',
          'Projetez le poing droit vers la cible en tournant légèrement le poignet (pronation)',
          'L\'épaule monte pour protéger le menton pendant l\'extension',
          'La main arrière reste collée à la joue — ne bougez pas',
          'Ramenez immédiatement le poing en garde après l\'impact'
        ]},
        { type: 'h2', text: 'Les utilisations tactiques du jab' },
        { type: 'ul', items: [
          '<strong>Mesurer la distance</strong> : le jab teste l\'espace entre vous et l\'adversaire',
          '<strong>Perturber le rythme</strong> : un jab répété empêche l\'adversaire de se concentrer',
          '<strong>Créer des ouvertures</strong> : un jab au visage peut baisser la garde pour un direct',
          '<strong>Contrôler l\'adversaire</strong> : le jab au corps oblige l\'adversaire à descendre sa garde',
          '<strong>Stopper une avancée</strong> : un jab puissant au bon moment stoppe net une attaque'
        ]},
        { type: 'h2', text: 'Erreurs fréquentes sur le jab' },
        { type: 'ul', items: [
          'Télégraphier : bouger l\'épaule ou la tête avant de lancer le coup',
          'Ne pas ramener la main en garde après l\'impact',
          'Lancer le jab sans rotation d\'épaule : perd en puissance et en portée',
          'Jab avec tout le corps : le jab doit être économique, pas un direct'
        ]},
        { type: 'h2', text: 'Exercices pour améliorer son jab' },
        { type: 'p', text: 'Le shadow boxing devant miroir est le meilleur outil. Lancez 100 jabs par séance en vous concentrant sur la technique. Travaillez le jab au sac (3 rounds de 3 minutes, jab seul) puis aux mitaines avec votre coach. L\'objectif : que le jab devienne un automatisme parfait avant d\'y ajouter d\'autres coups.' }
      ],
      conclusion: 'Le jab est le coup qui définit un boxeur. Perfectionnez-le avant tout autre chose — vous en récolterez les fruits pendant toute votre carrière de pratiquant.'
    }
  },

  /* ─────────────────────────────────────────────
     MUAY-THAÏ
  ───────────────────────────────────────────── */
  {
    id:       'muay-thai-roundhouse-kick',
    title:    'Maîtriser le roundhouse kick en Muay-Thaï : technique et puissance',
    sport:    'muay-thai',
    category: 'conseil-entrainement',
    date:     'Mars 2026',
    excerpt:  'Le coup de pied circulaire est l\'arme signature du Muay-Thaï. Comment générer une puissance maximale, corriger les erreurs techniques et conditionner ses tibias.',
    structured: {
      intro: 'Le roundhouse kick thaïlandais — exécuté avec le tibia — est l\'une des armes les plus dévastatrices des sports de combat. Buakaw, Saenchai ou Yodsanklai ont mis des adversaires KO à mi-hauteur avec ce seul coup. Voici comment le maîtriser.',
      sections: [
        { type: 'h2', text: 'La mécanique du roundhouse kick thaïlandais' },
        { type: 'p', text: 'Contrairement au coup de pied de karaté ou de kickboxing occidental exécuté avec le coup-de-pied, le roundhouse thaïlandais utilise le tibia. L\'énergie vient d\'une rotation complète de la hanche et du bassin, le bras opposé swinguant en arrière pour amplifier la rotation. Le contact se fait avec le tiers inférieur du tibia, là où l\'os est le plus dense.' },
        { type: 'ol', items: [
          'Depuis la garde, pivotez sur le pied avant',
          'Projetez la hanche arrière vers l\'avant en rotation complète',
          'La jambe frappe en arc de cercle, tibia en avant',
          'Le bras opposé swing vers l\'arrière pour amplifier la rotation',
          'Reposez le pied en garde immédiatement après l\'impact'
        ]},
        { type: 'h2', text: 'Les trois niveaux de frappe' },
        { type: 'ul', items: [
          '<strong>Roundhouse bas (low kick)</strong> : vise la cuisse ou le mollet. Épuisant pour l\'adversaire sur la durée. Très utilisé en MMA.',
          '<strong>Roundhouse à mi-hauteur (mid kick)</strong> : vise les côtes ou les flancs. Le plus puissant et le plus utilisé en Muay-Thaï.',
          '<strong>Roundhouse haut (high kick)</strong> : vise la tête. Spectaculaire mais risqué — nécessite une excellente souplesse et un timing parfait.'
        ]},
        { type: 'h2', text: 'Conditionner ses tibias' },
        { type: 'p', text: 'Les tibias du pratiquant de Muay-Thaï doivent être progressivement conditionnés pour supporter l\'impact. Les nerfs superficiels du tibia s\'endurcissent avec la répétition. Frappes régulières sur le sac lourd, puis sur les coussinets en progressant dans l\'intensité. Ne forcez jamais : la douleur vive indique un risque de fracture de fatigue.' },
        { type: 'h2', text: 'Erreurs techniques à corriger' },
        { type: 'ul', items: [
          'Frapper avec le coup-de-pied au lieu du tibia : perte de puissance et risque de blessure au pied',
          'Rotation de hanche incomplète : le roundhouse sans rotation n\'est qu\'une caresse',
          'Main arrière qui ne swing pas : sans le contrepoids du bras, la rotation est bloquée',
          'Pied pivot qui ne tourne pas : bloquez votre puissance si vous ne pivotez pas sur la plante du pied'
        ]}
      ],
      conclusion: 'Le roundhouse kick parfait est le fruit de milliers de répétitions. Travaillez-le au sac, aux coussinets, en shadow — il deviendra votre arme la plus redoutable.'
    }
  },

  {
    id:       'muay-thai-histoire-culture',
    title:    'Muay-Thaï : histoire, culture et tradition d\'un art martial millénaire',
    sport:    'muay-thai',
    category: 'analyse',
    date:     'Janvier 2026',
    excerpt:  'De l\'art militaire des guerriers thaïlandais aux lumières de l\'ONE Championship : l\'histoire fascinante du Muay-Thaï et de sa culture unique.',
    structured: {
      intro: 'Derrière le Muay-Thaï moderne des stades climatisés et des contrats en millions de dollars se cache une tradition de plusieurs siècles. Comprendre cette histoire enrichit profondément la pratique.',
      sections: [
        { type: 'h2', text: 'Des champs de bataille aux rings' },
        { type: 'p', text: 'Le Muay-Thaï trouve ses origines dans le Muay Boran, art martial des royaumes thaïlandais utilisé sur les champs de bataille. Les techniques de coudes et de genoux, particulièrement mortelles, permettaient aux soldats de continuer à combattre après la perte de leurs armes. Le roi Naresuan le Grand (1555-1605) fut l\'un des champions légendaires de cet art.' },
        { type: 'h2', text: 'Le Wai Kru Ram Muay : plus qu\'une danse' },
        { type: 'p', text: 'Avant chaque combat, le Muay-Thaï exige la pratique du Wai Kru Ram Muay, une danse rituelle exécutée sur le ring. Elle rend hommage au professeur (Kru), aux parents et aux ancêtres. Chaque mouvement est symbolique, chaque club a sa propre version. Ce rituel est respecté même par les combattants étrangers comme Dave Leduc ou Giorgio Petrosyan, signe d\'une intégration profonde dans la culture thaïlandaise.' },
        { type: 'h2', text: 'Le stade Lumpinee : la Mecque du Muay-Thaï' },
        { type: 'p', text: 'Construit en 1956 à Bangkok, le stade Lumpinee est le temple mondial du Muay-Thaï. Pendant des décennies, le seul fait d\'avoir combattu à Lumpinee conférait une légitimité incontestable. Les soirées de combats, accompagnées de la musique traditionnelle (Sarama) et des cris des parieurs, sont une expérience culturelle unique.' },
        { type: 'h2', text: 'L\'internationalisation et ses enjeux' },
        { type: 'p', text: 'Depuis les années 2000, le Muay-Thaï a conquis le monde. Des organisations comme l\'ONE Championship (Asie) ou le Glory Kickboxing (Europe) ont créé des superstars mondiales. Des Occidentaux comme Valentina Shevchenko (Kirghizistan), Tiffany Van Soest (USA) ou Anissa Meksen (France) ont dominé les classements mondiaux, mêlant technique thaïlandaise et influences européennes.' }
      ],
      conclusion: 'Le Muay-Thaï est bien plus qu\'un sport : c\'est une fenêtre sur la civilisation thaïlandaise, ses valeurs de respect, de persévérance et de bravoure. Cette dimension culturelle en fait une discipline unique parmi les sports de combat.'
    }
  },

  /* ─────────────────────────────────────────────
     BJJ
  ───────────────────────────────────────────── */
  {
    id:       'bjj-guide-debutant',
    title:    'Brazilian Jiu-Jitsu : le guide complet du débutant',
    sport:    'brazilian-jiu-jitsu',
    category: 'guide-debutant',
    date:     'Mars 2026',
    excerpt:  'Gi ou no-gi, soumissions, positions dominantes : tout ce qu\'un débutant doit savoir avant de poser le pied sur le tatami pour la première fois.',
    structured: {
      intro: 'Le Brazilian Jiu-Jitsu est la discipline qui a convaincu le monde entier qu\'un pratiquant de petite taille peut soumettre un adversaire plus grand et plus fort. Ce guide vous donne toutes les bases pour démarrer votre parcours avec les bons fondamentaux.',
      sections: [
        { type: 'h2', text: 'Ce que vous allez apprendre les premiers mois' },
        { type: 'ul', items: [
          '<strong>Les positions de base</strong> : guard, mount, side control, back control',
          '<strong>Les passes de garde</strong> : passer de la position inférieure à la position dominante',
          '<strong>Les sweeps</strong> : renversements pour passer de bas en haut',
          '<strong>Les premières soumissions</strong> : rear naked choke, americana, kimura, armbar simple',
          '<strong>Les escapes</strong> : comment sortir des positions dominantes adverses'
        ]},
        { type: 'h2', text: 'Le rolling : apprendre à rouler intelligemment' },
        { type: 'p', text: 'Le sparring en BJJ s\'appelle "rolling" (rouler). Les premières séances de rolling sont souvent déconcertantes : vous serez soumis régulièrement, et c\'est parfaitement normal. L\'erreur classique est de forcer physiquement. Concentrez-vous sur l\'application des positions vues en cours, et acceptez chaque soumission comme une leçon gratuite.' },
        { type: 'h2', text: 'Comprendre la hiérarchie des positions' },
        { type: 'p', text: 'En BJJ, toutes les positions ne se valent pas. De la meilleure à la moins bonne : back control > mount > knee on belly > side control > half guard > full guard (pour le bas). La garde est ambivalente : elle est inférieure en position mais offensive en attaque. Comprendre cette hiérarchie est fondamental pour orienter ses décisions en rolling.' },
        { type: 'h2', text: 'Gi vs no-gi : quelle différence ?' },
        { type: 'ul', items: [
          '<strong>Avec gi</strong> : Le kimono permet des prises de tissu (lapel grips, sleeve grips) qui ralentissent les échanges et permettent des techniques spécifiques. Idéal pour apprendre les détails techniques.',
          '<strong>No-gi</strong> : Short et rashguard, sans kimono. Les échanges sont plus rapides, moins de prises disponibles, plus proche du grappling de MMA.',
          'Idéalement, pratiquez les deux dès le début.'
        ]},
        { type: 'faq', items: [
          { q: 'Combien de temps dure un cours de BJJ typique ?', a: 'Une heure à une heure trente généralement. La structure habituelle : échauffement (15 min), démonstration et drilling de techniques (30-40 min), rolling libre (20-30 min). Certains clubs proposent des séances exclusivement dédiées au rolling ("open mat").' },
          { q: 'Est-ce qu\'on peut faire du BJJ sans être souple ?', a: 'Oui. La souplesse aide mais n\'est pas prérequis. De nombreux champions de BJJ ont une souplesse très ordinaire. La technique et la force relative sont bien plus importantes que la souplesse dans cette discipline.' }
        ]}
      ],
      conclusion: 'Le BJJ est un voyage de toute une vie. La progression est lente et délibérée, les défis constants — et les satisfactions proportionnelles. Chaque séance, même difficile, vous rapproche de la maîtrise.'
    }
  },

  {
    id:       'bjj-ceintures-progression',
    title:    'Le système de ceintures en BJJ : progression et signification',
    sport:    'brazilian-jiu-jitsu',
    category: 'analyse',
    date:     'Février 2026',
    excerpt:  'Du blanc au noir en passant par le rouge : le système de ceintures du BJJ est unique dans les arts martiaux. Comprendre ses spécificités pour mieux vivre sa progression.',
    structured: {
      intro: 'Le BJJ possède l\'un des systèmes de gradation les plus stricts et les plus respectés du monde des arts martiaux. Contrairement à d\'autres disciplines où la ceinture noire peut s\'obtenir en quelques années, le BJJ exige patience, résilience et véritable maîtrise technique.',
      sections: [
        { type: 'h2', text: 'Les ceintures adultes et leur durée indicative' },
        { type: 'ul', items: [
          '<strong>Blanc</strong> : débutant. Aucune durée minimum. Phase d\'apprentissage des bases.',
          '<strong>Bleu</strong> : ~1,5 à 2 ans. Maîtrise des positions de base, premiers sweeps et soumissions.',
          '<strong>Violet</strong> : +2 à 3 ans après la bleue. Début de développement d\'un jeu personnel.',
          '<strong>Marron</strong> : +2 à 3 ans après la violette. Technique avancée et transmission possible.',
          '<strong>Noir</strong> : généralement 8 à 12 ans de pratique totale. Standard mondial de maîtrise.',
          '<strong>Corail et rouge</strong> : ceintures de maîtres, décernées après 30 à 50 ans de pratique et service à la communauté.'
        ]},
        { type: 'h2', text: 'Les galons (stripes) : reconnaissance du progrès' },
        { type: 'p', text: 'Entre chaque ceinture, jusqu\'à 4 galons (bandes blanches) sont ajoutés sur la ceinture pour reconnaître la progression. Le passage de 0 à 4 galons indique l\'approche du prochain grade. Les galons sont décernés par le professeur selon sa propre appréciation : présence, technique, combativité, contribution à l\'académie.' },
        { type: 'h2', text: 'Pourquoi la ceinture noire en BJJ est si rare et respectée' },
        { type: 'p', text: 'Dans de nombreux arts martiaux, la ceinture noire représente "un bon débutant". En BJJ, la ceinture noire est une véritable distinction d\'excellence. Selon les estimations de la IBJJF, moins de 1 % des pratiquants atteignent la ceinture noire. Cette rareté en fait l\'une des gradations les plus respectées dans le monde des arts martiaux.' }
      ],
      conclusion: 'Ne courez pas après la ceinture — courez après la progression. Les ceintures suivront naturellement quand la maîtrise sera au rendez-vous. Chaque grade en BJJ se mérite, et c\'est précisément ce qui lui donne sa valeur.'
    }
  },

  /* ─────────────────────────────────────────────
     JUDO
  ───────────────────────────────────────────── */
  {
    id:       'judo-projections-bases',
    title:    'Les projections fondamentales du judo que tout débutant doit apprendre',
    sport:    'judo',
    category: 'guide-debutant',
    date:     'Mars 2026',
    excerpt:  'O-soto-gari, seoi-nage, tai-otoshi : les projections fondamentales du judo, leur mécanique et leurs applications. Le guide du judoka débutant.',
    structured: {
      intro: 'Le judo compte plus de 100 techniques de projection officielles (tachi-waza). Pour un débutant, il ne faut pas chercher à toutes les apprendre : mieux vaut maîtriser cinq ou six projections à la perfection et en faire ses armes de prédilection.',
      sections: [
        { type: 'h2', text: 'Les projections incontournables pour débuter' },
        { type: 'ul', items: [
          '<strong>O-soto-gari (grand fauchage extérieur)</strong> : l\'une des premières techniques apprise. On fauche la jambe arrière de l\'adversaire en le déséquilibrant vers l\'arrière. Base de nombreuses combinaisons.',
          '<strong>Seoi-nage (projection par l\'épaule)</strong> : projection en avant, très puissante. On passe sous l\'adversaire et on le projette par-dessus l\'épaule. Nécessite un bon placement.',
          '<strong>Tai-otoshi (chute du corps)</strong> : le pied droit bloque la jambe droite de l\'adversaire pendant qu\'on le projette en avant par rotation du buste. Applicable à toutes les morphologies.',
          '<strong>Uchi-mata (fauchage intérieur)</strong> : technique avancée très efficace à haut niveau. La jambe remonte entre les jambes de l\'adversaire pour le déséquilibrer vers l\'avant.',
          '<strong>De-ashi-barai (balayage du pied avancé)</strong> : technique de timing pur. On balaie le pied de l\'adversaire au moment où il avance, sans force excessive.'
        ]},
        { type: 'h2', text: 'Le kuzushi : le déséquilibre avant tout' },
        { type: 'p', text: 'En judo, aucune projection ne fonctionne sans kuzushi préalable (mise en déséquilibre). C\'est la première leçon du judo : avant de projeter, vous devez briser l\'équilibre de l\'adversaire. Attirer vers l\'avant, pousser vers l\'arrière, tirer latéralement... Le kuzushi est l\'art de trouver le moment et la direction où l\'adversaire est vulnérable.' },
        { type: 'h2', text: 'Uchi-komi : la clé de l\'apprentissage' },
        { type: 'p', text: 'L\'uchi-komi est la répétition du placement sans la projection finale. C\'est l\'exercice fondamental du judo. On entre dans la technique, on vérifie le placement, et on revient à la position initiale. 50 uchi-komis par technique et par séance permettent d\'ancrer le mouvement en mémoire musculaire sans fatiguer le partenaire.' },
        { type: 'h2', text: 'Randori : apprendre en situation' },
        { type: 'p', text: 'Le randori est le combat libre à l\'entraînement. C\'est là que les techniques apprises prennent vie — ou révèlent leurs lacunes. Un bon randori est un échange dynamique où les deux judokas cherchent à projeter en utilisant les déséquilibres créés par l\'adversaire. L\'objectif n\'est pas de gagner mais d\'apprendre.' }
      ],
      conclusion: 'Le judo, c\'est la technique qui prime sur la force. Concentrez-vous sur votre tokui-waza (technique préférée), maîtrisez-la dans tous ses détails, et construisez votre jeu autour d\'elle.'
    }
  },

  /* ─────────────────────────────────────────────
     KARATÉ
  ───────────────────────────────────────────── */
  {
    id:       'karate-kyokushin-guide',
    title:    'Kyokushin : le karaté de contact plein que vous ne connaissez pas vraiment',
    sport:    'karate',
    category: 'analyse',
    date:     'Février 2026',
    excerpt:  'Fondé par Mas Oyama, le kyokushin est l\'une des disciplines de striking les plus dures au monde. Contact plein au corps, sans gants, sans protections : l\'explication.',
    structured: {
      intro: 'Quand on entend "karaté", beaucoup imaginent des coups arrêtés avant l\'impact ou des démonstrations de katas devant un jury. Le kyokushin, lui, est tout le contraire : contact plein au corps, sans gants, parfois sans protections, jusqu\'au KO ou à l\'abandon.',
      sections: [
        { type: 'h2', text: 'Mas Oyama : le fondateur légendaire' },
        { type: 'p', text: 'Masutatsu Oyama (1923-1994) est l\'une des figures les plus légendaires de l\'histoire des arts martiaux. Né en Corée, il se forme au karaté Shotokan au Japon avant de passer 18 mois de retraite dans la montagne pour affiner sa technique. Il crée le style Kyokushin ("ultime vérité") en 1964. Sa légende inclut des combats contre 300 adversaires en 3 jours et des démonstrations de cassage de pierres et de cornes de taureau.' },
        { type: 'h2', text: 'Les règles spécifiques du kyokushin' },
        { type: 'ul', items: [
          'Contact plein autorisé au corps et aux jambes',
          'Coups au visage <strong>interdits avec les poings</strong> (autorisés avec les pieds en hauteur)',
          'Pas de gants : les poings sont bandés ou nus',
          'Victoire par KO, abandon ou décision des juges selon les points de knockdown',
          'Pas de prise de corps ni de projection en compétition pure kyokushin'
        ]},
        { type: 'h2', text: 'Pourquoi le kyokushin forme des combattants d\'élite' },
        { type: 'p', text: 'De nombreux champions de MMA et de Muay-Thaï ont une base kyokushin : Andy Hug, Francisco Filho, Semmy Schilt, Mirko Cro Cop, Georges St-Pierre. Le kyokushin développe une résistance physique et mentale exceptionnelle, une puissance de frappe redoutable et surtout la capacité à continuer à combattre malgré la douleur — qualité indispensable dans les sports de combat de haut niveau.' },
        { type: 'h2', text: 'Les épreuves de passage de grade en kyokushin' },
        { type: 'p', text: 'Les passages de grade en kyokushin incluent des katas (formes techniques), du kumite et des épreuves de cassage (tameshiwari). La ceinture noire exige notamment un test d\'endurance : 50 combats de deux minutes en 48 heures (100 man kumite). Cette épreuve légendaire a été accomplie par moins de 50 personnes dans l\'histoire du kyokushin.' }
      ],
      conclusion: 'Le kyokushin n\'est pas le karaté d\'école primaire. C\'est une discipline de combat exigeante, douloureuse et transformatrice, qui forge des combattants de caractère autant que de technique.'
    }
  },

  /* ─────────────────────────────────────────────
     KICKBOXING
  ───────────────────────────────────────────── */
  {
    id:       'kickboxing-debutant-guide',
    title:    'Kickboxing pour les nuls : tout comprendre avant de commencer',
    sport:    'kickboxing',
    category: 'guide-debutant',
    date:     'Mars 2026',
    excerpt:  'Quelle différence avec le muay-thaï ? K-1, full-contact, savate : les différentes formes de kickboxing expliquées. Par où commencer en 2026.',
    structured: {
      intro: 'Le terme "kickboxing" recouvre en réalité plusieurs disciplines aux règles distinctes. Comprendre ces différences avant de choisir votre club vous évitera de nombreuses confusions.',
      sections: [
        { type: 'h2', text: 'Kickboxing : un terme générique' },
        { type: 'p', text: 'Au sens large, le kickboxing désigne tout sport de frappe utilisant les poings et les pieds. Mais en pratique, le "kickboxing" recouvre plusieurs réglements distincts : le full-contact américain (coups de pied obligatoires au-dessus de la ceinture uniquement), le K-1 (règles autorisant les coups de genou), et le low-kick (autorisant les coups de pied bas). Chaque format a ses champions et ses événements de référence.' },
        { type: 'h2', text: 'Différences avec le muay-thaï' },
        { type: 'ul', items: [
          '<strong>Kickboxing K-1</strong> : poings, pieds, genoux autorisés. Pas de coudes, pas de clinch prolongé.',
          '<strong>Muay-Thaï</strong> : poings, pieds, genoux, coudes autorisés. Clinch exploité pour les genoux et coudes.',
          '<strong>Full-contact</strong> : poings et coups de pied au-dessus de la ceinture uniquement. Le plus restrictif.',
          '<strong>Low-kick</strong> : comme le full-contact + coups de pied bas aux cuisses autorisés.'
        ]},
        { type: 'h2', text: 'Que va-t-on apprendre en cours de kickboxing ?' },
        { type: 'ul', items: [
          'Garde et déplacements de base',
          'Les quatre coups de poing (jab, direct, crochet, uppercut)',
          'Coups de pied circulaires (roundhouse), frontaux (front kick), latéraux (side kick)',
          'Combinaisons poings-pieds',
          'Défenses : blocages, esquives, contres'
        ]},
        { type: 'h2', text: 'Pour qui est le kickboxing ?' },
        { type: 'p', text: 'Le kickboxing est une discipline extrêmement accessible. Il convient aux débutants qui souhaitent un sport de combat complet debout sans le travail au sol (BJJ, judo). C\'est aussi une excellente discipline de fitness : un entraînement de kickboxing brûle entre 600 et 900 kcal/heure tout en développant coordination, réflexes et confiance en soi.' }
      ],
      conclusion: 'Le kickboxing est une porte d\'entrée idéale dans les sports de combat. Il combine les plaisirs du sport de frappe avec une accessibilité immédiate pour tous les niveaux et tous les âges.'
    }
  },

  /* ─────────────────────────────────────────────
     GRAPPLING
  ───────────────────────────────────────────── */
  {
    id:       'grappling-no-gi-guide',
    title:    'Grappling no-gi : la discipline de combat au sol la plus dynamique',
    sport:    'grappling',
    category: 'guide-debutant',
    date:     'Janvier 2026',
    excerpt:  'Le grappling no-gi occupe une place de choix dans la préparation des combattants de MMA. Soumissions, positions, différences avec le BJJ : le guide complet.',
    structured: {
      intro: 'Le grappling no-gi est la version sans kimono du combat au sol. Plus rapide et plus dynamique que le BJJ en gi, il est devenu la référence pour préparer les combattants de MMA et constitue une discipline de compétition à part entière.',
      sections: [
        { type: 'h2', text: 'Qu\'est-ce que le grappling no-gi ?' },
        { type: 'p', text: 'Le grappling no-gi se pratique en short et rashguard, sans kimono. L\'absence de tissu à saisir change radicalement la dynamique : les prises de tissu (gi grips) disparaissent, remplacées par des contrôles de membres, de nuque et de corps. Les échanges sont plus rapides, les positions plus difficiles à maintenir.' },
        { type: 'h2', text: 'Techniques spécifiques au no-gi' },
        { type: 'ul', items: [
          '<strong>Heel hooks (clés de talon)</strong> : soumissions très efficaces visant les genoux et chevilles. Techniques avancées à apprendre avec un instructeur qualifié.',
          '<strong>Leg entanglement</strong> : système de contrôle des jambes (inside heel hook, outside heel hook, kneebar) développé notamment par John Danaher.',
          '<strong>Clinch wrestling</strong> : contrôle de la nuque et des poignets debout pour amener l\'adversaire au sol.',
          '<strong>Scrambles</strong> : situations chaotiques de transition où les deux combattants cherchent à s\'imposer. Vitesse et réactivité primordiales.'
        ]},
        { type: 'h2', text: 'Pourquoi le grappling no-gi pour le MMA ?' },
        { type: 'p', text: 'En MMA, le combat se déroule en short et rashguard — exactement comme en no-gi. Les techniques de gi (saisies de kimono) ne sont pas transposables. En revanche, le clinch wrestling, les takedowns, les soumissions no-gi et le ground and pound sont directement applicables en cage. Le grappling no-gi est donc l\'entraînement au sol le plus spécifique pour le MMA.' },
        { type: 'h2', text: 'Les compétitions de grappling no-gi' },
        { type: 'p', text: 'L\'ADCC (Abu Dhabi Combat Club) est la compétition de grappling no-gi la plus prestigieuse au monde. Organisée tous les deux ans, elle réunit l\'élite mondiale. D\'autres organisations comme EBI (Eddie Bravo Invitational) ou Polaris proposent des formats innovants avec overtime et submission-only. Ces événements ont révélé des athlètes comme Gordon Ryan, Craig Jones ou Garry Tonon.' }
      ],
      conclusion: 'Le grappling no-gi est une discipline complète et exigeante, idéale pour les pratiquants de MMA et pour tous ceux qui cherchent un sport de combat technique et physiquement intense sans la lenteur du kimono.'
    }
  },

  /* ─────────────────────────────────────────────
     ÉQUIPEMENT
  ───────────────────────────────────────────── */
  {
    id:       'choisir-protege-dents',
    title:    'Protège-dents pour la boxe : comment choisir en 2026',
    sport:    'equipement',
    category: 'guide-equipement',
    date:     'Mars 2026',
    excerpt:  'Thermoformable, sur mesure, double protection : quel protège-dents choisir selon votre discipline et votre budget ? Le comparatif complet.',
    structured: {
      intro: 'Le protège-dents est l\'équipement le moins glamour mais potentiellement le plus important des sports de combat. Une dent cassée, un KO atténué par une bonne protection : les conséquences d\'un mauvais choix sont directes sur votre santé.',
      sections: [
        { type: 'h2', text: 'Pourquoi le protège-dents est indispensable' },
        { type: 'p', text: 'Un protège-dents de qualité remplit trois fonctions : protéger les dents des impacts directs, absorber et redistribuer l\'énergie d\'un coup au visage (réduisant le risque de commotion), et éviter les coupures à l\'intérieur des lèvres et des joues. L\'absence de protège-dents en sparring est une négligence dangereuse pour vous et pour votre partenaire.' },
        { type: 'h2', text: 'Les trois types de protège-dents' },
        { type: 'ul', items: [
          '<strong>Protège-dents boil-and-bite (thermoformable)</strong> : plongé dans l\'eau chaude et moulé sur vos dents. Accessible (10 à 30 €), confortable si bien moulé. Recommandé pour débuter.',
          '<strong>Protège-dents sur mesure (dentiste)</strong> : fabriqué à partir d\'une empreinte de vos dents. Protection maximale, confort optimal. Prix : 100 à 300 €. Recommandé pour les pratiquants réguliers et les compétiteurs.',
          '<strong>Protège-dents double (haut et bas)</strong> : protège les deux mâchoires. Plus difficile à respirer. Utile en kickboxing et MMA pour le corps à corps.'
        ]},
        { type: 'h2', text: 'Comment bien mouler un protège-dents thermoformable' },
        { type: 'ol', items: [
          'Faites bouillir de l\'eau dans une casserole',
          'Plongez le protège-dents 30 à 60 secondes selon les instructions',
          'Sortez-le avec une fourchette, laissez refroidir 3 à 5 secondes',
          'Placez-le sur vos dents du haut, mordez fermement',
          'Aspirez pour créer le vide et appuyez avec les doigts depuis l\'extérieur',
          'Plongez dans l\'eau froide pour figer la forme'
        ]},
        { type: 'h2', text: 'Marques recommandées' },
        { type: 'ul', items: [
          '<strong>Venum Challenger</strong> : excellent rapport qualité/prix, ~15 €',
          '<strong>Shock Doctor Gel Max</strong> : référence en thermoformable, ~25 €',
          '<strong>OPRO Power Fit</strong> : très bonne tenue, ~20 €',
          '<strong>Oral-B sur mesure</strong> (dentiste) : protection maximale, ~150-250 €'
        ]}
      ],
      conclusion: 'Investissez dans un bon protège-dents dès le premier entraînement. C\'est l\'un des équipements les moins chers mais les plus importants de votre arsenal — votre dentiste vous remerciera.'
    }
  }

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
══════════════════════════════════════════════════════════ */
window.ARTICLES    = ARTICLES;
window.SPORTS_META = SPORTS_META;

/* ══════════════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════════════ */
(function validateArticles() {
  const slugs = new Set();
  _RAW_ARTICLES.forEach((a, index) => {
    if (!a.id || !a.title || !a.sport || !a.category || !a.date) {
      console.error(`❌ Article #${index} manque un champ obligatoire (id/title/sport/category/date)`);
    }
    if (slugs.has(a.id)) {
      console.error(`❌ ID dupliqué : "${a.id}" (index ${index})`);
    } else {
      slugs.add(a.id);
    }
    if (a.id && !/^[a-z0-9-]+$/.test(a.id)) {
      console.warn(`⚠️  ID "${a.id}" contient des caractères invalides`);
    }
    if (a.sport && !SPORTS_META[a.sport]) {
      console.warn(`⚠️  Sport inconnu "${a.sport}" dans l'article "${a.id}"`);
    }
    if (!a.content && !a.structured) {
      console.warn(`⚠️  Article "${a.id}" n'a ni "content" ni "structured"`);
    }
  });

  if (_RAW_ARTICLES.length === 0) {
    console.info('ℹ️  Front Kick — Aucun article dans _RAW_ARTICLES.');
  } else {
    console.log(`✅ Front Kick — ${ARTICLES.length} article(s) chargé(s)`);
  }
})();

/* ══════════════════════════════════════════════════════════
   API PUBLIQUE
══════════════════════════════════════════════════════════ */
window.getArticlesBySport = function (sportKeyOrLabel) {
  return window.ARTICLES.filter(a =>
    a.sport === sportKeyOrLabel || a.discipline === sportKeyOrLabel
  );
};
