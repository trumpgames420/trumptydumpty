import { Asset } from './Asset';
import { AssetLoader } from './AssetLoader';
import { Controller, KEYS } from './Controller';

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

  constructor({
    screen = 'tv',
    state = STATE.OFF
  } = {}) {

    /**
     * The HTML canvas object to which final images will be rendered.
     * @var {HTMLCanvasElement}
     */
    this.screen = document.getElementById(screen);

    /**
     * The current game state.
     * @var {int}
     */
    this.state = state;

    /**
     * Controller for Player 1.
     * @var Controller
     */
    this.controller1 = new Controller();
  }



  initialize() {
  }

  destroy() {
    const ctx = this.screen.getContext('2d');
    ctx.clearRect(0, 0, this.screen.width, this.screen.height);
  }

  titleScreen() {

  }

  on() {
    this.state = STATE.ON;
    this.initialize();
  }

  off() {
    this.state = STATE.OFF;
    this.destroy();
  }

  pause() {
    this.state = STATE.PAUSED;
  }
}
