import { Mob } from '../modules/Mob';

/**
 * A base class for all projectiles.
 */
export class Projectile extends Mob {

  /**
   * Build a new two-dimensional game object.
   * @returns {Projectile}
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
