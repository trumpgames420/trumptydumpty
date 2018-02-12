import { Asset, STATUS, EVENT } from './Asset';
import { Howl } from 'howler';

/**
 * A class for audio assets.
 */
export class AudioAsset extends Asset {

  /**
   * Build a new asset.
   * @param {string} src - a URL for the audio
   * @returns {AudioAsset}
   */
  constructor(src) {
    super(src);
    this.element = document.createElement('audio');

    this.howl = new Howl({
      autoplay: false,
      preload: false,
      src: src,
    });
  }

  /**
   * Initialize the asset.
   * @param {function} callback - called when loaded
   * @returns {AudioAsset}
   */
  initialize(callback = ()=>{}) {
    const self = this;

    this.howl.on('load', function() {
      self.loadStatus = STATUS.LOADED;
      self.element.dispatchEvent(EVENT.FINISHED);
      callback();
    });
    this.howl.on('loaderror', function(e) {
      self.loadStatus = STATUS.ERROR;
      self.element.dispatchEvent(EVENT.ERROR);
    });

    this.howl.load();
    return this;
  }

  /**
   * Retrieve the howl object instead of a DOM element.
   * @returns {AudioAsset}
   */
  retrieve() {
    return this.howl;
  }
}
