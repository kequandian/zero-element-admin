import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    lazy: () => import('@/pages/index').then(m => ({ Component: m.default }))
  },
  {
    path: '/checkfiles',
    lazy: () => import('@/pages/checkfiles').then(m => ({ Component: m.default }))
  },
  {
    path: '/dataService',
    lazy: () => import('@/pages/dataService').then(m => ({ Component: m.default }))
  },
  {
    path: '/dynamicFiles',
    lazy: () => import('@/pages/dynamicFiles').then(m => ({ Component: m.default }))
  },
  {
    path: '/dynamicPage',
    lazy: () => import('@/pages/dynamicPage').then(m => ({ Component: m.default }))
  },
  {
    path: '/dynamicPageManage',
    lazy: () => import('@/pages/dynamicPageManage').then(m => ({ Component: m.default }))
  },
  {
    path: '/dynamicPageTool',
    lazy: () => import('@/pages/dynamicPageTool').then(m => ({ Component: m.default }))
  },
  {
    path: '/registry',
    lazy: () => import('@/pages/registry').then(m => ({ Component: m.default }))
  },
  {
    path: '/tagslist',
    lazy: () => import('@/pages/tagslist').then(m => ({ Component: m.default }))
  },
  { path: '/401', element: <div>Unauthorized</div> as any },
]);

export default router;
