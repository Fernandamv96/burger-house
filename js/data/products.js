/* =========================================================
   PRODUCTOS DEL MENÚ — edita nombres, descripciones y precios aquí.
   price: valor numérico sin puntos (la moneda se define en config.js)
   tag:   etiqueta opcional sobre la foto ('' para ocultarla)
   ========================================================= */
window.BH = window.BH || {};

BH.products = [
  {
    id: 'classic',
    name: 'Classic Burger',
    description: 'Carne de vacuno a la parrilla, cheddar, lechuga, tomate, cebolla morada y salsa de la casa.',
    price: 6990,
    image: 'assets/menu/classic-burger.jpg',
    alt: 'Hamburguesa clásica con lechuga, tomate y queso',
    tag: 'La de siempre',
  },
  {
    id: 'double-cheese',
    name: 'Double Cheese',
    description: 'Doble carne, doble cheddar fundido, pepinillos y mostaza dulce en pan brioche.',
    price: 8490,
    image: 'assets/menu/double-cheese.jpg',
    alt: 'Hamburguesa doble con cheddar fundido',
    tag: 'Más pedida',
  },
  {
    id: 'bacon',
    name: 'Bacon Burger',
    description: 'Carne a la parrilla, tocino crocante, cheddar, tomate, lechuga y mayonesa ahumada.',
    price: 8990,
    image: 'assets/menu/bacon-burger.jpg',
    alt: 'Hamburguesa con tocino, lechuga y tomate',
    tag: '',
  },
  {
    id: 'bbq',
    name: 'BBQ Burger',
    description: 'Doble carne, cebolla caramelizada, cheddar, tocino y salsa barbecue de cocción lenta.',
    price: 9290,
    image: 'assets/menu/bbq-burger.jpg',
    alt: 'Hamburguesa doble con cebolla y salsa barbecue',
    tag: '',
  },
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken',
    description: 'Pollo apanado extra crocante, ensalada de repollo, pepinillos y salsa picante suave.',
    price: 7990,
    image: 'assets/menu/crispy-chicken.jpg',
    alt: 'Hamburguesa de pollo crocante con salsa',
    tag: 'Crocante',
  },
  {
    id: 'veggie',
    name: 'Veggie Burger',
    description: 'Medallón de quinoa y legumbres, palta, tomate, rúcula y mayonesa vegana de ajo.',
    price: 7490,
    image: 'assets/menu/veggie-burger.jpg',
    alt: 'Hamburguesa vegetariana con palta y rúcula',
    tag: 'Vegetariana',
  },
];
