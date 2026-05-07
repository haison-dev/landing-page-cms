import { Outlet } from 'react-router-dom';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 bg-mesh text-slate-50 selection:bg-purple-500/30">
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
