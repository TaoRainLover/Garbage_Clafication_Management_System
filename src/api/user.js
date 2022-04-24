import axios from 'axios';
const qs = require('querystring');

export const getUserList = async (params) => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/user/ul', qs.stringify(params));
  // console.log(data);

  return data;
};

export const query = async (params) => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/user/query', qs.stringify(params));
  // console.log(data);

  return data;
};
