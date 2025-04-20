import axios from 'axios';

export async function fetchWithAuth(path, method = 'GET', data = null, params = null) {
  return axios({
    url: `https://api.naver.com${path}`,
    method,
    headers: {
      'X-API-KEY': process.env.NAVER_API_KEY,
      'X-CUSTOMER': process.env.NAVER_CUSTOMER_ID,
      'Content-Type': 'application/json'
    },
    data,
    params
  });
} 