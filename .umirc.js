
// ref: https://umijs.org/config/
export default {
  devServer: {
    port: 8080
  },
  // proxy: {
  //   '/api/doswagger': {
  //     target: 'http://192.168.137.1:8080',
  //     changeOrigin: true
  //   },
  //   '/api/pageconfig': {
  //     target: 'http://gitlab2.cdnline.cn:8000',
  //     changeOrigin: true
  //   }
  // },
  title: 'swaggerhub',
  hash: true,
  // history: {
  //   type: 'hash',
  // },
  // dynamicImport: {
  //   loading: '@/framework/Loading'
  // },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  antd: {},
  dva: false,
  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件

  history: {
    type: 'hash'
  },
  
  // 启用 layout 插件以支持左侧菜单
  layout: {
    name: 'swaggerhub',
    locale: false,
    layout: 'side', // side 表示左侧菜单布局
  },
  // 配置路由，菜单会自动从路由生成
  routes: [
    {
      path: '/',
      name: '首页',
      icon: 'home',
      order: 0,
      component: '@/pages/index.js',
    },
    {
      path: '/dynamicPageManage',
      name: '动态页面管理',
      icon: 'setting',
      order: 1,
      component: '@/pages/dynamicPageManage/index.js',
    },
    {
      path: '/dynamicPageTool',
      name: '动态页面工具',
      icon: 'tool',
      order: 2,
      component: '@/pages/dynamicPageTool/index.js',
    },
    {
      path: '/dynamicPage',
      name: '动态页面',
      icon: 'file-search',
      order: 3,
      component: '@/pages/dynamicPage/index.js',
      routes: [
        {
          path: '/dynamicPage/dynamicPage-add',
          name: '新增',
          component: '@/pages/dynamicPage/dynamicPage-add.js',
          hideInMenu: true,
        },
        {
          path: '/dynamicPage/dynamicPage-edit',
          name: '编辑',
          component: '@/pages/dynamicPage/dynamicPage-edit.js',
          hideInMenu: true,
        },
        {
          path: '/dynamicPage/dynamicPage-view',
          name: '查看',
          component: '@/pages/dynamicPage/dynamicPage-view.js',
          hideInMenu: true,
        },
      ],
    },
    {
      path: '/dataService',
      name: '数据服务',
      icon: 'database',
      order: 5,
      component: '@/pages/dataService/index.js',
      routes: [
        {
          path: '/dataService/dataService-add',
          component: '@/pages/dataService/dataService-add.js',
          hideInMenu: true,
        },
        {
          path: '/dataService/dataService-detail',
          component: '@/pages/dataService/dataService-detail.js',
          hideInMenu: true,
        },
        {
          path: '/dataService/dataService-edit',
          component: '@/pages/dataService/dataService-edit.js',
          hideInMenu: true,
        },
        {
          path: '/dataService/config/dataService',
          component: '@/pages/dataService/config/dataService/index.js',
          hideInMenu: true,
        },
        {
          path: '/dataService/config/designAttrs',
          component: '@/pages/dataService/config/designAttrs/index.js',
          hideInMenu: true,
        },
        {
          path: '/dataService/config/designAttrsValue',
          component: '@/pages/dataService/config/designAttrsValue/index.js',
          hideInMenu: true,
        },
      ],
    },
    {
      path: '/dynamicFiles',
      name: '动态文件',
      icon: 'file',
      order: 6,
      component: '@/pages/dynamicFiles/index.js',
    },
    {
      path: '/checkfiles',
      name: '检查文件',
      icon: 'file-text',
      order: 7,
      component: '@/pages/checkfiles/index.js',
      routes: [
        {
          path: '/checkfiles/checkfiles-add',
          component: '@/pages/checkfiles/checkfiles-add.js',
          hideInMenu: true,
        },
        {
          path: '/checkfiles/checkfiles-edit',
          component: '@/pages/checkfiles/checkfiles-edit.js',
          hideInMenu: true,
        },
        {
          path: '/checkfiles/checkfiles-view',
          component: '@/pages/checkfiles/checkfiles-view.js',
          hideInMenu: true,
        },
      ],
    },
    {
      path: '/registry',
      name: '注册表',
      icon: 'appstore',
      order: 8,
      component: '@/pages/registry/index.js',
      routes: [
        {
          path: '/registry/registry-add',
          component: '@/pages/registry/registry-add.js',
          hideInMenu: true,
        },
        {
          path: '/registry/registry-edit',
          component: '@/pages/registry/registry-edit.js',
          hideInMenu: true,
        },
        {
          path: '/registry/registry-view',
          component: '@/pages/registry/registry-view.js',
          hideInMenu: true,
        },
      ],
    },
    {
      path: '/tagslist',
      name: '标签列表',
      icon: 'tags',
      order: 9,
      component: '@/pages/tagslist/index.js',
    },
  ],
  chainWebpack(memo, { env, webpack, createCSSRule }) {
     memo.output.set('path', require('path').resolve(__dirname, 'dist/swaggerhub'))
     memo.output.set('filename', 'bundle.js')
  },
   
  // outputPath: '/dist/swaggerhub',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'  //设置 dist/index.html 访问 js和css路径
}
