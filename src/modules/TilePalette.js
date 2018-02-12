/**
 * A container class for sprite tiles.
 * @returns {TilePalette}
 */
export class TilePalette {

  /**
   * Build a TilePalette.
   * @param {array} tiles - an array of [Sprite, 'animationName']
   */
  constructor(tiles = []) {

    /**
     * A map of tile information from one or more loaded sprites.
     * Note that index 0 is reserved for "no tile".
     * @var {array}
     */
    this.tiles = tiles;
    if (options.tiles) this.addTiles(options.tiles);
  }

  /**
   * Adds a single tile to the end of the palette.
   * @param {array} newTile - a new palette tile in the format:
   *   [
   *     [ spriteObject, 'animationName' ],
   *     [ spriteObject, 'animationName' ],
   *   ];
   *   where assetObject is a fully-loaded Sprite image, and
   *   animationName is the name of an animation sequence from this Sprite
   * @returns {TilePalette}
   */
  addTile(newTile) {
    this.tiles.push(newTile);
    return this;
  }

  /**
   * Add sprite coordinate information to the palette.
   * @param {array} newTiles - an array of new palette sprites
   * @returns {TilePalette}
   */
  addTiles(newTiles) {
    for (key in newTiles) {
      this.addTile(newTiles[key]);
    }
    return this;
  }

  /**
   * If a given tile has multiple animation frames, advance to the next one.
   * @param {int} newTile - a new tile to replace this tile
   * @param {int} index (optional) - if index exists, replace, otherwise append
   * @returns {TileMap}
   */
  animateTile (index) {
    var sprite = this.tiles[index][0];
    var animation = this.tiles[index][1];
    var currentFrame = sprite.animations[animation].shift();
    sprite.animations[animation].push(currentFrame);
    return this;
  }


  /**
   * Advance all frames on all sprite animations.
   * @returns {TilePalette}
   */
  animateAllTiles() {
    for (var i = 1; i < this.tiles.length; i++) {
      this.animateTile(i);
    }
    return this;
  }

  /**
   * Change a tile in the palette.
   * @param {int} newTile - a new tile to replace this tile
   * @param {int} index (optional) - if index exists, replace, otherwise append
   * @returns {TilePalette}
   */
  changeTile(newTile, index) {
    if (typeof index === 'number') {
      this.tiles[index] = newTile;
    }
    else {
      this.addTile(newTile);
    }

    return this;
  }
};
