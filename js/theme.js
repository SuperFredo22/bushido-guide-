// js/theme.js
/* ======================================================
   FRONT KICK — theme.js
   Gestion du mode sombre / clair
======================================================= */

(function() {
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Récupérer le thème sauvegardé
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    if (toggle) toggle.textContent = '☀️';
  } else {
    if (toggle) toggle.textContent = '🌙';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggle.textContent = isDark ? '☀️' : '🌙';
    });
  }
})();