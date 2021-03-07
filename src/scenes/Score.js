// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import topScorersImg from '../assets/images/top-scorers.png';
import getData from '../helpers/getData';
import scoreMusic from '../assets/sounds/score.mp3';

class Score extends Phaser.Scene {
  constructor() {
    super({ key: 'Score' });
  }

  preload() {
    this.load.image('top-scorers', topScorersImg);
    this.load.audio('score-music', scoreMusic);
  }

  create() {
    this.addTitle();
    this.addSounds();
    this.renderRanking();
    this.addButtons();
  }

  addSounds() {
    this.clickSound = this.sound.add('click-sound');
    this.scoreMusic = this.sound.add('score-music');
    this.scoreMusic.loop = false;
    this.scoreMusic.play();
  }

  addTitle() {
    this.add.image(gameState.canvas.width * 0.5, gameState.canvas.height * 0.2, 'top-scorers');
  }

  async renderRanking() {
    try {
      const data = await getData();
      gameState.topFive = data;
      gameState.topFive.forEach((result, index) => {
        this.add.text(gameState.canvas.width * 0.38, gameState.canvas.height * 0.35 + (index * 30), `${index + 1}. ${result.user} : ${result.score}`, { fill: '#000000', font: '700 18px Roboto' });
      });
    } catch {
      this.add.text(gameState.canvas.width * 0.25, gameState.canvas.height * 0.45, 'Sorry, for some reason, unable to get the score data.', { fill: '#000000' });
    }
  }

  stopScore() {
    this.scene.stop('Score');
    this.clickSound.play();
  }

  addButtons() {
    this.restart = this.add.image(gameState.canvas.width * 0.5, gameState.canvas.height * 0.75, 'restart');
    this.totop = this.add.image(gameState.canvas.width * 0.5, gameState.canvas.height * 0.9, 'top');

    this.totop.setInteractive().on('pointerup', () => {
      this.stopScore();
      this.scene.start('Start');
    });
    this.restart.setInteractive().on('pointerup', () => {
      this.stopScore();
      this.scene.start('Play');
    });
  }
}

export default Score;
