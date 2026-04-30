import { LandingPage, PaginatedResponse } from '@/types';
import { apiClient } from './apiClient';

export const landingPageApi = {
  getAll: async (params?: Record<string, string | number | boolean>) => (await apiClient.get<PaginatedResponse<LandingPage>>('/landing-pages', { params })).data,
  getById: async (id: string) => (await apiClient.get<LandingPage>(`/landing-pages/${id}`)).data,
  getBySlug: async (slug: string) => (await apiClient.get<LandingPage | null>(`/landing-pages/slug/${slug}`)).data,
  create: async (payload: Partial<LandingPage> & { title: string; slug: string; industryId: string }) => (await apiClient.post('/landing-pages', payload)).data,
  update: async (id: string, payload: Partial<LandingPage>) => (await apiClient.put(`/landing-pages/${id}`, payload)).data,
  remove: async (id: string) => (await apiClient.delete(`/landing-pages/${id}`)).data,
  publish: async (id: string) => (await apiClient.patch(`/landing-pages/${id}/publish`)).data,
  unpublish: async (id: string) => (await apiClient.patch(`/landing-pages/${id}/unpublish`)).data
};
