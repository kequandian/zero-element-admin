import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  { path: '/', lazy: () => import('@/pages/index') },
  { path: '/checkfiles', lazy: () => import('@/pages/checkfiles') },
  { path: '/dataService', lazy: () => import('@/pages/dataService') },
  { path: '/dynamicFiles', lazy: () => import('@/pages/dynamicFiles') },
  { path: '/dynamicPage', lazy: () => import('@/pages/dynamicPage') },
  { path: '/dynamicPageManage', lazy: () => import('@/pages/dynamicPageManage') },
  { path: '/dynamicPageTool', lazy: () => import('@/pages/dynamicPageTool') },
  { path: '/registry', lazy: () => import('@/pages/registry') },
  { path: '/tagslist', lazy: () => import('@/pages/tagslist') },
  { path: '/401', element: <div>Unauthorized</div> },
]);

export default router;
