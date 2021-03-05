import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import topImg from '../assets/top.png';
import restartImg from '../assets/restart.png';
import topScorersImg from '../assets/top-scorers.png';
import getData from '../helpers/getData';
import scoreMusic from '../assets/score.wav';

class Score extends Phaser.Scene {
  constructor() {
    super({ key: 'Score' });
  }

  preload() {
    this.load.image('top', topImg);
    this.load.image('restart', restartImg);
    this.load.image('top-scorers', topScorersImg);
    this.load.audio('score-music', scoreMusic);
  }

  create() {
    this.clickSound = this.sound.add('click-sound');
    this.scoreMusic = this.sound.add('score-music');
    this.scoreMusic.loop = false;
    this.scoreMusic.play();

    this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.2, 'top-scorers');
    getData().then(data => {
      gameState.topFive = data;
      gameState.topFive.forEach((result, index) => {
        this.add.text(gameState.canvasSize.width * 0.38, gameState.canvasSize.height * 0.35 + (index * 30), `${index + 1}. ${result.user} : ${result.score}`, { fill: '#000000', font: '700 18px Roboto' });
      });
    }).catch(() => {
      this.add.text(gameState.canvasSize.width * 0.25, gameState.canvasSize.height * 0.45, 'Sorry, for some reason, unable to get the score data.', { fill: '#000000' });
    });

    this.restart = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.75, 'restart');
    this.totop = this.add.image(gameState.canvasSize.width * 0.5, gameState.canvasSize.height * 0.9, 'top');

    this.totop.setInteractive().on('pointerup', () => {
      this.scene.stop('Score');
      this.clickSound.play();
      this.scene.start('Start');
    });
    this.restart.setInteractive().on('pointerup', () => {
      this.scene.stop('Score');
      this.clickSound.play();
      this.scene.start('Play');
    });
  }
}

export default Score;
