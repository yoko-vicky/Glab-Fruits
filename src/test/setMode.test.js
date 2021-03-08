// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { jest } from '@jest/globals';
import setMode from '../helpers/setMode';
import gameState from '../helpers/gameState';

jest.mock('./__mocks__/gameState');

beforeEach(() => {
  gameState.fruitDelay = null;
  gameState.enemyDelay = null;
});

test('should set mode with the given arguments', () => {
  setMode(100, 300);
  expect(gameState.fruitDelay).toBe(100);
  expect(gameState.enemyDelay).toBe(300);
});

test('should not set mode if the either argument type is not a number', () => {
  setMode('abc', 'xyz');
  expect(gameState.fruitDelay).toBe(null);
  expect(gameState.enemyDelay).toBe(null);
});
