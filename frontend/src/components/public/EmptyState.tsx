export function EmptyState({ message }: { message: string }) {
  return <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/50 backdrop-blur-sm p-12 text-center text-slate-400 font-medium">{message}</div>;
}
