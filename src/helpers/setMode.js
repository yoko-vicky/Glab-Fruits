import gameState from './gameState';

const setMode = (fruitDelay, enemyDelay) => {
  if (typeof fruitDelay !== 'number' || typeof enemyDelay !== 'number') return;
  gameState.fruitDelay = fruitDelay;
  gameState.enemyDelay = enemyDelay;
};

export default setMode;
