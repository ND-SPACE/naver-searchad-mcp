import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'create_adgroup',
  description: '광고그룹을 생성합니다.',
  params: {
    adgroup: {
      type: 'object',
      required: true
    }
  },
  run: async ({ adgroup }) => {
    const response = await fetchWithAuth('/ncc/adgroups', 'POST', adgroup);
    return response.data;
  }
}; 