import { Object2D } from '../modules/Object2D';

/**
 * A class for generic mobile game objects.
 */
export class Mob extends Object2D {

  /**
   * Build the mobile object.
   * @returns {Mob}
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

    super({ x: x, y: y, w: w, h: h, xVector: xVector, yVector: yVector });

    /**
     * The mob image sprite.
     * @var {Sprite}
     */
    this.sprite = sprite;
  }

  /**
   * Render a mob to a given canvas.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Mob}
   */
  draw(ctx) {
    let scale = ctx.canvas.scaleFactor || 1;
    if (this.x == 'center') this.x = (ctx.canvas.width / 2) - (this.w / 2);
    if (this.y == 'center') this.y = (ctx.canvas.height / 2) - (this.h / 2);
    this.sprite.draw(ctx, this.x * scale, this.y * scale, this.w * scale, this.h * scale);
    return this;
  }
}
