import $ from 'jquery';

import { randomInt } from '../lib/utils';
import { AudioAsset } from '../modules/AudioAsset';
import { AssetLoader } from '../modules/AssetLoader';

/**
 * A cheeseball, faux-Commodore-64-esque intro for Race Invaders.
 */
export class ComputerIntro {

  /**
   * Initialize the demo.
   */
  constructor() {
    var self = this;

    /**
     * On/off state for "Power" knob.
     * @var boolean
     */
    this.pictureOn = false;

    /**
     * On/off state for "Volume" knob.
     * @var boolean
     */
    this.volumeOn = true;

    /**
     * In/out state for "Race Invaders" diskette.
     * @var boolean
     */
    this.diskIn = false;

    /**
     * On/off state for "Load" button.
     * @var boolean
     */
    this.loadOn = false;

    /**
     * The television screen.
     * @var jQuery
     */
    this.$tv = $('#tv');

    /**
     * The television screen canvas 2d context.
     * @var jQuery
     */
    this.screen = this.$tv[0].getContext('2d');

    /**
     * A timer for text animations.
     * @var number
     */
    this.timer = null;

    /**
     * Overlay for preloader.
     * @var jQuery
     */
    this.$overlay = $('#overlay');

    /**
     * The "Power" button.
     * @var jQuery
     */
    this.$powerKnob = $('#power');

    /**
     * The "Volume" button.
     * @var jQuery
     */
    this.$volumeKnob = $('#volume');

    /**
     * The "Disk drive".
     * @var jQuery
     */
    this.$diskDrive = $('#drive');

    /**
     * The "Diskette".
     * @var jQuery
     */
    this.$disk = $('#disk');

    /**
     * The "Load" button.
     * @var jQuery
     */
    this.$loadButton = $('#load');

    /**
     * The "MUTE" overlay.
     * @var jQuery
     */
    this.$mute = $('#mute');

    /**
     * A queue for loading/managing assets.
     * @var AssetLoader
     */
    this.assets = new AssetLoader({
      autoLoad: true,
      assets: {
        knob: new AudioAsset('./assets/sound/knob.wav'),
        hiss: new AudioAsset('./assets/sound/static.wav'),
        poweron: new AudioAsset('./assets/sound/poweron.wav'),
        cpuType: new AudioAsset('./assets/sound/cpu_click.wav'),
        keyboard: new AudioAsset('./assets/sound/keyboard.wav'),
        spacebar: new AudioAsset('./assets/sound/spacebar.wav'),
      },
      finished: () => {
        self.$progress.fadeToggle(250, () => {
          self.$overlay.fadeToggle(500);
        });
      }
    });

    /**
     * Asset loader progress bar.
     * @var jQuery
     */
    this.$progress = $(this.assets.progressBar);
    this.$overlay.append(this.$progress);

    this.$tv[0].width = 640;
    this.$tv[0].height = 480;

    // Bind click events.
    this.$powerKnob.on('click', (e) => { this.powerKnobClick(e); });
    this.$volumeKnob.on('click', (e) => { this.volumeKnobClick(e); });
    this.$diskDrive.on('click', (e) => { this.diskDriveClick(e); });
    this.$loadButton.on('click', (e) => { this.loadButtonClick(e); });
  }

  /**
   * Refresh the computer state after a knob/button has been clicked.
   * @return {C64Intro}
   */
  refresh() {
    var playHiss = () => {
      this.assets.get('hiss').loop(true).volume(0.1).play();
    }

    var stopHiss = () => {
      this.assets.get('hiss').pause();
    }

    // Show/hide MUTE.
    (this.pictureOn && !this.volumeOn) ? this.$mute.show() : this.$mute.hide();

    // Start/stop static noise.
    if (this.volumeOn && this.pictureOn) {
      if (this.$tv.hasClass('playing')) {
        stopHiss();
      }
      else {
        playHiss();
      }
    } else {
      stopHiss();
    }

    return this;
  }

  /**
   * Handle click events to the power button.
   * @returns {C64Intro}
   */
  powerKnobClick() {
    this.assets.get('knob').play();
    this.pictureOn = !this.pictureOn;
    this.$tv.toggleClass('active');

    if (!this.pictureOn && this.loadOn) this.loadButtonClick();
    return this.refresh();
  }

  /**
   * Handle click events to the power button.
   * @param {Event} e
   * @returns {C64Intro}
   */
  volumeKnobClick(e) {
    this.assets.get('knob').play();
    this.volumeOn = !this.volumeOn;
    return this.refresh();
  }

  /**
   * Handle click events to the power button.
   * @returns {C64Intro}
   */
  diskDriveClick() {
    this.diskIn = true;
    this.$disk.addClass('inserted');
  }

  /**
   * Handle click events to the load button.
   * @returns {C64Intro}
   */
  loadButtonClick() {
    if (this.diskIn) {
      this.loadOn = !this.loadOn;
      this.$tv.toggleClass('playing');
      if (this.loadOn) {
        this.$loadButton.find('.dot').addClass('active');
        this.assets.get('poweron').play();
        this.startIntroText();
      }
      else {
        this.$loadButton.find('.dot').removeClass('active');
        this.cancelIntroText();
      }
      return this.refresh();
    }
  }

  /**
   * Type out computer text slowly, just like in real life.
   * @param {number} startX - the starting X coordinate on the screen
   * @param {number} startY - the starting Y coordinate on the screen
   * @param {string} text - the text to type
   * @param {int} speed - the number of milliseconds between letters
   * @param {string} sound - the sound asset to use as a typing noise
   */
  typeText(startX, startY, text, speed = 75, sound = 'cpuType') {
    const self = this;
    var x = startX;
    var y = startY;
    var index = 0;

    this.timer = null;
    this.typingCancelled = false;

    return new Promise((resolve, reject) => {
      const startTyping = () => {
        self.timer = setInterval(tick, speed);
      }
      const pauseTyping = () => {
        clearInterval(self.timer);
      }
      const doneTyping = () => {
        clearTimeout(self.timer);
        resolve();
      }
      const tick = () => {
        if (self.typingCancelled) reject();
        let char = text[index];

        if (index == text.length) {
          doneTyping();
          return;
        }

        switch (char) {
          case '~':
            pauseTyping();
            setTimeout(() => { startTyping(); }, 1000);
            break;

          case '|':
            x = startX;
            y += 14;
            break;

          case ' ':
            if (sound && self.pictureOn && self.volumeOn) {
              switch (sound) {
                case 'cpuType':
                  self.assets.get(sound).play();
                  break;
                case 'keyboard':
                  self.assets.get('spacebar').play();
                  break;
              }
            }
            x += 12;
            break;

          default:
            if (sound && self.pictureOn && self.volumeOn) {
              switch (sound) {
                case 'cpuType':
                  self.assets.get(sound).play();
                  break;
                case 'keyboard':
                  self.assets.get(sound).rate(randomInt(75, 100) / 100).play();
                  break;
              }
            }
            self.screen.fillText(text[index], x, y);
            x += 12;
            break;
        }

        index++;
      }

      this.screen.fillStyle = '#fff';
      this.screen.font = '14px monospace';
      startTyping();
    });
  }

  /**
   * Begin computer intro text.
   * @returns {C64Intro}
   */
  startIntroText() {
    this.typeText(50, 50, '**** COLONEL 64 BASIC V2 ****|64K RAM SYSTEM 24601 BASIC BYTES FREE|READY.~~').then(() => {
      this.typeText(50, 95, 'LOAD "RACE INVADERS",8,1~', 115, 'keyboard').then(() => {
        this.typeText(50, 125, 'SEARCHING FOR RACE INVADERS~|READY.~').then(() => {
          this.typeText(50, 155, 'RUN~', 115, 'keyboard').then(() => {
            this.cancelIntroText();
          });
        })
      });
    });
  }

  /**
   * End computer intro text and clean up events.
   * @returns {C64Intro}
   */
  cancelIntroText() {
    clearInterval(this.timer);
    this.typingCancelled = true;
    this.screen.clearRect(0, 0, this.$tv[0].width, this.$tv[0].height);
  }
}
