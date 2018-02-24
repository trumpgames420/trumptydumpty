import { TilePalette } from './TilePalette';

/**
 * A 2D map of Tile objects.
 */
export class TileMap {

  /**
   * A 2D map of Tile objects.
   * @param {int} width - the width of the map (in tiles)
   * @param {int} height - the height of the map (in tiles)
   * @param {int} tileWidth - the width of a single map tile
   * @param {int} tileHeight - the height of a single map tile
   * @param {array} tiles - a matrix of map tiles
   * @param {TilePalette} palette - a TilePalette object with tile sprites
   * @returns {TileMap}
   */
  constructor({
    width = 0,
    height = 0,
    tileWidth = 0,
    tileHeight = 0,
    tiles = [],
    palette = null,
  }) {

    /**
     * The width (in tiles) of the map.
     * @var {number}
     */
    this.width = width || 0;

    /**
     * The height (in tiles) of the map.
     * @var {number}
     */
    this.height = height;

    /**
     * The width (in pixels) of an individual tile.
     * @var {number}
     */
    this.tileWidth = tileWidth;

    /**
     * The height (in pixels) of an individual tile.
     * @var {number}
     */
    this.tileHeight = tileHeight;

    /**
     * A palette of tile information for tiles used in this map.
     * @var {TilePalette}
     */
    this.palette = palette || new TilePalette();

    /**
     * The array of tiles that form the map.
     * @var {number}
     */
    this.tiles = tiles;

    if (tiles) {
      for (let i = 0; i < tiles.length; i++) {
        this.changeTileIndex(i, tiles[i]);
      }
    }
  }

  /**
   * Change the current palette.
   * @param {TilePalette} newPalette - a new TilePalette object
   * @returns {TileMap}
   */
  changePalette(newPalette) {
    this.palette = newPalette;
    return this;
  }

  /**
   * Change a tile in the map.
   * @param {int} x - the x coordinate of the tile to change
   * @param {int} y - the y coordinate of the tile to change
   * @param {int} newTile - a new tile from the palette to replace this tile
   * @returns {TileMap}
   */
  changeTile(x, y, newTile) {
    return this.changeTileIndex(((y * this.width) + x), newTile);
  }

  /**
   * Change a tile in the map, by index.
   * @param {int} index - the array index of the tile to change
   * @param {int} newTile - a new tile from the palette to replace this tile
   * @returns {TileMap}
   */
  changeTileIndex(index, newTile) {
    this.tiles[index] = newTile;
    return this;
  }

  /**
   * Retrieve a tile in the map.
   * @param {int} x - the x coordinate of the tile to get
   * @param {int} y - the y coordinate of the tile to get
   * @returns {int}
   */
  getTile(x, y) {
    return this.getTileIndex(((y * this.width) + x));
  }

  /**
   * Retrieve a tile in the map by index.
   * @param {int} index - the array index of the tile to change
   * @returns {int}
   */
  getTileIndex(index) {
    return this.tiles[index];
  }

  /**
   * Render a tile map to a canvas.
   * @param {CanvasRenderingContext2D} context - a 2d canvas context
   * @param {int|string} x - the x coordinate of the canvas to render the map
   *   if string: 'center' will center the tilemap horizontally
   * @param {int|string} y - the y coordinate of the canvas to render the map
   *   if string: 'center' will center the tilemap vertically
   * @returns {TileMap}
   */
  draw(context, x = 0, y = 0) {
    if (x == 'center') {
      x = (context.canvas.width / 2) - (this.width * this.tileWidth / 2);
    }
    if (y == 'center') {
      y = (context.canvas.height / 2) - (this.height * this.tileHeight / 2);
    }

    // Render entire map.
    for (let mapY = 0; mapY < this.height; mapY++) {
      for (let mapX = 0; mapX < this.width; mapX++) {
        var tile = this.palette.tiles[this.getTile(mapX, mapY)];
        var sprite;

        // Use empty tile when invalid tile is encountered.
        tile = tile || this.palette.tiles[0];

        if (sprite = tile[0]) {
          sprite.animation = tile[1] || null;
          sprite.frame = tile[2] || 0;

          if (sprite && sprite.animation) {
            sprite.draw(
              context,
              x + (mapX * this.tileWidth),
              y + (mapY * this.tileHeight),
              this.tileWidth,
              this.tileHeight,
            );
          }
        }
      }
    }

    return this;
  }
};
