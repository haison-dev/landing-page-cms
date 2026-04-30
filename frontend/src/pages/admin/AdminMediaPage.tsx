import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadApi, type MediaItem } from '@/api/uploadApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/admin/common/ConfirmDialog';
import { getApiErrorMessage } from '@/lib/http';
import { EmptyState } from '@/components/admin/common/EmptyState';

export default function AdminMediaPage() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<'upload' | 'gallery'>('upload');
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['media-images'],
    queryFn: () => uploadApi.getImages({ limit: 100 })
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadApi.uploadImage(file),
    onSuccess: () => {
      toast.success('Upload ảnh thành công');
      setTab('gallery');
      qc.invalidateQueries({ queryKey: ['media-images'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Upload thất bại'))
  });

  const replaceMutation = useMutation({
    mutationFn: ({ publicId, file }: { publicId: string; file: File }) => uploadApi.replaceImage(publicId, file),
    onSuccess: () => {
      toast.success('Đã cập nhật ảnh');
      qc.invalidateQueries({ queryKey: ['media-images'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Cập nhật ảnh thất bại'))
  });

  const deleteMutation = useMutation({
    mutationFn: (publicId: string) => uploadApi.deleteImage(publicId),
    onSuccess: () => {
      toast.success('Đã xóa ảnh');
      setDeleteItem(null);
      setActiveItem(null);
      qc.invalidateQueries({ queryKey: ['media-images'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Xóa ảnh thất bại'))
  });

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      await uploadMutation.mutateAsync(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 rounded-xl border bg-white p-2 w-fit">
        <button className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === 'upload' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`} onClick={() => setTab('upload')}>Upload</button>
        <button className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === 'gallery' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`} onClick={() => setTab('gallery')}>Xem ảnh ({data?.items.length || 0})</button>
      </div>

      {tab === 'upload' ? (
        <div className="rounded-2xl border border-dashed bg-slate-50 p-8 text-center">
          <h3 className="text-lg font-semibold">Upload Media</h3>
          <p className="mt-1 text-sm text-slate-600">Chọn nhiều ảnh để upload lên Cloudinary.</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={async (e) => {
              await handleFiles(e.target.files);
              e.currentTarget.value = '';
            }}
          />
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button type="button" onClick={() => inputRef.current?.click()} disabled={uploadMutation.isPending}>Chọn ảnh</Button>
            {uploadMutation.isPending ? <span className="text-sm text-slate-500">Đang upload...</span> : null}
          </div>
        </div>
      ) : isLoading ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">Đang tải ảnh...</div>
      ) : data?.items.length ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.items.map((item) => (
              <div key={item.publicId} className="rounded-2xl border bg-white p-3 shadow-sm">
                <img src={item.url} className="h-40 w-full rounded-lg object-cover" />
                <p className="mt-2 line-clamp-1 text-xs text-slate-500">{item.publicId}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => setActiveItem(item)}>Xem URL</Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setActiveItem(item);
                      editInputRef.current?.click();
                    }}
                  >
                    Edit ảnh
                  </Button>
                  <Button variant="danger" onClick={() => setDeleteItem(item)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>

          <input
            ref={editInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file || !activeItem) return;
              replaceMutation.mutate({ publicId: activeItem.publicId, file });
              e.currentTarget.value = '';
            }}
          />

          {activeItem ? (
            <div className="rounded-2xl border bg-white p-4">
              <h4 className="text-sm font-semibold">URL ảnh</h4>
              <p className="mt-2 break-all rounded bg-slate-50 p-3 text-sm text-slate-700">{activeItem.url}</p>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" onClick={() => navigator.clipboard.writeText(activeItem.url)}>Copy URL</Button>
                <a className="rounded-lg border px-4 py-2 text-sm" href={activeItem.url} target="_blank" rel="noreferrer">Mở ảnh</a>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState title="Chưa có ảnh" message="Hãy upload ảnh ở tab Upload để hiển thị tại đây." />
      )}

      <ConfirmDialog
        open={!!deleteItem}
        title="Xóa ảnh"
        message={`Bạn có chắc muốn xóa ảnh ${deleteItem?.publicId || ''}?`}
        onCancel={() => setDeleteItem(null)}
        onConfirm={() => deleteItem && deleteMutation.mutate(deleteItem.publicId)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
