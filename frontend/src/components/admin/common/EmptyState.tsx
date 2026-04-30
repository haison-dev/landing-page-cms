import { ReactNode } from 'react';

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
