import { ContactSection } from '@/components/public/Sections';

export default function ContactPage() {
  return (
    <>
      <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 py-12 text-white">
        <div className="container-app">
          <h1 className="text-4xl font-extrabold">Liên hệ</h1>
          <p className="mt-3 max-w-2xl text-slate-200">Trao đổi nhu cầu để nhận tư vấn triển khai landing page phù hợp mô hình kinh doanh của bạn.</p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
