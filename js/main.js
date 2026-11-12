/* =========================================================
   PUNTO DE ENTRADA — inicializa cada módulo
   (el orden importa: el menú crea las tarjetas antes de animarlas)
   ========================================================= */
(function () {
  function start() {
    document.getElementById('year').textContent = new Date().getFullYear();

    BH.nav.init();
    BH.menu.init();
    BH.cart.init();
    BH.contact.init();
    BH.burgerScroll.init();
    BH.animations.init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
