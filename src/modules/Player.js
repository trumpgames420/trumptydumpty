import { TimedEvent } from '../modules/TimedEvent';
import { Mob } from '../modules/Mob';

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
    sprite = null,
  } = {}) {

    super({ x: x, y: y, w: w, h: h, sprite: sprite });

    this.movingLeft = false;
    this.movingRight = false;
    this.sprite.animation = 'trump';
  }

  moveLeft() {
    this.movingLeft = true;
    this.movingRight = false;
    this.xVector = -2;
    this.sprite.animation = 'walk_left';
    this.sprite.frame = 1;

    const self = this;
    const animator = new TimedEvent(() => {
      this.sprite.frame = (this.sprite.frame == 0) ? 1 : 0;
    }, {
      delay: 200,
      repeat: true,
      until: () => { return !self.movingLeft; }
    });

    return this;
  }

  moveRight() {
    this.movingRight = true;
    this.movingLeft = false;
    this.xVector = 2;
    this.sprite.animation = 'walk_right';
    this.sprite.frame = 1;

    const self = this;
    const animator = new TimedEvent(() => {
      this.sprite.frame = (this.sprite.frame == 0) ? 1 : 0;
    }, {
      delay: 200,
      repeat: true,
      until: () => { return !self.movingRight; }
    });

    return this;
  }

  stopMoving() {
    this.movingLeft = false;
    this.movingRight = false;
    this.xVector = 0;
    this.sprite.animation = 'trump';
    this.sprite.frame = 0;
    return this;
  }
}
