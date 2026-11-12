# BURGER HOUSE

Web gourmet para una hamburguesería: menú con carrito, pedido por WhatsApp y una sección de scroll que desarma y vuelve a armar la hamburguesa con GSAP y ScrollTrigger.

## Tecnologías

- HTML5, CSS3 y JavaScript ES6 (sin framework ni build)
- GSAP 3.12.5 + ScrollTrigger (copias locales en `js/vendor/`)

## Ejecutar

```
node server.js
```

Luego abre http://localhost:5173. También puedes abrir `index.html` directamente.

## Configuración

- Datos del local (WhatsApp, dirección, horario): `js/config.js`
- Productos y precios: `js/data/products.js`
- Fotogramas de la animación: `js/data/ingredients.js`
