import scorePosRateX from '../helpers/scorePosRateX';
import gameState from '../helpers/gameState';

test('should return the number corresponding to the game score', () => {
  gameState.score = 300;
  expect(scorePosRateX()).toBe(0.38);
});

test('should return the number corresponding to the game score', () => {
  gameState.score = 0;
  expect(scorePosRateX()).toBe(0.46);
});
