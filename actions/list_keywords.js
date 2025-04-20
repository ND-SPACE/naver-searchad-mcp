import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'list_keywords',
  description: '광고그룹에 등록된 키워드 목록을 조회합니다.',
  params: {
    adgroupId: { type: 'string', required: true }
  },
  run: async ({ adgroupId }) => {
    const response = await fetchWithAuth(`/ncc/keywords?nccAdgroupId=${adgroupId}`);
    return response.data;
  }
}; 