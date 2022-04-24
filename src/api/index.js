import request from '../utils/request';

export const fetchData = (query) => {
  return request({
    url: './table.json',
    method: 'get',
    params: query
  });
};

// export const getUserList = (query) => {
//   return request({
//     url: 'https://rainlover.fun:3006/api/user/ul',
//     method: 'post',
//     data: query
//   });
// };
