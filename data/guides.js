/* ══════════════════════════════════════════════════════════
   FRONT KICK — data/guides.js
   Guides débutants par discipline.
   Utilisé par renderGuides() et renderGuideDetail() dans index.html.

   AJOUTER UN GUIDE :
   Ajouter une clé dans l'objet GUIDES ci-dessous.
   La clé devient l'ID de la route : #/guides/<clé>

   CHAMPS REQUIS :
   sport      → Nom affiché dans le header du guide
   emoji      → Icône principale
   diffClass  → 'diff-debutant' | 'diff-avance'
   diffLabel  → Texte du badge de difficulté
   banner     → CSS gradient pour le bandeau visuel
   toc        → Tableau de strings (titres des sections)
   html       → Contenu HTML complet du guide
══════════════════════════════════════════════════════════ */

const GUIDES = {
  mma:{
    sport:'MMA — Mixed Martial Arts',emoji:'🥊',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#1a0a0a,#2d1010)',
    toc:['Introduction au MMA','Histoire & origines','Ce que vous apprendrez','Parcours du débutant','Équipement nécessaire','Choisir sa salle','Planning recommandé'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">MMA</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter le MMA : <em>le guide complet</em> de zéro</h1>
<p class="art-lead">Le MMA est le sport de combat le plus complet au monde. Ce guide vous donne les clés pour commencer intelligemment.</p>
<div class="art-content">
<h2 id="g-s1">Introduction au MMA</h2>
<p>Le MMA (Mixed Martial Arts) autorise les frappes debout, le clinch, les projections et les soumissions. C'est une discipline réglementée, accessible à tous les âges.</p>
<div class="callout"><p>"Le MMA ne vous rend pas violent. Il vous rend discipliné, patient et conscient de vos propres limites." — Dana White</p></div>
<h2 id="g-s2">Histoire & origines</h2>
<p>Les racines du MMA moderne remontent aux années 1920 au Brésil. L'UFC a été fondé en 1993. Depuis lors, le sport s'est codifié en une discipline internationale suivie par des centaines de millions de personnes.</p>
<h2 id="g-s3">Ce que vous apprendrez</h2>
<ul>
<li><strong>Boxe anglaise :</strong> jab, croisé, crochet, uppercut</li>
<li><strong>Muay-Thaï :</strong> coups de pied, genoux, coudes, clinch</li>
<li><strong>Wrestling / Judo :</strong> amenées au sol, contrôle, projections</li>
<li><strong>Jiu-Jitsu Brésilien :</strong> soumissions, étranglements, positionnement au sol</li>
</ul>
<div class="guide-timeline">
<div class="timeline-block"><div class="tl-period">0 – 6 mois</div><div class="tl-level">Débutant</div><div class="tl-desc">Garde, déplacements, coups de base. Aucun sparring intensif.</div></div>
<div class="timeline-block"><div class="tl-period">6 – 18 mois</div><div class="tl-level">Intermédiaire</div><div class="tl-desc">Enchaînements, transitions debout/sol. Sparring léger.</div></div>
<div class="timeline-block"><div class="tl-period">18 mois +</div><div class="tl-level">Confirmé</div><div class="tl-desc">Sparring complet, stratégie, préparation compétition.</div></div>
</div>
<h2 id="g-s4">Parcours du débutant</h2>
<div class="guide-steps">
<div class="guide-step"><div class="step-num">01</div><div class="step-body"><h3>Choisissez votre approche</h3><p>Option A : cours MMA débutant directement. Option B : 12 mois de boxe ou muay-thaï en premier.</p></div></div>
<div class="guide-step"><div class="step-num">02</div><div class="step-body"><h3>Visitez 2–3 salles avant de vous engager</h3><p>Prenez un cours d'essai dans plusieurs endroits. L'ambiance est aussi importante que le niveau technique.</p></div></div>
<div class="guide-step"><div class="step-num">03</div><div class="step-body"><h3>Soyez patient les 3 premiers mois</h3><p>Vous perdrez tous vos sparrings. C'est normal — l'objectif est d'apprendre à placer sa garde et à respirer correctement.</p></div></div>
</div>
<h2 id="g-s5">Équipement nécessaire</h2>
<div class="equip-list">
<div class="equip-item"><span class="equip-icon">🥊</span><div><div class="equip-name">Gants de sparring (14–16 oz)</div><div class="equip-price">Venum, Hayabusa, RDX — 60 à 100 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🦷</span><div><div class="equip-name">Protège-dents thermomoulable</div><div class="equip-price">Shock Doctor, Venum — 15 à 30 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🩱</span><div><div class="equip-name">Short MMA ou grappling</div><div class="equip-price">Hayabusa, Venum — 30 à 70 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🦵</span><div><div class="equip-name">Protège-tibias</div><div class="equip-price">Fairtex, Twins — 30 à 70 €</div></div><span class="equip-badge badge-useful">Utile dès le départ</span></div>
</div>
<h2 id="g-s6">Choisir sa salle</h2>
<ul>
<li>Entraîneurs avec passé compétitif réel ou certifications reconnues</li>
<li>Cours séparés par niveaux (débutants / confirmés)</li>
<li>Culture du sparring léger — pas de "guerre" à chaque séance</li>
</ul>
<h2 id="g-s7">Planning recommandé (débutant)</h2>
<ul>
<li><strong>3× en salle :</strong> 1 cours frappe, 1 cours grappling, 1 cours MMA complet</li>
<li><strong>2× solo :</strong> 15 min shadow boxing + corde à sauter</li>
<li><strong>1 jour récupération active :</strong> marche, natation, stretching</li>
</ul>
</div>`},

  boxe:{
    sport:'Boxe Anglaise',emoji:'🥊',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#0a0f1a,#10182a)',
    toc:['Introduction','Histoire','Les 4 coups fondamentaux','Progression réaliste','Équipement','Choisir son club','Planning'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">Boxe</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter la boxe anglaise : <em>le guide complet</em> de zéro</h1>
<p class="art-lead">Deux siècles de science condensés en quatre coups fondamentaux. La boxe anglaise est l'un des arts les plus étudiés du monde du combat.</p>
<div class="art-content">
<h2 id="g-s1">Introduction</h2>
<p>La boxe anglaise utilise uniquement les poings protégés par des gants. C'est le sport de combat le plus pratiqué au monde — excellent pour le cardio, la coordination et la confiance en soi.</p>
<h2 id="g-s2">Histoire</h2>
<p>Codifiée par les règles du Marquis de Queensberry en 1867. La France a une longue tradition : Marcel Cerdan, Brahim Asloum, Tony Yoka.</p>
<h2 id="g-s3">Les 4 coups fondamentaux</h2>
<div class="guide-steps">
<div class="guide-step"><div class="step-num">01</div><div class="step-body"><h3>Le jab (direct avant)</h3><p>Coup rapide du poing avant. Sert à contrôler la distance, créer des ouvertures. La base de tout le reste.</p></div></div>
<div class="guide-step"><div class="step-num">02</div><div class="step-body"><h3>Le croisé (direct arrière)</h3><p>Le coup le plus puissant. Rotation du bassin, transfert du poids. La puissance vient des jambes, pas des épaules.</p></div></div>
<div class="guide-step"><div class="step-num">03</div><div class="step-body"><h3>Le crochet</h3><p>Coup latéral à distance courte ou moyenne. Le coude forme un angle droit. La clé des KO spectaculaires.</p></div></div>
<div class="guide-step"><div class="step-num">04</div><div class="step-body"><h3>L'uppercut</h3><p>Coup ascendant à très courte distance, efficace dans le clinch. Trajectoire montante vers le menton ou le plexus.</p></div></div>
</div>
<div class="guide-timeline">
<div class="timeline-block"><div class="tl-period">0 – 4 mois</div><div class="tl-level">Débutant</div><div class="tl-desc">Garde, jab/croisé, jeu de jambes, travail au sac.</div></div>
<div class="timeline-block"><div class="tl-period">4 – 12 mois</div><div class="tl-level">Intermédiaire</div><div class="tl-desc">4 coups maîtrisés, enchaînements, défenses, sparring léger.</div></div>
<div class="timeline-block"><div class="tl-period">12 mois +</div><div class="tl-level">Confirmé</div><div class="tl-desc">Stratégie de combat, sparring complet, compétitions amateurs.</div></div>
</div>
<h2 id="g-s4">Progression réaliste</h2>
<p>La boxe demande de la régularité avant tout. 3 séances par semaine pendant 6 mois valent mieux que 6 séances par semaine pendant 1 mois avec blessure.</p>
<h2 id="g-s5">Équipement</h2>
<div class="equip-list">
<div class="equip-item"><span class="equip-icon">🥊</span><div><div class="equip-name">Gants (12–16 oz)</div><div class="equip-price">Everlast, Venum, Cleto Reyes — 50 à 120 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🦷</span><div><div class="equip-name">Protège-dents</div><div class="equip-price">Shock Doctor, Opro — 15 à 40 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🤛</span><div><div class="equip-name">Bandages (2,5 ou 4 m)</div><div class="equip-price">Everlast, RDX — 8 à 20 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
</div>
<h2 id="g-s6">Choisir son club</h2>
<ul>
<li>Cherchez un club affilié à la Fédération Française de Boxe (FFB)</li>
<li>Vérifiez que des cours débutants existent séparément des confirmés</li>
<li>La qualité de l'entraîneur prime sur la réputation du club</li>
</ul>
<h2 id="g-s7">Planning (débutant)</h2>
<ul>
<li><strong>2–3× en salle :</strong> travail technique au sac, mitaines, shadow</li>
<li><strong>1× solo :</strong> corde à sauter 15 min + shadow 10 min</li>
<li><strong>Repos :</strong> indispensable — les muscles se reconstruisent hors de la salle</li>
</ul>
</div>`},

  muay:{
    sport:'Muay-Thaï',emoji:'🦵',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#1a0f00,#2a1800)',
    /* CORRECTION : TOC réduit aux 4 sections HTML présentes (g-s1 à g-s4) */
    toc:['Présentation','Histoire & culture','Les 8 armes','Équipement'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">Muay-Thaï</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter le Muay-Thaï : <em>l'art des 8 membres</em></h1>
<p class="art-lead">Poings, pieds, coudes, genoux — huit armes disponibles, une philosophie de guerrier. Le Muay-Thaï produit les combattants debout les plus redoutables du monde.</p>
<div class="art-content">
<h2 id="g-s1">Présentation</h2>
<p>Le Muay-Thaï est surnommé "l'art des 8 membres". Il offre l'arsenal debout le plus complet. C'est la discipline debout la plus représentée dans le MMA professionnel.</p>
<h2 id="g-s2">Histoire & culture</h2>
<p>Enraciné dans des siècles de traditions guerrières thaïlandaises. Les stades de Lumpinee et Rajadamnern à Bangkok restent ses temples sacrés.</p>
<div class="callout"><p>Les combattants thaïlandais commencent souvent à s'entraîner entre 6 et 10 ans. À 18 ans, certains comptent déjà plus de 100 combats professionnels.</p></div>
<h2 id="g-s3">Les 8 armes</h2>
<div class="guide-steps">
<div class="guide-step"><div class="step-num">01</div><div class="step-body"><h3>Les poings</h3><p>Jab et croisé principalement. Servent à créer des ouvertures pour les coups de jambes.</p></div></div>
<div class="guide-step"><div class="step-num">02</div><div class="step-body"><h3>Les jambes</h3><p>Coup de pied circulaire et low kick. Ces armes usent l'adversaire sur la durée.</p></div></div>
<div class="guide-step"><div class="step-num">03</div><div class="step-body"><h3>Les coudes</h3><p>Arme redoutable à courte distance. Souvent restreint dans les compétitions débutants.</p></div></div>
<div class="guide-step"><div class="step-num">04</div><div class="step-body"><h3>Les genoux & le clinch</h3><p>Les genoux en clinch constituent une spécialité Muay-Thaï à part entière.</p></div></div>
</div>
<h2 id="g-s4">Équipement</h2>
<div class="equip-list">
<div class="equip-item"><span class="equip-icon">🥊</span><div><div class="equip-name">Gants de boxe (14–16 oz)</div><div class="equip-price">Fairtex, Twins, Yokkao — 70 à 150 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🦵</span><div><div class="equip-name">Protège-tibias (grande taille)</div><div class="equip-price">Fairtex, Twins — 40 à 80 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
<div class="equip-item"><span class="equip-icon">🩱</span><div><div class="equip-name">Short de Muay-Thaï</div><div class="equip-price">Fairtex, Raja — 25 à 60 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
</div>
</div>`},

  bjj:{
    sport:'Jiu-Jitsu Brésilien (BJJ)',emoji:'🤼',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#0a0a1a,#101025)',
    /* CORRECTION : TOC aligné sur les 3 sections HTML réellement présentes */
    toc:["Qu'est-ce que le BJJ",'Progression par ceintures','Équipement'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">BJJ</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter le BJJ : <em>la philosophie du sol</em></h1>
<p class="art-lead">Un petit gabarit peut maîtriser un adversaire plus grand grâce à la technique — c'est l'idée fondatrice du BJJ.</p>
<div class="art-content">
<h2 id="g-s1">Qu'est-ce que le BJJ ?</h2>
<p>Le Jiu-Jitsu Brésilien (BJJ) est un art martial de combat au sol axé sur les prises de soumission. L'objectif est de placer l'adversaire dans une position où il doit abandonner.</p>
<div class="callout"><p>"Le BJJ vous apprend à être à l'aise dans l'inconfort. C'est la leçon la plus utile qu'un sport puisse vous donner." — Rickson Gracie</p></div>
<h2 id="g-s2">Progression par ceintures</h2>
<div class="guide-timeline">
<div class="timeline-block"><div class="tl-period">0 – 2 ans</div><div class="tl-level">Ceinture blanche</div><div class="tl-desc">Bases de survie, gardes fondamentales, échappements.</div></div>
<div class="timeline-block"><div class="tl-period">2 – 5 ans</div><div class="tl-level">Bleu / Violet</div><div class="tl-desc">Système de jeu défini, soumissions enchaînées, compétition.</div></div>
<div class="timeline-block"><div class="tl-period">5 – 12 ans +</div><div class="tl-level">Marron / Noir</div><div class="tl-desc">Maîtrise complète, enseignement, jeu profond.</div></div>
</div>
<h2 id="g-s3">Équipement</h2>
<div class="equip-list">
<div class="equip-item"><span class="equip-icon">🥋</span><div><div class="equip-name">Kimono (gi) blanc ou bleu</div><div class="equip-price">Tatami, Scramble, Fuji — 70 à 160 €</div></div><span class="equip-badge badge-must">Cours gi</span></div>
<div class="equip-item"><span class="equip-icon">🩱</span><div><div class="equip-name">Rashguard + short grappling</div><div class="equip-price">Tatami, Scramble — 40 à 90 €</div></div><span class="equip-badge badge-must">Cours no-gi</span></div>
</div>
</div>`},

  judo:{
    sport:'Judo',emoji:'🥋',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#0f0808,#1e1010)',
    /* CORRECTION : TOC réduit aux 2 sections HTML présentes */
    toc:['Introduction','Équipement'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">Judo</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter le Judo : <em>la voie de la souplesse</em></h1>
<p class="art-lead">Sport olympique depuis 1964, pratiqué par plus de 40 millions de personnes. La France est une grande nation mondiale du judo : Teddy Riner, Clarisse Agbegnenou.</p>
<div class="art-content">
<h2 id="g-s1">Introduction</h2>
<p>Le Judo (柔道 — "voie de la souplesse") utilise la force de l'adversaire pour le projeter, l'immobiliser ou le contraindre à l'abandon.</p>
<div class="callout"><p>"La souplesse triomphe de la rigidité, la douceur triomphe de la dureté." — Jigoro Kano</p></div>
<h2 id="g-s2">Équipement</h2>
<div class="equip-list">
<div class="equip-item"><span class="equip-icon">🥋</span><div><div class="equip-name">Judogi blanc homologué IJF</div><div class="equip-price">Mizuno, Adidas — 50 à 200 €</div></div><span class="equip-badge badge-must">Indispensable</span></div>
</div>
</div>`},

  karate:{
    sport:'Karaté',emoji:'🥋',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#0a0f0a,#101810)',
    /* CORRECTION : TOC réduit à la seule section HTML présente */
    toc:['Introduction'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">Karaté</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter le Karaté : <em>bien plus qu'un art scolaire</em></h1>
<p class="art-lead">Le karaté bien pratiqué est une discipline d'une richesse technique extraordinaire — précision, distance, maîtrise du corps.</p>
<div class="art-content">
<h2 id="g-s1">Introduction</h2>
<p>Le karaté utilise les frappes à mains nues et aux pieds. Il se pratique sous deux formes : le kumite (combat) et les katas (séquences codifiées).</p>
<div class="callout"><p>"Le but ultime du karaté ne réside pas dans la victoire ou la défaite, mais dans le perfectionnement du caractère." — Gichin Funakoshi</p></div>
</div>`},

  savate:{
    sport:'Savate — Boxe française',emoji:'👟',diffClass:'diff-debutant',diffLabel:'Tous niveaux',
    banner:'linear-gradient(135deg,#0a1215,#0f1f25)',
    /* CORRECTION : TOC réduit à la seule section HTML présente */
    toc:['Présentation'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">Savate</span><span class="art-tag gold">Guide débutant</span></div>
<h1 class="art-h1">Débuter la Savate : <em>la boxe française</em> expliquée</h1>
<p class="art-lead">La seule boxe pieds-poings au monde pratiquée avec des chaussures. Née dans les ports français au XIXe siècle, c'est une discipline élégante et ridiculement sous-estimée.</p>
<div class="art-content">
<h2 id="g-s1">Présentation</h2>
<p>La savate utilise les poings et les pieds chaussés — seules les touches avec la semelle et le dessus du pied sont comptées. Cette contrainte génère un jeu de jambes d'une richesse exceptionnelle.</p>
<div class="callout"><p>La savate a influencé le kickboxing occidental. Plusieurs champions MMA ont un background savate — Francis Ngannou dans sa jeunesse.</p></div>
</div>`},

  lethwei:{
    sport:'Lethwei — Boxe birmane',emoji:'💀',diffClass:'diff-avance',diffLabel:'Pratiquants confirmés',
    banner:'linear-gradient(135deg,#1a0808,#2a1010)',
    /* CORRECTION : TOC réduit aux 2 sections HTML présentes */
    toc:['Présentation','Base préalable requise'],
    html:`<div class="art-tags" style="margin-bottom:1rem"><span class="art-tag red">Lethwei</span><span class="art-tag gold">Confirmé requis</span></div>
<h1 class="art-h1">Le Lethwei : <em>la boxe birmane sans gants</em></h1>
<p class="art-lead">Pas de gants, les têtes autorisées, pas de décision aux points — on gagne par KO ou abandon. Une discipline d'une richesse technique insoupçonnée.</p>
<div class="art-content">
<h2 id="g-s1">Présentation</h2>
<p>Le Lethwei est l'art martial national du Myanmar. Les poings ne sont protégés que par des bandages. Les coups de tête sont autorisés. Seuls le KO, l'abandon ou l'incapacité physique comptent.</p>
<div class="callout"><p>Dave Leduc est devenu en 2018 le premier étranger à remporter le titre national birman de lethwei.</p></div>
<h2 id="g-s2">Base préalable requise</h2>
<p>Le lethwei n'est pas une discipline pour débutants. Une solide expérience en muay-thaï (minimum 2 ans) est fortement recommandée.</p>
</div>`}
};
