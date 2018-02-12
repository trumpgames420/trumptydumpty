/**
 * Possible asset statuses.
 * @enum {int}
 */
export const STATUS = {
  NOT_LOADED: 0,
  LOADED: 1,
  LOADING: 2,
  STALLED: -1,
  ERROR: -1
};

/**
 * A unified event interface for all asset types.
 * @enum {Event}
 */
export const EVENT = {
  LOADING: new Event('assetLoading'),
  FINISHED: new Event('assetFinished'),
  ERROR: new Event('assetError'),
  STALLED: new Event('assetStalled')
};

/**
 * A base class for loading any assets.
 */
export class Asset {

  /**
   * Build a new asset.
   * @param {string} src - a URL for the asset
   * @returns {Asset}
   */
  constructor(src) {

    /**
     * The DOM element tag to associate with this asset.
     * @var HTMLElement
     */
    this.element = null;

    /**
     * The URL of the asset.
     * @var string
     */
    this.src = src;

    /**
     * The current loadStatus of this asset.
     * @var int
     */
    this.loadStatus = STATUS.NOT_LOADED;
  }

  /**
   * Initialize the asset.
   * @param {function} callback - called when loaded
   * @returns {Asset}
   */
  initialize(callback = ()=>{}) {
    const self = this;

    this.element.addEventListener('load', function() {
      self.loadStatus = STATUS.LOADED;
      self.element.dispatchEvent(EVENT.FINISHED);
      callback();
    });
    this.element.addEventListener('error', function(e) {
      self.loadStatus = STATUS.ERROR;
      self.element.dispatchEvent(EVENT.ERROR);
    });

    return this;
  }

  /**
   * Retrieve the asset.
   * @returns {HTMLElement}
   */
  retrieve() {
    return this.element;
  }
}
