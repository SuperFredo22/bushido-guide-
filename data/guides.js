/* ══════════════════════════════════════════════════════════════
   FRONT KICK — data/guides.js
   Guides pédagogiques complets par discipline.
   Utilisé par renderGuides() et renderGuideDetail() dans pages.js.

   STRUCTURE DE CHAQUE GUIDE :
   window.GUIDES[id] = {
     sport:  string   → nom affiché
     emoji:  string   → emoji de la discipline
     banner: string   → gradient CSS pour le bandeau
     toc:    string[] → titres de sections (sommaire)
     html:   string   → contenu HTML complet
   }
══════════════════════════════════════════════════════════════ */

window.GUIDES = {

  /* ════════════════════════════════════════════════════════
     MMA — Mixed Martial Arts
  ════════════════════════════════════════════════════════ */
  mma: {
    sport:  'MMA',
    emoji:  '🥊',
    banner: 'linear-gradient(135deg, #0F172A 0%, #1E88E5 100%)',
    toc: [
      'Introduction au MMA',
      'Origines et histoire',
      'Les bases techniques indispensables',
      'Équipement nécessaire pour débuter',
      'Erreurs fréquentes des débutants',
      'Conseils pour bien débuter',
      'FAQ débutant'
    ],
    html: `
<h2 id="g-s1">Introduction au MMA</h2>
<p>Le Mixed Martial Arts (MMA) est le sport de combat le plus complet au monde. Il combine des techniques issues de disciplines variées : boxe anglaise, muay-thaï, lutte, judo, jiu-jitsu brésilien et grappling. Un combattant de MMA doit être aussi à l'aise debout qu'au sol, capable de projeter son adversaire ou de le soumettre.</p>
<p>Contrairement aux idées reçues, le MMA n'est pas un sport brutal sans règles. Il s'agit d'une discipline codifiée, arbitrée, pratiquée par des athlètes de haut niveau. Les règles dites "Unified Rules" encadrent les compétitions professionnelles à travers le monde.</p>

<h2 id="g-s2">Origines et histoire</h2>
<p>Le MMA moderne trouve ses racines dans le Brésil des années 1920 avec le Vale Tudo ("tout est permis"), discipline extrêmement libre pratiquée par la famille Gracie. En 1993, le premier Ultimate Fighting Championship (UFC) est organisé à Denver pour déterminer quel art martial était le plus efficace. Royce Gracie, représentant du jiu-jitsu brésilien, domine le tournoi et révolutionne la vision des sports de combat.</p>
<p>Dans les années 2000, le MMA se structure : règles unifiées, catégories de poids, protection des combattants. L'UFC devient l'organisation de référence mondiale. En France, la discipline est officiellement reconnue par le ministère des Sports en 2020.</p>

<h2 id="g-s3">Les bases techniques indispensables</h2>
<p>Un pratiquant de MMA doit développer des compétences dans trois zones de combat :</p>
<ul>
  <li><strong>Debout (striking)</strong> : jab, direct, crochet, uppercut hérités de la boxe anglaise ; coups de pied circulaires, coups de genou du muay-thaï.</li>
  <li><strong>Corps à corps (clinch)</strong> : contrôle de la nuque, coups de genoux, projections issues du judo et du wrestling.</li>
  <li><strong>Au sol (ground)</strong> : passage en position dominante (mount, back control), soumissions (étranglements, clés articulaires) issues du BJJ.</li>
</ul>
<p>Pour un débutant, il est conseillé de se spécialiser d'abord dans une seule discipline (souvent boxe ou BJJ) avant d'élargir son arsenal. La plupart des clubs proposent des cours de MMA qui alternent les modules debout et sol.</p>

<h2 id="g-s4">Équipement nécessaire pour débuter</h2>
<ul>
  <li><strong>Gants de MMA</strong> (4 à 6 oz) ou gants de sparring (16 oz pour les entraînements avec partenaire)</li>
  <li><strong>Protège-dents</strong> : indispensable dès le premier entraînement</li>
  <li><strong>Coquille</strong> (protège-inguinal) pour les hommes</li>
  <li><strong>Shorts de MMA</strong> ou short de combat sans poches ni fermetures</li>
  <li><strong>Rashguard</strong> (sous-vêtement technique) pour le travail au sol</li>
  <li><strong>Protège-tibias</strong> pour le travail debout</li>
</ul>
<p>Budget de départ indicatif : 80 à 150 € pour un équipement correct. Évitez les kits complets bon marché qui se détériorent rapidement.</p>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Vouloir tout apprendre en même temps</strong> : le MMA est vaste. Concentrez-vous sur une ou deux disciplines de base les premiers mois.</li>
  <li><strong>Négliger la condition physique</strong> : un combat de MMA est extrêmement physique. L'endurance cardiovasculaire est aussi importante que la technique.</li>
  <li><strong>Sauter le sparring trop tôt</strong> : pratiquer le sparring avant d'avoir assimilé les bases de défense expose à des blessures inutiles.</li>
  <li><strong>Ignorer le travail au sol</strong> : beaucoup de débutants n'aiment pas le grappling. C'est pourtant là que se décident la majorité des combats.</li>
  <li><strong>Mauvaise hygiène</strong> : couper ses ongles, porter une tenue propre et se doucher après chaque entraînement sont des règles non négociables.</li>
</ul>

<h2 id="g-s6">Conseils pour bien débuter</h2>
<ul>
  <li>Choisissez un club avec des cours dédiés aux débutants et des coachs diplômés (DEJEPS ou équivalent).</li>
  <li>Venez régulièrement : deux à trois séances par semaine sont idéales pour progresser sans surmenage.</li>
  <li>Travaillez votre mobilité et votre souplesse en dehors des entraînements.</li>
  <li>Suivez les grandes compétitions (UFC, Bellator, PFL) pour observer les techniques en situation réelle.</li>
  <li>Soyez patient : les premières semaines sont difficiles. La progression devient visible après deux à trois mois de pratique régulière.</li>
</ul>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  <h2 id="g-s7">FAQ débutant</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Quel âge pour commencer le MMA ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Il n'y a pas de limite d'âge. Des cours adaptés existent pour les enfants dès 6-7 ans. Pour les adultes, on peut commencer à tout âge, même après 40 ans, en ajustant l'intensité de l'entraînement à sa condition physique.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Le MMA est-il dangereux pour un débutant ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Comme tout sport de combat, le MMA comporte des risques. Dans un club sérieux, les entraînements sont progressifs et le sparring est contrôlé. Les blessures graves sont rares en salle d'entraînement lorsque les consignes de sécurité sont respectées.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Faut-il avoir une base en arts martiaux pour commencer le MMA ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Non. La grande majorité des clubs de MMA acceptent des débutants complets. Avoir une base en boxe, judo ou BJJ est un avantage, mais ce n'est pas une condition préalable.</div>
    </div>
  </div>
</div>
`
  },

  /* ════════════════════════════════════════════════════════
     BOXE ANGLAISE
  ════════════════════════════════════════════════════════ */
  boxe: {
    sport:  'Boxe anglaise',
    emoji:  '🥊',
    banner: 'linear-gradient(135deg, #7f1d1d 0%, #DC2626 100%)',
    toc: [
      'Introduction à la boxe anglaise',
      'Histoire et évolution',
      'Les quatre coups fondamentaux',
      'Équipement nécessaire',
      'Erreurs fréquentes des débutants',
      'Conseils pour progresser',
      'FAQ débutant'
    ],
    html: `
<h2 id="g-s1">Introduction à la boxe anglaise</h2>
<p>La boxe anglaise est l'un des sports de combat les plus pratiqués au monde. Art de deux siècles, elle repose sur un principe simple : toucher sans être touché. Deux adversaires s'affrontent à coups de poing, en utilisant leur mobilité, leur esquive et leur sens tactique.</p>
<p>Sport olympique depuis 1904, la boxe développe des qualités exceptionnelles : endurance cardiovasculaire, coordination, réflexes, gestion du stress et confiance en soi. Elle est accessible à tous les âges et tous les niveaux physiques.</p>

<h2 id="g-s2">Histoire et évolution</h2>
<p>La boxe codifiée naît en Angleterre au XVIIIe siècle. Jack Broughton établit en 1743 les premières règles écrites. En 1867, le marquis de Queensberry définit les règles modernes : rounds de trois minutes, port des gants, interdiction des coups bas.</p>
<p>Au XXe siècle, la boxe produit des légendes planétaires : Muhammad Ali, Joe Frazier, Sugar Ray Leonard, Mike Tyson, puis Floyd Mayweather et Canelo Álvarez. En France, la boxe a ses propres héros : Marcel Cerdan, champion du monde des moyens en 1948, reste une figure emblématique.</p>

<h2 id="g-s3">Les quatre coups fondamentaux</h2>
<p>Toute la boxe anglaise repose sur quatre coups de base, appris en position de garde :</p>
<ul>
  <li><strong>Le jab</strong> : coup direct du poing avant, rapide et léger. Sert à maintenir la distance, à mesurer l'adversaire et à créer des combinaisons.</li>
  <li><strong>Le direct (cross)</strong> : coup puissant du poing arrière, lancé en rotation des hanches. Principal coup de KO à longue distance.</li>
  <li><strong>Le crochet (hook)</strong> : coup latéral, bras fléchi à 90°. Très puissant, il cible la tempe ou le menton.</li>
  <li><strong>L'uppercut</strong> : coup ascendant destiné au menton ou au corps. Efficace dans les échanges rapprochés.</li>
</ul>
<p>Les combinaisons classiques : jab-direct (1-2), jab-direct-crochet (1-2-3), jab-crochet-direct (1-3-2). Ces enchaînements constituent la base de tout travail aux mitaines et au sac.</p>

<h2 id="g-s4">Équipement nécessaire</h2>
<ul>
  <li><strong>Gants de boxe</strong> : 12 oz pour les femmes, 14 ou 16 oz pour les hommes en sparring. 8 à 10 oz pour la compétition.</li>
  <li><strong>Bandes de boxe</strong> : protègent les poignets et les articulations. 2,5 m suffisent pour débuter.</li>
  <li><strong>Protège-dents</strong> : obligatoire dès que vous montez au sac ou faites du sparring.</li>
  <li><strong>Coquille</strong> pour les hommes lors du sparring.</li>
  <li><strong>Casque</strong> : recommandé pour le sparring, surtout les premiers mois.</li>
  <li><strong>Chaussures de boxe</strong> (optionnel pour débuter, important pour la compétition).</li>
</ul>
<p>Budget indicatif : 60 à 120 € pour un équipement de départ complet. Des marques comme Venum, Everlast ou Fairtex offrent un bon rapport qualité/prix.</p>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Garder les bras baissés</strong> : la garde haute protège le menton et les tempes. Ramenez systématiquement les gants vers le visage après chaque coup.</li>
  <li><strong>Négliger le jab</strong> : le jab est le coup le plus important de la boxe. Beaucoup de débutants le trouvent trop léger et se concentrent sur le direct. Erreur : un bon jab crée toutes les opportunités.</li>
  <li><strong>S'appuyer en arrière</strong> : reculer en penchant le buste en arrière expose le menton. Apprenez à esquiver en pivotant ou en vous baissant.</li>
  <li><strong>Frapper avec les doigts</strong> : la frappe doit être réalisée avec les deux premières phalanges (index et majeur). Serrez bien le poing à l'impact.</li>
  <li><strong>Retenir sa respiration</strong> : expirez à chaque frappe. Cela donne de la puissance et évite de se couper le souffle.</li>
</ul>

<h2 id="g-s6">Conseils pour progresser</h2>
<ul>
  <li>Travaillez la corde à sauter : c'est l'outil de conditionnement numéro un des boxeurs. Dix minutes par séance suffisent pour débuter.</li>
  <li>Pratiquez le shadow boxing devant un miroir : vous corrigerez naturellement votre garde et vos déplacements.</li>
  <li>Ne négligez pas le travail au sac de frappe : il développe la puissance, le timing et l'endurance musculaire.</li>
  <li>Regardez des combats analysés : observer les grands champions en comprenant leurs tactiques accélère énormément la progression.</li>
  <li>La régularité prime sur l'intensité : deux séances par semaine pendant six mois valent mieux qu'une semaine intense suivie d'une longue pause.</li>
</ul>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  <h2 id="g-s7">FAQ débutant</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Faut-il être musclé pour bien boxer ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Non. La puissance en boxe vient de la technique et de la rotation des hanches, pas de la masse musculaire. Un boxeur technique et léger peut frapper bien plus fort qu'un pratiquant musclé mais sans technique.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">En combien de temps apprend-on les bases ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Avec deux à trois séances par semaine, les quatre coups fondamentaux et la garde de base sont assimilés en 4 à 6 semaines. La maîtrise réelle des combinaisons et des esquives demande plusieurs mois de pratique régulière.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">La boxe anglaise est-elle efficace en self-défense ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Oui, c'est l'une des disciplines les plus efficaces debout. La gestion des distances, les esquives et la puissance de frappe développées en boxe sont directement transposables en situation réelle.</div>
    </div>
  </div>
</div>
`
  },

  /* ════════════════════════════════════════════════════════
     MUAY-THAÏ
  ════════════════════════════════════════════════════════ */
  muay: {
    sport:  'Muay-Thaï',
    emoji:  '🦵',
    banner: 'linear-gradient(135deg, #78350f 0%, #F59E0B 100%)',
    toc: [
      'Introduction au Muay-Thaï',
      'Histoire et culture thaïlandaise',
      'Les 8 armes du Muay-Thaï',
      'Équipement nécessaire',
      'Erreurs fréquentes des débutants',
      'Conseils pour progresser',
      'FAQ débutant'
    ],
    html: `
<h2 id="g-s1">Introduction au Muay-Thaï</h2>
<p>Le Muay-Thaï, ou "boxe thaïlandaise", est l'art martial national de la Thaïlande. Surnommé "l'art des huit membres" en référence aux deux poings, deux pieds, deux coudes et deux genoux utilisés comme armes, il est reconnu comme l'une des disciplines de combat debout les plus complètes et les plus redoutables au monde.</p>
<p>Pratiqué depuis des siècles par les guerriers thaïlandais, le Muay-Thaï a connu une internationalisation spectaculaire depuis les années 1980. Aujourd'hui, c'est l'une des disciplines de base de tout combattant de MMA sérieux.</p>

<h2 id="g-s2">Histoire et culture thaïlandaise</h2>
<p>Les origines du Muay-Thaï remontent au Muay Boran, art martial ancien des royaumes thaïlandais. Pratiqué sur les champs de bataille, il permettait aux soldats de combattre à mains nues quand leurs armes étaient perdues. Le roi Naresuan (1555-1605) fut l'un de ses premiers champions légendaires.</p>
<p>Au XXe siècle, le sport se codifie : ring, gants, rounds minutés, règles arbitrées. Le stade Lumpinee à Bangkok, construit en 1956, devient le temple mondial de la discipline. Des champions comme Saenchai, Buakaw et Yodsanklai projettent le Muay-Thaï sur la scène internationale.</p>
<p>Le Wai Kru Ram Muay, la danse rituelle exécutée avant chaque combat, est un hommage aux enseignants et aux ancêtres. Elle fait partie intégrante de la tradition et est respectée même par les combattants étrangers.</p>

<h2 id="g-s3">Les 8 armes du Muay-Thaï</h2>
<p>Contrairement à la boxe anglaise limitée aux poings, le Muay-Thaï utilise l'intégralité du corps :</p>
<ul>
  <li><strong>Les poings</strong> : jab, direct, crochet, uppercut — similaires à la boxe anglaise.</li>
  <li><strong>Les coudes</strong> : armes redoutables et distinctives. Coup de coude horizontal, diagonal, ascendant, en rotation. Tranchants, ils provoquent fréquemment des coupures.</li>
  <li><strong>Les genoux</strong> : en clinch ou sautés. Le genou droit est particulièrement dévastateur pour le corps et la tête.</li>
  <li><strong>Les pieds</strong> : coup de pied circulaire (roundhouse kick) avec le tibia — arme principale —, coup de pied frontal (teep) pour maintenir la distance, coup de pied latéral.</li>
</ul>
<p>Le clinch (corps à corps) est une spécificité du Muay-Thaï. Contrairement à d'autres disciplines où le clinch est rompu par l'arbitre, il est exploité pour placer des genoux et des coudes dévastateurs.</p>

<h2 id="g-s4">Équipement nécessaire</h2>
<ul>
  <li><strong>Gants de Muay-Thaï</strong> : 10 à 12 oz pour les femmes, 14 à 16 oz pour les hommes. Préférez des gants avec pouce attaché.</li>
  <li><strong>Bandes de boxe</strong> : 2,5 à 4 m pour bien envelopper poignets et mains.</li>
  <li><strong>Protège-tibias</strong> : indispensables dès le début. Les tibias s'endurcissent avec l'entraînement, mais la protection reste nécessaire.</li>
  <li><strong>Protège-dents</strong> et <strong>coquille</strong>.</li>
  <li><strong>Short de Muay-Thaï</strong> : coupe spécifique permettant les coups de pied hauts. Évitez les shorts de surf trop longs.</li>
  <li><strong>Mongkon</strong> (bandeau de tête rituel) : optionnel, porté lors des cérémonies.</li>
</ul>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Frapper avec le pied plutôt que le tibia</strong> : en Muay-Thaï, le roundhouse kick s'exécute avec le tibia, pas le coup-de-pied. La différence est fondamentale pour la puissance et la sécurité.</li>
  <li><strong>Négliger le teep</strong> : le coup de pied frontal est la base du jeu de distance en Muay-Thaï. Beaucoup de débutants ne le travaillent pas assez.</li>
  <li><strong>Éviter le clinch</strong> : le corps à corps fait peur aux débutants. C'est pourtant là que se jouent souvent les combats thaïlandais.</li>
  <li><strong>Oublier de conditionner ses tibias</strong> : frapper régulièrement les sacs et les coussinets endurcit progressivement les tibias. Ne sautez pas cette étape.</li>
  <li><strong>Mauvaise rotation des hanches</strong> : la puissance des coups de pied vient de la rotation complète du bassin. Un pied sans rotation des hanches perd 70 % de sa puissance.</li>
</ul>

<h2 id="g-s6">Conseils pour progresser</h2>
<ul>
  <li>Travaillez les padworks (mitaines thaïlandaises) avec votre coach : c'est l'outil numéro un de progression en Muay-Thaï.</li>
  <li>Entraînez-vous pieds nus sur la surface du ring pour développer les appuis et la proprioception.</li>
  <li>Regardez des combats de Muay-Thaï authentiques (stade Lumpinee, ONE Championship) pour vous imprégner du style.</li>
  <li>La souplesse est clé : intégrez des étirements quotidiens pour atteindre progressivement les coups de pied hauts.</li>
  <li>Si possible, partez un mois en stage en Thaïlande après votre première année. C'est une expérience transformatrice.</li>
</ul>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  <h2 id="g-s7">FAQ débutant</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Le Muay-Thaï est-il adapté aux femmes ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Absolument. Le Muay-Thaï est l'une des disciplines de combat les plus pratiquées par les femmes en Europe. Il développe la confiance en soi, la coordination et la forme physique. Des championnes comme Stamp Fairtex ou Anissa Meksen sont des modèles inspirants.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Combien de temps avant le premier combat amateur ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">En moyenne, 12 à 18 mois de pratique régulière (3 séances/semaine) sont nécessaires avant de monter sur un ring amateur. Certains clubs organisent des interclubs plus tôt, dans un cadre encadré et bienveillant.</div>
    </div>
  </div>
</div>
`
  },

  /* ════════════════════════════════════════════════════════
     BJJ — Brazilian Jiu-Jitsu
  ════════════════════════════════════════════════════════ */
  bjj: {
    sport:  'BJJ',
    emoji:  '🤼',
    banner: 'linear-gradient(135deg, #1e3a8a 0%, #3B82F6 100%)',
    toc: [
      'Introduction au BJJ',
      'Histoire : des Gracie à l\'UFC',
      'Concepts fondamentaux',
      'Équipement nécessaire',
      'Erreurs fréquentes des débutants',
      'Conseils pour progresser',
      'FAQ débutant'
    ],
    html: `
<h2 id="g-s1">Introduction au BJJ</h2>
<p>Le Brazilian Jiu-Jitsu (BJJ) est un art martial de combat au sol dont la philosophie centrale est que la technique peut permettre à une personne de petite taille de maîtriser et soumettre un adversaire plus grand et plus fort. En utilisant la mécanique du corps, les leviers et les étranglements, le BJJ offre des outils d'une redoutable efficacité en self-défense comme en compétition.</p>
<p>Discipline phare du MMA moderne, le BJJ a transformé l'approche de tous les sports de combat depuis les années 1990. Apprendre le BJJ, c'est apprendre à "jouer aux échecs avec son corps".</p>

<h2 id="g-s2">Histoire : des Gracie à l'UFC</h2>
<p>Le BJJ est né de l'adaptation du judo par la famille Gracie à partir des années 1920 au Brésil. Mitsuyo Maeda, judoka japonais installé à Belém, transmet ses connaissances à Carlos Gracie qui développe avec ses frères un style orienté vers l'efficacité au sol. Hélio Gracie, plus petit et moins athlétique, affine les techniques de levier pour les rendre accessibles à tous.</p>
<p>La famille Gracie défie publiquement les représentants d'autres disciplines dans les "Gracie Challenges". Royce Gracie, en remportant les premiers tournois UFC en 1993-1994 face à des adversaires plus lourds et plus musclés, démontre au monde entier la supériorité du BJJ au sol.</p>
<p>Aujourd'hui, le BJJ se pratique en gi (kimono) ou en no-gi (short et rashguard). Il dispose de ses propres compétitions mondiales (ADCC, IBJJF) et d'une culture communautaire forte.</p>

<h2 id="g-s3">Concepts fondamentaux</h2>
<p>Le BJJ s'articule autour de plusieurs concepts clés que tout débutant doit assimiler :</p>
<ul>
  <li><strong>Positions dominantes</strong> : mount (à cheval sur l'adversaire), back control (dans le dos), side control (côté), guard (entre les jambes de l'adversaire).</li>
  <li><strong>Sweeps (renversements)</strong> : techniques pour passer de la position inférieure à la position supérieure.</li>
  <li><strong>Passages de garde</strong> : techniques pour sortir de la garde adverse et accéder à une position dominante.</li>
  <li><strong>Soumissions</strong> : étranglements (rear naked choke, triangle, guillotine) et clés articulaires (kimura, americana, armbar).</li>
  <li><strong>Tap out</strong> : taper deux fois sur l'adversaire ou le tapis pour signifier la soumission. Règle absolue de sécurité.</li>
</ul>
<p>Le principe de "position avant soumission" est fondamental : établissez d'abord une position dominante avant de chercher à finir le combat.</p>

<h2 id="g-s4">Équipement nécessaire</h2>
<ul>
  <li><strong>Gi (kimono)</strong> : veste épaisse, pantalon renforcé et ceinture. Préférez un gi de qualité (Fuji, Tatami, Shoyoroll) plutôt qu'un kimono de judo trop épais.</li>
  <li><strong>Rashguard</strong> : sous-vêtement technique obligatoire sous le gi et indispensable en no-gi. Protège des frottements et de l'hygiène.</li>
  <li><strong>Short de grappling ou spat</strong> (collant court) pour le no-gi.</li>
  <li><strong>Protège-dents</strong> : recommandé pour l'entraînement avec partenaire.</li>
  <li><strong>Hygiène absolue</strong> : ongles coupés courts, tenue propre à chaque séance, douche après l'entraînement. Le respect des partenaires en dépend.</li>
</ul>
<p>Budget gi de départ : 60 à 100 €. Un rashguard correct coûte entre 30 et 60 €.</p>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Forcer avec la force physique</strong> : le BJJ repose sur la technique et les leviers. Un débutant qui force rate l'essentiel de la discipline et se fatigue inutilement.</li>
  <li><strong>Résister à la soumission</strong> : taper à temps évite les blessures. Jamais de honte à soumettre — cela fait partie de l'apprentissage.</li>
  <li><strong>Négliger la défense de garde</strong> : beaucoup de débutants cherchent à attaquer. Apprendre à conserver sa garde et à empêcher le passage est tout aussi important.</li>
  <li><strong>S'entraîner uniquement avec des débutants</strong> : rouler (sparring BJJ) régulièrement avec des ceintures plus avancées accélère considérablement la progression.</li>
  <li><strong>Ignorer les détails</strong> : en BJJ, un centimètre de position peut changer l'issue d'une technique. Soyez attentif aux détails techniques de votre coach.</li>
</ul>

<h2 id="g-s6">Conseils pour progresser</h2>
<ul>
  <li>Prenez des notes après chaque séance : les techniques apprises s'oublient vite. Un carnet ou une application de notes est très utile.</li>
  <li>Pratiquez le drilling (répétition à vide) : 10 minutes de répétitions techniques par séance consolident les automatismes.</li>
  <li>Regardez des tutoriels de qualité (Bernardo Faria, John Danaher, Gordon Ryan) pour approfondir les concepts vus en cours.</li>
  <li>Soyez régulier : 3 séances par semaine valent mieux que 6 séances une semaine et une absence d'un mois ensuite.</li>
  <li>Acceptez les défaites en sparring avec humilité. Chaque soumission reçue est une leçon gratuite.</li>
</ul>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  <h2 id="g-s7">FAQ débutant</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Combien de temps pour obtenir la ceinture bleue en BJJ ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">En moyenne, 1,5 à 2 ans de pratique régulière (3 séances/semaine) sont nécessaires pour obtenir la ceinture bleue. La progression en BJJ est lente et délibérée : une ceinture noire représente généralement 10 ans de pratique assidue.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Gi ou no-gi pour débuter ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Le gi est recommandé pour débuter car il ralentit les échanges et permet d'apprendre les détails techniques. Il développe également une sensibilité aux prises de tissu très utile. Le no-gi est plus dynamique et plus proche du grappling de MMA. Idéalement, pratiquez les deux.</div>
    </div>
  </div>
</div>
`
  },

  /* ════════════════════════════════════════════════════════
     JUDO
  ════════════════════════════════════════════════════════ */
  judo: {
    sport:  'Judo',
    emoji:  '🥋',
    banner: 'linear-gradient(135deg, #1a1a1a 0%, #4B5563 100%)',
    toc: [
      'Introduction au judo',
      'Jigoro Kano et les origines',
      'Techniques fondamentales',
      'Équipement nécessaire',
      'Erreurs fréquentes des débutants',
      'Conseils pour progresser',
      'FAQ débutant'
    ],
    html: `
<h2 id="g-s1">Introduction au judo</h2>
<p>Le judo, dont le nom signifie "voie de la souplesse" en japonais, est un art martial et sport de combat fondé sur le principe de céder pour mieux vaincre. Plutôt que de résister à la force de l'adversaire, le judoka utilise son élan et son déséquilibre pour le projeter ou l'immobiliser.</p>
<p>Sport olympique depuis les Jeux de Tokyo 1964, le judo est l'un des sports de combat les plus pratiqués dans le monde avec plus de 40 millions de pratiquants. En France, c'est historiquement le premier sport de combat par le nombre de licenciés.</p>

<h2 id="g-s2">Jigoro Kano et les origines</h2>
<p>Le judo est créé en 1882 par Jigoro Kano, intellectuel japonais qui souhaite transformer le jujutsu — art martial brutal des samouraïs — en une discipline sportive et éducative accessible à tous. Son école, le Kodokan à Tokyo, devient rapidement la référence mondiale.</p>
<p>Kano supprime les techniques les plus dangereuses du jujutsu et introduit le concept d'ukemi (chutes), permettant la pratique à intensité maximale sans blessure grave. Sa philosophie, le Jita Kyoei ("prospérité mutuelle") et le Seiryoku Zenyo ("utilisation optimale de l'énergie"), transcende le simple combat.</p>
<p>En France, le judo est introduit dans les années 1930. Des champions comme David Douillet, Teddy Riner et Clarisse Agbégnénou ont porté le judo tricolore au sommet mondial.</p>

<h2 id="g-s3">Techniques fondamentales</h2>
<p>Le judo se divise en plusieurs catégories de techniques :</p>
<ul>
  <li><strong>Tachi-waza (projections debout)</strong> : O-soto-gari (grand fauchage extérieur), Seoi-nage (projection par l'épaule), Tai-otoshi (chute du corps), Uchi-mata (fauchage intérieur).</li>
  <li><strong>Ne-waza (travail au sol)</strong> : kesa-gatame (immobilisation écharpe), osaekomi-waza (maintiens), étranglements (hadaka-jime), clés de bras (juji-gatame).</li>
  <li><strong>Ukemi (chutes)</strong> : maîtrise des chutes avant (mae ukemi), arrière (ushiro ukemi) et latérales (yoko ukemi). Base absolue de sécurité à apprendre avant toute technique.</li>
</ul>
<p>Un ippon (point parfait) peut être marqué par une projection nette sur le dos, une immobilisation de 20 secondes ou une soumission acceptée par l'adversaire.</p>

<h2 id="g-s4">Équipement nécessaire</h2>
<ul>
  <li><strong>Judogi (kimono de judo)</strong> : veste épaisse, pantalon renforcé et ceinture blanche pour débuter. Le judogi doit être suffisamment résistant pour supporter les saisies. Marques recommandées : Adidas, Mizuno, Ippon Gear.</li>
  <li><strong>Ceinture blanche</strong> : fournie avec le judogi ou achetée séparément.</li>
  <li><strong>Tenue propre à chaque séance</strong> : le respect du partenaire et de la salle est fondamental.</li>
  <li>La pratique se fait pieds nus sur le tatami. Aucune chaussure n'est nécessaire.</li>
</ul>
<p>Budget : 40 à 80 € pour un judogi de qualité correcte. Les clubs prêtent parfois un judogi aux tout premiers cours.</p>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Négliger les ukemi</strong> : apprendre à tomber correctement n'est pas optionnel. Une mauvaise chute peut entraîner des blessures sérieuses. Passez le temps qu'il faut sur les ukemi.</li>
  <li><strong>Résister au lieu de fluer</strong> : le judo est une discipline de fluidité. Résister frontalement à une technique adverse épuise et fait rater les contres.</li>
  <li><strong>Mauvaise posture</strong> : une posture droite, légèrement fléchie sur les genoux, est fondamentale pour les déplacements et les projections.</li>
  <li><strong>Ignorer le ne-waza</strong> : beaucoup de judokas débutants négligent le travail au sol. C'est une erreur : de nombreux combats se décident au sol.</li>
  <li><strong>Prises trop rigides</strong> : serrer trop fort épuise les avants-bras rapidement. Apprenez à saisir juste ce qu'il faut, au bon moment.</li>
</ul>

<h2 id="g-s6">Conseils pour progresser</h2>
<ul>
  <li>Assistez aux cours régulièrement et participez aux compétitions dès que votre professeur vous l'autorise : même une défaite en compétition est un formidable accélérateur de progression.</li>
  <li>Travaillez votre Uchi-komi (répétitions de placements sans projection) : c'est l'exercice fondamental du judo.</li>
  <li>Développez un tokui-waza (technique préférée) que vous maîtrisez mieux que toutes les autres.</li>
  <li>La force physique aide, mais la technique prime toujours. Regardez Teddy Riner : sa domination repose sur une technique irréprochable autant que sur sa morphologie.</li>
</ul>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  <h2 id="g-s7">FAQ débutant</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">À quel âge commencer le judo ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Le judo est idéalement commencé entre 5 et 8 ans, mais des adultes débutent à 40 ans ou plus avec d'excellents résultats. L'importante communauté de pratiquants adultes en France montre que le judo est accessible tout au long de la vie.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Le judo est-il utile pour le MMA ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Oui. Les projections du judo sont parmi les plus spectaculaires et les plus efficaces en MMA. Des combattants comme Ronda Rousey ou Fedor Emelianenko ont démontré la redoutable efficacité du judo en cage. Le travail au sol du judo complète très bien le BJJ.</div>
    </div>
  </div>
</div>
`
  },

  /* ════════════════════════════════════════════════════════
     KARATÉ
  ════════════════════════════════════════════════════════ */
  karate: {
    sport:  'Karaté',
    emoji:  '🥋',
    banner: 'linear-gradient(135deg, #0a2a1a 0%, #059669 100%)',
    toc: [
      'Introduction au karaté',
      'Histoire et styles principaux',
      'Katas et kumite : les deux piliers',
      'Équipement nécessaire',
      'Erreurs fréquentes des débutants',
      'Conseils pour progresser',
      'FAQ débutant'
    ],
    html: `
<h2 id="g-s1">Introduction au karaté</h2>
<p>Le karaté, dont le nom signifie "main vide" en japonais, est un art martial de frappe originaire de l'île d'Okinawa. Il utilise poings, pieds, coudes, genoux et même la tête pour frapper des points vitaux de l'adversaire. Sport olympique depuis les Jeux de Tokyo 2021, il compte plus de 100 millions de pratiquants dans le monde.</p>
<p>Contrairement aux idées reçues héritées des films et des cours scolaires, le karaté de compétition ou le karaté traditionnel avancé est une discipline exigeante, complète et très efficace en combat.</p>

<h2 id="g-s2">Histoire et styles principaux</h2>
<p>Le karaté se développe à Okinawa, île soumise à des occupations successives qui ont interdit le port d'armes. Les habitants développent des techniques de combat à mains nues issues d'arts martiaux chinois (kung-fu) mélangés à des techniques locales. Au XXe siècle, des maîtres comme Gichin Funakoshi (fondateur du Shotokan) introduisent le karaté au Japon.</p>
<p>Les quatre styles principaux reconnus par la World Karate Federation sont :</p>
<ul>
  <li><strong>Shotokan</strong> : style le plus répandu en Occident, postures basses et puissantes.</li>
  <li><strong>Goju-ryu</strong> : mélange de techniques dures (go) et douces (ju), proche des arts chinois.</li>
  <li><strong>Shito-ryu</strong> : très riche en katas, héritier direct des traditions d'Okinawa.</li>
  <li><strong>Wado-ryu</strong> : influence judo importante, plus fluide dans ses déplacements.</li>
</ul>
<p>Le kyokushinkai (fondé par Mas Oyama) et ses dérivés (knockdown karate) pratiquent un contact plein au corps, sans protection, ce qui en fait une des disciplines de striking les plus dures.</p>

<h2 id="g-s3">Katas et kumite : les deux piliers</h2>
<p>Le karaté s'articule autour de deux pratiques complémentaires :</p>
<ul>
  <li><strong>Le kata</strong> : séquences codifiées de techniques enchaînées seul, contre des adversaires imaginaires. Il en existe des centaines, allant des plus simples (Heian Shodan) aux plus complexes (Unsu, Kanku-Sho). Le kata développe la puissance, la précision, l'équilibre et la mémoire musculaire. Il est valorisé en compétition avec les juges.</li>
  <li><strong>Le kumite</strong> : combat en duel, réel ou semi-contact selon la pratique. Le kumite olympique se pratique en semi-contact avec protections. Le kyokushin en knockdown se pratique en contact plein au corps.</li>
</ul>
<p>Le débat "kata vs kumite" est interne au karaté depuis des décennies. La réalité est que les deux disciplines se nourrissent mutuellement pour un pratiquant complet.</p>

<h2 id="g-s4">Équipement nécessaire</h2>
<ul>
  <li><strong>Karategi (kimono de karaté)</strong> : plus léger que le judogi, il existe en version kata (plus ample) et kumite (plus ajusté). Marques : Tokaido, Shureido, Hayashi.</li>
  <li><strong>Ceinture blanche</strong> pour débuter.</li>
  <li><strong>Protège-pieds</strong> et <strong>protège-mains</strong> pour le kumite semi-contact.</li>
  <li><strong>Protège-dents</strong> et <strong>coquille</strong> pour les hommes.</li>
  <li><strong>Casque</strong> pour le kumite débutant.</li>
</ul>
<p>Budget de départ : 50 à 90 € pour un karategi correct. Les protections sont souvent fournies ou prêtées par le club les premiers mois.</p>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Bâcler les kihon (fondamentaux)</strong> : les techniques de base — postures, déplacements, coups — doivent être impeccables avant de passer aux katas et au kumite. La qualité d'exécution prime toujours.</li>
  <li><strong>Mauvais kiai</strong> : le kiai (cri) accompagne chaque frappe pour synchroniser respiration, puissance et focalisation. Un kiai timide trahit un manque de conviction technique.</li>
  <li><strong>Relâcher la garde après la frappe</strong> : en kumite, une frappe sans retrait immédiat expose à un contre. La main doit revenir en garde instantanément.</li>
  <li><strong>Ignorer le zanshin</strong> : le zanshin est l'état de vigilance maintenu après la technique. C'est une notion philosophique et tactique centrale.</li>
  <li><strong>Confondre vitesse et précipitation</strong> : la vitesse en karaté vient de la détente musculaire, pas de la précipitation. Travaillez lentement et précisément avant de chercher la rapidité.</li>
</ul>

<h2 id="g-s6">Conseils pour progresser</h2>
<ul>
  <li>Pratiquez les kihon seul à la maison : 15 minutes de répétitions quotidiennes font une énorme différence sur l'assimilation des techniques.</li>
  <li>Cherchez un dojo avec un sensei diplômé (DAN reconnu) et une ambiance bienveillante.</li>
  <li>Participez aux compétitions régionales dès la ceinture jaune ou orange : l'expérience du kumite en compétition est irremplaçable.</li>
  <li>Explorez les aspects philosophiques du karaté (Dojo Kun, Niju Kun de Funakoshi) : ils donnent un sens profond à la pratique au-delà du seul combat.</li>
</ul>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  <h2 id="g-s7">FAQ débutant</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Le karaté est-il efficace en combat réel ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">Oui, à condition de pratiquer le kumite régulièrement et avec contact. Un karateïste de knockdown (kyokushin) ou de karaté de contact plein développe des capacités de frappe très efficaces. Le karaté "de vitrine" sans sparring réel est en revanche peu transposable en situation réelle.</div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Comment progressent les ceintures en karaté ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">La progression standard (Shotokan) va de la ceinture blanche (débutant) jusqu'à la noire en passant par jaune, orange, verte, bleue et marron. Chaque grade est validé lors d'examens (passages de grade) qui évaluent kihon, katas et kumite. La ceinture noire représente généralement 4 à 6 ans de pratique sérieuse.</div>
    </div>
  </div>
</div>
`
  },

  /* ════════════════════════════════════════════════════════
     SAVATE
  ════════════════════════════════════════════════════════ */
  savate: {
    sport:  'Savate',
    emoji:  '👟',
    banner: 'linear-gradient(135deg, #0c1a2e 0%, #0284C7 100%)',
    toc: [
      'Introduction à la savate',
      'Histoire de la boxe française',
      'Techniques spécifiques',
      'Équipement nécessaire',
      'Erreurs fréquentes des débutants',
      'Conseils pour progresser'
    ],
    html: `
<h2 id="g-s1">Introduction à la savate</h2>
<p>La savate, ou boxe française, est un art martial de combat debout né en France au début du XIXe siècle. Sa particularité est d'utiliser les deux poings (comme en boxe anglaise) et les deux pieds, mais avec la spécificité de toujours frapper avec la pointe ou le dessous du pied chaussé — jamais avec le tibia comme en muay-thaï.</p>
<p>Discipline méconnue à l'international mais riche en histoire et en technique, la savate est l'un des rares sports de combat à origine européenne avec un véritable patrimoine documenté.</p>

<h2 id="g-s2">Histoire de la boxe française</h2>
<p>La savate naît dans les rues de Paris et Marseille au début du XIXe siècle. Les marins marseillais développent des techniques de coups de pied bas (savater) pour compléter la boxe anglaise importée d'Angleterre. Charles Lecour et Michel Casseux ("Pisseux") codifient la discipline vers 1830 en combinant les deux styles.</p>
<p>Au XIXe siècle, la savate est pratiquée dans les milieux aristocratiques et bourgeois parisiens. Joseph Charlemont et son fils Charles Charlemont élèvent la discipline à son apogée technique. Des assauts (combats de démonstration) sont organisés dans les grandes villes.</p>

<h2 id="g-s3">Techniques spécifiques</h2>
<p>La savate se distingue des autres sports de frappe par ses coups de pied :</p>
<ul>
  <li><strong>Le fouetté</strong> : coup de pied circulaire avec la pointe du pied — équivalent du roundhouse kick, mais exécuté différemment.</li>
  <li><strong>Le chassé</strong> : coup de pied frontal poussé, comparable au teep du muay-thaï.</li>
  <li><strong>Le revers</strong> : coup de pied du tranchant extérieur du pied, circulaire et difficile à parer.</li>
  <li><strong>Le bas</strong> : coup de pied circulaire visant les chevilles et les mollets.</li>
</ul>
<p>Les coups de poing reprennent la nomenclature de la boxe anglaise : direct, crochet, uppercut. La savate est connue pour son excellent travail de jambes et ses esquives de buste très élégantes.</p>

<h2 id="g-s4">Équipement nécessaire</h2>
<ul>
  <li><strong>Chaussures de savate</strong> : spécifiques, elles permettent de frapper avec le pied chaussé sans blesser le partenaire. Obligatoires pour la compétition.</li>
  <li><strong>Gants de boxe</strong> : 10 à 14 oz selon le gabarit.</li>
  <li><strong>Bandes</strong>, <strong>protège-dents</strong> et <strong>coquille</strong> standard.</li>
  <li><strong>Jambières</strong> (optionnel pour l'entraînement, obligatoire en compétition).</li>
</ul>

<h2 id="g-s5">Erreurs fréquentes des débutants</h2>
<ul>
  <li><strong>Confondre savate et muay-thaï</strong> : les coups de pied sont différents. En savate, on frappe avec le pied (pointe, talon, tranchant), jamais avec le tibia.</li>
  <li><strong>Négliger le travail de jambes</strong> : la savate est une discipline très mobile. Le footwork est aussi important que les frappes.</li>
  <li><strong>Mauvais équilibre lors des coups de pied</strong> : un coup de pied raté en savate expose à une contre-attaque. Le retour en garde après chaque technique est impératif.</li>
</ul>

<h2 id="g-s6">Conseils pour progresser</h2>
<ul>
  <li>Cherchez un club affilié à la Fédération Française de Savate, Boxe Française et Disciplines Associées (FFSBF&DA).</li>
  <li>Pratiquez les assauts (combats de démonstration) en plus du full-contact : ils développent la précision et le contrôle.</li>
  <li>Regardez des combats de savate de haut niveau : la technique et l'élégance des grands champions sont une source d'inspiration constante.</li>
</ul>
`
  },

  /* ════════════════════════════════════════════════════════
     LETHWEI
  ════════════════════════════════════════════════════════ */
  lethwei: {
    sport:  'Lethwei',
    emoji:  '💀',
    banner: 'linear-gradient(135deg, #3b0a0a 0%, #991B1B 100%)',
    toc: [
      'Introduction au lethwei',
      'Culture birmane et tradition',
      'Ce qui distingue le lethwei',
      'Équipement et pratique sécurisée',
      'Pour qui est le lethwei ?',
      'Conseils pour débuter'
    ],
    html: `
<h2 id="g-s1">Introduction au lethwei</h2>
<p>Le lethwei est l'art martial national du Myanmar (Birmanie). Souvent surnommé "la discipline la plus dure au monde", il se distingue de toutes les autres arts martiaux de frappe par une caractéristique unique : les coups de tête sont non seulement autorisés, mais font partie de l'arsenal technique standard. Le combat se pratique mains bandées, sans gants.</p>
<p>Discipline encore confidentielle à l'international, le lethwei gagne en visibilité depuis les années 2010 grâce à des combattants comme Dave Leduc (premier champion du monde non-birman) ou Tun Tun Min.</p>

<h2 id="g-s2">Culture birmane et tradition</h2>
<p>Le lethwei existe depuis plus de deux millénaires au Myanmar. Contrairement au muay-thaï thaïlandais avec lequel il partage de nombreuses similitudes, le lethwei est resté longtemps fermé aux étrangers en raison de l'isolement politique du Myanmar. Les combats traditionnels se déroulaient dans des fosses de sable, sans rounds ni arbitres, jusqu'à ce que l'un des combattants ne puisse plus continuer.</p>
<p>La règle de victoire est également unique : un combattant KO bénéficie d'un temps de récupération de deux minutes. S'il peut reprendre le combat, celui-ci continue. La victoire par KO debout est donc la seule façon de gagner — les décisions aux points résultant en match nul.</p>

<h2 id="g-s3">Ce qui distingue le lethwei</h2>
<ul>
  <li><strong>Coups de tête autorisés</strong> : le headbutt est une arme technique à part entière. Il s'utilise en clinch, dans les corps à corps, pour déséquilibrer ou blesser.</li>
  <li><strong>Mains bandées, sans gants</strong> : les poings bandés (similaires à la boxe ancienne) permettent des techniques comme les claques ouvertes.</li>
  <li><strong>Toutes les frappes autorisées</strong> : poings, pieds, genoux, coudes, têtes. Arsenal identique au muay-thaï avec l'ajout du headbutt.</li>
  <li><strong>Règle de match nul</strong> : si les deux combattants résistent jusqu'à la fin des rounds, le résultat est un match nul. Seul le KO compte.</li>
</ul>

<h2 id="g-s4">Équipement et pratique sécurisée</h2>
<p>En dehors du Myanmar, le lethwei se pratique avec des adaptations sécuritaires :</p>
<ul>
  <li>Gants de boxe (10 à 16 oz) pour le sparring et l'entraînement.</li>
  <li>Casque obligatoire pour tout travail avec partenaire.</li>
  <li>Protège-dents renforcé et coquille.</li>
  <li>Protège-tibias pour le travail de pieds.</li>
</ul>
<p>Les coups de tête en entraînement sont le plus souvent simulés ou très contrôlés. La priorité absolue est la sécurité des pratiquants.</p>

<h2 id="g-s5">Pour qui est le lethwei ?</h2>
<p>Le lethwei est une discipline réservée aux pratiquants ayant déjà une solide expérience dans d'autres sports de combat (muay-thaï, MMA, kickboxing). L'apprentissage à partir de zéro en lethwei est possible mais déconseillé sans base préalable dans une discipline de striking. La densité et la brutalité des techniques nécessitent un conditionnement physique et une maîtrise technique avancés.</p>

<h2 id="g-s6">Conseils pour débuter</h2>
<ul>
  <li>Acquérez d'abord 2 à 3 ans d'expérience en muay-thaï ou kickboxing avant de vous orienter vers le lethwei.</li>
  <li>Cherchez un club avec des instructeurs ayant une expérience directe du lethwei birmane ou un background MMA solide.</li>
  <li>Regardez des combats du World Lethwei Championship pour comprendre la spécificité tactique de cette discipline.</li>
  <li>L'engagement physique requis est extrême : conditionnement cardiovasculaire, résistance aux coups et endurance doivent être développés progressivement.</li>
</ul>
`
  }

}; // fin window.GUIDES

/* ── Validation au chargement ── */
(function validateGuides() {
  const guides = window.GUIDES || {};
  const ids = Object.keys(guides);
  if (ids.length === 0) {
    console.warn('⚠️ Front Kick — window.GUIDES est vide.');
    return;
  }
  ids.forEach(id => {
    const g = guides[id];
    if (!g.toc || !Array.isArray(g.toc) || g.toc.length === 0) {
      console.error(`❌ Guide "${id}" : toc manquant ou vide.`);
    }
    if (!g.html) {
      console.error(`❌ Guide "${id}" : html manquant.`);
    }
  });
  console.log(`✅ Front Kick — ${ids.length} guide(s) chargé(s) : ${ids.join(', ')}`);
})();
