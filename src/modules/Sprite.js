import { objKeys } from '../lib/utils';
import { Asset } from './Asset';

/**
 * A class for handling game sprite images.
 */
export class Sprite {

  /**
   * Build a new Sprite.
   * @param {string} asset - the Asset image object to use as a sprite
   * @param {object} animations - named animation sequences
   * @param {number} scaleFactorX - width multiplier for scaling
   * @param {number} scaleFactorY - height multiplier for scaling
   * @param {string} animation - a key from animations to start with
   * @param {int} frame - the animation frame to start with
   * @returns {Sprite}
   */
  constructor({
    asset,
    animations = {},
    scaleFactorX = 1,
    scaleFactorY = 1,
    animation = null,
    frame = 0,
  }) {

    /**
     * The src attribute for the sprite.
     * @var {Asset}
     */
    this.asset = asset;

    /**
     * An object containing named animation sequences.
     * @var {object}
     */
    this.animations = animations;

    /**
     * The current animation state.
     * @var {string}
     */
    this.animation = animation;

    /**
     * The Y scale factor to use when rendering the sprite frames.
     * @var {number}
     */
    this.scaleFactorY = scaleFactorY;

    /**
     * The X scale factor to use when rendering the sprite frames.
     * @var {number}
     */
    this.scaleFactorX = scaleFactorX;

     /**
      * The current animation frame state.
      * @var {int}
      */
    this.frame = frame;
  }

  /**
   * Add animation sequences to the sprite.
   * @public
   * @param {object} newAnimations
   *   an object literal of named animation sequences in the format:
   *   {
   *     walkRight: [[0,0,48,48],[48,0,48,48],[96,0,48,48],[144,0,48,48]],
   *     walkLeft:  [[0,48,48,48],[48,48,48,48],[96,48,48,48],[144,48,48,48]]
   *   };
   *   ...where each frame array contains 4 numbers: the x & y coordinates,
   *   and width & height of the sprite frame. This allows for arbitrarily
   *   arranged sprite and tile maps.
   * @returns {Sprite}
   */
  addAnimations(newAnimations = {}) {
    for (let key in newAnimations) {
      this.animations[key] = newAnimations[key];
    }

    return this;
  }

  /**
   * Render a sprite frame to a canvas.
   * @param {CanvasRenderingContext2D} context - a 2d canvas context
   * @param {int} x - the x coordinate of the canvas to render the sprite
   * @param {int} y - the y coordinate of the canvas to render the sprite
   * @returns {Asset}
   */
  draw(context, x, y) {
    // If no animations available, just render the whole image.
    if (this.animation === null) {
      context.drawImage(
        /* image   */ this.asset.element,
        /* sliceX  */ 0,
        /* sliceY  */ 0,
        /* sliceW  */ this.asset.element.width,
        /* sliceH  */ this.asset.element.height,
        /* canvasX */ x,
        /* canvasY */ y,
        /* scaleW  */ this.asset.element.width * this.scaleFactorX,
        /* scaleH  */ this.asset.element.height * this.scaleFactorY
      );
      return this;
    }

    const animation = this.animation || objKeys(this.animations)[0];
    const frame = this.frame || 0;
    const scaleWidth = this.animations[animation][frame][2] * this.scaleFactorX;
    const scaleHeight = this.animations[animation][frame][3] * this.scaleFactorY;

    context.drawImage(
      /* image   */ this.asset.element,
      /* sliceX  */ this.animations[animation][frame][0],
      /* sliceY  */ this.animations[animation][frame][1],
      /* sliceW  */ this.animations[animation][frame][2],
      /* sliceH  */ this.animations[animation][frame][3],
      /* canvasX */ x,
      /* canvasY */ y,
      /* scaleW  */ scaleWidth,
      /* scaleH  */ scaleHeight
    );

    return this;
  }

  /**
   * Load the sprite's asset element.
   * @returns {Sprite}
   */
  load(callback = ()=>{}) {
    this.asset.initialize(callback);
    return this;
  }
}
