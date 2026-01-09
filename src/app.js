/**
 * @description 应用级配置，用于扩展路由和菜单配置
 */
import { HomeOutlined, SettingOutlined, ToolOutlined, FileSearchOutlined, DatabaseOutlined, FileOutlined, FileTextOutlined, AppstoreOutlined, TagsOutlined } from '@ant-design/icons';

// 图标映射
const iconMap = {
  'home': <HomeOutlined />,
  'setting': <SettingOutlined />,
  'tool': <ToolOutlined />,
  'file-search': <FileSearchOutlined />,
  'database': <DatabaseOutlined />,
  'file': <FileOutlined />,
  'file-text': <FileTextOutlined />,
  'appstore': <AppstoreOutlined />,
  'tags': <TagsOutlined />,
};

// 菜单数据渲染函数
export function layout() {
  return {
    name: 'swaggerhub',
    locale: false,
    layout: 'side',
    theme: 'PRO',
    // 自定义菜单数据渲染
    menuDataRender: (menuData) => {
      // 定义要显示的菜单项
      const menuConfig = [
        {
          path: '/',
          name: '首页',
          icon: 'home',
          order: 0,
        },
        {
          path: '/dynamicPageManage',
          name: '动态页面管理',
          icon: 'setting',
          order: 1,
        },
        {
          path: '/dynamicPageTool',
          name: '动态页面工具',
          icon: 'tool',
          order: 2,
        },
        {
          path: '/dynamicPage',
          name: '动态页面',
          icon: 'file-search',
          order: 3,
        },
        {
          path: '/dataService',
          name: '数据服务',
          icon: 'database',
          order: 5,
        },
        {
          path: '/dynamicFiles',
          name: '动态文件',
          icon: 'file',
          order: 6,
        },
        {
          path: '/checkfiles',
          name: '检查文件',
          icon: 'file-text',
          order: 7,
        },
        {
          path: '/registry',
          name: '注册表',
          icon: 'appstore',
          order: 8,
        },
        {
          path: '/tagslist',
          name: '标签列表',
          icon: 'tags',
          order: 9,
        },
      ];

      // 过滤并增强菜单数据
      const enhancedMenus = menuConfig
        .map(config => {
          const existingMenu = menuData.find(item => item.path === config.path);
          if (existingMenu) {
            return {
              ...existingMenu,
              name: config.name,
              icon: iconMap[config.icon] || config.icon,
              order: config.order,
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => (a.order || 999) - (b.order || 999));

      return enhancedMenus;
    },
  };
}
