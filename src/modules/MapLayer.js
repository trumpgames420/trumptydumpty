/**
 * A class for individual map layers in a 2D play area.
 */
export class MapLayer {

  /**
   * Build a new MapLayer.
   * @returns {MapLayer}
   */
  constructor({
    width = 0,
    height = 0,
    xOffset = 0,
    yOffset = 0,
    source: null,
  }) {

    /**
     * The width (in pixels) of the map layer.
     * @var {number}
     */
    this.width = width;

    /**
     * The height (in pixels) of the map layer.
     * @var {number}
     */
    this.height = height;

    /**
     * The X coord offset (in pixels) from the top left corner of the map.
     * @var {number}
     */
    this.xOffset = xOffset;

    /**
     * The Y coord offset (in pixels) from the top left corner of the map.
     * @var {number}
     */
    this.yOffset = yOffset;

    /**
     * The source object for rendering (must implement draw()).
     * @var {Asset|Sprite|TileMap}
     */
    this.source = source;

    /**
     * The HTML5 canvas element to use when rendering this layer.
     * @var
     */
    this.element = document.createElement('canvas');
    this.element.width = this.width;
    this.element.height = this.height;

    /**
     * The rendering context for the canvas layer.
     * @var {CanvasRenderingContext2D}
     */
    this.cache = this.element.getContext('2d');

    return this;
  }

  /**
   * Render the map layer to its in-memory canvas.
   * @returns {MapLayer}
   */
  render() {
    this.source.draw(this.cache, this.xOffset, this.yOffset);
    return this;
  }
};
