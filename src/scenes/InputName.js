import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import btnImg from '../assets/go.png';

class InputName extends Phaser.Scene {
  constructor() {
    super({ key: 'InputName' });
  }

  preload() {
    this.load.image('btn-image', btnImg);
  }

  create() {
    this.input = this.add.dom(gameState.canvasSize.width * 0.25, 300, 'input');
    this.button = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.6, 'btn-image');
    this.text = this.add.text(gameState.canvasSize.width * 0.3, gameState.canvasSize.height * 0.3, 'Please enter your name', { fill: '#000000', font: '400 17px Roboto' });

    const myfield = document.querySelector('canvas').previousSibling;
    myfield.removeAttribute('style');
    myfield.setAttribute('id', 'my-field');

    const myInput = myfield.querySelector('input');
    myInput.setAttribute('id', 'my-input');
    myInput.removeAttribute('style');

    this.button.setInteractive().on('pointerup', () => {
      const inputName = myInput.value;
      const validResult = inputName.length >= 3 && inputName.length <= 10 && inputName.match(/[a-zA-Z0-9]/g);

      if (!validResult) {
        this.add.text(gameState.canvasSize.width * 0.15, gameState.canvasSize.height * 0.8, 'Name length should be between 3 and 10 letters,', { fill: '#000000', font: '400 14px Roboto' });
        this.add.text(gameState.canvasSize.width * 0.18, gameState.canvasSize.height * 0.85, 'and only alphabet and number can be used.', { fill: '#000000', font: '400 14px Roboto' });
      } else {
        gameState.player = inputName;
        this.scene.stop('inputName');
        this.scene.start('Play');
      }
    });
  }
}

export default InputName;
