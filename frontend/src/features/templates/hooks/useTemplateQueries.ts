import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { templateApi } from '@/api/templateApi';
import { Template } from '@/types';

export const templateKeys = {
  all: ['templates'] as const,
  admin: ['templates', 'admin'] as const
};

export const useTemplatesQuery = (params?: Record<string, string | number | boolean>) =>
  useQuery({
    queryKey: [...templateKeys.admin, params],
    queryFn: () => templateApi.getAll(params)
  });

export const useTemplateMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: templateKeys.all });

  const create = useMutation({
    mutationFn: (payload: Partial<Template> & { name: string; slug: string; industryId: string }) => templateApi.create(payload),
    onSuccess: invalidate
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Template> }) => templateApi.update(id, payload),
    onSuccess: invalidate
  });
  const remove = useMutation({
    mutationFn: (id: string) => templateApi.remove(id),
    onSuccess: invalidate
  });

  return { create, update, remove };
};
