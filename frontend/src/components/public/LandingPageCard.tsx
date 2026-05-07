import { Link } from 'react-router-dom';
import { LandingPage } from '@/types';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function LandingPageCard({ item }: { item: LandingPage }) {
  const industryName = typeof item.industryId === 'string' ? 'Unknown industry' : item.industryId.name;

  return (
    <article className="group rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] flex flex-col h-full">
      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 border border-white/10">
        {item.thumbnailUrl ? (
          <img src={item.thumbnailUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        ) : (
          <div className="h-full w-full bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-purple-400">
          {industryName}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-400 flex-1">{item.shortDescription || 'Chưa có mô tả chi tiết cho giao diện này.'}</p>
        
        <div className="mt-6 flex gap-3 pt-4 border-t border-white/5">
          <Link to={`/landing-pages/${item.slug}`} className="flex-1 rounded-xl bg-white/5 hover:bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2">
            Chi tiết <ArrowRight className="w-4 h-4" />
          </Link>
          {item.mockupUrl ? (
            <a href={item.mockupUrl} target="_blank" rel="noreferrer" className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-semibold text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              Demo <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
