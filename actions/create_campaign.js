import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'create_campaign',
  description: '새로운 네이버 캠페인을 생성합니다.',
  params: {
    campaign: {
      type: 'object',
      required: true,
      description: '캠페인 생성 정보'
    }
  },
  run: async ({ campaign }) => {
    const response = await fetchWithAuth('/ncc/campaigns', 'POST', campaign);
    return response.data;
  }
}; 