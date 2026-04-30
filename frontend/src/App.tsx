import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/public/HomePage';
import LandingPagesPage from '@/pages/public/LandingPagesPage';
import LandingPageDetailPage from '@/pages/public/LandingPageDetailPage';
import IndustryLandingPagesPage from '@/pages/public/IndustryLandingPagesPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import IndustriesAdminPage from '@/pages/admin/IndustriesAdminPage';
import TemplatesAdminPage from '@/pages/admin/TemplatesAdminPage';
import TemplatesCreatePage from '@/pages/admin/TemplatesCreatePage';
import TemplatesListPage from '@/pages/admin/TemplatesListPage';
import LandingPagesAdminPage from '@/pages/admin/LandingPagesAdminPage';
import LandingPagesCreatePage from '@/pages/admin/LandingPagesCreatePage';
import LandingPagesListPage from '@/pages/admin/LandingPagesListPage';
import AdminGuard from '@/pages/admin/AdminGuard';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminMediaPage from '@/pages/admin/AdminMediaPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/landing-pages', element: <LandingPagesPage /> },
      { path: '/landing-pages/:slug', element: <LandingPageDetailPage /> },
      { path: '/industries/:slug', element: <IndustryLandingPagesPage /> }
    ]
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'industries', element: <IndustriesAdminPage /> },
          { path: 'templates', element: <Navigate to="/admin/templates/list" replace /> },
          { path: 'templates/list', element: <TemplatesListPage /> },
          { path: 'templates/create', element: <TemplatesCreatePage /> },
          { path: 'templates/legacy', element: <TemplatesAdminPage /> },
          { path: 'landing-pages', element: <Navigate to="/admin/landing-pages/list" replace /> },
          { path: 'landing-pages/list', element: <LandingPagesListPage /> },
          { path: 'landing-pages/create', element: <LandingPagesCreatePage /> },
          { path: 'landing-pages/legacy', element: <LandingPagesAdminPage /> },
          { path: 'media', element: <AdminMediaPage /> },
          { path: 'settings', element: <AdminSettingsPage /> }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
