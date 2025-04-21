// 불필요한 dotenv 제거
// import dotenv from 'dotenv';
// dotenv.config(); ← 이거 없어도 됨

import axios from 'axios';

export const fetchWithAuth = async (endpoint, method = 'GET', data = null) => {
  const API_KEY = process.env.NAVER_API_KEY;
  const CUSTOMER_ID = process.env.NAVER_CUSTOMER_ID;

  if (!API_KEY || !CUSTOMER_ID) {
    throw new Error('NAVER_API_KEY 또는 NAVER_CUSTOMER_ID가 설정되지 않았습니다.');
  }

  const headers = {
    'X-API-KEY': API_KEY,
    'X-CUSTOMER': CUSTOMER_ID,
    'Content-Type': 'application/json'
  };

  const config = { method, url: `https://api.naver.com${endpoint}`, headers };
  if (data) config.data = data;

  return axios(config);
};
