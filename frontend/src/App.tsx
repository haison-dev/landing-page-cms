import { Suspense, lazy, type ReactNode } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";

const HomePage = lazy(() => import("@/pages/public/HomePage"));
const PricingPage = lazy(() => import("@/pages/public/PricingPage"));
const ContactPage = lazy(() => import("@/pages/public/ContactPage"));
const IndustriesPage = lazy(() => import("@/pages/public/IndustriesPage"));
const LandingPagesPage = lazy(() => import("@/pages/public/LandingPagesPage"));
const LandingPageDetailPage = lazy(
  () => import("@/pages/public/LandingPageDetailPage"),
);
const IndustryLandingPagesPage = lazy(
  () => import("@/pages/public/IndustryLandingPagesPage"),
);

const AdminLoginPage = lazy(() => import("@/pages/admin/AdminLoginPage"));
const IndustriesAdminPage = lazy(
  () => import("@/pages/admin/IndustriesAdminPage"),
);
const TemplatesAdminPage = lazy(
  () => import("@/pages/admin/TemplatesAdminPage"),
);
const TemplatesCreatePage = lazy(
  () => import("@/pages/admin/TemplatesCreatePage"),
);
const TemplatesListPage = lazy(() => import("@/pages/admin/TemplatesListPage"));
const LandingPagesAdminPage = lazy(
  () => import("@/pages/admin/LandingPagesAdminPage"),
);
const LandingPagesCreatePage = lazy(
  () => import("@/pages/admin/LandingPagesCreatePage"),
);
const LandingPagesListPage = lazy(
  () => import("@/pages/admin/LandingPagesListPage"),
);
const AdminGuard = lazy(() => import("@/pages/admin/AdminGuard"));
const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboardPage"),
);
const AdminMediaPage = lazy(() => import("@/pages/admin/AdminMediaPage"));
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettingsPage"));

const withSuspense = (node: ReactNode) => (
  <Suspense
    fallback={
      <div className="container-app py-10 text-sm text-slate-500">
        Đang tải trang...
      </div>
    }
  >
    {node}
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: withSuspense(<HomePage />) },
      { path: "/pricing", element: withSuspense(<PricingPage />) },
      { path: "/contact", element: withSuspense(<ContactPage />) },
      { path: "/industries", element: withSuspense(<IndustriesPage />) },
      { path: "/landing-pages", element: withSuspense(<LandingPagesPage />) },
      {
        path: "/landing-pages/:slug",
        element: withSuspense(<LandingPageDetailPage />),
      },
      {
        path: "/industries/:slug",
        element: withSuspense(<IndustryLandingPagesPage />),
      },
    ],
  },
  { path: "/admin/login", element: withSuspense(<AdminLoginPage />) },
  {
    path: "/admin",
    element: withSuspense(<AdminGuard />),
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard", element: withSuspense(<AdminDashboardPage />) },
          {
            path: "industries",
            element: withSuspense(<IndustriesAdminPage />),
          },
          {
            path: "templates",
            element: <Navigate to="/admin/templates/list" replace />,
          },
          {
            path: "templates/list",
            element: withSuspense(<TemplatesListPage />),
          },
          {
            path: "templates/create",
            element: withSuspense(<TemplatesCreatePage />),
          },
          {
            path: "templates/legacy",
            element: withSuspense(<TemplatesAdminPage />),
          },
          {
            path: "landing-pages",
            element: <Navigate to="/admin/landing-pages/list" replace />,
          },
          {
            path: "landing-pages/list",
            element: withSuspense(<LandingPagesListPage />),
          },
          {
            path: "landing-pages/create",
            element: withSuspense(<LandingPagesCreatePage />),
          },
          {
            path: "landing-pages/legacy",
            element: withSuspense(<LandingPagesAdminPage />),
          },
          { path: "media", element: withSuspense(<AdminMediaPage />) },
          { path: "settings", element: withSuspense(<AdminSettingsPage />) },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
