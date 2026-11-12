/* =========================================================
   NAVEGACIÓN — cabecera, menú móvil y enlace activo
   ========================================================= */
(function () {
  const { $, $$ } = BH.utils;

  function init() {
    const header = $('#header');
    const nav = $('#nav');
    const toggle = $('#navToggle');
    const links = $$('.nav__link', nav);

    // Fondo de la cabecera al bajar
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Menú móvil
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    // Enlace activo según la sección visible
    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0];
      sections.forEach((section) => {
        if (section.offsetTop <= marker) current = section;
      });
      links.forEach((link) =>
        link.classList.toggle('is-active', link.getAttribute('href') === `#${current.id}`)
      );
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();
  }

  BH.nav = { init };
})();
