/* =========================================================
   CARRITO — agregar, quitar, cantidades, subtotal y pedido por WhatsApp
   No procesa pagos: el pedido se envía como mensaje de WhatsApp.
   ========================================================= */
(function () {
  const { $, formatPrice, escapeHtml, whatsappLink, toast } = BH.utils;
  const { config } = BH;

  /** Estado: { [idProducto]: cantidad } */
  let items = {};
  let els = {};
  let lastFocused = null;

  const findProduct = (id) => BH.products.find((p) => p.id === id);

  /* ---------- Persistencia ---------- */
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(config.storageKey)) || {};
      // Solo se conservan productos que sigan existiendo en el menú
      Object.keys(saved).forEach((id) => {
        const qty = Number(saved[id]);
        if (findProduct(id) && Number.isInteger(qty) && qty > 0) items[id] = qty;
      });
    } catch (_) {
      items = {};
    }
  }

  function save() {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(items));
    } catch (_) {
      /* almacenamiento no disponible: el carrito sigue funcionando en memoria */
    }
  }

  /* ---------- Cálculos ---------- */
  const lines = () =>
    Object.keys(items).map((id) => {
      const product = findProduct(id);
      return { product, qty: items[id], total: product.price * items[id] };
    });
  const subtotal = () => lines().reduce((sum, line) => sum + line.total, 0);
  const count = () => Object.values(items).reduce((sum, qty) => sum + qty, 0);

  function orderMessage() {
    const detail = lines()
      .map((l) => `• ${l.qty} x ${l.product.name} — ${formatPrice(l.total)}`)
      .join('\n');
    return `¡Hola ${config.brand}! Quiero hacer este pedido:\n\n${detail}\n\nSubtotal: ${formatPrice(subtotal())}`;
  }

  /* ---------- Render ---------- */
  function render() {
    const list = lines();
    const empty = list.length === 0;

    els.items.innerHTML = list
      .map(
        ({ product, qty, total }) => `
        <li class="cart-item">
          <img src="${product.image}" alt="" width="64" height="64">
          <div>
            <p class="cart-item__name">${escapeHtml(product.name)}</p>
            <p class="cart-item__price">${formatPrice(product.price)} c/u</p>
            <div class="qty">
              <button type="button" data-dec="${product.id}" aria-label="Quitar una ${escapeHtml(product.name)}">−</button>
              <span aria-label="Cantidad">${qty}</span>
              <button type="button" data-inc="${product.id}" aria-label="Agregar una ${escapeHtml(product.name)}">+</button>
            </div>
          </div>
          <div class="cart-item__side">
            <span class="cart-item__total">${formatPrice(total)}</span>
            <button class="cart-item__remove" type="button" data-remove="${product.id}">Eliminar</button>
          </div>
        </li>`
      )
      .join('');

    els.empty.hidden = !empty;
    els.subtotal.textContent = formatPrice(subtotal());
    els.count.textContent = count();
    els.clear.hidden = empty;

    els.checkout.setAttribute('aria-disabled', String(empty));
    els.checkout.href = empty ? '#' : whatsappLink(orderMessage());
    if (empty) els.checkout.setAttribute('tabindex', '-1');
    else els.checkout.removeAttribute('tabindex');
  }

  function commit() {
    save();
    render();
  }

  /* ---------- Acciones ---------- */
  function add(id) {
    const product = findProduct(id);
    if (!product) return;
    items[id] = (items[id] || 0) + 1;
    commit();
    toast(`${product.name} agregada al carrito`);
    els.open.classList.remove('is-bump');
    void els.open.offsetWidth; // reinicia la animación
    els.open.classList.add('is-bump');
  }

  function changeQty(id, delta) {
    if (!items[id]) return;
    items[id] += delta;
    if (items[id] <= 0) delete items[id];
    commit();
  }

  function remove(id) {
    delete items[id];
    commit();
  }

  function clear() {
    items = {};
    commit();
  }

  /* ---------- Panel ---------- */
  function open() {
    lastFocused = document.activeElement;
    els.overlay.hidden = false;
    els.cart.removeAttribute('inert');
    els.cart.setAttribute('aria-hidden', 'false');
    els.open.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => {
      els.overlay.classList.add('is-open');
      els.cart.classList.add('is-open');
      els.close.focus();
    });
  }

  function close() {
    els.overlay.classList.remove('is-open');
    els.cart.classList.remove('is-open');
    els.cart.setAttribute('aria-hidden', 'true');
    els.cart.setAttribute('inert', '');
    els.open.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    setTimeout(() => {
      if (!els.cart.classList.contains('is-open')) els.overlay.hidden = true;
    }, 320);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function init() {
    els = {
      cart: $('#cart'),
      overlay: $('#overlay'),
      open: $('#cartOpen'),
      close: $('#cartClose'),
      items: $('#cartItems'),
      empty: $('#cartEmpty'),
      subtotal: $('#cartSubtotal'),
      count: $('#cartCount'),
      checkout: $('#cartCheckout'),
      clear: $('#cartClear'),
    };

    load();
    render();

    els.open.addEventListener('click', open);
    els.close.addEventListener('click', close);
    els.overlay.addEventListener('click', close);
    els.clear.addEventListener('click', clear);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.cart.classList.contains('is-open')) close();
    });

    els.checkout.addEventListener('click', (e) => {
      if (count() === 0) e.preventDefault();
    });

    els.items.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) return;
      if (target.dataset.inc) changeQty(target.dataset.inc, 1);
      else if (target.dataset.dec) changeQty(target.dataset.dec, -1);
      else if (target.dataset.remove) remove(target.dataset.remove);
    });
  }

  BH.cart = { init, add, remove, clear, open, close, subtotal, count };
})();
