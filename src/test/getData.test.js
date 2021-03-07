// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import getData from '../helpers/getData';

jest.mock('axios');
test('should fetch result data with users and scores', async () => {
  const dbData = { data: { result: [{ score: 1580, user: 'user2' }, { score: 260, user: 'user1' }] } };
  axios.get.mockResolvedValue(dbData);
  const response = await getData();
  expect(response.length).toEqual(2);
});
