import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/landing-pages', label: 'Mẫu landing page' },
  { to: '/industries', label: 'Lĩnh vực' },
  { to: '/contact', label: 'Liên hệ' }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`container-app flex h-16 items-center justify-between rounded-2xl border transition-all duration-300 ${scrolled ? 'glass-panel border-white/10 bg-slate-900/60 shadow-lg' : 'border-transparent bg-transparent'}`}>
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <span className="text-lg">L</span>
          </div>
          LandingPress
        </Link>
        
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((item) => (
            <NavLink 
              key={item.label} 
              to={item.to} 
              className={({ isActive }) => 
                `relative transition-colors hover:text-white ${isActive ? 'text-white' : 'text-slate-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/admin/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:text-white hover:bg-white/5">Đăng nhập</Link>
          <Link to="/contact" className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">Tư vấn miễn phí</Link>
        </div>
        
        <button className="text-white md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen((s) => !s)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      
      {open ? (
        <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl glass-panel border-white/10 bg-slate-900/90 p-4 shadow-xl md:hidden animate-fade-in-up">
          <div className="flex flex-col gap-2">
            {links.map((item) => (
              <NavLink key={item.label} to={item.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-slate-200 font-medium hover:bg-white/10 hover:text-white transition-colors">{item.label}</NavLink>
            ))}
            <div className="my-2 h-px w-full bg-white/10" />
            <Link to="/admin/login" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-white/10 transition-colors">Đăng nhập</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-3 text-center font-semibold text-white mt-2">Tư vấn miễn phí</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
