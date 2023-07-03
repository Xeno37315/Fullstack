import axios from 'axios';

const baseURL = 'http://localhost:3004/api';

export const getAllGenres = async (params) => {
  const result = await axios.get(baseURL + '/readAllGenres', params);
  return result.data;
};
