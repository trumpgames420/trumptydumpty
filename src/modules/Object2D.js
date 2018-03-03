
/**
 * A base class for all objects in map space.
 */
export class Object2D {

  /**
   * Build a new two-dimensional game object.
   * @returns {Object2D}
   */
  constructor({
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    xVector = 0,
    yVector = 0
  } = {}) {

    /**
     * The x coordinate, in relation to a map's top left corner.
     * @var {int}
     */
    this.x = x;

    /**
     * The y coordinate, in relation to a map's top left corner.
     * @var {int}
     */
    this.y = y;

    /**
     * The width of the object, in pixels.
     * @var {int}
     */
    this.w = w;

    /**
     * The height of the object, in pixels.
     * @var {int}
     */
    this.h = h;

    /**
     * The X vector applied to the object on move().
     * @var {number}
     */
    this.xVector = xVector;

    /**
     * The Y vector applied to the object on move().
     * @var {number}
     */
    this.yVector = yVector;
  }

  /**
   * Move the object to a new position on the map.
   * @returns {Object2D}
   */
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Update the position of the object, based on its vectors.
   * @returns {Object2D}
   */
  move() {
    this.x += this.xVector;
    this.y += this.yVector;
    return this;
  }

  /**
   * Determine if this 2D object is colliding with a given boundary.
   * @param {int} x - the x coordinate of the object
   * @param {int} y - the y coordinate of the object
   * @param {int} w - the width of the object
   * @param {int} h - the height of the object
   * @returns {boolean}
   */
  isInBounds(x = 0, y = 0, w = 0, h = 0) {
    return (
      this.x + this.w >= x &&
      this.y + this.h >= y &&
      this.x <= w &&
      this.y <= h
    );
  }

  /**
   * Determine if this 2D object is colliding with another.
   * @returns {boolean}
   */
  collidesWith(object) {
    return this.isInBounds(object.x, object.y, object.w, object.h);
  }

  /**
   * Determine if this 2D object is visible on a given canvas.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {boolean}
   */
  isVisible(ctx) {
    return this.isInBounds(0, 0, ctx.canvas.origW, ctx.canvas.origH);
  }
}
