import { Asset, EVENT, STATUS } from './Asset';

/**
 * A base class for image, sound, and video assets.
 */
export class ImageAsset extends Asset {

  /**
   * Build a new asset.
   * @param {string} src - a URL for the image
   * @returns {ImageAsset}
   */
  constructor(src) {
    super(src);
    this.element = document.createElement('img');
  }

  /**
   * Initialize the asset.
   * @param {function} callback - called when loaded
   * @returns {ImageAsset}
   */
  initialize(callback = ()=>{}) {
    const self = this;

    const finished = () => {
      self.loadStatus = STATUS.LOADED;
      self.element.dispatchEvent(EVENT.FINISHED);
      callback();
    }

    // Short-circuit if <img> is in cache (no load event).
    if (this.element.complete) {
      finished();
      return this;
    }

    this.element.addEventListener('load', function() {
      finished();
    });

    this.element.addEventListener('error', function(e) {
      self.loadStatus = STATUS.ERROR;
      self.element.dispatchEvent(EVENT.ERROR);
    });

    return this;
  }

  /**
   * Render an Asset to a canvas.
   * @param {CanvasRenderingContext2D} context - a 2d canvas context
   * @param {int} x - the x coordinate of the canvas to render the sprite
   * @param {int} y - the y coordinate of the canvas to render the sprite
   * @param {int} sliceX - the top left X coord of the slice to render
   * @param {int} sliceY - the top left Y coord of the slice to render
   * @param {int} sliceWidth - the width of the slice
   * @param {int} sliceHeight - the height of the slice
   * @param {int} scaleWidth - the width to scale to on render
   * @param {int} scaleHeight - the height to scale to on render
   * @returns {Asset}
   */
  draw(context, {
    x = 0,
    y = 0,
    sliceX = 0,
    sliceY = 0,
    sliceWidth = null,
    sliceHeight = null,
    scaleWidth = null,
    scaleHeight = null,
  }) {

    // console.log(x, y, sliceX, sliceY, sliceWidth);
    context.drawImage(
      /* source  */ this.element,
      /* sliceX  */ sliceX,
      /* sliceY  */ sliceY,
      /* sliceW  */ (sliceWidth) ? sliceWidth : this.element.width,
      /* sliceH  */ (sliceHeight) ? sliceHeight : this.element.height,
      /* canvasX */ x,
      /* canvasY */ y,
      /* scaleW  */ (scaleWidth) ? scaleWidth : this.element.width,
      /* scaleH  */ (scaleHeight) ? scaleHeight : this.element.height,
    );

    return this;
  }
}
