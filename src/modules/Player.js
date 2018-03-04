import { Mob } from '../modules/Mob';
import { Sprite } from '../modules/Sprite';

/**
 * The distance the player will move in a single tick.
 * @var {number}
 */
export const STEP_SIZE = 5;

/**
 * A class for the player object.
 */
export class Player extends Mob {

  /**
   * Build the player object.
   * @returns {Player}
   */
  constructor({
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    sprite = new Sprite(),
  } = {}) {

    super({ x: x, y: y, w: w, h: h, sprite: sprite });

    this.movingLeft = false;
    this.movingRight = false;
  }

  moveLeft() {
    this.movingLeft = true;
    return this;
  }

  moveRight() {
    this.movingRight = true;
    return this;
  }

  stopMoving() {
    this.movingLeft = false;
    this.movingRight = false;
    return this;
  }
}
