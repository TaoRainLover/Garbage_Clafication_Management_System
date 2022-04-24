import axios from 'axios';
const qs = require('querystring');

// 未读列表
export const getList = async () => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/feedback/lists');
  // console.log(data);

  return data;
};

// 已读列表
export const getReadList = async () => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/feedback/lr');
  // console.log(data);
  return data;
};

// 删除列表
export const getDeletedList = async () => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/feedback/ld');
  return data;
};
