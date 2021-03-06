import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import btnImg from '../assets/images/go.png';
import easyImg from '../assets/images/easy.png';
import normalImg from '../assets/images/normal.png';
import hardImg from '../assets/images/hard.png';
import openingMusic from '../assets/sounds/game3.mp3';
import clickSound from '../assets/sounds/click1.mp3';
import setMode from '../helpers/setMode';

class InputName extends Phaser.Scene {
  constructor() {
    super({ key: 'InputName' });
  }

  preload() {
    this.load.image('btn-image', btnImg);
    this.load.image('easy-btn', easyImg);
    this.load.image('normal-btn', normalImg);
    this.load.image('hard-btn', hardImg);
    this.load.audio('opening-music', openingMusic);
    this.load.audio('click-sound', clickSound);
  }

  create() {
    this.createForm();
    this.addSounds();
    this.addButtons();
    this.easyBtn.setInteractive().on('pointerup', () => {
      setMode(80, 600);
      this.gameStart();
    });
    this.normalBtn.setInteractive().on('pointerup', () => {
      setMode(80, 300);
      this.gameStart();
    });
    this.hardBtn.setInteractive().on('pointerup', () => {
      setMode(60, 100);
      this.gameStart();
    });
  }

  addSounds() {
    this.openingMusic = this.sound.add('opening-music');
    this.openingMusic.loop = true;
    this.openingMusic.play();
    this.clickSound = this.sound.add('click-sound');
  }

  createForm() {
    this.input = this.add.dom(gameState.canvas.width * 0.25, 300, 'input');
    this.text = this.add.text(gameState.canvas.width * 0.15, gameState.canvas.height * 0.3, 'Please input your name and click any level', { fill: '#000000', font: '400 17px Roboto' });

    this.myfield = document.querySelector('canvas').previousSibling;
    this.myfield.removeAttribute('style');
    this.myfield.setAttribute('id', 'my-field');

    this.myInput = this.myfield.querySelector('input');
    this.myInput.setAttribute('id', 'my-input');
    this.myInput.removeAttribute('style');
  }

  validateName() {
    this.inputName = this.myInput.value;
    this.validResult = this.inputName.length >= 3 && this.inputName.length <= 10 && this.inputName.match(/[a-zA-Z0-9]/g);
  }

  errorMsg() {
    this.add.text(gameState.canvas.width * 0.15, gameState.canvas.height * 0.91, 'Name length should be between 3 and 10 letters,', { fill: '#000000', font: '400 14px Roboto' });
    this.add.text(gameState.canvas.width * 0.18, gameState.canvas.height * 0.94, 'and only alphabet and number can be used.', { fill: '#000000', font: '400 14px Roboto' });
  }

  stopInputName() {
    this.openingMusic.stop();
    this.scene.stop('inputName');
    this.scene.start('Play');
  }

  addButtons() {
    this.easyBtn = this.add.image(gameState.canvas.width * 0.5, gameState.canvas.height * 0.55, 'easy-btn');
    this.normalBtn = this.add.image(gameState.canvas.width * 0.5, gameState.canvas.height * 0.68, 'normal-btn');
    this.hardBtn = this.add.image(gameState.canvas.width * 0.5, gameState.canvas.height * 0.81, 'hard-btn');
  }

  gameStart() {
    this.clickSound.play();
    this.validateName();

    if (!this.validResult) {
      this.errorMsg();
    } else {
      gameState.player = this.inputName;
      this.stopInputName();
    }
  }
}

export default InputName;
