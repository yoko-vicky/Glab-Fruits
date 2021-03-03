import Phaser from 'phaser';
import canvasSize from '../helpers/canvasSize';

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    this.add.text(canvasSize.width * 0.3, canvasSize.height * 0.5, 'Click to start!', { fill: '#000000', fontSize: '20px' });
    this.input.on('pointerdown', () => {
      this.scene.stop('StartScene');
      this.scene.start('PlayerNameScene');
    });
  }
}

export default StartScene;
