/* =========================================================
   CONTACTO — valida el formulario y envía el mensaje por WhatsApp
   (no hay servidor: el mensaje se abre prellenado en WhatsApp)
   ========================================================= */
(function () {
  const { $, whatsappLink } = BH.utils;
  const { config } = BH;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Escribe tu nombre.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Escribe un correo válido.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Cuéntanos un poco más (mínimo 10 caracteres).'),
  };

  function validateField(form, name) {
    const input = form.elements[name];
    const message = rules[name](input.value);
    const field = input.closest('.field');
    field.classList.toggle('is-invalid', Boolean(message));
    field.querySelector('.field__error').textContent = message;
    input.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  }

  function init() {
    const form = $('#contactForm');
    const status = $('#formStatus');

    $('#infoAddress').textContent = config.address;
    $('#infoHours').textContent = config.hours;
    $('#infoPhone').textContent = config.whatsappDisplay;
    $('#waFloat').href = whatsappLink(`¡Hola ${config.brand}! Quiero hacer una consulta.`);

    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener('blur', () => validateField(form, name));
      form.elements[name].addEventListener('input', () => {
        if (form.elements[name].closest('.field').classList.contains('is-invalid')) validateField(form, name);
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.textContent = '';

      const invalid = Object.keys(rules).filter((name) => !validateField(form, name));
      if (invalid.length) {
        form.elements[invalid[0]].focus();
        return;
      }

      const data = new FormData(form);
      const text =
        `¡Hola ${config.brand}! Soy ${data.get('name').trim()} (${data.get('email').trim()}).\n\n` +
        data.get('message').trim();

      window.open(whatsappLink(text), '_blank', 'noopener');
      status.textContent = 'Abrimos WhatsApp con tu mensaje. Presiona enviar allí para completarlo.';
      form.reset();
    });
  }

  BH.contact = { init };
})();
