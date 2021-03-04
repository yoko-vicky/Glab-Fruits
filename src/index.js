import Phaser from 'phaser';
import './style/style.css';
import canvasSize from './helpers/canvasSize';
import Start from './scenes/Start';
import InputName from './scenes/InputName';
import Play from './scenes/Play';
// import GameOver from './scenes/GameOver';
import Score from './scenes/Score';
// import { getGameId, setUserScore, getGameResult } from './helpers/request';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  dom: {
    createContainer: true,
  },
  width: canvasSize.width,
  height: canvasSize.height,
  backgroundColor: 'b9eaff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 150 },
      enableBody: true,
      // debug: true,
    },
  },
  scene: [Start, InputName, Play, Score],
};

window.game = new Phaser.Game(config);

// Get and Set Test
// const playGame = async (userName, userScore) => {
//   const userData = { user: userName, score: userScore };
//   const id = await getGameId();
//   const msg = await setUserScore(id, userData);
//   const result = await getGameResult(id);
//   console.log(id);
//   console.log(msg);
//   console.log(result);
// };

// playGame('Yoko', 120);
