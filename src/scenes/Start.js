// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import startImg from '../assets/images/start.png';
import titleImg from '../assets/images/title.png';
import girlImg from '../assets/images/girl.png';
import clickGoSound from '../assets/sounds/click2.mp3';

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
    this.addSounds();
    this.addImages();

    this.button.setInteractive().on('pointerdown', () => {
      this.clickGoSound.play();
      this.scene.stop('Start');
      this.scene.start('InputName');
    });
  }

  addSounds() {
    this.clickGoSound = this.sound.add('click-go-sound');
  }

  addImages() {
    this.add.image(gameState.canvas.width * 0.5, gameState.canvas.width * 0.3, 'title');
    this.button = this.add.image(gameState.canvas.width * 0.5, gameState.canvas.width * 0.5, 'start');
    this.add.image(gameState.canvas.width * 0.5, gameState.canvas.width * 0.85, 'top-girl');
  }
}

export default Start;
