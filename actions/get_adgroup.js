import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'get_adgroup',
  description: '특정 광고그룹 정보를 조회합니다.',
  params: {
    adgroupId: {
      type: 'string',
      required: true
    }
  },
  run: async ({ adgroupId }) => {
    const response = await fetchWithAuth(`/ncc/adgroups/${adgroupId}`);
    return response.data;
  }
}; 