import axios from 'axios';

const getGameId = async () => {
  const response = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', { name: 'Grab fruits by Yoko Saka' })
    .then(response => response.data)
    .catch(error => error.response.data);
  return response;
};
// xOwoSY152NCqczqPjpxw

const setUserScore = async (gameId, userData) => {
  const data = await axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, userData)
    .then(response => response.data)
    .catch(error => error.response.data);
  return data.result;
};

const getGameResult = async (gameId) => {
  const data = await axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`)
    .then(response => response.data)
    .catch(error => error.response.data);
  return data;
};

export { getGameId, setUserScore, getGameResult };
