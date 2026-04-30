import { ReactNode } from 'react';

export function DataTable({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">{children}</div>;
}
