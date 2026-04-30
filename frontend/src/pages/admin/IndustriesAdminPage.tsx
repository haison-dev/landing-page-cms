import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { industryApi } from '@/api/industryApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/admin/common/ConfirmDialog';
import { DataTable } from '@/components/admin/common/DataTable';
import { EmptyState } from '@/components/admin/common/EmptyState';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/http';

type IndustryForm = { name: string; slug: string; description: string };

export default function IndustriesAdminPage() {
  const qc = useQueryClient();
  const [createForm, setCreateForm] = useState<IndustryForm>({ name: '', slug: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({ queryKey: ['industries-admin'], queryFn: () => industryApi.getAll() });

  const createMutation = useMutation({
    mutationFn: () => industryApi.create({ ...createForm, status: 'active' }),
    onSuccess: () => {
      setCreateForm({ name: '', slug: '', description: '' });
      qc.invalidateQueries({ queryKey: ['industries-admin'] });
      toast.success('Tạo lĩnh vực thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể tạo lĩnh vực'))
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IndustryForm> }) => industryApi.update(id, payload),
    onSuccess: () => {
      setEditingId(null);
      qc.invalidateQueries({ queryKey: ['industries-admin'] });
      toast.success('Cập nhật thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể cập nhật lĩnh vực'))
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => industryApi.remove(id),
    onSuccess: () => {
      setDeleteId(null);
      qc.invalidateQueries({ queryKey: ['industries-admin'] });
      toast.success('Xóa lĩnh vực thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể xóa lĩnh vực'))
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-slate-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">Tạo lĩnh vực</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <Input value={createForm.name} placeholder="Tên lĩnh vực" onChange={(e) => setCreateForm((s) => ({ ...s, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} />
          <Input value={createForm.slug} placeholder="slug" onChange={(e) => setCreateForm((s) => ({ ...s, slug: e.target.value }))} />
          <Input value={createForm.description} placeholder="Mô tả ngắn" onChange={(e) => setCreateForm((s) => ({ ...s, description: e.target.value }))} />
        </div>
        <div className="mt-3">
          <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !createForm.name || !createForm.slug}>Tạo mới</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">Đang tải...</div>
      ) : data?.length ? (
        <DataTable>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Slug</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const isEditing = editingId === item._id;
                const draft = (item as unknown as { _draft?: IndustryForm })._draft || { name: item.name, slug: item.slug, description: (item as unknown as { description?: string }).description || '' };

                return (
                  <tr key={item._id} className="border-t">
                    <td className="px-3 py-2">
                      {isEditing ? <Input defaultValue={draft.name} onChange={(e) => ((item as unknown as { _draft: IndustryForm })._draft = { ...draft, name: e.target.value })} /> : item.name}
                    </td>
                    <td className="px-3 py-2">
                      {isEditing ? <Input defaultValue={draft.slug} onChange={(e) => ((item as unknown as { _draft: IndustryForm })._draft = { ...draft, slug: e.target.value })} /> : item.slug}
                    </td>
                    <td className="px-3 py-2"><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">{item.status}</span></td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <Button variant="secondary" onClick={() => setEditingId(null)}>Hủy</Button>
                            <Button onClick={() => updateMutation.mutate({ id: item._id, payload: (item as unknown as { _draft: IndustryForm })._draft || draft })}>Lưu</Button>
                          </>
                        ) : (
                          <Button variant="secondary" onClick={() => setEditingId(item._id)}>Edit</Button>
                        )}
                        <Button variant="danger" onClick={() => setDeleteId(item._id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DataTable>
      ) : (
        <EmptyState title="Chưa có lĩnh vực" message="Tạo lĩnh vực đầu tiên để bắt đầu." />
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Xác nhận xóa"
        message="Bạn có chắc muốn xóa lĩnh vực này?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
