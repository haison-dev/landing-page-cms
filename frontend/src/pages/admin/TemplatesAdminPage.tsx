import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { industryApi } from '@/api/industryApi';
import { templateApi } from '@/api/templateApi';
import { Template } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/admin/common/ConfirmDialog';
import { EmptyState } from '@/components/admin/common/EmptyState';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/http';
import { EditorPanel } from '@/components/admin/landing/EditorPanel';

const initial: Partial<Template> = { name: '', slug: '', industryId: '', htmlBase: '', cssBase: '', jsBase: '', status: 'active' };

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function TemplatesAdminPage({ mode = 'all' }: { mode?: 'all' | 'create' | 'list' }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<Partial<Template>>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data: industries } = useQuery({ queryKey: ['industries-admin'], queryFn: () => industryApi.getAll() });
  const { data: templates, isLoading } = useQuery({ queryKey: ['templates-admin'], queryFn: () => templateApi.getAll() });

  useEffect(() => {
    if (mode !== 'create' || !templates?.length) return;
    const editId = searchParams.get('edit');
    if (!editId) {
      setEditingId(null);
      return;
    }
    const found = templates.find((t) => t._id === editId);
    if (!found) return;
    setEditingId(found._id);
    setForm({ ...found, industryId: typeof found.industryId === 'string' ? found.industryId : found.industryId._id });
  }, [mode, searchParams, templates]);

  const buildPayload = (value: Partial<Template>) => {
    const industryId = typeof value.industryId === 'string' ? value.industryId : value.industryId?._id || '';
    return {
      name: (value.name || '').trim(),
      slug: toSlug(value.slug || value.name || ''),
      industryId,
      description: (value.description || '').trim(),
      htmlBase: value.htmlBase || '',
      cssBase: value.cssBase || '',
      jsBase: value.jsBase || '',
      status: value.status || 'active'
    };
  };

  const createMutation = useMutation({
    mutationFn: () => templateApi.create(buildPayload(form)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates-admin'] });
      toast.success('Tạo template thành công');
      setForm(initial);
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể tạo template'))
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Template> }) => templateApi.update(id, buildPayload(payload)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates-admin'] });
      toast.success('Cập nhật template thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể cập nhật template'))
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => templateApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates-admin'] });
      setDeleteId(null);
      toast.success('Xóa template thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể xóa template'))
  });

  const industryId = typeof form.industryId === 'string' ? form.industryId : form.industryId?._id || '';
  const canSubmit = Boolean(form.name?.trim() && form.slug?.trim() && industryId);
  const filteredTemplates = (templates || []).filter((t) => {
    const industryValue = typeof t.industryId === 'string' ? t.industryId : t.industryId._id;
    const industryName = typeof t.industryId === 'string' ? '' : t.industryId.name;
    const query = search.trim().toLowerCase();
    const matchSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.slug.toLowerCase().includes(query) ||
      industryName.toLowerCase().includes(query);
    const matchIndustry = industryFilter === 'all' || industryValue === industryFilter;
    return matchSearch && matchIndustry;
  });
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pagedTemplates = filteredTemplates.slice(start, start + pageSize);

  const handleCreate = () => {
    if (!canSubmit) {
      toast.error('Vui lòng nhập Name, Slug và chọn Industry trước khi tạo');
      return;
    }
    createMutation.mutate();
  };

  return (
    <div className="space-y-6">
      {(mode === 'all' || mode === 'create') ? (
        <div className="grid gap-6 xl:grid-cols-[420px,1fr]">
          <div className="space-y-4 rounded-2xl border bg-slate-50 p-4">
            <h3 className="text-lg font-semibold">{editingId ? 'Cập nhật template' : 'Tạo template'}</h3>
            <Input value={form.name || ''} placeholder="Tên template" onChange={(e) => setForm((s) => ({ ...s, name: e.target.value, slug: toSlug(e.target.value) }))} />
            <Input value={form.slug || ''} placeholder="Slug" onChange={(e) => setForm((s) => ({ ...s, slug: toSlug(e.target.value) }))} />
            <select className="w-full rounded-lg border border-slate-300 p-2" value={industryId} onChange={(e) => setForm((s) => ({ ...s, industryId: e.target.value }))}>
              <option value="">Chọn lĩnh vực</option>
              {(industries || []).map((i) => <option key={i._id} value={i._id}>{i.name}</option>)}
            </select>
            <div className="flex gap-2">
              {!editingId ? (
                <Button onClick={handleCreate} disabled={createMutation.isPending || !canSubmit}>Save</Button>
              ) : (
                <Button
                  onClick={() => {
                    if (!canSubmit) {
                      toast.error('Vui lòng nhập Name, Slug và chọn Industry trước khi cập nhật');
                      return;
                    }
                    updateMutation.mutate({ id: editingId, payload: form });
                  }}
                  disabled={updateMutation.isPending}
                >
                  Update
                </Button>
              )}
              <Button variant="danger" disabled={!editingId || deleteMutation.isPending} onClick={() => editingId && setDeleteId(editingId)}>Delete</Button>
            </div>
          </div>

          <EditorPanel
            html={form.htmlBase || ''}
            css={form.cssBase || ''}
            js={form.jsBase || ''}
            onChange={({ htmlCode, cssCode, jsCode }) =>
              setForm((prev) => ({
                ...prev,
                htmlBase: htmlCode,
                cssBase: cssCode,
                jsBase: jsCode
              }))
            }
          />
        </div>
      ) : null}

      {(mode === 'all' || mode === 'list') ? (
        isLoading ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">Đang tải...</div>
        ) : templates?.length ? (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[1fr,260px]">
              <Input
                placeholder="Tìm template theo tên, slug, lĩnh vực..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <select
                className="w-full rounded-lg border border-slate-300 bg-white p-2"
                value={industryFilter}
                onChange={(e) => {
                  setIndustryFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">Tất cả lĩnh vực</option>
                {(industries || []).map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            {filteredTemplates.length ? (
              <div className="overflow-hidden rounded-2xl border bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-left text-slate-600">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Tên template</th>
                        <th className="px-4 py-3 font-semibold">Slug</th>
                        <th className="px-4 py-3 font-semibold">Lĩnh vực</th>
                        <th className="px-4 py-3 font-semibold">Trạng thái</th>
                        <th className="px-4 py-3 font-semibold">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedTemplates.map((t) => (
                        <tr key={t._id} className="border-t">
                          <td className="px-4 py-3 font-medium text-slate-900">{t.name}</td>
                          <td className="px-4 py-3 text-slate-600">{t.slug}</td>
                          <td className="px-4 py-3 text-slate-600">{typeof t.industryId === 'string' ? t.industryId : t.industryId.name}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                              {t.status === 'active' ? 'active' : 'inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <Button variant="secondary" onClick={() => navigate(`/admin/templates/create?edit=${t._id}`)}>Preview</Button>
                              <Button variant="secondary" onClick={() => navigate(`/admin/templates/create?edit=${t._id}`)}>Edit</Button>
                              <Button variant="danger" onClick={() => setDeleteId(t._id)}>Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState title="Không có kết quả" message="Không tìm thấy template phù hợp với bộ lọc hiện tại." />
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Hiển thị {filteredTemplates.length ? start + 1 : 0} - {Math.min(start + pageSize, filteredTemplates.length)} / {filteredTemplates.length} template
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Trước</Button>
                <Button variant="secondary" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Sau</Button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState title="Chưa có template" message="Tạo template đầu tiên để tái sử dụng khi tạo landing page." />
        )
      ) : null}

      <ConfirmDialog
        open={!!deleteId}
        title="Xác nhận xóa template"
        message="Template sẽ bị xóa vĩnh viễn. Bạn có chắc chắn?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
