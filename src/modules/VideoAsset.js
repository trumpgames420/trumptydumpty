import { ImageAsset, EVENT } from './ImageAsset';

/**
 * A base class for a video asset.
 */
export class VideoAsset extends ImageAsset {

  /**
   * Build a new asset.
   * @param {string} src - a URL for the video
   * @returns {VideoAsset}
   */
  constructor(src) {
    super(src);
    this.element = document.createElement('video');
  }

  /**
   * Initialize the asset.
   * @param {function} callback - called when loaded
   * @returns {VideoAsset}
   */
  initialize(callback = ()=>{}) {
    const self = this;

    this.element.addEventListener('canplaythrough', function() {
      if (self.loadStatus !== STATUS.LOADED) {
        self.loadStatus = STATUS.LOADED;
        self.element.dispatchEvent(EVENT.FINISHED);
        callback();
      }
    });
    this.element.addEventListener('stalled', function() {
      self.loadStatus = STATUS.STALLED;
      self.element.dispatchEvent(EVENT.STALLED);
    });
    this.element.addEventListener('error', function() {
      self.loadStatus = STATUS.ERROR;
      self.element.dispatchEvent(EVENT.ERROR);
    });

    return this;
  }
}
