import gameState from './gameState';

const setMode = (fruitDelay, enemyDelay) => {
  gameState.fruitDelay = fruitDelay;
  gameState.enemyDelay = enemyDelay;
};

export default setMode;
