import { fetchWithAuth } from '../utils/fetchWithAuth.js';

export default {
  name: 'delete_campaign',
  description: '캠페인을 삭제합니다.',
  params: {
    campaignId: {
      type: 'string',
      required: true
    }
  },
  run: async ({ campaignId }) => {
    const response = await fetchWithAuth(`/ncc/campaigns/${campaignId}`, 'DELETE');
    return response.data;
  }
}; 