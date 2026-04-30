export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="container-app grid gap-8 py-10 md:grid-cols-4">
        <div>
          <h4 className="text-lg font-bold">LandingPress</h4>
          <p className="mt-2 text-sm text-slate-600">
            Nền tảng quản lí landing page cho doanh nghiệp.
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Dịch vụ</h5>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>Landing page builder</li>
            <li>Template theo nganh</li>
            <li>Quản trị media</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Tài nguyên</h5>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>Hướng dẫn</li>
            <li>API docs</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Lien he</h5>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>Email: support@landingpress.vn</li>
            <li>Phone: 0900 000 000</li>
            <li>Facebook • Linkedin • Youtube</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
