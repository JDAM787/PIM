import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from './home-page';

const LoginPage = lazy(() =>
  import('@/features/auth/login-page').then((module) => ({
    default: module.LoginPage,
  }))
);

const AppShell = lazy(() =>
  import('@/components/layout/app-shell').then((module) => ({
    default: module.AppShell,
  }))
);

const ProductsPage = lazy(() =>
  import('@/features/products/products-page').then((module) => ({
    default: module.ProductsPage,
  }))
);

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppShell />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
