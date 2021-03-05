import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import playerImg from '../assets/images/player.png';
import appleImg from '../assets/images/apple.png';
import pineAppleImg from '../assets/images/pineapple.png';
import landImg from '../assets/images/land.png';
import miniPlatformImg from '../assets/images/platform.png';
import treeImg from '../assets/images/tree.png';
import leafImg from '../assets/images/leaf-2.png';
import spiderImg from '../assets/images/spider.png';
import bananaImg from '../assets/images/banana.png';
import playMusic from '../assets/sounds/game1.mp3';
import ouchSound from '../assets/sounds/ouch.mp3';
import getSound from '../assets/sounds/get.mp3';
import mountainImg from '../assets/images/mountain.png';
import treesImg from '../assets/images/trees.png';
import greenImg from '../assets/images/green.png';

class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Play' });
  }

  preload() {
    this.load.image('platform', landImg);
    this.load.image('mini-platform', miniPlatformImg);
    this.load.image('tree', treeImg);
    this.load.image('leaf', leafImg);
    this.load.image('fruit1', appleImg);
    this.load.image('fruit2', bananaImg);
    this.load.image('fruit3', pineAppleImg);
    this.load.image('enemy1', spiderImg);
    this.load.image('green', greenImg);
    this.load.image('mountain', mountainImg);
    this.load.image('trees', treesImg);
    this.load.audio('play-music', playMusic);
    this.load.audio('ouch-sound', ouchSound);
    this.load.audio('get-sound', getSound);
    this.load.audio('play-music', playMusic);
    this.load.spritesheet('girl', playerImg, { frameWidth: 72, frameHeight: 90 });
  }

  create() {
    this.createParallaxBackgrounds();

    this.ouchSound = this.sound.add('ouch-sound');
    this.getSound = this.sound.add('get-sound');
    this.playMusic = this.sound.add('play-music');
    this.playMusic.loop = true;
    this.playMusic.play();

    // tree
    this.add.image(gameState.camera.width * 0.5, gameState.canvas.height * 0.5, 'tree');
    this.add.image(gameState.camera.width * 0.5, 95, 'leaf');

    // land
    this.land = this.physics.add.staticGroup();
    this.land.create(gameState.canvas.width * 0.5, gameState.canvas.height - 10, 'platform').setScale(1.1, 1).refreshBody();
    this.land.create(20, 500, 'mini-platform');
    this.land.create(430, 500, 'mini-platform');
    this.land.create(100, 340, 'mini-platform');
    this.land.create(340, 340, 'mini-platform');
    this.land.create(520, 340, 'mini-platform');
    this.land.create(680, 500, 'mini-platform');
    this.land.create(780, 240, 'mini-platform');
    this.land.create(940, 340, 'mini-platform');
    // player
    gameState.player = this.physics.add.sprite(gameState.canvas.width * 0.5, gameState.canvas.height * 0.8, 'girl').setScale(0.5);
    this.add.existing(gameState.player);
    this.physics.add.collider(gameState.player, this.land);

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

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('girl', { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });

    // score
    this.scoreText = this.add.text(gameState.canvas.width * 0.41, gameState.canvas.height - 16, 'Score: 0', { fill: '#FFFFFF', font: '400 15px Roboto' });

    // set Cameras
    this.cameras.main.setBounds(0, 0, gameState.camera.width, gameState.camera.height);
    this.physics.world.setBounds(0, 0, gameState.camera.width, gameState.camera.height);
    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);
    this.scoreText.setScrollFactor(0);

    // colliders
    gameState.player.setCollideWorldBounds(true);

    // cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Fruites
    this.fruits = this.physics.add.group();
    this.fruitList = ['fruit1', 'fruit2', 'fruit3'];

    this.fruitGen = () => {
      const xCoord = Math.random() * gameState.camera.width;
      const randomfruit = this.fruitList[Math.floor(Math.random() * this.fruitList.length)];
      this.fruits.create(xCoord, 10, randomfruit);
    };

    this.fruitGenLoop = this.time.addEvent({
      delay: 100,
      callback: this.fruitGen,
      callbackScope: this,
      loop: true,
    });

    // enemies
    this.enemies = this.physics.add.group();
    this.enemiesList = ['enemy1'];

    this.enemyGen = () => {
      const xCoord = Math.random() * gameState.camera.width;
      const randomenemy = this.enemiesList[Math.floor(Math.random() * this.enemiesList.length)];
      this.enemies.create(xCoord, 10, randomenemy);
    };

    this.enemyGenLoop = this.time.addEvent({
      delay: 600,
      callback: this.enemyGen,
      callbackScope: this,
      loop: true,
    });

    // Colliders
    this.physics.add.collider(this.fruits, this.land, (fruit) => { fruit.destroy(); });
    this.physics.add.collider(this.enemies, this.land, (enemy) => { enemy.destroy(); });

    // Adds a win condition
    this.physics.add.overlap(gameState.player, this.fruits, this.getFruits, null, this);
    // Move to gameover scean
    this.physics.add.overlap(this.enemies, gameState.player, this.changeToGameOver, null, this);
  }

  createParallaxBackgrounds() {
    this.bg1 = this.add.image(0, 0, 'mountain');
    this.bg3 = this.add.image(0, 0, 'green');
    this.bg2 = this.add.image(0, 0, 'trees');

    this.bg1.setOrigin(0, 0);
    this.bg2.setOrigin(0, 0);
    this.bg3.setOrigin(0, 0);

    const gameWidth = parseFloat(this.bg3.getBounds().width);
    // gameState.camera.width = gameWidth;
    const windowWidth = gameState.canvas.width;

    const bg1Width = this.bg1.getBounds().width;
    const bg2Width = this.bg2.getBounds().width;

    this.bg1.setScrollFactor((bg1Width - windowWidth) / (gameWidth - windowWidth));
    this.bg2.setScrollFactor((bg2Width - windowWidth) / (gameWidth - windowWidth));
  }

  update() {
    if (gameState.player.x >= (gameState.camera.width - 36)) {
      gameState.player.setX(0);
    }
    if (this.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = false;
    } else if (this.cursors.up.isDown && gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-360);
      gameState.player.anims.play('jump', true);
      gameState.player.flipX = true;
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }

  getFruits(player, fruit) {
    fruit.destroy();
    this.getSound.play();
    gameState.score += 10;
    this.scoreText.setText(`Score: ${gameState.score}`);
    return false;
  }

  changeToGameOver() {
    this.ouchSound.play();
    this.fruitGenLoop.destroy();
    this.enemyGenLoop.destroy();
    this.physics.pause();
    this.anims.pauseAll();
    this.scene.stop('Play');
    this.playMusic.stop();
    this.scene.start('GameOver');
  }
}

export default Play;
