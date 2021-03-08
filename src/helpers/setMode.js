import gameState from './gameState';

const setMode = (fruitDelay, enemyDelay, playMode) => {
  if (typeof fruitDelay !== 'number' || typeof enemyDelay !== 'number') return;
  gameState.fruitDelay = fruitDelay;
  gameState.enemyDelay = enemyDelay;
  gameState.mode = playMode;
};

export default setMode;
