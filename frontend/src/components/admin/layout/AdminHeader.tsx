import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AdminHeader({ title, breadcrumb }: { title: string; breadcrumb: string }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4 lg:px-6">
        <div>
          <p className="text-xs text-slate-500">{breadcrumb}</p>
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 md:block">admin</div>
          <Button variant="ghost" className="gap-2" onClick={logout}><LogOut className="h-4 w-4" /> Đăng xuất</Button>
        </div>
      </div>
    </header>
  );
}
