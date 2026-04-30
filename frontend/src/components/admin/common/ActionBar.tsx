import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export type ActionButton = {
  key: string;
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
};

export function ActionBar({ left, right }: { left?: ReactNode; right: ActionButton[] }) {
  return (
    <div className="sticky bottom-4 z-10 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white/95 p-3 shadow backdrop-blur">
      <div>{left}</div>
      <div className="flex flex-wrap gap-2">
        {right.map((action) => (
          <Button
            key={action.key}
            type="button"
            variant={action.variant || 'secondary'}
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
          >
            {action.loading ? 'Đang xử lý...' : action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
