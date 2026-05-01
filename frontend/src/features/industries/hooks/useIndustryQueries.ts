import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { industryApi } from '@/api/industryApi';
import { Industry } from '@/types';

export const industryKeys = {
  all: ['industries'] as const,
  admin: ['industries', 'admin'] as const,
  public: ['industries', 'public'] as const,
  bySlug: (slug: string) => ['industries', 'slug', slug] as const
};

export const useIndustriesQuery = (params?: Record<string, string | number | boolean>, scope: 'admin' | 'public' = 'public') =>
  useQuery({
    queryKey: scope === 'admin' ? [...industryKeys.admin, params] : [...industryKeys.public, params],
    queryFn: () => industryApi.getAll(params)
  });

export const useIndustryBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: industryKeys.bySlug(slug),
    queryFn: () => industryApi.getBySlug(slug),
    enabled: Boolean(slug)
  });

export const useIndustryMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: industryKeys.all });

  const create = useMutation({
    mutationFn: (payload: Partial<Industry> & { name: string; slug: string }) => industryApi.create(payload),
    onSuccess: invalidate
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Industry> }) => industryApi.update(id, payload),
    onSuccess: invalidate
  });
  const remove = useMutation({
    mutationFn: (id: string) => industryApi.remove(id),
    onSuccess: invalidate
  });

  return { create, update, remove };
};
