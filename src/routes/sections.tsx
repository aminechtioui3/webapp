import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import exp from 'constants';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const Membership = lazy(() => import('src/pages/Membership'));
export const Expense = lazy(() => import('src/pages/Expense'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const NotificationPage = lazy(() =>import('src/pages/Notifications'));
export const Profile =lazy(()=>import('src/pages/Profile'));
export const AuthReset =lazy(()=>import('src/pages/AuthReset'));
export const Settings= lazy(()=>import('src/pages/settings'));
export const ArticlePage = lazy(() =>import('src/pages/Article'));
export const ShopPage = lazy(() =>import('src/pages/Shop'));
export const ProductCategoryPage = lazy(() =>import('src/pages/ProductType'));
export const ExercisePage = lazy(() =>import('src/pages/Exercise'));
export const DealsPage = lazy(() =>import('src/pages/Deals'));
export const HistoryPage = lazy(() =>import('src/pages/History'));
export const SessionPage = lazy(() =>import('src/pages/Sessions'));
export const ProductOrdersPage = lazy(() =>import('src/pages/ProductOrders'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'membership', element: <Membership /> },
        { path: 'expense', element: <Expense /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'notifications', element: <NotificationPage /> },
        { path: 'article', element: <ArticlePage /> },
        { path: 'deals', element: <DealsPage /> },
        { path: 'exercises', element: <ExercisePage /> },
        { path: 'session', element: <SessionPage /> },
        { path: 'shop', element: <ShopPage /> },
        { path: 'product-category', element: <ProductCategoryPage /> },
        { path: 'product-orders', element: <ProductOrdersPage /> },
        { path: 'history', element: <HistoryPage /> },
        {path: 'profile',element :<Profile/>},
        {path:'AuthReset', element:<AuthReset/>},
        {path :'Settings',element:<Settings/>},


      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
