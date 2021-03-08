// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import getData from '../helpers/getData';

jest.mock('axios');
test('should fetch result data with users and scores', async () => {
  const dbData = { data: { result: [{ score: 1580, user: { name: 'user1', mode: 'easy' } }, { score: 260, user: { name: 'user2', mode: 'easy' } }] } };
  axios.get.mockResolvedValue(dbData);
  const response = await getData('easy');
  expect(response.length).toEqual(2);
});
