import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import playerImg from '../assets/player.png';
import appleImg from '../assets/apple.png';
import poisonAppleImg from '../assets/poison-apple.png';
import pineAppleImg from '../assets/pineapple.png';
import landImg from '../assets/land.png';
import treeImg from '../assets/tree.png';
import leafImg from '../assets/leaf.png';
import spiderImg from '../assets/spider.png';
import bananaImg from '../assets/banana.png';

class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Play' });
  }

  preload() {
    this.load.image('platform', landImg);
    this.load.image('tree', treeImg);
    this.load.image('leaf', leafImg);
    this.load.image('fruit1', appleImg);
    this.load.image('fruit2', bananaImg);
    this.load.image('fruit3', pineAppleImg);
    this.load.image('enemy1', spiderImg);
    this.load.image('enemy2', poisonAppleImg);
    this.load.spritesheet('girl', playerImg, { frameWidth: 72, frameHeight: 90 });
  }

  create() {
    // tree
    this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.5, 'tree');
    this.add.image(gameState.canvasSize.width * 0.5, 95, 'leaf');

    // player
    gameState.player = this.physics.add.sprite(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.8, 'girl').setScale(0.5);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('girl', { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    // land
    this.land = this.physics.add.staticGroup();
    this.land.create(gameState.canvasSize.width * 0.5, gameState.canvasSize.height - 12, 'platform').setScale(1.1, 1).refreshBody();

    // score
    this.scoreText = this.add.text(gameState.canvasSize.width * 0.41, gameState.canvasSize.height - 16, 'Score: 0', { fill: '#FFFFFF', font: '400 15px Roboto' });

    // collider
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, this.land);

    // cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Fruites
    this.fruits = this.physics.add.group();
    this.fruitList = ['fruit1', 'fruit2', 'fruit3'];

    this.fruitGen = () => {
      const xCoord = Math.random() * gameState.canvasSize.width;
      const randomfruit = this.fruitList[Math.floor(Math.random() * this.fruitList.length)];
      this.fruits.create(xCoord, 10, randomfruit);
    };

    this.fruitGenLoop = this.time.addEvent({
      delay: 500,
      callback: this.fruitGen,
      callbackScope: this,
      loop: true,
    });

    // enemies
    this.enemies = this.physics.add.group();
    this.enemiesList = ['enemy1'];

    this.enemyGen = () => {
      const xCoord = Math.random() * gameState.canvasSize.width;
      const randomenemy = this.enemiesList[Math.floor(Math.random() * this.enemiesList.length)];
      this.enemies.create(xCoord, 10, randomenemy);
    };

    this.enemyGenLoop = this.time.addEvent({
      delay: 800,
      callback: this.enemyGen,
      callbackScope: this,
      loop: true,
    });

    // Colliders
    this.physics.add.collider(this.fruits, this.land, (fruit) => {
      fruit.destroy();
    });

    this.physics.add.collider(this.enemies, this.land, (enemy) => {
      enemy.destroy();
    });

    // Adds a win condition
    this.physics.add.overlap(this.fruits, gameState.player, () => {
      gameState.score += 1;
      this.scoreText.setText(`Score: ${gameState.score}`);
    });

    // Move to gameover scean
    this.physics.add.overlap(this.enemies, gameState.player, () => {
      this.fruitGenLoop.destroy();
      this.enemyGenLoop.destroy();
      this.physics.pause();
      this.anims.pauseAll();
      this.scene.stop('Play');
      this.scene.start('GameOver');
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = false;
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }
}

export default Play;
