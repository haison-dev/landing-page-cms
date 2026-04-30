import { apiClient } from './apiClient';

export const authApi = {
  login: async (payload: { email: string; password: string }) => (await apiClient.post('/auth/login', payload)).data
};
