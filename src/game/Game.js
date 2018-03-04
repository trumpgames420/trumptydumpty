import { canvasClear, randomInt } from '../lib/utils';
import { AssetLoader } from '../modules/AssetLoader';
import { AudioAsset } from '../modules/AudioAsset';
import { Controller, KEYS } from '../modules/Controller';
import { Enemy } from '../modules/Enemy';
import { ImageAsset } from '../modules/ImageAsset';
import { Player } from '../modules/Player';
import { Projectile } from '../modules/Projectile';
import { TileMap } from '../modules/TileMap';
import { TilePalette } from '../modules/TilePalette';
import { Sprite } from '../modules/Sprite';

/**
 * Possible game state values.
 * @enum {int}
 */
export const STATE = {
  OFF: 0,
  ON: 1,
  PAUSED: 2,
};

/**
 * A tilemap for THE WALL.
 * @var {array}
 */
export const WALL_BITMAP = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
  2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
];

/**
 * Game engine class.
 */
export class Game {

  /**
   * Build a new Game object.
   * @param {string} screen - the DOM id of the screen Canvas object
   */
  constructor() {
    const self = this;

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
     * The main game loop.
     * @var {function}
     */
    this.gameLoop = ()=>{};

    /**
     * An array of player projectiles (tweets).
     * @var {array}
     */
    this.playerBullets = [];

    /**
     * An array of enemy projectiles.
     * @var {array}
     */
    this.enemyBullets = [];

    /**
     * An array of enemy mobs.
     * @var {array}
     */
    this.mobs = [];

    /**
     * An asset loader for game image assets.
     * @var {AssetLoader}
     */
    this.images = new AssetLoader({
      autoLoad: false,
      assets: {
        brick: new ImageAsset('./assets/img/brick.gif'),
        trumphead: new ImageAsset('./assets/img/trumphead.gif'),
      },
    });

    /**
     * An asset loader for game image assets.
     * @var {AssetLoader}
     */
    this.audio = new AssetLoader({
      autoLoad: false,
      assets: {
        tweet: new AudioAsset('./assets/sound/tweet.wav'),
      },
    });

    /**
     * Controller for Player 1.
     * @var Controller
     */
    this.controller1 = new Controller();

    // Load image and audio assets, then initialize.
    Promise.all([
      new Promise((resolve, reject) => {
        self.images.finished = resolve;
      }),
      new Promise((resolve, reject) => {
        self.audio.finished = resolve;
      }),
    ]).then(() => {
      self.initialize();
    });

    // Wipe canvas and start audio/image load.
    canvasClear(this.screen.getContext('2d'), {
      style: 'top2bottom',
      speed: 1.5,
      callback: () => {
        self.images.loadAll();
        self.audio.loadAll();
      },
    });

    return this;
  }

  /**
   * Initialize the sprites/controller.
   * @returns {Game}
   */
  initialize() {
    const self = this;
    let ctx = this.screen.getContext('2d');

    this.trump = new Player({
      sprite: new Sprite({
        asset: this.images.get('trumphead'),
        animations: {
          trump: [[0, 0, 64, 83]],
        },
      }),
      w: 32,
      h: 41.5,
      x: 304,
      y: 170,
    });

    this.brickSprite = new Sprite({
      asset: this.images.get('brick'),
      animations: {
        brick: [[0, 0, 16, 16]],
        brickShadow: [[16, 0, 16, 16]],
        darkBrick: [[32, 0, 16, 16]],
      },
    });

    this.theWall = new TileMap({
      width: 40,
      height: 7,
      tileWidth: 16,
      tileHeight: 16,
      palette: new TilePalette([
        [this.brickSprite, 'brick'],
        [this.brickSprite, 'brickShadow'],
        [this.brickSprite, 'darkBrick'],
      ]),
      tiles: WALL_BITMAP,
    });

    this.controller1.addButtonEvent({
      key: KEYS.A,
      press: () => {
        self.trump.xVector = -2;
      },
      release: () => {
        if (!self.controller1.isPressed(KEYS.D)) {
          self.trump.xVector = 0;
        }
      },
    });

    this.controller1.addButtonEvent({
      key: KEYS.D,
      press: () => {
        self.trump.xVector = 2;
      },
      release: () => {
        if (!self.controller1.isPressed(KEYS.A)) {
          self.trump.xVector = 0;
        }
      },
    });

    this.controller1.addButtonEvent({
      key: KEYS.UP,
      press: () => {
        self.spawnProjectile('tweet', {
          x: self.trump.x + (self.trump.w / 2),
          y: self.trump.y + (self.trump.h / 2),
          w: 5,
          h: 5,
          xVector: 0,
          yVector: -4,
        });
      }
    });
    this.controller1.addButtonEvent({
      key: KEYS.DOWN,
      press: () => {
        self.spawnProjectile('tweet', {
          x: self.trump.x + (self.trump.w / 2),
          y: self.trump.y + (self.trump.h / 2),
          w: 5,
          h: 5,
          xVector: 0,
          yVector: 4,
        });
      }
    });

    return this.on();
  }

  /**
   * A single interation of the main game loop.
   */
  tick(time) {
    if (this.state !== STATE.ON) return;

    const self = this;
    const ctx = this.screen.getContext('2d');

    canvasClear(ctx);
    this.lastTick = time;
    this.drawBg(ctx);
    this.drawPlayer(ctx);
    this.moveMobs(ctx);
    this.drawMobs(ctx);
    this.moveProjectiles(ctx);
    this.drawProjectiles(ctx);

    if (this.state == STATE.ON) {
      window.requestAnimationFrame((time) => { self.tick(time); });
    }
  }

  /**
   * Clean up any visual data after game has been powered off.
   * @returns {Game}
   */
  destroy() {
    return this;
  }

  /**
   * Turn game state on.
   * @returns {Game}
   */
  on() {
    const self = this;
    const ENEMY_SPAWN_RATE = 1500;
    this.state = STATE.ON;

    setInterval(() => {
      self.spawnMob(self.screen.getContext('2d'));
    }, ENEMY_SPAWN_RATE);

    window.requestAnimationFrame((time) => { self.tick(time); });
    return this;
  }

  /**
   * Turn game state off.
   * @returns {Game}
   */
  off() {
    this.state = STATE.OFF;
    return this;
  }

  /**
   * Pause the game state.
   * @returns {Game}
   */
  pause() {
    this.state = STATE.PAUSED;
    return this;
  }

  /**
   * Draw the playing field background.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Game}
   */
  drawBg(ctx) {
    this.theWall.draw(ctx, 'center', 'center');
  }

  /**
   * Update position and draw the Trump avatar.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Game}
   */
  drawPlayer(ctx) {
    var scale = ctx.canvas.scaleFactor || 1;
    this.trump.move();

    if (
      this.trump.xVector > 0 &&
      this.trump.x > 640
    ) {
      this.trump.x = 0 - (this.trump.w * 0.75);
    }

    if (
      this.trump.xVector < 0 &&
      this.trump.x < 0 - this.trump.w
    ) {
      this.trump.x = 640 - (this.trump.w * 0.25);
    }

    this.trump.draw(ctx);
    return this;
  }

  /**
   * Move all enemies/NPCs.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Game}
   */
  moveMobs(ctx) {
    for (let m = 0; m < this.mobs.length; m++) {
      this.mobs[m].move(ctx);
    }
  }

  /**
   * Move all bullets on their vector paths.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Game}
   */
  moveProjectiles(ctx) {
    for (let b = 0; b < this.playerBullets.length; b++) {
      if (this.playerBullets[b].isVisible(ctx)) {
        this.playerBullets[b].move(ctx);
      }
      else {
        this.playerBullets.splice(b, 1);
      }
    }
  }

  /**
   * Draw all mobs.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Game}
   */
  drawMobs(ctx) {
    var scale = ctx.canvas.scaleFactor || 1;

    for (let m = 0; m < this.mobs.length; m++) {
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(this.mobs[m].x * scale, this.mobs[m].y * scale, this.mobs[m].w * scale, this.mobs[m].h * scale);
    }
  }

  /**
   * Draw all bullets.
   * @param {CanvasRenderingContext2d} ctx
   * @returns {Game}
   */
  drawProjectiles(ctx) {
    var scale = ctx.canvas.scaleFactor || 1;

    for (let b = 0; b < this.playerBullets.length; b++) {
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.arc(this.playerBullets[b].x * scale, this.playerBullets[b].y * scale, this.playerBullets[b].w * scale, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  /**
   * Spawn an NPC/enemies.
   * @param {CanvasRenderingContext2d} ctx
   * @param {string} type
   * @returns {Mob}
   */
  spawnMob(ctx, type = null) {
    switch (type) {
      default:
        var mob = new Enemy({
          x: randomInt(0, ctx.canvas.origW),
          y: -32,
          w: 32,
          h: 32,
          yVector: 0.5,
        });
        this.mobs.push(mob);
        break;
    }

    return mob;
  }

  /**
   * Fire a projectile at a given coordinate & vector.
   * @param {string} type - the type of projectile
   * @param {number} x - starting X coord
   * @param {number} y - starting Y coord
   * @param {number} xVector - the X vector for the projectile
   * @param {number} yVector - the Y vector for the projectile
   * @returns {Projectile}
   */
  spawnProjectile(type, {
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    xVector = 0,
    yVector = 0,
  }) {

    const PLAYER_MAX_BULLETS = 5;
    var ctx = this.screen.getContext('2d');

    switch (type) {
      case 'tweet':
        if (this.playerBullets.length < PLAYER_MAX_BULLETS) {
          var projectile = new Projectile({
            x: x,
            y: y,
            w: w,
            h: h,
            xVector: xVector,
            yVector: yVector,
          });
          this.audio.get('tweet').play();
          this.playerBullets.push(projectile);
        }
        break;
    }

    return projectile;
  }
}
