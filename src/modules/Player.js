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

    this.isShooting = false;
    this.movingLeft = false;
    this.movingRight = false;
    this.sprite.animation = 'trump';
  }

  moveLeft() {
    if (this.movingLeft) return;
    this.movingLeft = true;
    this.movingRight = false;
    this.xVector = -2;
    this.sprite.animation = 'walk_left';
    this.sprite.frame = 0;

    const self = this;
    const animator = new TimedEvent(() => {
      self.sprite.animation = 'walk_left';
      self.sprite.frame = (self.sprite.frame == 0) ? 1 : 0;
    }, {
      delay: 200,
      repeat: true,
      until: () => { return !self.movingLeft; }
    });

    return this;
  }

  moveRight() {
    if (this.movingRight) return;
    this.movingRight = true;
    this.movingLeft = false;
    this.xVector = 2;
    this.sprite.animation = 'walk_right';
    this.sprite.frame = 0;

    const self = this;
    const animator = new TimedEvent(() => {
      self.sprite.animation = 'walk_right';
      self.sprite.frame = (self.sprite.frame == 0) ? 1 : 0;
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

    return this;
  }

  shootUp() {
    this.sprite.animation = 'shoot_up';
    this.sprite.frame = 0;
    this.isShooting = true;

    const self = this;
    const animator = new TimedEvent(() => {
      self.isShooting = false;
    }, { delay: 100 });

    return this;
  }

  shootDown() {
    this.sprite.animation = 'shoot_down';
    this.sprite.frame = 0;
    this.isShooting = true;

    const self = this;
    const animator = new TimedEvent(() => {
      self.isShooting = false;
    }, { delay: 100 });


    return this;
  }
}
