import Phaser from 'phaser';
// import canvasSize from '../helpers/canvasSize';
import gameState from '../helpers/gameState';
import isNameValid from '../helpers/isNameValid';

class PlayerNameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerNameScene' });
  }

  create() {
    this.input = this.add.dom(100, 150, 'input', 'background-color: white; width: 220px; height: 50px; font: 22px Arial');
    this.button = this.add.dom(100, 200, 'button', 'background-color: orange; width: 120px; height: 50px; font: 22px Arial', 'submit');
    this.text = this.add.text(120, 230, 'Please enter your name:', { fontSize: '15px', fill: '#ffffff' });

    const myfield = document.querySelector('canvas').previousSibling;
    myfield.setAttribute('id', 'my-field');
    myfield.removeAttribute('style');

    const myInput = myfield.querySelector('input');
    myInput.setAttribute('id', 'my-input');
    myInput.removeAttribute('style');

    const myBtn = myfield.querySelector('button');
    myBtn.setAttribute('id', 'my-button');
    myBtn.removeAttribute('style');

    myBtn.onclick = () => {
      const inputName = myInput.value;
      console.log(inputName);
      if (!isNameValid(inputName)) {
        this.add.text(220, 450, 'Name length should be between 3 and 10 characters long, and only alphabet and number can be used.', { fontSize: '16px', fill: '#000000' });
      } else {
        gameState.playerName = inputName;
        // this.scene.stop('PlayerNameScene');
        this.scene.start('GameScene');
      }
    };
  }
}

export default PlayerNameScene;
