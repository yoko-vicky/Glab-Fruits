/* eslint-disable max-classes-per-file */
import Phaser from 'phaser';
import './style/style.css';
import resize from './helpers/resize';
import preloadGame from './scenes/preloadGame';
import playGame from './scenes/playGame';
import canvasSize from './helpers/canvasSize';

let game;

const gameConfig = {
  type: Phaser.AUTO,
  width: canvasSize.width,
  height: canvasSize.height,
  scene: [preloadGame, playGame],
  backgroundColor: 0x0c88c7,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
};

window.onload = () => {
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize(game);
  window.addEventListener('resize', resize, false);
};
