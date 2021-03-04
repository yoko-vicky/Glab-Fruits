import gameState from './gameState';

const scorePosRateX = () => {
  let result;
  if (gameState.score === 0) {
    result = 0.46;
  } else if (gameState.score < 100) {
    result = 0.42;
  } else if (gameState.score < 1000) {
    result = 0.38;
  } else {
    result = 0.34;
  }
  return result;
};

export default scorePosRateX;
