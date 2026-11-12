/* =========================================================
   UTILIDADES COMPARTIDAS
   ========================================================= */
(function () {
  const { config } = BH;

  const priceFormatter = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    maximumFractionDigits: 0,
  });

  let toastTimer;

  BH.utils = {
    $: (selector, root = document) => root.querySelector(selector),
    $$: (selector, root = document) => Array.from(root.querySelectorAll(selector)),

    formatPrice: (value) => priceFormatter.format(value),

    /** Enlace de WhatsApp con un mensaje prellenado. */
    whatsappLink: (message) =>
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`,

    /** Escapa texto antes de insertarlo como HTML. */
    escapeHtml: (text) =>
      String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),

    prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    toast(message) {
      const el = document.getElementById('toast');
      if (!el) return;
      el.textContent = message;
      el.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2200);
    },
  };
})();
