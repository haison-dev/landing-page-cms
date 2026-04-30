import type React from 'react';
import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileCode2, Building2, LayoutTemplate, Image, Settings, PanelLeftClose, PanelLeftOpen, List, Plus, ChevronDown } from 'lucide-react';

type SidebarChild = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };
type SidebarItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  groupKey?: 'landing' | 'template';
  children?: SidebarChild[];
};

const items: SidebarItem[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    to: '/admin/landing-pages/list',
    label: 'Landing Pages',
    icon: FileCode2,
    groupKey: 'landing',
    children: [
      { to: '/admin/landing-pages/list', label: 'Danh sách', icon: List },
      { to: '/admin/landing-pages/create', label: 'Tạo mới', icon: Plus }
    ]
  },
  { to: '/admin/industries', label: 'Industries', icon: Building2 },
  {
    to: '/admin/templates/list',
    label: 'Templates',
    icon: LayoutTemplate,
    groupKey: 'template',
    children: [
      { to: '/admin/templates/list', label: 'Danh sách', icon: List },
      { to: '/admin/templates/create', label: 'Tạo mới', icon: Plus }
    ]
  },
  { to: '/admin/media', label: 'Media', icon: Image },
  { to: '/admin/settings', label: 'Settings', icon: Settings }
];

export function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const isLandingActive = useMemo(() => location.pathname.startsWith('/admin/landing-pages'), [location.pathname]);
  const isTemplateActive = useMemo(() => location.pathname.startsWith('/admin/templates'), [location.pathname]);
  const [openGroups, setOpenGroups] = useState<{ landing: boolean; template: boolean }>({
    landing: isLandingActive,
    template: isTemplateActive
  });

  const toggleGroup = (key: 'landing' | 'template') => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className={`rounded-2xl border bg-white p-3 transition-all ${collapsed ? 'w-[76px]' : 'w-full'}`}>
      <button className="mb-3 flex w-full items-center justify-center rounded-lg border p-2 text-slate-600 hover:bg-slate-50" onClick={onToggle} title="Thu gọn/mở rộng">
        {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </button>
      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon, children, groupKey }) => {
          if (children?.length && groupKey) {
            const isActive = groupKey === 'landing' ? isLandingActive : isTemplateActive;
            const isOpen = openGroups[groupKey];

            return (
              <div key={to} className="space-y-1">
                <button
                  type="button"
                  title={label}
                  onClick={() => !collapsed && toggleGroup(groupKey)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    {collapsed ? null : <span>{label}</span>}
                  </span>
                  {!collapsed ? <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} /> : null}
                </button>

                {!collapsed && isOpen ? (
                  <div className="ml-3 space-y-1 border-l border-slate-200 pl-3">
                    {children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end
                        className={({ isActive: childActive }) =>
                          `flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition ${
                            childActive ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                          }`
                        }
                      >
                        <child.icon className="h-3.5 w-3.5" />
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }

          return (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {collapsed ? null : <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
