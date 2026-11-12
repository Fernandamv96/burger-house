/* =========================================================
   ANIMACIONES GENERALES — entrada del hero y aparición al hacer scroll
   ========================================================= */
(function () {
  const { $$, prefersReducedMotion } = BH.utils;

  function heroIntro() {
    if (!window.gsap || prefersReducedMotion()) return;
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-hero]', { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.12 })
      .from('[data-hero-media]', { scale: 0.85, autoAlpha: 0, duration: 1.2 }, 0.15)
      .from('.scroll-indicator', { autoAlpha: 0, duration: 0.6 }, '-=0.4');
  }

  function revealOnScroll() {
    const targets = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => observer.observe(el));
  }

  function init() {
    document.documentElement.classList.add('js');
    heroIntro();
    revealOnScroll();
  }

  BH.animations = { init };
})();
