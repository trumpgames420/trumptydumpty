/**
 * @enum {int} key event states
 */
export const KEY_STATE = {
  PRESSED: 1,
  RELEASED: 0
};

/**
 * @enum {int} various event key codes
 */
export const KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  W: 87,
  S: 83,
  A: 65,
  D: 68
};

/**
 * A class to emulate a game controller.
 */
export class Controller {

  /**
   * Build a new game controller.
   * @param {boolean} on - if TRUE, will turn controller on
   * @param {object} events - key:value pairs of keycodes and callbacks
   * @returns {Controller}
   */
  constructor({
    on = true,
    events = {},
  } = {}) {
    /**
     * Whether or not this controller is trapping events.
     * @var {boolean}
     */
    this.trapEvents = on;

    /**
     * Stores the keycode events and their callbacks.
     * @var {object}
     */
    this.eventRouter = events;

    /**
     * Stores the keycodes of buttons currently held down.
     * @var {object}
     */
    this.keysDown = {};

    return this.listen();
  }

  /**
   * The main onkeydown event handler for this controller.
   * @param {Event} e - a JS keydown event
   */
  keyDown(e) {
    // Don't trigger multiple events for one button press.
    if (!this.trapEvents || this.keysDown[e.keyCode]) return;

    this.keysDown[e.keyCode] = KEY_STATE.PRESSED;
    this.respondToEvent(e.keyCode, KEY_STATE.PRESSED);
  }

  /**
   * The main onkeyup event handler for this controller.
   * @param {Event} e - a JS keyup event
   */
  keyUp(e) {
    if (!this.trapEvents) return;

    delete this.keysDown[e.keyCode];
    this.respondToEvent(e.keyCode, KEY_STATE.RELEASED);
  }

  /**
   * Registers key events with this controller.
   * @returns {Controller}
   */
  listen() {
    const self = this;

    document.addEventListener('keydown', (e) => {
      self.keyDown(e);
    });
    document.addEventListener('keyup', (e) => {
      self.keyUp(e);
    });

    return this;
  }

  /**
   * Register a new game event with keydown/keyup of a given keyCode.
   * @param {int} key - from onkeydown event
   * @param {function} press - button press callback
   * @param {function} release - button release callback
   * @returns {Controller}
   */
  addButtonEvent({ key, press = ()=>{}, release = ()=>{} }) {
    this.eventRouter[key] = [];
    this.eventRouter[key][KEY_STATE.PRESSED] = press;
    this.eventRouter[key][KEY_STATE.RELEASED] = release;

    return this;
  }

  /**
   * Remove an existing registered button event.
   * @param {int} keyCode - received from onkeydown event
   * @returns {Controller}
   */
  removeButtonEvent(keyCode) {
    delete this.eventRouter[keyCode];
    return this;
  }

  /**
   * Empty current button monitoring and button event registration.
   * @returns {Controller}
   */
  clearEvents() {
    this.keysDown = {};
    this.eventRouter = {};
    return this;
  }

  /**
   * Respond to a predefined button event with a callback.
   * @param {int} keyCode - received from onkeydown event
   * @param {int} eventType - a KEY_STATE value
   * @returns {Controller}
   */
  respondToEvent(keyCode, eventType) {
    if (this.eventRouter[keyCode] && this.eventRouter[keyCode][eventType]) {
      this.eventRouter[keyCode][eventType].call();
    }

    return this;
  }

  /**
   * Determine if a button is being held down (keydown, but no keyup received).
   * @param {int} keyCode - received from onkeydown event
   * @returns {boolean} - TRUE if button is down, otherwise FALSE
   * @throws TypeError - if keyCode is invalid
   */
  isPressed(keyCode) {
    return (this.keysDown[keyCode] == KEY_STATE.PRESSED);
  }

  /**
   * Turn a controller off.
   * @param {boolean} clear - if true, will call clearEvents()
   * @returns {Controller}
   */
  off(clear = true) {
    this.trapEvents = false;

    if (clear === true) {
      this.clearEvents();
      this.keysDown = {};
    }

    return this;
  }

  /**
   * Turn a controller on.
   * @returns {Controller}
   */
  on() {
    this.trapEvents = true;
    return this;
  }
}
