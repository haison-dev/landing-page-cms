import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileCode2, Building2, LayoutTemplate, Image, Settings } from 'lucide-react';

const items = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/landing-pages', label: 'Landing Pages', icon: FileCode2 },
  { to: '/admin/industries', label: 'Industries', icon: Building2 },
  { to: '/admin/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/admin/media', label: 'Media', icon: Image },
  { to: '/admin/settings', label: 'Settings', icon: Settings }
];

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl border bg-white p-3">
      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            <Icon className="h-4 w-4" /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
