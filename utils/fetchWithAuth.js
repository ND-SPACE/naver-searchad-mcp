import axios from 'axios';
export async function fetchWithAuth(path, method = 'GET', data = null) {
  const key = process.env.NAVER_API_KEY;
  const customer = process.env.NAVER_CUSTOMER_ID;
  if (!key || !customer) throw new Error('환경변수 누락');
  return axios({ method, url: `https://api.naver.com${path}`, headers: {
    'X-API-KEY': key,
    'X-CUSTOMER': customer,
    'Content-Type': 'application/json'
  }, data });
}
