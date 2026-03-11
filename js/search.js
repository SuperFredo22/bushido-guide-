// js/search.js
/* ======================================================
   FRONT KICK — search.js
   Gestion de la barre de recherche
   MODIF : vérification de l'existence des éléments
======================================================= */

(function() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput.value.trim();
      if (q) {
        location.hash = `#/recherche?q=${encodeURIComponent(q)}`;
      }
    });
  } else {
    console.warn('⚠️ searchForm or searchInput not found in DOM');
  }
})();
