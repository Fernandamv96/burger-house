/* =========================================================
   SECUENCIA DE LA HAMBURGUESA (animación con scroll)
   Los fotogramas salen de los GIF originales
   (assets/burger/originales/) y se llaman frame-0.png ... frame-8.png
   ========================================================= */
window.BH = window.BH || {};

BH.burgerSequence = {
  // Alternativa con fondo fotográfico oscuro:
  //   folder: 'assets/burger/secuencia-fondo', width: 436, height: 381
  folder: 'assets/burger/secuencia-transparente',
  width: 443,
  height: 394,
  frames: 9,
  assembledFrame: 7, // hamburguesa completa
  finalFrame: 8, // completa con destellos
};

/* Cada paso corresponde al fotograma donde aparece el ingrediente */
BH.ingredients = [
  { frame: 0, name: 'Pan superior e inferior', text: 'Brioche con sésamo, horneado cada mañana y tostado con mantequilla.' },
  { frame: 1, name: 'Lechuga', text: 'Hojas frescas y crocantes.' },
  { frame: 2, name: 'Tomate', text: 'Rodajas maduras cortadas al momento.' },
  { frame: 3, name: 'Cebolla morada', text: 'Aros finos con un toque dulce.' },
  { frame: 4, name: 'Queso cheddar', text: 'Fundido sobre la carne caliente.' },
  { frame: 5, name: 'Carne', text: '100% vacuno, sellada a la parrilla.' },
];
