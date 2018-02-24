import { canvasClear } from '../lib/utils';
import { AssetLoader } from '../modules/AssetLoader';
import { Clickable } from '../modules/Clickable';
import { ImageAsset } from '../modules/ImageAsset';
import { Sprite } from '../modules/Sprite';
import { TileMap } from '../modules/TileMap';
import { TilePalette } from '../modules/TilePalette';

export const TITLE_BITMAP = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,1,1,1,1,1,0,1,1,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,1,1,0,1,0,0,0,1,0,
  0,2,2,1,2,2,0,1,2,2,2,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,2,2,2,1,0,2,2,1,2,2,0,1,0,0,0,1,0,
  0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,2,1,2,1,0,1,0,0,0,1,0,0,0,1,0,0,0,2,1,0,1,2,0,
  0,0,0,1,0,0,0,1,1,1,1,2,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,1,1,2,0,0,0,1,0,0,0,0,2,1,2,0,0,
  0,0,0,1,0,0,0,1,2,2,2,1,0,1,0,0,0,1,0,1,0,2,0,1,0,1,2,2,2,0,0,0,0,1,0,0,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,1,0,0,0,1,0,2,1,1,1,2,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,
  0,0,0,2,0,0,0,2,0,0,0,2,0,0,2,2,2,0,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,1,1,0,1,0,0,0,1,0,1,0,0,0,
  0,0,0,1,2,2,2,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,2,2,2,1,0,2,2,1,2,2,0,1,0,0,0,1,0,1,0,0,0,
  0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,2,1,2,1,0,1,0,0,0,1,0,0,0,1,0,0,0,2,1,0,1,2,0,1,0,0,0,
  0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,1,1,2,0,0,0,1,0,0,0,0,2,1,2,0,0,2,0,0,0,
  0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,2,0,1,0,1,2,2,2,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,1,1,1,1,2,0,2,1,1,1,2,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,
  0,0,0,2,2,2,2,0,0,0,2,2,2,0,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,2,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

/**
 * TitleScreen class.
 */
export class TitleScreen {

  /**
   * Build a new TitleScreen.
   */
  constructor(finished = ()=>{}) {
    const self = this;

    /**
     * The function to call when the intro finishes.
     * @var {function}
     */
    this.finished = finished;

    /**
     * The HTML canvas object to which final images will be rendered.
     * @var {HTMLCanvasElement}
     */
    this.screen = document.getElementById('tv');

    /**
     * An asset loader for title screen assets.
     * @var {AssetLoader}
     */
    this.assets = new AssetLoader({
      autoLoad: true,
      assets: {
        brick: new ImageAsset('./assets/img/brick.gif'),
        trumphead: new ImageAsset('./assets/img/trumphead.gif'),
        tweet: new ImageAsset('./assets/img/tweet.png'),
      },
      finished: (assets) => {
        self.initialize();
      },
    });
  }

  /**
   * Initialize title screen assets.
   * @var {AssetLoader}
   */
  initialize() {
    const self = this;
    document.getElementById('overlay').style.display = 'none';
    this.screen.width = 640;
    this.screen.height = 480;

    this.brickSprite = new Sprite({
      asset: this.assets.get('brick'),
      animations: {
        brick: [[0, 0, 16, 16]],
        brickShadow: [[16, 0, 16, 16]],
        darkBrick: [[32, 0, 16, 16]],
        // sand: [[48, 0, 16, 16]],
        // grass: [[32, 16, 16, 16]],
        // bg1: [[0, 16, 16, 16]],
        // bg2: [[16, 16, 16, 16]],
        // bg3: [[0, 32, 16, 16]],
        // bg4: [[16, 32, 16, 16]],
      },
    });

    this.trumpHead = new Sprite({
      asset: this.assets.get('trumphead'),
      animations: {
        trump: [[0, 0, 64, 83]],
      },
    });

    this.titleLayer = new TileMap({
      width: 43,
      height: 22,
      tileWidth: 0,
      tileHeight: 0,
      palette: new TilePalette([
        [this.brickSprite, 'brick'],
        [this.brickSprite, 'brickShadow'],
        [this.brickSprite, 'darkBrick'],
        // [this.brickSprite, 'sand'],
        // [this.brickSprite, 'bg1'],
        // [this.brickSprite, 'bg2'],
        // [this.brickSprite, 'bg3'],
        // [this.brickSprite, 'bg4'],
        // [this.brickSprite, 'grass'],
      ]),
      tiles: TITLE_BITMAP,
    });

    return this.animate();
  }

  /**
   * Animate the title screen.
   */
  animate() {
    const self = this;
    var ctx = this.screen.getContext('2d');
    var done = false;
    var trumpW = 64;
    var trumpH = 83;

    // Play button to begin game.
    var play = new Clickable({
      canvas: this.screen,
      x: 'center',
      y: 'center',
      w: 105,
      h: 120,
      onClick: () => {
        self.doneAnimating = true;
        play.unbind();
        self.finished();
      }
    });

    var elapsed = 0;
    const tick = (time) => {

      // Grow title to fill screen, and bounce trump head.
      elapsed += 30;
      self.titleLayer.tileWidth = (elapsed / 100);
      self.titleLayer.tileHeight = (elapsed / 100);

      // @todo Farm this stuff out to a tweener class eventually...
      trumpW = 64 * Math.abs(Math.sin(2 * Math.PI * (time / 2000))) + 32;
      trumpH = 83 * Math.abs(Math.sin(2 * Math.PI * (time / 2000))) + 41;

      if (self.titleLayer.tileWidth >= 15) {
        self.titleLayer.tileWidth = 15;
        self.titleLayer.tileHeight = 15;
      }

      // Draw blue bg, then title, then trump head.
      canvasClear(ctx);
      ctx.fillStyle = '#337df8';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      self.titleLayer.draw(ctx, 'center', 'center');
      self.trumpHead.draw(ctx, 'center', 'center', trumpW, trumpH);

      if (!self.doneAnimating) window.requestAnimationFrame(tick);
    };

    tick();
  }
}
