/* =========================================================
   MENÚ — genera las tarjetas a partir de data/products.js
   ========================================================= */
(function () {
  const { $, formatPrice, escapeHtml } = BH.utils;

  function cardTemplate(product, index) {
    const tag = product.tag ? `<span class="card__tag">${escapeHtml(product.tag)}</span>` : '';
    return `
      <article class="card" data-reveal style="--reveal-delay:${(index % 3) * 90}ms">
        <div class="card__media">
          <img src="${product.image}" alt="${escapeHtml(product.alt)}" width="800" height="600" loading="lazy">
          ${tag}
        </div>
        <div class="card__body">
          <h3 class="card__title">${escapeHtml(product.name)}</h3>
          <p class="card__desc">${escapeHtml(product.description)}</p>
          <div class="card__foot">
            <span class="card__price">${formatPrice(product.price)}</span>
            <button class="btn btn--primary" type="button" data-add="${product.id}"
              aria-label="Agregar ${escapeHtml(product.name)} al carrito">Agregar</button>
          </div>
        </div>
      </article>`;
  }

  function init() {
    const grid = $('#menuGrid');
    grid.innerHTML = BH.products.map(cardTemplate).join('');

    grid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-add]');
      if (button) BH.cart.add(button.dataset.add);
    });
  }

  BH.menu = { init };
})();
