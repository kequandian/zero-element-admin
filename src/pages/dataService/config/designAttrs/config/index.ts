import setting from './setting-page.json';

interface ConfigItem {
  component: string;
  config?: any;
}

interface Config {
  layout: string;
  items: ConfigItem[];
}

const config: Config = {
  layout: setting.layout.table,
  // title: setting.pageName.table,
  items: [
    {
      component: 'Search',
      config: {
        fields: setting.searchFields,
      },
    },
    {
      component: 'Table',
      config: {
        API: {
          listAPI: setting.listAPI,
          deleteAPI: setting.deleteAPI,
        },
        actions: setting.tableActions,
        fields: setting.tableFields,
        operation: setting.tableOperation,
      },
    },
  ],
};

export default config;
