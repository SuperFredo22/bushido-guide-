// BUSHIDOGUIDE — articles-muay-equip.js | Mars 2026
// Format : { id, title, category, discipline, date, content, featured? }
// Propriétés auto-générées par articles.js : slug, excerpt, readTime, emoji, tags
// ✅ Rodtang = champion ONE poids paille Muay-Thaï
// ✅ Buakaw, Samart = références légitimes
//
// ⚠️ CORRECTION BUG CRITIQUE (lignes finales) :
// articles.js attend ARTICLES_MUAY et ARTICLES_EQUIP (deux tableaux séparés)
// Ce fichier expose les deux via filter() sur ARTICLES_MUAY_EQUIP

const ARTICLES_MUAY_EQUIP = [

// ── MUAY-THAÏ ─────────────────────────────────────────────────

{id:"muay-thai-debutant-guide",title:"Débuter le Muay-Thaï : tout ce que vous devez savoir avant votre première séance",category:"guide-debutant",discipline:"Muay-Thaï",date:"Mars 2026",featured:true,
content:`<p>Le Muay-Thaï est l'art des 8 membres — poings, coudes, genoux, pieds — et l'un des sports de contact les plus complets qui existent. Contrairement à ce que son image de discipline brutale peut suggérer, il accueille des débutants de tous âges et niveaux. Ce guide vous prépare à votre première séance.</p>
<h2>Ce qui vous attend au premier cours</h2>
<p>Échauffement (corde à sauter, déplacements), apprentissage des positions de garde et des frappes de base (jab, croisé, low kick), travail sur pads avec un entraîneur. Pas de sparring dès le premier cours dans une salle sérieuse. L'atmosphère est généralement bienveillante — le Muay-Thaï thaïlandais a une culture du respect profondément ancrée.</p>
<h2>L'équipement pour débuter</h2>
<p>Cours 1-2 : short de sport et protège-dents suffisent. Semaines 2-4 : gants de Muay-Thaï 10-14 oz, protège-chevilles/pieds, protège-dents personnel. Protège-tibias indispensables dès que vous commencez le sparring. Budget équipement de base : 80 à 150 €.</p>`},

{id:"muay-thai-clinch-technique",title:"Le clinch en Muay-Thaï : maîtriser la phase la plus méconnue de l'art des 8 membres",category:"conseil-entrainement",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Le clinch est l'une des dimensions les plus distinctives du Muay-Thaï par rapport aux autres arts de frappe. Dans la plupart des autres disciplines de boxe, le corps-à-corps est passif ou interdit. En Muay-Thaï, c'est une phase de combat à part entière, riche en techniques offensives.</p>
<h2>Les fondamentaux du clinch Muay-Thaï</h2>
<p>La prise de nuque (double collar tie) est la position de contrôle de référence : les deux mains derrière la nuque adverse, coudes vers l'intérieur pour fermer l'espace et contrôler la direction de la tête. Depuis cette position, les genoux au corps et au visage sont les armes principales.</p>
<h2>Comment le travailler efficacement</h2>
<p>Le clinch se développe par la répétition avec un partenaire — pas sur sac. Travaillez les entrées en clinch depuis le debout, les sorties propres qui ne vous laissent pas exposé, et les combinaisons genou-sortie-frappe. Les Thaïlandais y consacrent une part majeure de leur entraînement quotidien.</p>`},

{id:"muay-thai-coup-pied-circulaire",title:"Le coup de pied circulaire en Muay-Thaï : technique et puissance au service du combat",category:"conseil-entrainement",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Le coup de pied circulaire est l'arme signature du Muay-Thaï. Frappant avec le tibia plutôt que le pied — contrairement au karaté ou à la savate — il génère une puissance traumatique considérable et peut conditionner physiquement un adversaire dès les premiers rounds.</p>
<h2>La mécanique correcte</h2>
<p>Le coup de pied circulaire part d'un pivot sur la jambe d'appui, la hanche tourne vers la cible, la jambe frappante s'étend en fouet et l'impact se fait avec le tibia dans le tiers inférieur — bas de la cuisse ou corps. Erreur classique : frapper avec le pied, perdre la rotation des hanches, ne pas pivoter pleinement sur la jambe d'appui.</p>
<h2>Comment développer sa puissance et sa résistance</h2>
<p>La résistance des tibias se développe progressivement par l'entraînement — frapper le sac lourd régulièrement conditionne l'os et les tissus mous. 3 à 6 mois de pratique régulière suffisent pour commencer à avoir un tibia fonctionnel pour le sparring.</p>`},

{id:"muay-thai-buakaw-analyse",title:"Buakaw Banchamek : l'icône du Muay-Thaï qui a conquis le monde",category:"portrait",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Buakaw Banchamek est probablement le combattant de Muay-Thaï le plus connu en dehors de Thaïlande. Ses deux victoires au tournoi K-1 World MAX (2004, 2006), sa popularité mondiale sur YouTube et ses performances en ONE Championship l'ont établi comme le visage du Muay-Thaï moderne dans le monde entier.</p>
<h2>Ce qui le rend unique techniquement</h2>
<p>Buakaw est un athlète de puissance dans une discipline qui valorise la technique. Son low kick est l'un des plus dévastateurs jamais vus en compétition internationale — il a mis fin à plusieurs combats par accumulation de dommages à la cuisse. Son entraînement en forêt thaïlandaise, rendu célèbre par ses vidéos, a inspiré une génération de pratiquants.</p>
<h2>Son héritage</h2>
<p>Buakaw a contribué à la popularisation mondiale du Muay-Thaï comme aucun autre combattant de sa génération. Dans les salles françaises, son nom est connu de pratiquement tous les élèves — même les débutants. Il a rendu le Muay-Thaï accessible culturellement à des millions de personnes.</p>`},

{id:"muay-thai-rodtang-analyse",title:"Rodtang Jitmuangnon : pourquoi le champion ONE est le combattant le plus divertissant du Muay-Thaï actuel",category:"analyse",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Rodtang Jitmuangnon, surnommé « The Iron Man », est champion ONE Championship poids paille Muay-Thaï. Il est aussi probablement le combattant de Muay-Thaï le plus regardé sur les réseaux sociaux grâce à un style qui n'hésite jamais à l'échange frontal — même quand la sagesse tactique suggère autre chose.</p>
<h2>Son style : le chaos organisé</h2>
<p>Rodtang se bat vers l'avant. Il prend des coups pour en placer. Sa tolérance à la douleur est exceptionnelle, et sa capacité à continuer à frapper avec puissance après avoir absorbé des coups propres est l'une des caractéristiques les plus distinctives de son style. Son clinch est puissant et ses genoux sont dévastateurs depuis n'importe quelle position.</p>
<h2>Ce qui peut le battre</h2>
<p>Rodtang peut être exposé par des combattants qui maintiennent une distance propre et utilisent le teep (coup de pied direct) pour le remettre à distance avant qu'il entre dans son espace de confort. Sa tactique purement agressive le rend parfois vulnérable aux contre-attaquants qui savent l'endormir tactiquement.</p>`},

{id:"muay-thai-low-kick",title:"Le low kick en Muay-Thaï : comment cette frappe usante peut gagner des combats",category:"conseil-entrainement",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Le low kick — coup de pied en tibia visant la cuisse externe ou interne de l'adversaire — est l'une des armes les plus stratégiquement efficaces du Muay-Thaï. Pas spectaculaire, pas immédiatement dévastateur, il conditionne lentement l'adversaire jusqu'à compromettre sa mobilité.</p>
<h2>Pourquoi le low kick est si efficace</h2>
<p>La cuisse externe, cible principale, est difficile à protéger sans exposer d'autres zones. Un seul low kick propre ne change rien — mais l'accumulation sur 3 à 5 rounds peut engourdir la jambe, ralentir les déplacements et forcer l'adversaire à baisser sa garde. Les arrêts de combat sur accumulation de low kicks sont fréquents à haut niveau.</p>
<h2>Comment l'intégrer dans son jeu</h2>
<p>Le low kick se place après une frappe de tête (le regard adverse est perturbé), après un feint, ou en contre-attaque quand l'adversaire lance une frappe de poing. Il ne doit pas être utilisé systématiquement et prévisiblement — un adversaire qui anticipe le low kick peut le verrouiller avec sa jambe et vous déséquilibrer.</p>`},

{id:"muay-thai-vs-kickboxing",title:"Muay-Thaï vs Kickboxing : les différences clés pour choisir la bonne discipline",category:"guide-debutant",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Muay-Thaï et kickboxing sont souvent confondus par les débutants. Les deux sont des disciplines de frappe debout avec coups de pied, mais elles diffèrent sur plusieurs points fondamentaux qui influencent à la fois le style de combat et l'expérience d'entraînement.</p>
<h2>Les différences fondamentales</h2>
<p>Coudes et genoux : autorisés en Muay-Thaï, interdits en kickboxing classique. Clinch : phase de combat active en Muay-Thaï, passive ou interdite en kickboxing. Zone de frappe des pieds : le tibia en Muay-Thaï, le pied en kickboxing (selon les règles). Cadence de combat : le Muay-Thaï traditionnel est stratégique et conservateur dans les premiers rounds, le kickboxing est souvent plus actif d'emblée.</p>
<h2>Quelle discipline pour quel pratiquant</h2>
<p>Pour un débutant qui veut compétitionner rapidement, les règles kickboxing ou K-1 sont plus accessibles. Pour un pratiquant qui veut l'art complet avec coudes, genoux et clinch, le Muay-Thaï thaïlandais classique est l'objectif. Les deux ont leur légitimité sportive.</p>`},

{id:"muay-thai-one-championship",title:"ONE Championship : la meilleure organisation de Muay-Thaï au monde en 2026",category:"actualite",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>ONE Championship, organisée à Singapour par Chatri Sityodtong, est en 2026 l'organisation de Muay-Thaï et de kickboxing la plus respectée au monde. Sa politique de poids de forme (pas de cutting agressif), la qualité de ses combattants et sa production télévisuelle en font une référence pour les fans de sports de frappe.</p>
<h2>Les champions qui définissent l'ère</h2>
<p>Rodtang Jitmuangnon, champion ONE poids paille Muay-Thaï, est l'un des combattants les plus spectaculaires de sa génération. Nong-O Gaiyanghadao a dominé la division super-légers pendant plusieurs années avec une technique d'une précision chirurgicale.</p>
<h2>Pourquoi ONE Championship compte pour les fans français</h2>
<p>La diffusion sur Amazon Prime et les événements à Bangkok accessibles pour les fans européens ont rendu ONE Championship beaucoup plus visible en France ces dernières années. Pour les fans de Muay-Thaï, c'est devenu l'organisation de référence pour la visibilité internationale.</p>`},

{id:"muay-thai-teep-technique",title:"Le teep (coup de pied direct) : maîtriser l'arme de contrôle du Muay-Thaï",category:"conseil-entrainement",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Le teep est le coup de pied direct du Muay-Thaï — l'équivalent du jab mais avec le pied. C'est une arme de contrôle et de gestion de la distance plutôt que de KO, mais elle est fondamentale pour les combattants qui veulent contrôler le rythme d'un combat.</p>
<h2>À quoi sert le teep</h2>
<p>Contrôle de la distance : maintenir un adversaire presseur à portée sûre. Interruption du rythme : casser l'élan d'un adversaire qui charge. Punition : toucher un adversaire qui entre sans préparation. Mise à distance après un clinch ou une combinaison.</p>
<h2>La mécanique correcte</h2>
<p>La jambe avant est la plus utilisée pour la vitesse (teep avant). La jambe arrière (teep arrière) est plus puissante mais plus lente. Le pied frappe avec la plante, pas les orteils. La poussée vient des hanches — étendre le genou et pousser depuis la hanche génère plus de puissance qu'un simple kick de jambe.</p>`},

{id:"muay-thai-preparation-competition",title:"Votre première compétition de Muay-Thaï : comment se préparer et quoi attendre",category:"guide-debutant",discipline:"Muay-Thaï",date:"Mars 2026",
content:`<p>Participer à une compétition de Muay-Thaï est une expérience transformatrice pour la plupart des pratiquants. Peu importe le résultat, la préparation et le jour du combat révèlent des aspects de votre pratique que l'entraînement régulier ne peut pas toujours faire émerger.</p>
<h2>Quand se lancer et comment se préparer</h2>
<p>Minimum 1 an de pratique régulière avec sparring. 8 à 12 semaines de préparation spécifique supervisée par votre entraîneur. Combattez dans votre catégorie de poids naturelle — pas de cutting agressif pour votre premier combat. Trouvez un adversaire de niveau similaire : votre entraîneur ou l'organisateur de la compétition peut vous conseiller.</p>
<h2>Le jour J : gestion pratique et mentale</h2>
<p>Arrivez tôt, échauffez-vous progressivement. L'adrénaline sera plus forte que prévu — c'est universel, même pour les combattants expérimentés. Votre plan de combat doit être simple : 2 ou 3 techniques que vous maîtrisez, pas 10. Après le combat, quel que soit le résultat, débriefez avec votre entraîneur.</p>`},

// ── ÉQUIPEMENT ─────────────────────────────────────────────────

{id:"equip-gants-boxe-choisir",title:"Quel gant de boxe choisir pour débuter ? Guide complet 2026",category:"guide-equipement",discipline:"Équipement",date:"Mars 2026",
content:`<p>Choisir ses premiers gants de boxe est souvent la première décision d'équipement d'un pratiquant de sports de combat. Il existe des dizaines de modèles et de marques. Ce guide vous aide à choisir selon votre sport, votre niveau et votre budget.</p>
<h2>Le poids de gants : quelle taille choisir ?</h2>
<p>8-10 oz : gants de compétition, pas adaptés au sparring car insuffisamment protecteurs. 12 oz : sparring léger pour les pratiquants de moins de 65 kg. 14 oz : sparring général, bon compromis protection/maniabilité pour 65-80 kg. 16 oz : sparring lourd, recommandé pour les débutants et tous ceux de plus de 80 kg. En règle générale pour débuter : prenez 16 oz.</p>
<h2>Les marques fiables pour débuter (50-100 €)</h2>
<p>Venum Contender, Hayabusa T3, Fairtex BGV1 et Title Boxing Classic sont des références fiables dans la gamme intermédiaire. Évitez les gants à moins de 30 € : la mousse est insuffisante et vous expose aux blessures des poignets. Le rapport qualité/prix optimal pour un débutant se situe entre 50 et 80 €.</p>`},

{id:"equip-gants-mma-choisir",title:"Choisir ses gants de MMA : guide complet pour ne pas se tromper",category:"guide-equipement",discipline:"Équipement",date:"Mars 2026",
content:`<p>Les gants de MMA sont très différents des gants de boxe : plus fins, avec les doigts découverts, et conçus pour permettre à la fois les frappes debout et le grappling au sol. Choisir les bons selon votre usage est essentiel pour votre sécurité et votre progression.</p>
<h2>Les trois types de gants MMA</h2>
<p>Gants d'entraînement (7 oz) : pour le travail sur pads et sac léger, protection modérée. Gants de sparring (5-7 oz avec plus de mousse) : pour le sparring light contact, plus de protection. Gants de compétition (4 oz) : réglementaires pour les combats officiels, très peu de protection — à n'utiliser qu'en compétition.</p>
<h2>Notre recommandation selon l'usage</h2>
<p>Pour débuter et s'entraîner : Venum Challenger ou Hayabusa T3 MMA en 7 oz. Pour le sparring régulier : envisagez des gants hybrides avec plus de rembourrage sur le dos de la main. Ne faites jamais de sparring avec des gants de compétition 4 oz — vous vous blesserez et blesserez votre partenaire.</p>`},

{id:"equip-protege-tibias-muay-thai",title:"Top 5 des protège-tibias pour le Muay-Thaï : notre sélection pour le sparring",category:"guide-equipement",discipline:"Équipement",date:"Mars 2026",
content:`<p>Les protège-tibias sont l'équipement le plus spécifique au Muay-Thaï — et souvent celui que les débutants achètent en dernier alors qu'il devrait être une priorité dès le début du sparring. Un bon protège-tibia protège vos tibias et ceux de votre partenaire.</p>
<h2>Critères de sélection</h2>
<p>Protection du tibia ET du cou-de-pied : un protège-tibia qui ne protège que le tibia est insuffisant. Maintien : doit rester en place pendant les kicks et le clinch. Facilité d'enfilage : les modèles à sangles velcro sont pratiques mais peuvent se défaire ; les modèles en chaussette sont plus stables. Taille : adaptez à votre morphologie.</p>
<h2>Sélection fiable</h2>
<p>Fairtex SP5 : référence premium, protection excellente, maintien optimal. Venum Kontact : bon rapport qualité/prix pour les débutants (40-60 €). Twins Special : marque thaïlandaise de référence, qualité de fabrication supérieure, disponible en ligne. Pour débuter : un modèle à 40-60 € chez Venum ou Top King est tout à fait suffisant.</p>`},

{id:"equip-bandes-boxe",title:"Bandes de boxe : comment les utiliser correctement pour protéger vos poignets",category:"guide-equipement",discipline:"Équipement",date:"Mars 2026",
content:`<p>Les bandes de boxe sont l'équipement le moins glamour et l'un des plus importants. Elles protègent les os de la main, les articulations des doigts et le poignet contre les micro-traumatismes répétés du travail aux pads et au sac. Beaucoup de débutants s'en passent — c'est une erreur.</p>
<h2>Les deux types de bandes</h2>
<p>Bandes traditionnelles (3,5 à 4,5 m) : tissu semi-élastique ou non-élastique, protection maximale, demandent un apprentissage du bandage. Bandes rapides (quick wraps) : mitaines rembourrées avec velcro, pratiques mais protection moindre. Pour un entraînement sérieux, les bandes traditionnelles sont recommandées.</p>
<h2>La technique de bandage de base</h2>
<p>Commencez par le pouce, faites trois tours de poignet pour stabiliser, passez entre chaque doigt pour bloquer les articulations, revenez sur le poignet et finissez avec le velcro. Le bandage doit être serré mais pas au point de couper la circulation. Demandez à votre entraîneur de vous montrer lors de votre première séance.</p>`},

{id:"equip-sac-frappe-choisir",title:"Quel sac de frappe choisir pour s'entraîner à la maison ou en salle ?",category:"guide-equipement",discipline:"Équipement",date:"Mars 2026",
content:`<p>Le sac de frappe est l'équipement de home training le plus populaire pour les sports de combat. Mais choisir le bon modèle selon votre espace, votre discipline et votre budget demande quelques précautions. Ce guide couvre les critères essentiels.</p>
<h2>Les types de sacs et leur usage</h2>
<p>Sac lourd cylindrique (le classique, 25-45 kg) : polyvalent, adapté à la boxe, au Muay-Thaï et au MMA. Sac banane (plus long, 150-170 cm) : idéal pour le Muay-Thaï — permet les coups de pied hauts, les genoux et le clinch. Sac de frappe debout (sur socle) : solution sans fixation au plafond, stabilité variable. Sac de corps (teardrop) : axé sur le travail du corps et les uppercuts.</p>
<h2>Poids, rembourrage et installation</h2>
<p>Un sac trop léger se balance excessivement et ne simule pas la résistance réelle. Règle générale : le sac devrait peser environ la moitié de votre poids corporel. Pour l'installation à domicile, vérifiez la solidité du support — un sac de 30 kg mal fixé est un danger réel.</p>`},

{id:"equip-equipement-debutant-budget",title:"Kit équipement complet pour débuter : sélection petits et grands budgets 2026",category:"guide-equipement",discipline:"Équipement",date:"Mars 2026",
content:`<p>Démarrer les sports de combat demande un investissement initial en équipement. Ce guide propose deux sélections complètes — budget serré et budget confortable — pour débuter le MMA, la boxe ou le Muay-Thaï sans sur-investir ni sous-investir.</p>
<h2>Kit débutant budget serré (100-150 €)</h2>
<p>Protège-dents : Shock Doctor 100 (15 €). Gants de sparring : Venum Contender 16 oz (50 €). Bandes de boxe 3,5 m : marque générique (8 €). Short de combat (25 €). Total : ~100 €. Ce kit couvre l'essentiel pour les premières semaines de pratique encadrée.</p>
<h2>Kit débutant budget confortable (200-300 €)</h2>
<p>Protège-dents : Shock Doctor Gel Max (25 €). Gants de sparring : Hayabusa T3 16 oz (90 €). Bandes de boxe + bandes rapides (20 €). Protège-tibias : Venum Kontact (50 €). Short MMA de qualité : Venum ou Scramble (50 €). Total : ~235 €. Ce kit permet de pratiquer confortablement toutes les disciplines pendant 2 à 3 ans.</p>`},

];

// ── CORRECTION BUG CRITIQUE ────────────────────────────────────
// articles.js attend ARTICLES_MUAY et ARTICLES_EQUIP séparément
// Ce fichier déclare ARTICLES_MUAY_EQUIP → on expose les deux noms requis
const ARTICLES_MUAY  = ARTICLES_MUAY_EQUIP.filter(a => a.discipline === 'Muay-Thaï');
const ARTICLES_EQUIP = ARTICLES_MUAY_EQUIP.filter(a => a.discipline === 'Équipement');
