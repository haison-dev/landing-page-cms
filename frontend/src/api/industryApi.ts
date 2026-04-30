import { Industry } from '@/types';
import { apiClient } from './apiClient';

export const industryApi = {
  getAll: async (params?: Record<string, string | number | boolean>) => (await apiClient.get<Industry[]>('/industries', { params })).data,
  getBySlug: async (slug: string) => (await apiClient.get<Industry | null>(`/industries/slug/${slug}`)).data,
  create: async (payload: Partial<Industry> & { name: string; slug: string }) => (await apiClient.post('/industries', payload)).data,
  update: async (id: string, payload: Partial<Industry>) => (await apiClient.put(`/industries/${id}`, payload)).data,
  remove: async (id: string) => (await apiClient.delete(`/industries/${id}`)).data
};
