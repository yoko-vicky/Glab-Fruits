import Phaser from 'phaser';
import canvasSize from '../helpers/canvasSize';
// import gameState from '../helpers/gameState';
import topImg from '../assets/top.png';
import restartImg from '../assets/restart.png';

class Score extends Phaser.Scene {
  constructor() {
    super({ key: 'Score' });
  }

  preload() {
    this.load.image('top', topImg);
    this.load.image('restart', restartImg);
  }

  create() {
    this.restart = this.add.image(canvasSize.width * 0.5, canvasSize.height * 0.35, 'restart');
    this.totop = this.add.image(canvasSize.width * 0.5, canvasSize.height * 0.5, 'top');

    this.totop.setInteractive().on('pointerup', () => {
      this.scene.stop('Score');
      this.scene.start('Start');
    }, this);
    this.restart.setInteractive().on('pointerup', () => {
      this.scene.stop('Score');
      this.scene.start('Play');
    });
  }
}

export default Score;
