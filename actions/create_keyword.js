import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'create_keyword',
  description: '키워드를 광고그룹에 추가합니다.',
  params: {
    adgroupId: { type: 'string', required: true },
    keyword: { type: 'object', required: true }
  },
  run: async ({ adgroupId, keyword }) => {
    const response = await fetchWithAuth(`/ncc/keywords?nccAdgroupId=${adgroupId}`, 'POST', keyword);
    return response.data;
  }
}; 