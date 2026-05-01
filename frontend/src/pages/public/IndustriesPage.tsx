import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/public/EmptyState';
import { useIndustriesQuery } from '@/features/industries/hooks/useIndustryQueries';
import { useLandingPagesQuery } from '@/features/landing-pages/hooks/useLandingPageQueries';

export default function IndustriesPage() {
  const { data: industries, isLoading: loadingIndustries } = useIndustriesQuery({ publicOnly: true }, 'public');
  const { data: pagesData } = useLandingPagesQuery({ status: 'published', page: 1, limit: 50 });

  if (loadingIndustries) return <div className="container-app py-12">Đang tải...</div>;

  const items = (industries || []).map((industry) => {
    const page = (pagesData?.items || []).find((p) => {
      const id = typeof p.industryId === 'string' ? p.industryId : p.industryId._id;
      return id === industry._id;
    });
    return {
      ...industry,
      image: page?.thumbnailUrl || page?.mockupUrl || ''
    };
  });

  return (
    <section className="py-10">
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 py-12 text-white">
        <div className="container-app">
          <h1 className="text-4xl font-extrabold">Lĩnh vực kinh doanh</h1>
          <p className="mt-3 max-w-2xl text-slate-200">Khám phá bộ mẫu landing page theo từng ngành để triển khai chiến dịch nhanh hơn.</p>
        </div>
      </div>

      <div className="container-app py-10">
        {!items.length ? (
          <EmptyState message="Chưa có dữ liệu lĩnh vực." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <Link
                key={item._id}
                to={`/industries/${item.slug}`}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="h-44 bg-gradient-to-br from-slate-800 to-cyan-700 bg-cover bg-center"
                  style={{ backgroundImage: item.image ? `url(${item.image})` : undefined }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description || 'Bộ mẫu landing page theo lĩnh vực.'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
