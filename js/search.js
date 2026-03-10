// js/search.js
/* ======================================================
   FRONT KICK — search.js
   Gestion de la barre de recherche
======================================================= */

(function() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput.value.trim();
      if (q) {
        // Rediriger vers la page de recherche avec le paramètre q dans le hash
        location.hash = `#/recherche?q=${encodeURIComponent(q)}`;
      }
    });
  }
})();