import axios from 'axios';
const qs = require('querystring');

export const adminLogin = async (params) => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/admin/login', qs.stringify(params));
  console.log(data);

  return data;
};
