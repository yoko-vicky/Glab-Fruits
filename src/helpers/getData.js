import axios from 'axios';

const getGameResult = async () => {
  const data = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$xOwoSY152NCqczqPjpxw/scores/')
    .then(response => response.data.result).catch(error => error);
  return data;
};

const getData = async () => {
  const data = await getGameResult();
  return data
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .filter((item) => typeof item.user === 'string' && item.score % 10 === 0)
    .slice(0, 5);
};

export default getData;
