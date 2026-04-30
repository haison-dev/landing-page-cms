import { Outlet, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';

const routeMeta: Record<string, { title: string; breadcrumb: string }> = {
  '/admin/dashboard': { title: 'Dashboard', breadcrumb: 'Dashboard' },
  '/admin/landing-pages': { title: 'Landing Pages', breadcrumb: 'Dashboard > Landing Pages' },
  '/admin/landing-pages/list': { title: 'Landing Pages', breadcrumb: 'Dashboard > Landing Pages > Danh sách' },
  '/admin/landing-pages/create': { title: 'Landing Pages', breadcrumb: 'Dashboard > Landing Pages > Tạo mới' },
  '/admin/industries': { title: 'Industries', breadcrumb: 'Dashboard > Industries' },
  '/admin/templates': { title: 'Templates', breadcrumb: 'Dashboard > Templates' },
  '/admin/templates/list': { title: 'Templates', breadcrumb: 'Dashboard > Templates > Danh sách' },
  '/admin/templates/create': { title: 'Templates', breadcrumb: 'Dashboard > Templates > Tạo mới' },
  '/admin/media': { title: 'Media', breadcrumb: 'Dashboard > Media' },
  '/admin/settings': { title: 'Settings', breadcrumb: 'Dashboard > Settings' }
};

export function AdminLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const meta = useMemo(() => {
    if (routeMeta[location.pathname]) return routeMeta[location.pathname];
    if (location.pathname.startsWith('/admin/landing-pages')) return routeMeta['/admin/landing-pages'];
    if (location.pathname.startsWith('/admin/templates')) return routeMeta['/admin/templates'];
    return { title: 'Admin', breadcrumb: 'Dashboard' };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminHeader title={meta.title} breadcrumb={meta.breadcrumb} />
      <div className={`w-full px-4 py-6 lg:px-6 ${collapsed ? 'grid gap-6 lg:grid-cols-[76px,1fr]' : 'grid gap-6 lg:grid-cols-[250px,1fr]'}`}>
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed((s) => !s)} />
        <main className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
