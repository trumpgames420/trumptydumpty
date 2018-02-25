
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
}
