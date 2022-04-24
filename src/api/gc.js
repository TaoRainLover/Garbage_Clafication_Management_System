import axios from 'axios';
import { domain } from '../config/my_server_info';
const qs = require('querystring');

export const addNewItem = async (params) => {
  const { data } = await axios.post(domain + '/api/gc/add', qs.stringify(params));
  return data;
};

export const search_by_text = async (params) => {
  const { data } = await axios.post(domain + '/api/gc/qbt', qs.stringify(params));
  return data;
};

export const search_by_type = async (params) => {
  const { data } = await axios.post(domain + '/api/gc/qbt2', qs.stringify(params));
  return data;
};
