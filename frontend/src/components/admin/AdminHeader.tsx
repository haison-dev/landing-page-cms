import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between">
        <h1 className="text-lg font-semibold">Landing Page CMS Admin</h1>
        <Button variant="ghost" className="gap-2" onClick={logout}><LogOut className="h-4 w-4" /> Logout</Button>
      </div>
    </header>
  );
}
