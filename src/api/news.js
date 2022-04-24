import axios from 'axios';
const qs = require('querystring');

export const getNewsList = async (params) => {
  const { data } = await axios.post(
    'https://rainlover.fun:3006/api/news/lists',
    qs.stringify({
      page: 1
    })
  );
  // console.log(data);

  return data;
};

export const addNews = async (params) => {
  return ({ data } = await axios.post('https://rainlover.fun:3006/api/news/add', qs.stringify(params)));
};

export const getItem = async (params) => {
  const { data } = await axios.post('https://rainlover.fun:3006/api/news/query', qs.stringify(params));
  return data;
};
