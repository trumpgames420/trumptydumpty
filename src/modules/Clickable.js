import { Object2D } from './Object2D';

/**
 * A class for any clickable item in a canvas.
 */
export class Clickable extends Object2D {

  /**
   * Build a new clickable canvas area.
   * @param {boolean} autoBind - if true, will bind events on creation
   * @param {string} cursor - a CSS cursor value (defaults to 'pointer')
   * @param {HTMLCanvasElement} canvas
   * @param {int|string} x - x coord or 'center'
   * @param {int|string} y - y coord or 'center'
   * @param {int} w - the width of the clickable area
   * @param {int} h - the height of the clickable area
   */
  constructor({
    autoBind = true,
    cursor = 'pointer',
    canvas = null,
    onClick = ()=>{},
    onMouseEnter = ()=>{},
    onMouseLeave = ()=>{},
    x = 0,
    y = 0,
    w = 0,
    h = 0
  } = {}) {

    super({ x: x, y: y, w: w, h: h });

    /**
     * The canvas context to which all events will be bound.
     * @var {HTMLCanvasElement}
     */
    this.canvas = canvas;

    /**
     * The cursor to switch to on hover.
     * @var {string}
     */
    this.cursor = cursor;

    /**
     * The click callback function.
     * @var {function}
     */
    this.onClick = onClick;

    /**
     * The onMmouseEnter callback function.
     * @var {function}
     */
    this.onMouseEnter = onMouseEnter;

    /**
     * The mouseLeave callback function.
     * @var {function}
     */
    this.onMouseLeave = onMouseLeave;

    /**
     * The X coordinate of the clickable area.
     * @var {int}
     */
    this.clickAreaX = x;

    /**
     * The Y coordinate of the clickable area.
     * @var {int}
     */
    this.clickAreaY = y;

    /**
     * The width of the clickable area.
     * @var {int}
     */
    this.clickAreaWidth = w;

    /**
     * The height of the clickable area.
     * @var {int}
     */
    this.clickAreaHeight = h;

    /**
     * A flag for whether or not the mouse is in the clickable area.
     * @var {boolean}
     */
    this.mouseInside = false;

    /**
     * A flag for whether or not events should be trapped.
     * @var {boolean}
     */
    this.trapEvents = true;

    /**
     * Internal event handlers for canvas mouse events.
     * @var {function}
     */
    this.moveHandler = ()=>{};
    this.clickHandler = ()=>{};

    return (autoBind) ? this.bind() : this;
  }

  /**
   * Resume event trapping, if paused.
   * @returns {Clickable}
   */
  on() {
    this.trapEvents = true;
    return this;
  }

  /**
   * Pause event trapping.
   * @returns {Clickable}
   */
  off() {
    this.trapEvents = false;
    return this;
  }

  /**
   * Bind the mouse events to the canvas.
   * @returns {Clickable}
   */
  bind() {
    const self = this;

    this.clickHandler = (e) => {
      if (!self.trapEvents) return;

      if (self.checkBounds(e)) {
        self.onClick(e);
      }
    };

    this.moveHandler = (e) => {
      if (!self.trapEvents) return;

      if (self.checkBounds(e)) {
        if (!self.mouseInside) {
          self.canvas.style.cursor = self.cursor;
          self.mouseInside = true;
          self.onMouseEnter(e);
        }
      }
      else {
        if (self.mouseInside) {
          self.canvas.style.cursor = 'default';
          self.mouseInside = false;
          self.onMouseLeave(e);
        }
      }
    };

    this.canvas.addEventListener('click', this.clickHandler);
    this.canvas.addEventListener('mousemove', this.moveHandler);

    return this;
  }

  /**
   * Remove mouse events from the canvas.
   * @returns {Clickable}
   */
  unbind() {
    this.canvas.removeEventListener('click', this.clickHandler);
    this.canvas.removeEventListener('mousemove', this.moveHandler);
    this.canvas.style.cursor = 'default';
    this.mouseInside = false;

    return this;
  }

  /**
   * Mutator for X coordinate, allowing for 'center', etc.
   * @returns {int}
   */
  get x() {
    switch (this.clickAreaX) {
      case 'center':
        return (this.canvas.width / 2) - (this.clickAreaWidth / 2);
        break;
    }

    return this.clickAreaX;
  }

  /**
   * Setter for clickAreaX
   * @param {int} x
   * @returns {int}
   */
  set x(x) {
    this.clickAreaX = x;
  }

  /**
   * Mutator for Y coordinate, allowing for 'center', etc.
   * @returns {int}
   */
  get y() {
    switch (this.clickAreaY) {
      case 'center':
        return (this.canvas.height / 2) - (this.clickAreaHeight / 2);
        break;
    }

    return this.clickAreaY;
  }

  /**
   * Setter for clickAreaY
   * @param {int} y
   * @returns {int}
   */
  set y(y) {
    this.clickAreaY = y;
  }

  /**
   * Getter for clickAreaWidth.
   * @returns {int}
   */
  get w() {
    return this.clickAreaWidth;
  }

  /**
   * Setter for clickAreaWidth.
   * @param {int} x
   * @returns {int}
   */
  set w(w) {
    this.clickAreaWidth = w;
  }

  /**
   * Getter for clickAreaHeight.
   * @returns {int}
   */
  get h() {
    return this.clickAreaHeight;
  }

  /**
   * Setter for clickAreaHeight.
   * @param {int} x
   * @returns {int}
   */
  set h(h) {
    this.clickAreaHeight = h;
  }

  /**
   * Determine if the given event takes place inside the clickable area.
   * @param {Event} e
   * @returns {boolean}
   */
  checkBounds(e) {
    const w = this.w;
    const h = this.h;
    const x = this.x;
    const y = this.y;

    return (
      (e.offsetX >= x) && (e.offsetX <= (x + w)) &&
      (e.offsetY >= y) && (e.offsetY <= (y + h))
    );
  }

  /**
   * Draw a red rectangle around the clickable area, for debugging.
   */
  drawBounds() {
    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}
