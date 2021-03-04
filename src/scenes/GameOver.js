import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import landImg from '../assets/land.png';
import treeImg from '../assets/tree.png';
import leaf2Img from '../assets/leaf-2.png';
import restartImg from '../assets/restart.png';
import topImg from '../assets/top.png';
import scoreImg from '../assets/score.png';
import gameOverTitle from '../assets/gameover.png';
import setData from '../helpers/setData';
import scorePosRateX from '../helpers/scorePosRateX';

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.image('platform', landImg);
    this.load.image('tree', treeImg);
    this.load.image('leaf2', leaf2Img);
    this.load.image('restart', restartImg);
    this.load.image('top', topImg);
    this.load.image('score', scoreImg);
    this.load.image('gameover-title', gameOverTitle);
  }

  create() {
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
      this.scene.start('Play');
    });
    this.totop.setInteractive().on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('GameOver');
      this.scene.start('Start');
    });
    this.toscore.setInteractive().on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('GameOver');
      this.scene.start('Score');
    });
  }
}

export default GameOver;
