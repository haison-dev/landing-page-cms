export function LoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border bg-white p-4">
          <div className="h-44 rounded-xl bg-slate-200" />
          <div className="mt-4 h-4 w-24 rounded bg-slate-200" />
          <div className="mt-2 h-6 w-2/3 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-full rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
