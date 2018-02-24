import { ComputerIntro } from './game/ComputerIntro';
import { TitleScreen } from './game/TitleScreen';
import { Game } from './game/Game';

// @todo Have to rethink this -- power button will need to stop everything.
new ComputerIntro(() => {
  setTimeout(() => {
    new TitleScreen(() => {
      new Game();
    });
  }, 1000);
});
