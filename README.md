# BURGER HOUSE — plantilla para hamburgueserías

Plantilla de sitio web para restaurantes y pymes gastronómicas: menú con carrito, pedido por WhatsApp, formulario de contacto y una sección de scroll que desarma y vuelve a armar la hamburguesa con GSAP y ScrollTrigger.

Todos los datos son de ejemplo y se cambian desde archivos de configuración, sin tocar el diseño.

## Tecnologías

- HTML5, CSS3 y JavaScript ES6 (sin framework ni build)
- GSAP 3.12.5 + ScrollTrigger (copias locales en `js/vendor/`)

## Ejecutar

```
node dev-server.js
```

Luego abre http://localhost:5173. También puedes abrir `index.html` directamente.

## Personalizar para un cliente

| Qué cambiar | Dónde |
| --- | --- |
| Nombre de marca, WhatsApp, dirección, horario | `js/config.js` |
| Productos, descripciones y precios | `js/data/products.js` |
| Textos de la animación (ingredientes) | `js/data/ingredients.js` |
| Fotos del menú, hero y nosotros | `assets/menu/`, `assets/img/` |
| Fotogramas de la animación | `assets/burger/secuencia-transparente/` (o `secuencia-fondo/`) |
| Colores y tipografías | `css/base.css` (variables en `:root`) |
| Textos de la portada, nosotros y contacto | `index.html` |

## Publicar

El sitio es estático: se puede subir a Vercel, Netlify o GitHub Pages sin configuración. En Vercel, `vercel.json` ya lo deja como sitio estático.
