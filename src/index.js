import Phaser from 'phaser';
import './style/style.css';
import gameState from './helpers/gameState';
import Start from './scenes/Start';
import InputName from './scenes/InputName';
import Play from './scenes/Play';
import GameOver from './scenes/GameOver';
import Score from './scenes/Score';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  dom: {
    createContainer: true,
  },
  width: gameState.canvasSize.width,
  height: gameState.canvasSize.height,
  backgroundColor: 'b9eaff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 150 },
      enableBody: true,
      // debug: true,
    },
  },
  scene: [Start, InputName, Play, GameOver, Score],
};

gameState.game = new Phaser.Game(config);
