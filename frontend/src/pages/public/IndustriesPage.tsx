import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/public/EmptyState';
import { useIndustriesQuery } from '@/features/industries/hooks/useIndustryQueries';
import { useLandingPagesQuery } from '@/features/landing-pages/hooks/useLandingPageQueries';

const industryFallbackImages: Record<string, string> = {
  'thoi-trang': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
  'my-pham': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  'dien-tu': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'noi-that': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'me-va-be': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
  'nha-sach-van-phong-pham': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
  'am-thuc-an-uong': 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80',
  'suc-khoe-nha-thuoc': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  'trang-suc-qua-tang': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
  'sieu-thi-tap-hoa': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
};

const getIndustryImage = (slug: string) =>
  industryFallbackImages[slug] || `https://source.unsplash.com/1200x800/?${encodeURIComponent(slug.replace(/-/g, ' '))}`;

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
      image: page?.thumbnailUrl || page?.mockupUrl || getIndustryImage(industry.slug)
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
