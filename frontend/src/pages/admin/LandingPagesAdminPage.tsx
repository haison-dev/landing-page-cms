import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { industryApi } from '@/api/industryApi';
import { templateApi } from '@/api/templateApi';
import { landingPageApi } from '@/api/landingPageApi';
import { uploadApi } from '@/api/uploadApi';
import { Industry, LandingPage } from '@/types';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionBar } from '@/components/admin/common/ActionBar';
import { ConfirmDialog } from '@/components/admin/common/ConfirmDialog';
import { EmptyState } from '@/components/admin/common/EmptyState';
import { LandingInfoForm } from '@/components/admin/landing/LandingInfoForm';
import { EditorPanel } from '@/components/admin/landing/EditorPanel';
import { useDebounce } from '@/hooks/useDebounce';
import { LandingPagesDataTable } from '@/components/admin/landing/LandingPagesDataTable';
import { getApiErrorMessage } from '@/lib/http';

const emptyForm: Partial<LandingPage> = {
  title: '',
  slug: '',
  industryId: '',
  shortDescription: '',
  thumbnailUrl: '',
  mockupUrl: '',
  htmlCode: '',
  cssCode: '',
  jsCode: '',
  seoTitle: '',
  seoDescription: '',
  status: 'draft'
};

export default function LandingPagesAdminPage({ mode = 'all' }: { mode?: 'all' | 'create' | 'list' }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<Partial<LandingPage>>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<LandingPage | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 300);
  const editId = searchParams.get('edit');

  const { data: industries } = useQuery({ queryKey: ['industries-admin'], queryFn: () => industryApi.getAll() });
  const { data: templates } = useQuery({ queryKey: ['templates-admin'], queryFn: () => templateApi.getAll() });
  const { data, isLoading } = useQuery({
    queryKey: ['landing-pages-admin', debouncedSearch, industryFilter, statusFilter, page],
    queryFn: () => landingPageApi.getAll({ page, limit: 10, search: debouncedSearch, industry: industryFilter, status: statusFilter })
  });
  const { data: editingData } = useQuery({
    queryKey: ['landing-page-edit', editId],
    queryFn: () => landingPageApi.getById(editId || ''),
    enabled: mode === 'create' && Boolean(editId)
  });

  useEffect(() => {
    if (mode !== 'create') return;
    if (!editId) {
      setEditingId(null);
      setForm(emptyForm);
      return;
    }
    if (!editingData) return;
    setEditingId(editingData._id);
    setForm({ ...editingData, industryId: typeof editingData.industryId === 'string' ? editingData.industryId : editingData.industryId._id });
  }, [mode, editId, editingData]);

  const buildPayload = (value: Partial<LandingPage>, status?: 'draft' | 'published') => {
    const industryId = typeof value.industryId === 'string' ? value.industryId : value.industryId?._id || '';
    return {
      title: (value.title || '').trim(),
      slug: (value.slug || '').trim(),
      industryId,
      shortDescription: value.shortDescription || '',
      thumbnailUrl: value.thumbnailUrl || '',
      mockupUrl: value.mockupUrl || '',
      htmlCode: value.htmlCode || '',
      cssCode: value.cssCode || '',
      jsCode: value.jsCode || '',
      seoTitle: value.seoTitle || '',
      seoDescription: value.seoDescription || '',
      status: status || value.status || 'draft'
    };
  };
  const canSubmit = Boolean(form.title?.trim() && form.slug?.trim() && (typeof form.industryId === 'string' ? form.industryId : form.industryId?._id));

  const items = data?.items || [];

  const createMutation = useMutation({
    mutationFn: (payload: Partial<LandingPage>) => landingPageApi.create(buildPayload(payload) as LandingPage & { industryId: string }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['landing-pages-admin'] });
      toast.success('Tạo landing page thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể tạo landing page'))
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<LandingPage> }) => landingPageApi.update(id, buildPayload(payload)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['landing-pages-admin'] });
      toast.success('Cập nhật thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể cập nhật landing page'))
  });

  const publishMutation = useMutation({
    mutationFn: (id: string) => landingPageApi.publish(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['landing-pages-admin'] });
      toast.success('Publish thành công');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể publish landing page'))
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => landingPageApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['landing-pages-admin'] });
      toast.success('Xóa thành công');
      setConfirmDelete(null);
      setSelected([]);
      if (editingId && confirmDelete?._id === editingId) {
        setEditingId(null);
        setForm(emptyForm);
      }
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Không thể xóa landing page'))
  });

  const saveDraft = () => {
    if (!canSubmit) {
      toast.error('Vui lòng nhập Title, Slug và chọn Industry trước khi lưu');
      return;
    }
    const payload: Partial<LandingPage> = buildPayload(form, 'draft');
    if (editingId) updateMutation.mutate({ id: editingId, payload });
    else createMutation.mutate(payload);
  };

  const publishCurrent = () => {
    if (!canSubmit) {
      toast.error('Vui lòng nhập Title, Slug và chọn Industry trước khi publish');
      return;
    }
    if (editingId) publishMutation.mutate(editingId);
    else {
      createMutation.mutate(
        buildPayload(form, 'published'),
        {
          onSuccess: (res: { _id: string }) => {
            setEditingId(res._id);
            publishMutation.mutate(res._id);
          }
        }
      );
    }
  };

  const toggleSelected = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleAll = () => setSelected((prev) => (prev.length === items.length ? [] : items.map((i) => i._id)));

  const bulkDelete = async () => {
    await Promise.all(selected.map((id) => landingPageApi.remove(id)));
    toast.success('Đã xóa các mục đã chọn');
    setSelected([]);
    qc.invalidateQueries({ queryKey: ['landing-pages-admin'] });
  };

  const bulkPublish = async () => {
    await Promise.all(selected.map((id) => landingPageApi.publish(id)));
    toast.success('Đã publish các mục đã chọn');
    setSelected([]);
    qc.invalidateQueries({ queryKey: ['landing-pages-admin'] });
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-500">Dashboard &gt; Landing Pages &gt; {editingId ? 'Edit' : 'Create'}</div>

      {(mode === 'all' || mode === 'create') && (
        <>
          <div className="grid gap-6 xl:grid-cols-[380px,1fr]">
            <LandingInfoForm
              value={form}
              industries={industries || []}
              templates={templates || []}
              onChange={setForm}
              onUpload={async (key, file) => {
                const uploaded = await uploadApi.uploadImage(file);
                setForm((prev) => ({ ...prev, [key]: uploaded.url }));
                toast.success('Upload ảnh thành công');
              }}
            />

            <EditorPanel
              html={form.htmlCode || ''}
              css={form.cssCode || ''}
              js={form.jsCode || ''}
              onChange={(next) => setForm((prev) => ({ ...prev, ...next }))}
            />
          </div>

          <ActionBar
            left={<span className="text-sm text-slate-500">{editingId ? `Editing ID: ${editingId}` : 'Tạo landing page mới'}</span>}
            right={[
              { key: 'draft', label: 'Save Draft', onClick: saveDraft, variant: 'secondary', loading: createMutation.isPending || updateMutation.isPending },
              { key: 'publish', label: 'Publish', onClick: publishCurrent, variant: 'primary', loading: publishMutation.isPending },
              {
                key: 'update',
                label: 'Update',
                onClick: () => {
                  if (!editingId) return;
                  if (!canSubmit) {
                    toast.error('Vui lòng nhập Title, Slug và chọn Industry trước khi cập nhật');
                    return;
                  }
                  updateMutation.mutate({ id: editingId, payload: form });
                },
                disabled: !editingId
              },
              { key: 'delete', label: 'Delete', onClick: () => editingId && setConfirmDelete(items.find((x) => x._id === editingId) || null), variant: 'danger', disabled: !editingId }
            ]}
          />
        </>
      )}

      {(mode === 'all' || mode === 'list') && <section className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Input placeholder="Search title..." value={search} onChange={(e) => { setPage(1); setSearch(e.target.value); }} />
          <select className="rounded-lg border border-slate-300 p-2" value={industryFilter} onChange={(e) => { setPage(1); setIndustryFilter(e.target.value); }}>
            <option value="">Tất cả lĩnh vực</option>
            {(industries || []).map((i: Industry) => <option key={i._id} value={i.slug}>{i.name}</option>)}
          </select>
          <select className="rounded-lg border border-slate-300 p-2" value={statusFilter} onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}>
            <option value="">Tất cả trạng thái</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={!selected.length} onClick={bulkPublish}>Publish selected</Button>
            <Button variant="danger" disabled={!selected.length} onClick={bulkDelete}>Delete selected</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">Đang tải dữ liệu...</div>
        ) : items.length ? (
          <>
            <LandingPagesDataTable
              items={items}
              selected={selected}
              onToggle={toggleSelected}
              onToggleAll={toggleAll}
              onView={(item) => window.open(`/landing-pages/${item.slug}`, '_blank')}
              onEdit={(item) => navigate(`/admin/landing-pages/create?edit=${item._id}`)}
              onDelete={(item) => setConfirmDelete(item)}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Tổng: {data?.pagination.total || 0}</p>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Trước</Button>
                <Button variant="secondary" disabled={page >= (data?.pagination.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>Sau</Button>
              </div>
            </div>
          </>
        ) : (
          <EmptyState title="Chưa có landing page" message="Tạo landing page mới hoặc chạy seed dữ liệu để bắt đầu." />
        )}
      </section>}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc muốn xóa "${confirmDelete?.title || ''}"?`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => confirmDelete && deleteMutation.mutate(confirmDelete._id)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
