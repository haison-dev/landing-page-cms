import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { landingPageApi } from '@/api/landingPageApi';
import { industryApi } from '@/api/industryApi';
import { Input } from '@/components/ui/input';
import { LandingPageCard } from '@/components/public/LandingPageCard';
import { EmptyState } from '@/components/public/EmptyState';
import { LoadingSkeleton } from '@/components/public/LoadingSkeleton';
import { Button } from '@/components/ui/button';

export default function LandingPagesPage() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [page, setPage] = useState(1);

  const { data: industries } = useQuery({ queryKey: ['industries-public-list'], queryFn: () => industryApi.getAll({ publicOnly: true }) });

  const params = useMemo(
    () => ({ status: 'published', search, industry, page, limit: 9 }),
    [search, industry, page]
  );

  const { data, isLoading } = useQuery({ queryKey: ['landing-pages-public', params], queryFn: () => landingPageApi.getAll(params) });

  return (
    <section className="container-app py-10">
      <h1 className="text-4xl font-bold">Mẫu Landing Page</h1>
      <p className="mt-2 text-slate-600">Tìm mẫu theo ngành và từ khóa, chỉ hiển thị các page đã publish.</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Input
          placeholder="Tìm theo tên landing page..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          className="w-full rounded-lg border border-slate-300 p-2"
          value={industry}
          onChange={(e) => {
            setPage(1);
            setIndustry(e.target.value);
          }}
        >
          <option value="">Tất cả lĩnh vực</option>
          {industries?.map((i) => (
            <option key={i._id} value={i.slug}>{i.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : data?.items?.length ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item) => (
                <LandingPageCard key={item._id} item={item} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Trước</Button>
              <span className="text-sm text-slate-600">Trang {data.pagination.page}/{data.pagination.totalPages || 1}</span>
              <Button variant="secondary" disabled={page >= (data.pagination.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>Sau</Button>
            </div>
          </>
        ) : (
          <EmptyState message="Chưa có dữ liệu. Vui lòng chạy npm run seed trong thư mục backend." />
        )}
      </div>
    </section>
  );
}
