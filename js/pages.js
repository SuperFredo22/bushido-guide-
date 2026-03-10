/* ======================================================
   FRONT KICK — pages.js
   Rendering des pages du site
====================================================== */

function safe(str){
return (str || "").toString().toLowerCase();
}

/* ===============================
HOME
=============================== */

window.renderHome = function(app){

const featured = ARTICLES.find(a=>a.featured) || ARTICLES[0];

const others = ARTICLES.filter(a=>a!==featured).slice(0,6);

app.innerHTML = `
<section class="hero">

<div class="featured-card">

<div class="featured-body">

<div class="feat-meta">
🔥 À la une ${featured.discipline || ""}
</div>

<h1 class="feat-h1">
${featured.title}
</h1>

<p class="feat-desc">
${featured.excerpt || ""}
</p>

<a href="#/article/${featured.slug}" class="feat-read">
Lire l'article →
</a>

</div>

</div>

</section>

<div class="sec-bar">
<h2>Articles récents</h2>
<div class="sec-line"></div>
</div>

<div class="art-grid">

${others.map(a=>`
<div class="art-card">

<div class="art-body">

<div class="art-cat">
${a.discipline || ""} · ${a.category || ""}
</div>

<div class="art-title-sm">
<a href="#/article/${a.slug}">
${a.title}
</a>
</div>

<div class="art-meta">
${a.date || ""} · ${a.readTime || ""}
</div>

</div>

</div>
`).join("")}

</div>
`;

};

/* ===============================
LIST PAGE
=============================== */

window.renderList = function(app, discipline){

const list = ARTICLES.filter(a=>safe(a.sport)===safe(discipline));

app.innerHTML = `
<h1 class="page-title">
${discipline.toUpperCase()} — Tous les articles
</h1>

<p class="page-count">
${list.length} articles disponibles
</p>

<div class="list-wrap">

${list.map((a,i)=>`

<a class="list-item" href="#/article/${a.slug}">

<span class="list-num">
${String(i+1).padStart(2,"0")}
</span>

<div class="list-info">

<div class="list-title">
${a.title}
</div>

<div class="list-meta">
${a.date || ""} · ${a.readTime || ""}
</div>

</div>

</a>

`).join("")}

</div>
`;

};

/* ===============================
ARTICLE
=============================== */

window.renderArticle = function(app, slug){

const article = ARTICLES.find(a=>a.slug===slug);

if(!article){

app.innerHTML=`<h1>Article introuvable</h1>`;
return;

}

app.innerHTML = `
<div class="article-wrap">

<article>

<h1 class="art-h1">
${article.title}
</h1>

<p class="art-lead">
${article.excerpt || ""}
</p>

<div class="art-meta">
${article.date || ""} · ${article.readTime || ""}
</div>

<div class="art-content">
${article.content || ""}
</div>

</article>

</div>
`;

};

/* ===============================
GUIDES
=============================== */

window.renderGuides = function(app){

const keys = Object.keys(GUIDES);

app.innerHTML = `
<h1>📘 Guides par discipline</h1>

<div class="guides-grid">

${keys.map(g=>`

<div class="guide-card">

<div class="guide-body">

<h3>
${g}
</h3>

<p>
Guide complet pour découvrir ${g}.
</p>

<a href="#/guides/${g}">
Lire le guide →
</a>

</div>

</div>

`).join("")}

</div>
`;

};

/* ===============================
GUIDE DETAIL
=============================== */

window.renderGuideDetail = function(app, guide){

const data = GUIDES[guide];

if(!data){
app.innerHTML="<h1>Guide introuvable</h1>";
return;
}

app.innerHTML = `
<h1>
Guide ${guide}
</h1>

<div class="guide-content">

${data.sections.map(s=>`

<h2>${s.title}</h2>

<p>${s.content}</p>

`).join("")}

</div>
`;

};

/* ===============================
ACTUALITES
=============================== */

window.renderActualites = function(app){

const news = ARTICLES.filter(a=>a.category==="actu");

app.innerHTML = `
<h1>Actualités</h1>

<div class="list-wrap">

${news.map((a,i)=>`

<a class="list-item" href="#/article/${a.slug}">

<span class="list-num">
${String(i+1).padStart(2,"0")}
</span>

<div class="list-info">

<div class="list-title">
${a.title}
</div>

<div class="list-meta">
${a.date || ""}
</div>

</div>

</a>

`).join("")}

</div>
`;

};

/* ===============================
SEARCH
=============================== */

window.renderSearch = function(app, query){

const q = safe(query);

const articleResults = ARTICLES.filter(a=>
safe(a.title).includes(q) ||
safe(a.excerpt).includes(q) ||
safe(a.content).includes(q) ||
safe(a.discipline).includes(q)
);

const guideResults = Object.keys(GUIDES).filter(g=>
safe(g).includes(q)
);

app.innerHTML = `
<h1>
🔎 Recherche : "${query}"
</h1>

<p>
${articleResults.length + guideResults.length} résultats
</p>
`;

if(articleResults.length){

app.innerHTML += `
<h2>Articles</h2>

<div class="list-wrap">

${articleResults.map((a,i)=>`

<a class="list-item" href="#/article/${a.slug}">

<span class="list-num">
${String(i+1).padStart(2,"0")}
</span>

<div class="list-info">

<div class="list-title">
${a.title}
</div>

<div class="list-meta">
${a.date || ""}
</div>

</div>

</a>

`).join("")}

</div>
`;

}

if(guideResults.length){

app.innerHTML += `
<h2 style="margin-top:40px">Guides</h2>

<div class="list-wrap">

${guideResults.map(g=>`

<a class="list-item" href="#/guides/${g}">

<span class="list-num">
📘
</span>

<div class="list-info">

<div class="list-title">
Guide ${g}
</div>

</div>

</a>

`).join("")}

</div>
`;

}

if(!articleResults.length && !guideResults.length){

app.innerHTML += `
<p style="margin-top:30px">
Aucun résultat trouvé.
</p>
`;

}

};

/* ===============================
404
=============================== */

window.renderNotFound = function(app){

app.innerHTML = `
<h1>404</h1>
<p>Page introuvable.</p>
`;

};
