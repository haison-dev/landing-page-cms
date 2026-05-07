import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-950/50 backdrop-blur-xl text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-app relative z-10 grid gap-12 md:grid-cols-4 md:gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white">
              <span className="text-lg">L</span>
            </div>
            LandingPress
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nền tảng quản lý landing page cho doanh nghiệp hiện đại. Xây dựng, tùy chỉnh và xuất bản nhanh chóng.
          </p>
        </div>
        
        <div>
          <h5 className="font-semibold text-white mb-4 text-lg">Dịch vụ</h5>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Landing page builder</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Template theo ngành</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Quản trị media</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold text-white mb-4 text-lg">Tài nguyên</h5>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Hướng dẫn</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">API docs</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold text-white mb-4 text-lg">Liên hệ</h5>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">✉</span>
              support@landingpress.vn
            </li>
            <li className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">☏</span>
              0900 000 000
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container-app relative z-10 mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} LandingPress. All rights reserved.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <span className="text-slate-600">•</span>
          <a href="#" className="hover:text-white transition-colors">Linkedin</a>
          <span className="text-slate-600">•</span>
          <a href="#" className="hover:text-white transition-colors">Youtube</a>
        </div>
      </div>
    </footer>
  );
}
