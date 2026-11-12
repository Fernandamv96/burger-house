/* =========================================================
   HAMBURGUESA CON SCROLL — GSAP + ScrollTrigger
   La sección es sticky (CSS). El scroll recorre los fotogramas de la
   secuencia con fundido entre uno y otro (scrub):
     1. Hamburguesa completa
     2. Se desarma hasta quedar solo el pan
     3. Vuelve a armarse ingrediente por ingrediente, con su etiqueta
     4. Hamburguesa completa y mensaje final
   ========================================================= */
(function () {
  const { $, $$, escapeHtml } = BH.utils;

  function renderScene(framesBox, stepsBox) {
    const seq = BH.burgerSequence;

    framesBox.innerHTML = Array.from(
      { length: seq.frames },
      (_, i) =>
        `<img class="frame${i === seq.assembledFrame ? ' is-default' : ''}" src="${seq.folder}/frame-${i}.png"
              alt="" width="${seq.width}" height="${seq.height}" decoding="async" draggable="false">`
    ).join('');

    const total = String(BH.ingredients.length).padStart(2, '0');
    stepsBox.innerHTML = BH.ingredients
      .map(
        (item, i) => `
        <li class="step">
          <span class="step__num">${String(i + 1).padStart(2, '0')} / ${total}</span>
          <b>${escapeHtml(item.name)}</b>
          <span class="step__text">${escapeHtml(item.text)}</span>
        </li>`
      )
      .join('');
  }

  function init() {
    const section = $('#anatomia');
    const stage = $('#burgerStage');
    const framesBox = $('#burgerFrames');
    const stepsBox = $('#burgerSteps');
    if (!section || !framesBox) return;

    const seq = BH.burgerSequence;
    stage.style.setProperty('--ratio', seq.width / seq.height);
    renderScene(framesBox, stepsBox);

    // Sin GSAP queda la hamburguesa armada y la página sigue funcionando
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const frames = $$('.frame', framesBox);
    const steps = $$('.step', stepsBox);
    const finale = $('#anatomyFinale');
    const progress = $('#anatomyProgress');
    const lastStepFrame = BH.ingredients[BH.ingredients.length - 1].frame;

    const state = { frame: seq.assembledFrame };
    let activeStep = -1;

    /** Muestra el fotograma actual y funde el siguiente encima. */
    function renderFrame() {
      const base = Math.min(Math.floor(state.frame), seq.frames - 1);
      const blend = state.frame - base;
      frames.forEach((img, i) => {
        img.style.opacity = i === base ? 1 : i === base + 1 ? blend : 0;
      });
    }

    function setStep(index) {
      if (index === activeStep) return;
      activeStep = index;
      steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    }

    const mm = gsap.matchMedia();

    /* ---------- Animación completa ---------- */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      section.classList.add('is-scrolly');

      // Tiempos de la línea (unidades relativas; el scroll total las reparte)
      const T = { hold: 0.5, apart: 1.5, pause: 0.4, perStep: 1, close: 1.2 };
      const tApart = T.hold;
      const tBuild = tApart + T.apart + T.pause;
      const tClose = tBuild + lastStepFrame * T.perStep + 0.3;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
        onUpdate() {
          renderFrame();
          const t = tl.time();
          const building = t > tBuild - 0.5 && t < tClose + 0.1;
          setStep(building ? Math.min(Math.round(state.frame), BH.ingredients.length - 1) : -1);
        },
      });

      // 1-2. Completa -> se desarma hasta el pan
      tl.to(state, { frame: 0, duration: T.apart }, tApart);
      // 3. Se arma ingrediente por ingrediente
      tl.to(state, { frame: lastStepFrame, duration: lastStepFrame * T.perStep }, tBuild);
      // 4. Cierre: hamburguesa completa + destellos + mensaje
      tl.to(state, { frame: seq.assembledFrame, duration: T.close }, tClose);
      tl.to(state, { frame: seq.finalFrame, duration: 0.5 }, tClose + T.close + 0.2);
      tl.fromTo(
        finale,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        tClose + T.close
      );
      tl.to({}, { duration: 0.6 }); // pausa final

      // Leve acercamiento mientras se desarma, para dar profundidad
      tl.fromTo(framesBox, { scale: 1.06 }, { scale: 1, duration: T.apart, ease: 'power1.inOut' }, tApart);

      const bar = gsap.fromTo(
        progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
        }
      );

      renderFrame();

      return () => {
        section.classList.remove('is-scrolly');
        bar.scrollTrigger && bar.scrollTrigger.kill();
        setStep(-1);
        frames.forEach((img) => (img.style.opacity = ''));
        gsap.set([framesBox, finale, progress], { clearProps: 'all' });
      };
    });

    /* ---------- Movimiento reducido: hamburguesa armada + lista completa ---------- */
    mm.add('(prefers-reduced-motion: reduce)', () => {
      section.classList.add('is-static');
      return () => section.classList.remove('is-static');
    });

    // Recalcular cuando terminen de cargar fuentes e imágenes
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  BH.burgerScroll = { init };
})();
