import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'list_campaigns',
  description: '캠페인 목록을 조회합니다.',
  run: async () => {
    try {
      const response = await fetchWithAuth('/ncc/campaigns');
      return response.data;
    } catch (err) {
      console.error('list_campaigns 실행 중 오류:', err.message);
      throw new Error('캠페인 목록 조회 실패');
    }
  }
};
