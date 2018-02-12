import { Asset } from '../modules/Asset';

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
 * Get a random integer between 'min' and 'max'.
 * @param {number} min - min number
 * @param {number} max - max number
 * @returns {number} a random integer
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random image given dimensions.
 * @param {number} width - width (in pixels)
 * @param {number} height - height (in pixels)
 * @returns {number} a random image URL
 */
export const randomImage = (width = 50, height = 50) => {
  const image = randomInt(0, 1000);

  return new Asset({
    type: 'image',
    src: `https://picsum.photos/${width}/${height}/?image=${image}`
  });
}
