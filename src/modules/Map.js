/**
 * Groups multiple map layers into a single entity.
 */
export class Map {

  /**
   * @param {int} width - width of map in pixels
   * @param {int} height - height of the map in pixels
   * @param {array} layers - an array of MapLayer objects
   * @throws TypeError - on invalid width, height or layers options
   */
  constructor({ width = 0, height = 0, layers = [] }) {
    /**
     * The width (in pixels) of the map.
     * @var {int}
     */
    this.width = width;

    /**
     * The height (in pixels) of the map.
     * @var {int}
     */
    this.height = height;

    /**
     * An array of JS2D.Game.MapLayer objects to render as a map.
     * @var {array}
     */
    this.layers = layers;

    return this.render();
  }

  /**
   * Render all the map layers to their off-screen caches.
   * @returns {Map}
   */
  render = function() {
    for (l in this.layers) this.layers[l].render();
    return this;
  }
}
