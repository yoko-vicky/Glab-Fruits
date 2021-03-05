import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import leaf2Img from '../assets/images/leaf-2.png';
import restartImg from '../assets/images/restart.png';
import topImg from '../assets/images/top.png';
import scoreImg from '../assets/images/score.png';
import gameOverTitle from '../assets/images/gameover.png';
import setData from '../helpers/setData';
import scorePosRateX from '../helpers/scorePosRateX';
import gameOverMusic from '../assets/sounds/game2.mp3';

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.image('leaf2', leaf2Img);
    this.load.image('restart', restartImg);
    this.load.image('top', topImg);
    this.load.image('score', scoreImg);
    this.load.image('gameover-title', gameOverTitle);
    this.load.audio('gameover-music', gameOverMusic);
  }

  create() {
    this.clickSound = this.sound.add('click-sound');
    this.clickGoSound = this.sound.add('click-go-sound');
    this.gameOverMusic = this.sound.add('gameover-music');
    this.gameOverMusic.loop = true;
    this.gameOverMusic.play();

    setData(gameState.player, gameState.score);
    this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.5, 'tree');
    this.add.image(gameState.canvasSize.width * 0.5, 95, 'leaf2');
    this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.18, 'gameover-title');

    this.add.text(gameState.canvasSize.width * scorePosRateX(), gameState.canvasSize.height * 0.3, `${gameState.score}`, { fill: '#FFFFFF', font: '800 68px Roboto' });

    this.restart = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.55, 'restart');
    this.totop = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.7, 'top');
    this.toscore = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.85, 'score');
    this.restart.setInteractive().on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('GameOver');
      this.gameOverMusic.stop();
      this.clickGoSound.play();
      this.scene.start('Play');
    });
    this.totop.setInteractive().on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('GameOver');
      this.gameOverMusic.stop();
      this.clickSound.play();
      this.scene.start('Start');
    });
    this.toscore.setInteractive().on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('GameOver');
      this.gameOverMusic.stop();
      this.clickSound.play();
      this.scene.start('Score');
    });
  }
}

export default GameOver;
