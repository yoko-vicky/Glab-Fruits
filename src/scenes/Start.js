import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import startImg from '../assets/start.png';
import titleImg from '../assets/title.png';
import girlImg from '../assets/girl.png';
import clickGoSound from '../assets/click2.wav';

class Start extends Phaser.Scene {
  constructor() {
    super({ key: 'Start' });
  }

  preload() {
    this.load.image('start', startImg);
    this.load.image('title', titleImg);
    this.load.image('top-girl', girlImg);
    this.load.audio('click-go-sound', clickGoSound);
  }

  create() {
    this.clickGoSound = this.sound.add('click-go-sound');
    this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.width * 0.3, 'title');
    this.button = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.width * 0.5, 'start');
    this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.width * 0.85, 'top-girl');
    this.button.setInteractive().on('pointerdown', () => {
      this.clickGoSound.play();
      this.scene.stop('Start');
      this.scene.start('InputName');
    });
  }
}

export default Start;
