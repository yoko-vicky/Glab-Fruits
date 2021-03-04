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
    this.text = this.add.text(canvasSize.width * 0.3, canvasSize.height * 0.3, 'Please enter your name', { fontSize: '15px', fill: '#000000' });

    const myfield = document.querySelector('canvas').previousSibling;
    myfield.removeAttribute('style');
    myfield.setAttribute('id', 'my-field');

    const myInput = myfield.querySelector('input');
    myInput.setAttribute('id', 'my-input');
    myInput.removeAttribute('style');

    this.button.setInteractive().on('pointerup', () => {
      const inputName = myInput.value;
      // console.log(inputName);

      if (!isNameValid(inputName)) {
        this.add.text(canvasSize.width * 0.08, canvasSize.height * 0.8, 'Name length should be between 3 and 10 letters', { fontSize: '14px', fill: '#000000' });
        this.add.text(canvasSize.width * 0.1, canvasSize.height * 0.85, ', and only alphabet and number can be used.', { fontSize: '14px', fill: '#000000' });
      } else {
        gameState.InputName = inputName;
        this.scene.stop('inputName');
        this.scene.start('Play');
      }
    });
  }
}

export default InputName;
