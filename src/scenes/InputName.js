import Phaser from 'phaser';
import canvasSize from '../helpers/canvasSize';
import gameState from '../helpers/gameState';
import isNameValid from '../helpers/isNameValid';
import btnImg from '../assets/go.png';

class InputName extends Phaser.Scene {
  constructor() {
    super({ key: 'InputName' });
  }

  preload() {
    this.load.image('btn-image', btnImg);
  }

  create() {
    this.input = this.add.dom(canvasSize.width * 0.25, 300, 'input');
    this.button = this.add.image(canvasSize.width * 0.5, canvasSize.height * 0.6, 'btn-image');
    this.text = this.add.text(canvasSize.width * 0.3, canvasSize.height * 0.3, 'Please enter your name', { fill: '#000000', font: '400 15px Roboto' });

    const myfield = document.querySelector('canvas').previousSibling;
    myfield.removeAttribute('style');
    myfield.setAttribute('id', 'my-field');

    const myInput = myfield.querySelector('input');
    myInput.setAttribute('id', 'my-input');
    myInput.removeAttribute('style');

    this.button.setInteractive().on('pointerup', () => {
      const inputName = myInput.value;
      if (!isNameValid(inputName)) {
        this.add.text(canvasSize.width * 0.15, canvasSize.height * 0.8, 'Name length should be between 3 and 10 letters,', { fill: '#000000', font: '400 14px Roboto' });
        this.add.text(canvasSize.width * 0.18, canvasSize.height * 0.85, 'and only alphabet and number can be used.', { fill: '#000000', font: '400 14px Roboto' });
      } else {
        gameState.playerName = inputName;
        this.scene.stop('inputName');
        this.scene.start('Play');
      }
    });
  }
}

export default InputName;
