import Phaser from 'phaser';
import canvasSize from '../helpers/canvasSize';
import gameState from '../helpers/gameState';
import playerImg from '../assets/player.png';
import appleImg from '../assets/apple.png';
import poisonAppleImg from '../assets/poison-apple.png';
import pineAppleImg from '../assets/pineapple.png';
import landImg from '../assets/land.png';
import treeImg from '../assets/tree.png';
import leafImg from '../assets/leaf.png';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('fruit1', appleImg);
    this.load.image('fruit2', poisonAppleImg);
    this.load.image('fruit3', pineAppleImg);
    this.load.image('platform', landImg);
    this.load.image('tree', treeImg);
    this.load.image('leaf', leafImg);
    this.load.spritesheet('codey', playerImg, { frameWidth: 72, frameHeight: 90 });
  }

  create() {
    // tree
    this.add.image(canvasSize.width * 0.5, canvasSize.height * 0.5, 'tree');
    this.add.image(canvasSize.width * 0.5, 30, 'leaf');

    // player
    gameState.player = this.physics.add.sprite(canvasSize.width * 0.5, canvasSize.height * 0.8, 'codey').setScale(0.5);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('codey', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('codey', { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    // platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(canvasSize.width * 0.5, canvasSize.height - 12, 'platform').setScale(1, 0.3).refreshBody();

    // score
    gameState.scoreText = this.add.text(canvasSize.width * 0.45, canvasSize.height - 13, 'Score: 0', { fontSize: '15px', fill: '#FFFFFF' });

    // collider
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);

    // cursor
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // Fruites
    const fruits = this.physics.add.group();
    // const fruitList = ['fruit1', 'fruit2', 'fruit3'];

    const fruitGen = () => {
      const xCoord = Math.random() * 640;
      // const randomfruit = fruitList[Math.floor(Math.random() * 3)];
      // fruits.create(xCoord, 10, randomfruit);
      fruits.create(xCoord, 10, 'fruit1');
    };

    const fruitGenLoop = this.time.addEvent({
      // delay: 100,
      delay: 300,
      callback: fruitGen,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(fruits, platforms, (fruit) => {
      fruit.destroy();
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });

    this.physics.add.collider(gameState.player, fruits, () => {
      fruitGenLoop.destroy();
      this.physics.pause();
      this.anims.pauseAll();
      this.add.text(canvasSize.width * 0.43, canvasSize.height * 0.45, 'Game Over', { fontSize: '15px', fill: '#000000' });
      this.add.text(canvasSize.width * 0.38, canvasSize.height * 0.5, 'Click to Restart', { fontSize: '15px', fill: '#000000' });

      this.input.on('pointerup', () => {
        gameState.score = 0;
        this.scene.restart();
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = true;
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = false;
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }
}

export default GameScene;
