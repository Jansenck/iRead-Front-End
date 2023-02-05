import api from './api';

export async function storeText(fullText) {

  const body = {
    text: fullText,
    userId: 1
  }

  const response = await api.post('/translator', body, {
    headers: {
      Authorization: `Bearer ${'token'}`,
    },
  });

  return response.data;
}