import { Object2D } from '../modules/Object2D';
import { Sprite } from '../modules/Sprite';

/**
 * The distance the player will move in a single tick.
 * @var {number}
 */
export const STEP_SIZE = 5;

/**
 * A class for the player object.
 */
export class Player extends Object2D {

  /**
   * Build the player object.
   * @returns {Trump}
   */
  constructor({
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    sprite = new Sprite(),
  } = {}) {

    super({ x: x, y: y, w: w, h: h });

    /**
     * The player image sprite.
     * @var {ImageAsset}
     */
    this.sprite = sprite;

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

  draw(ctx) {
    let scale = ctx.canvas.scaleFactor || 1;
    if (this.x == 'center') this.x = (ctx.canvas.width / 2) - (this.w / 2);
    if (this.y == 'center') this.y = (ctx.canvas.height / 2) - (this.h / 2);
    this.sprite.draw(ctx, this.x * scale, this.y * scale, this.w * scale, this.h * scale);
  }
}
