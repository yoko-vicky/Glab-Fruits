import Phaser from 'phaser';
import platformImg from '../assets/platform.png';
import playerImg from '../assets/player.png';
import coinImg from '../assets/coin.png';
import mountainImg from '../assets/mountain.png';

class preloadGame extends Phaser.Scene {
  constructor() {
    super('PreloadGame');
  }

  preload() {
    this.load.image('platform', platformImg);

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet('player', playerImg, {
      frameWidth: 24,
      frameHeight: 48,
    });

    // the coin is a sprite sheet made by 20x20 pixels
    this.load.spritesheet('coin', coinImg, {
      frameWidth: 20,
      frameHeight: 20,
    });

    // mountains are a sprite sheet made by 512x512 pixels
    this.load.spritesheet('mountain', mountainImg, {
      frameWidth: 512,
      frameHeight: 512,
    });
  }

  create() {
    // setting player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // setting coin animation
    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    this.scene.start('PlayGame');
  }
}

export default preloadGame;
