import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'list_campaigns',
  description: '캠페인 목록을 조회합니다.',
  run: async () => {
    const response = await fetchWithAuth('/ncc/campaigns');
    return response.data;
  }
}; 