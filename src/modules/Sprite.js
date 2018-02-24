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
   * @param {string} animation - a key from animations to start with
   * @param {int} frame - the animation frame to start with
   * @returns {Sprite}
   */
  constructor({
    asset = null,
    animations = null,
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
   * @param {CanvasRenderingContext2D} ctx - a 2d canvas context
   * @param {int|string} x - the x coordinate of the canvas to render
   *   if string - 'center' will center horizontally in canvas
   * @param {int|string} y - the y coordinate of the canvas to render
   *   if string - 'center' will center vertically in canvas
   * @param {int} w - the scaled width of the sprite
   * @param {int} h - the scaled height of the sprite

   * @returns {Asset}
   */
  draw(ctx, x, y, w = null, h = null) {
    const el = this.asset;

    if (x == 'center') {
      x = (ctx.canvas.width / 2) - (w / 2);
    }
    if (y == 'center') {
      y = (ctx.canvas.height / 2) - (h / 2);
    }

    // If no animations available, just render the whole image.
    if (this.animation === null) {
      ctx.drawImage(
        /* image   */ el,
        /* sliceX  */ 0,
        /* sliceY  */ 0,
        /* sliceW  */ el.width,
        /* sliceH  */ el.height,
        /* canvasX */ x,
        /* canvasY */ y,
        /* scaleW  */ w ? w : el.width,
        /* scaleH  */ h ? h : el.height,
      );
      return this;
    }

    const animation = this.animation || objKeys(this.animations)[0];
    const frame = this.frame || 0;

    ctx.drawImage(
      /* image   */ el,
      /* sliceX  */ this.animations[animation][frame][0],
      /* sliceY  */ this.animations[animation][frame][1],
      /* sliceW  */ this.animations[animation][frame][2],
      /* sliceH  */ this.animations[animation][frame][3],
      /* canvasX */ x,
      /* canvasY */ y,
      /* scaleW  */ w ? w : el.width,
      /* scaleH  */ h ? h : el.height
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
