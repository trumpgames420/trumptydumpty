import { randomImage } from './lib/utils';
import { Asset } from './modules/Asset';
import { Controller, KEYS, KEY_STATE } from './modules/Controller';
import { Sprite } from './modules/Sprite';

// window.S = new Sprite({
//   asset: randomImage(250, 250),
//   scaleWidth: 2,
//   scaleHeight: 2,
// });

// window.C = new Controller({
//   on: true,
// });

// S.isScalingX = false;
// S.isScalingY = false;
// S.scalingWidth = S.scaleWidth;
// S.scalingHeight = S.scaleHeight;

// C.addButtonEvent({
//   key: KEYS.DOWN,
//   press: function() { S.isScalingY = true; S.scalingHeight = 0.1; },
//   release: function() { S.isScalingY = false; S.scalingHeight = 0; }
// });
// C.addButtonEvent({
//   key: KEYS.UP,
//   press: function() { S.isScalingY = true; S.scalingHeight = -0.1; },
//   release: function() { S.isScalingY = false; S.scalingHeight = 0; }
// });
// C.addButtonEvent({
//   key: KEYS.LEFT,
//   press: function() { S.isScalingX = true; S.scalingWidth = -0.1; },
//   release: function() { S.isScalingX = false; S.scalingWidth = 0; }
// });
// C.addButtonEvent({
//   key: KEYS.RIGHT,
//   press: function() { S.isScalingX = true; S.scalingWidth = 0.1; },
//   release: function() { S.isScalingX = false; S.scalingWidth = 0; }
// });

// window.A = randomImage(250, 250);

// A.initialize(() => {
//   const canvas = document.getElementById('test');
//   const context = canvas.getContext('2d');

//   const render = tick => {

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     // if (S.isScalingX) S.scaleWidth += S.scalingWidth;
//     // if (S.scaleWidth > 2) S.scaleWidth = 2;
//     // if (S.scaleWidth < 0) S.scaleWidth = 0;

//     // if (S.isScalingY) S.scaleHeight += S.scalingHeight;
//     // if (S.scaleHeight > 2) S.scaleHeight = 2;
//     // if (S.scaleHeight < 0) S.scaleHeight = 0;

//     A.scaleHeight = Math.abs(2 * Math.sin(2 * Math.PI * .25 * (tick / 1000)));
//     A.scaleWidth = Math.abs(2 * Math.sin(2 * Math.PI * .25 * (tick / 1000)));

//     A.draw(context, {
//       scaleWidth: A.element.width * A.scaleWidth,
//       scaleHeight: A.element.height * A.scaleHeight,
//     });
//     window.requestAnimationFrame(render);
//   }

//   window.requestAnimationFrame(render);
// });
