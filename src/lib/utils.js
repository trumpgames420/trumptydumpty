import { ImageAsset } from '../modules/ImageAsset';

/**
 * Clear a canvas of all image data.
 * @param {CanvasRenderingContext2D} ctx - the 2d context of the canvas
 * @param {string} style - a stylized canvas wipe
 * @param {number} speed - number of seconds (approx) to complete wipe
 * @todo Add some fancy animated wipes.
 */
export const canvasClear = (ctx, style = 'clear', speed = 1) => {
  var tick = ()=>{};

  switch (style) {
    case 'top2bottom':
      var y = 0;
      var length = ctx.canvas.height / (30 * speed);

      tick = (time) => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineWidth = length + 2;
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
        y += length;

        let done = (y >= (ctx.canvas.height + length));
        if (!done) window.requestAnimationFrame(tick);
      }
      break;

    case 'clear':
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      break;
  }

  window.requestAnimationFrame(tick);
}

/**
 * Return the keys of an array or object.
 * @param {object} object - a JSON object
 * @returns {array} - an array of key strings
 * @throws TypeError - when object is invalid
 */
export const objKeys = (object) => {
  if (typeof object !== 'object') {
    throw new TypeError('objKeys(): parameter must be of type object.');
  }

  var keys = [];

  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      keys.push(prop);
    }
  }

  return keys;
}

/**
 * Count the elements in an object.
 * @param {object|array} a JSON object or array
 * @return {int} the number of properties in the object
 * @throws TypeError - when object is invalid
 */
export const objSize = (object) => {
  if (object.isArray) return object.length;

  if (typeof object !== 'object') {
    throw new TypeError('objSize(): parameter must be of type object.');
  }

  var size = 0;
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      size++;
    }
  }

  return size;
}

/**
 * Get a random image given dimensions.
 * @param {number} width - width (in pixels)
 * @param {number} height - height (in pixels)
 * @returns {number} a random image URL
 */
export const randomImage = (width = 50, height = 50) => {
  const image = randomInt(0, 1000);

  return new ImageAsset({
    src: `https://picsum.photos/${width}/${height}/?image=${image}`
  });
}

/**
 * Get a random integer between 'min' and 'max'.
 * @param {number} min - min number
 * @param {number} max - max number
 * @returns {number} a random integer
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
