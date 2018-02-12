/**
 * A canvas viewport for displaying game maps.
 */
export class Camera {

  constructor({
    width = 0,
    height = 0,
    xOffset = 0,
    yOffset = 0,
    map = null,
  }) {

    /**
     * The width (in pixels) of the camera viewport.
     * @var {number}
     */
    this.width = width;

    /**
     * The height (in pixels) of the camera viewport.
     * @var {number}
     */
    this.height = height;

    /**
     * The x offset (in pixels) from the top left corner of the map.
     * @var {number}
     */
    this.xOffset = xOffset;

    /**
     * The y offset (in pixels) from the top left corner of the map.
     * @var {number}
     */
    this.yOffset = yOffset;

    /**
     * The game map this camera is bound to.
     * @var {Map}
     */
    this.map = map || new Map();

    /**
     * The HTML5 canvas element to use when rendering the map.
     * @var {HTMLCanvasElement}
     */
    this.element = document.createElement('canvas');
    this.element.width = this.width;
    this.element.height = this.height;

    /**
     * The rendering context for the canvas.
     * @var {CanvasRenderingContext2D}
     */
    this.lens = this.element.getContext('2d');

    /**
     * An array of camera effects for post-processing the image.
     * @var {array}
     */
    this.effects = [];

    return this;
  }

  /**
   * Get a snapshot of a given map at the current camera position.
   * @returns {ImageData}
   */
  getPicture = function() {
    this.lens.clearRect(0, 0, this.width, this.height);

    for (l in this.map.layers) {
      switch (this.map.layers[l].type) {
        case 'bg':
          x = this.map.layers[l].xOffset / this.map.layers[l].parallaxAmount;
          y = this.map.layers[l].yOffset / this.map.layers[l].parallaxAmount;
          this.lens.drawImage(this.map.layers[l].element, x, y);
          break;

        case 'sprite':
          // this.lens.drawImage(this.map.layers[l].element, this.map.layers[l].x - this.x, this.map.layers[l].y);
          this.lens.beginPath();
          this.lens.arc(this.map.layers[l].xOffset - this.xOffset, this.map.layers[l].yOffset - this.yOffset, 10, 0, 2 * Math.PI, false);
          this.lens.fillStyle = 'red';
          this.lens.fill();
          break;
      }
    }

    return this.lens.getImageData(0, 0, this.width, this.height);
  }

  /**
   * Move the camera's X position by a given number.
   * @param {number} vector
   * @returns {Camera}
   */
  moveX (vector) {
    return this.moveTo((this.xOffset + vector), this.yOffset);
  }

  /**
   * Move the camera's Y position by a given number.
   * @param {number} vector
   * @returns {Camera}
   */
  moveY(vector) {
    return this.moveTo(this.xOffset, (this.yOffset + vector));
  }

  /**
   * Move the camera to a new (x, y) offset.
   * @param {number} x - the new x coordinate
   * @param {number} y - the new y coordinate
   * @returns {Camera}
   */
  moveTo(x, y) {
    this.xOffset = x;
    this.yOffset = y;

    var maxXOffset = this.map.width - this.width;
    var maxYOffset = this.map.height - this.height;

    if (this.xOffset > maxXOffset) this.xOffset = maxXOffset;
    if (this.yOffset > maxYOffset) this.yOffset = maxYOffset;
    if (this.xOffset < 0) this.xOffset = 0;
    if (this.yOffset < 0) this.yOffset = 0;

    for (l in this.map.layers) {
      switch (this.map.layers[l].type) {
        case 'bg':
          this.map.layers[l].xOffset = -(this.xOffset / this.map.layers[l].parallaxAmount);
          this.map.layers[l].yOffset = -(this.yOffset / this.map.layers[l].parallaxAmount);
          break;
      }
    }
    return this;
  }

  /**
   * Center the camera on a given x, y coordinate.
   * @param {number} x - the x coordinate to center on
   * @param {number} y - the y coordiante to center on
   * @returns {Camera}
   */
  centerOn(x, y) {
    x = x - this.width / 2;
    y = y - this.height / 2;
    return this.moveTo(x, y);
  }
};
