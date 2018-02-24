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

    const loaded = () => {
      self.loadStatus = STATUS.LOADED;
      self.element.dispatchEvent(EVENT.FINISHED);
      callback();
    }

    const errored = () => {
      self.loadStatus = STATUS.ERROR;
      self.element.dispatchEvent(EVENT.ERROR);
    }

    this.element.addEventListener('load', loaded);
    this.element.addEventListener('error', errored);
    this.element.src = this.src;

    // Short-circuit if <img> is in cache (no load event).
    setTimeout(() => {
      if (self.element.complete || self.element.readyState === 4) {
        self.element.removeEventListener('load', loaded, true);
        self.element.removeEventListener('error', errored, true);
        loaded();
        return self;
      }
    }, 100);
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
