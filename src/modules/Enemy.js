import { Mob } from '../modules/Mob';

/**
 * A class for the player object.
 */
export class Enemy extends Mob {

  /**
   * Build the player object.
   * @returns {Trump}
   */
  constructor({
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    xVector = 0,
    yVector = 0,
    sprite = null,
  } = {}) {

    super({ x: x, y: y, w: w, h: h, xVector: xVector, yVector: yVector, sprite: sprite });
  }
}
