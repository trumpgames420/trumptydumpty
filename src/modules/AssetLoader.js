import { objSize, objKeys } from '../lib/utils';

/**
 * Possible asset loader statuses.
 * @enum {int}
 */
export const STATUS = {
  LOADING: 0,
  FINISHED: 1,
  ERROR: -1,
};

/**
 * Possible asset loader statuses.
 * @enum {event}
 */
export const EVENT = {
  STARTED: new Event('loaderStarted'),
  FINISHED: new Event('loaderFinished'),
  ERROR: new Event('loaderError'),
};

/**
 * A class for loading assets with status feedback.
 */
export class AssetLoader {

  /**
   * Build a new AssetLoader.
   * @param {object} assets - (required) key:value pairs of named Asset objects
   * @param {boolean} autoLoad - if TRUE will auto process Assets when added
   * @param {function} finished - the callback to fire when loading finishes
   * @returns {AssetLoader}
   */
  constructor({
    assets,
    autoLoad = true,
    finished = ()=>{},
    error = () => {},
  }) {
    /**
     * Flag to automatically process assets as they enter the queue.
     * @var boolean
     */
    this.autoLoad = autoLoad;

    /**
     * The callback to fire when loading finishes.
     * @var function
     */
    this.finished = finished;

    /**
     * The callback to fire when loading errors/stalls.
     * @var function
     */
    this.errored = error;

    /**
     * The total number of assets added to the queue.
     * @var int
     */
    this.totalAssets = 0;

    /**
     * An HTML5 progress bar element to display total completion.
     * @public
     */
    this.progressBar = document.createElement('progress');

    /**
     * The current status for the asset loader.
     * @public
     */
    this.loadStatus = STATUS.FINISHED;

    /**
     * An array of assets that haven't finished loading.
     * @public
     */
    this.unloadedAssets = {};

    /**
     * An array of assets that have finished loading.
     * @public
     */
    this.loadedAssets = {};

    /**
     * An array of assets that have errored or stalled.
     * @public
     */
    this.failedAssets = {};

    // Add new assets and update progress bar.
    this.addAssets(assets);
    this.refresh();
  }

  /**
   * Refresh the progress bar.
   * @returns {AssetLoader}
   */
  refresh() {
    if (this.loadStatus == STATUS.FINISHED) return this;

    var value = objSize(this.loadedAssets);
    this.progressBar.setAttribute('value', value);
    this.progressBar.setAttribute('max', this.totalAssets);

    if (this.totalAssets == value) {
      // Dispatch finished event if queue size = 0.
      this.loadStatus = STATUS.FINISHED;
      this.progressBar.dispatchEvent(EVENT.FINISHED);
      this.finished();
    }
    else if (this.unloadedAssets.length > 0) {
      // Dispatch error event if any assets error out.
      this.loadStatus = STATUS.ERROR;
      this.progressBar.dispatchEvent(EVENT.ERROR);
      this.errored();
    }

    return this;
  }

  /**
   * Add assets to the loading queue.
   * @param {object} newAssets - key: value object of new game assets
   * @returns {AssetLoader}
   * @throws TypeError - if one of the newAssets isn't an Asset object
   */
  addAssets(newAssets = {}) {
    for (var assetName in newAssets) {
      this.unloadedAssets[assetName] = newAssets[assetName];
      this.totalAssets++;
    }

    if (this.autoLoad) this.loadAll();
    this.refresh();

    return this;
  }

  /**
   * Load an asset in the queue.
   * @param {string} assetName - the name of the asset to load
   * @returns {AssetLoader}
   */
  load(assetName) {
    const self = this;

    // Already loaded.
    if (this.loadedAssets[assetName]) return this;

    this.loadStatus = STATUS.LOADING;

    // Listen for finished event and move to loaded array.
    this.unloadedAssets[assetName].element.addEventListener('assetFinished', () => {
      self.loadedAssets[assetName] = self.unloadedAssets[assetName];
      delete self.unloadedAssets[assetName];
      self.refresh();
    });

    // Error or stalled go into failed array.
    this.unloadedAssets[assetName].element.addEventListener('assetError', () => {
      self.failedAssets[assetName] = self.unloadedAssets[assetName];
      delete self.unloadedAssets[assetName];
      self.progressBar.dispatchEvent(EVENT.ERROR);
      self.refresh();
    });
    this.unloadedAssets[assetName].element.addEventListener('assetStalled', () => {
      self.failedAssets[assetName] = self.unloadedAssets[assetName];
      delete self.unloadedAssets[assetName];
      self.progressBar.dispatchEvent(EVENT.ERROR);
      self.refresh();
    });

    // Begin loading the asset.
    this.unloadedAssets[assetName].initialize();

    return this;
  }

  /**
   * Load all of the assets in the queue.
   * @returns {AssetLoader}
   */
  loadAll() {
    const keys = objKeys(this.unloadedAssets);

    for (let i = 0; i < keys.length; i++) {
      this.load(keys[i]);
    }

    return this;
  }

  /**
   * Get an asset from the loadedAssets array.
   * @param {string} assetName
   * @returns {Asset}
   */
  get(assetName) {
    return this.loadedAssets[assetName].retrieve();
  }
}
