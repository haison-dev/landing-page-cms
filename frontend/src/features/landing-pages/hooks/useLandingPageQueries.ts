import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { landingPageApi } from '@/api/landingPageApi';
import { LandingPage } from '@/types';

export const landingPageKeys = {
  all: ['landing-pages'] as const,
  list: (params?: Record<string, string | number | boolean>) => ['landing-pages', 'list', params] as const,
  detailSlug: (slug: string) => ['landing-pages', 'slug', slug] as const,
  detailId: (id: string) => ['landing-pages', 'id', id] as const
};

export const useLandingPagesQuery = (params?: Record<string, string | number | boolean>) =>
  useQuery({
    queryKey: landingPageKeys.list(params),
    queryFn: () => landingPageApi.getAll(params)
  });

export const useLandingPageBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: landingPageKeys.detailSlug(slug),
    queryFn: () => landingPageApi.getBySlug(slug),
    enabled: Boolean(slug)
  });

export const useLandingPageByIdQuery = (id: string, enabled = true) =>
  useQuery({
    queryKey: landingPageKeys.detailId(id),
    queryFn: () => landingPageApi.getById(id),
    enabled: Boolean(id) && enabled
  });

export const useLandingPageMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: landingPageKeys.all });

  const create = useMutation({
    mutationFn: (payload: Partial<LandingPage> & { title: string; slug: string; industryId: string }) => landingPageApi.create(payload),
    onSuccess: invalidate
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<LandingPage> }) => landingPageApi.update(id, payload),
    onSuccess: invalidate
  });
  const remove = useMutation({
    mutationFn: (id: string) => landingPageApi.remove(id),
    onSuccess: invalidate
  });
  const publish = useMutation({
    mutationFn: (id: string) => landingPageApi.publish(id),
    onSuccess: invalidate
  });

  return { create, update, remove, publish };
};
