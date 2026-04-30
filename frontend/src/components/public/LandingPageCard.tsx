import { Link } from 'react-router-dom';
import { LandingPage } from '@/types';

export function LandingPageCard({ item }: { item: LandingPage }) {
  const industryName = typeof item.industryId === 'string' ? 'Unknown industry' : item.industryId.name;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {item.thumbnailUrl ? <img src={item.thumbnailUrl} alt={item.title} className="h-44 w-full rounded-xl object-cover" /> : <div className="h-44 w-full rounded-xl bg-slate-100" />}
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-700">{industryName}</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.shortDescription || 'No description'}</p>
      <div className="mt-4 flex gap-2">
        <Link to={`/landing-pages/${item.slug}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Xem chi tiết</Link>
        {item.mockupUrl ? <a href={item.mockupUrl} target="_blank" rel="noreferrer" className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700">Xem demo</a> : null}
      </div>
    </article>
  );
}
