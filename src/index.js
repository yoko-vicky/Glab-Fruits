import Phaser from 'phaser';
import './style/style.css';
import canvasSize from './helpers/canvasSize';
import StartScene from './scenes/startScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
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
  scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
game();
