import { canvasClear } from '../lib/utils';
import { Asset } from '../modules/Asset';
import { AssetLoader } from '../modules/AssetLoader';
import { Controller, KEYS } from '../modules/Controller';

/**
 * Possible game state values.
 * @enum {int}
 */
export const STATE = {
  OFF: 0,
  ON: 1,
  PAUSED: 2,
}

/**
 * Game engine class.
 */
export class Game {

  /**
   * Build a new Game object.
   * @param {string} screen - the DOM id of the screen Canvas object
   */
  constructor() {

    /**
     * The HTML canvas object to which final images will be rendered.
     * @var {HTMLCanvasElement}
     */
    this.screen = document.getElementById('tv');

    /**
     * The current game state.
     * @var {int}
     */
    this.state = STATE.OFF;

    /**
     * An asset loader for general game assets.
     * @var {AssetLoader}
     */
    this.assets = new AssetLoader({
      autoLoad: true,
      finished: () => {
        // ...
      }
    });

    /**
     * Controller for Player 1.
     * @var Controller
     */
    this.controller1 = new Controller();

    return this.initialize();
  }

  /**
   * Initialize the game.
   * @returns {Game}
   */
  initialize() {
    canvasClear(this.screen.getContext('2d'), 'top2bottom', 1.5);
    return this;
  }

  /**
   * Clean up any visual data after game has been powered off.
   * @return {Game}
   */
  destroy() {
    return this;
  }

  /**
   * Pause the game state.
   * @returns {Game}
   */
  on() {
    this.state = STATE.ON;
    return this.initialize();
  }

  /**
   * Pause the game state.
   * @returns {Game}
   */
  off() {
    this.state = STATE.OFF;
    return this.destroy();
  }

  /**
   * Pause the game state.
   * @returns {Game}
   */
  pause() {
    this.state = STATE.PAUSED;
    return this;
  }
}
