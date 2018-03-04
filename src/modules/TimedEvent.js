/**
 * A base class for any timed game event.
 */
export class TimedEvent {

  /**
   * Build the event.
   * @param {function} event - the event to fire on time
   * @param {number} delay - the time (milliseconds) to delay event firing
   * @param {boolean} repeat - if true, event will repeat every [delay]
   * @param {number} limit - limit the number of event repetitions
   * @param {function|null} until - a truthy function to test for repeats
   * @returns {TimedEvent}
   */
  constructor(event, {
    delay = 0,
    repeat = false,
    limit = 1,
    until = null,
  } = {}) {

    /**
     * The event to fire.
     * @var {function}
     */
    this.event = event;

    /**
     * The delay (in milliseconds) before the event fires initially.
     * @var {number}
     */
    this.delay = delay;

    /**
     * Whether or not to repeat the event every [delay] milliseconds.
     * @var {boolean}
     */
    this.repeat = repeat;

    /**
     * A truthy function to check if repeat is done firing.
     * @var {function}
     */
    this.until = until;

    /**
     * The number of repetitions that have occured.
     * @var {int}
     */
    this.repetitions = 0;

    /**
     * The timestamp of the last call to tick().
     * @var {number}
     */
    this.lastTick = 0;

    /**
     * A flag that determines if repetitions should continue.
     * @var {boolean}
     */
    this.finished = false;

    /**
     * The time that has passed since the last repetition.
     * @var {number}
     */
    this.delta = 0;

    return this.tick();
  }

  /**
   * Advance the internal timer by one tick.
   * @returns {TimedEvent}
   */
  tick() {
    const self = this;

    requestAnimationFrame((timestamp) => {
      timestamp = timestamp || 0;
      self.delta += timestamp - self.lastTick;

      if (self.delta >= self.delay) {
        self.delta = 0;
        self.event();
        self.repetitions++;

        if (self.repeat) {
          self.finished = false;

          if (typeof self.until === 'function') {
            self.finished = self.until(self);
          }
          else if (self.limit && self.repetitions >= self.limit) {
            self.finished = true;
          }
        }
        else {
          self.finished = true;
        }
      }

      if (!self.finished) {
        self.lastTick = timestamp;
        self.tick();
      }
    });

    return this;
  }

  /**
   * Determine if this event has fired yet.
   * @returns {boolean}
   */
  hasFired() {
    return this.repetitions > 0;
  }

  /**
   * The smallest amount of time between now and the next event trigger.
   * @returns {number}
   */
  nextFire() {
    return this.delay - this.delta;
  }

  /**
   * The number of times the event has yet to fire.
   * @returns {int}
   */
  remaining() {
    return this.limit - this.repetitions;
  }
}
