import { useParams, Link } from 'react-router-dom';
import { PreviewFrame } from '@/components/editor/PreviewFrame';
import { EmptyState } from '@/components/public/EmptyState';
import { useLandingPageBySlugQuery } from '@/features/landing-pages/hooks/useLandingPageQueries';

export default function LandingPageDetailPage() {
  const { slug = '' } = useParams();
  const { data, isLoading } = useLandingPageBySlugQuery(slug);

  if (isLoading) return <div className="container-app py-10">Đang tải...</div>;
  if (!data) return <div className="container-app py-10"><EmptyState message="Landing page không tồn tại hoặc chưa publish." /></div>;

  const industryName = typeof data.industryId === 'string' ? '' : data.industryId.name;

  return (
    <section className="container-app py-10">
      <Link to="/landing-pages" className="text-sm text-cyan-700 hover:underline">← Quay lại danh sách</Link>
      <div className="mt-4 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{data.title}</h1>
          <p className="mt-2 text-slate-600">{data.shortDescription}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">Lĩnh vực: {industryName}</span>
            {data.seoTitle ? <span className="rounded-full bg-slate-100 px-3 py-1">SEO: {data.seoTitle}</span> : null}
          </div>
          {data.seoDescription ? <p className="mt-2 text-sm text-slate-500">{data.seoDescription}</p> : null}
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white p-3 shadow-sm">
          <PreviewFrame htmlCode={data.htmlCode} cssCode={data.cssCode} jsCode={data.jsCode} className="h-[78vh] min-h-[720px] w-full rounded-xl border bg-white" />
        </div>

        <aside className="grid gap-4 md:grid-cols-2">
          {data.mockupUrl ? <img src={data.mockupUrl} className="w-full rounded-2xl border object-cover" /> : null}
          {data.thumbnailUrl ? <img src={data.thumbnailUrl} className="w-full rounded-2xl border object-cover" /> : null}
        </aside>
      </div>
    </section>
  );
}
