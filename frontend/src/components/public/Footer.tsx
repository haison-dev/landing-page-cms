export function Footer() {
  return (
    <footer className="border-t border-slate-700/30 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 text-white">
      <div className="container-app grid gap-8 py-12 md:grid-cols-4">
        <div>
          <h4 className="text-xl font-bold">LandingPress</h4>
          <p className="mt-2 text-sm text-slate-200">
            Nền tảng quản lí landing page cho doanh nghiệp hiện đại.
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Dịch vụ</h5>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            <li>Landing page builder</li>
            <li>Template theo ngành</li>
            <li>Quản trị media</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Tài nguyên</h5>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            <li>Hướng dẫn</li>
            <li>API docs</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Liên hệ</h5>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            <li>Email: support@landingpress.vn</li>
            <li>Phone: 0900 000 000</li>
            <li>Facebook • Linkedin • Youtube</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="container-app text-xs text-slate-300">© {new Date().getFullYear()} LandingPress. All rights reserved.</p>
      </div>
    </footer>
  );
}
