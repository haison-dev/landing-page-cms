import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/landing-pages', label: 'Mẫu landing page' },
  { to: '/industries/thoi-trang', label: 'Lĩnh vực' },
  { to: '/#pricing', label: 'Bảng giá' },
  { to: '/#contact', label: 'Liên hệ' }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900">LandingPress</Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
          {links.map((item) => (
            <NavLink key={item.label} to={item.to} className="hover:text-slate-900">{item.label}</NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/landing-pages" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium">Dùng thử</Link>
          <a href="#contact" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Tư vấn miễn phí</a>
        </div>
        <button className="md:hidden" onClick={() => setOpen((s) => !s)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-app flex flex-col gap-2 py-3">
            {links.map((item) => (
              <NavLink key={item.label} to={item.to} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-slate-100">{item.label}</NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
