import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { industryApi } from '@/api/industryApi';
import { landingPageApi } from '@/api/landingPageApi';
import { LandingPageCard } from '@/components/public/LandingPageCard';
import { EmptyState } from '@/components/public/EmptyState';

export default function IndustryLandingPagesPage() {
  const { slug = '' } = useParams();
  const { data: industry } = useQuery({ queryKey: ['industry-by-slug', slug], queryFn: () => industryApi.getBySlug(slug) });
  const { data } = useQuery({ queryKey: ['industry-pages', slug], queryFn: () => landingPageApi.getAll({ status: 'published', industry: slug, page: 1, limit: 30 }) });

  return (
    <section className="container-app py-10">
      <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-slate-900 p-8 text-white">
        <p className="text-sm uppercase tracking-wider">Industry</p>
        <h1 className="mt-2 text-4xl font-bold">{industry?.name || slug}</h1>
        <p className="mt-2 text-slate-200">Landing page dành cho lĩnh vực {industry?.name || slug}.</p>
      </div>

      <div className="mt-6">
        {data?.items?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => <LandingPageCard key={item._id} item={item} />)}
          </div>
        ) : (
          <EmptyState message="Lĩnh vực này chưa có landing page. Vui lòng chạy npm run seed trong thư mục backend." />
        )}
      </div>
    </section>
  );
}
