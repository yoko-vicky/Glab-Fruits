// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import setData from '../helpers/setData';

jest.mock('axios');
test('should set the data of the user and its score', async () => {
  const returnData = { data: { result: 'Leaderboard score created correctly.' } };
  axios.post.mockResolvedValue(returnData);
  const response = await setData('hana', 2020);
  expect(response).toEqual('Leaderboard score created correctly.');
});

test('should return message when no argument is passed', async () => {
  const returnData = { data: { result: 'You need to provide a valid score for the leaderboard' } };
  axios.post.mockResolvedValue(returnData);
  const response = await setData();
  expect(response).toEqual('You need to provide a valid score for the leaderboard');
});
