import { setting } from './dynamicPageManage-setting';

interface Config {
  layout: string;
  title: string;
  items: ConfigItem[];
}

interface ConfigItem {
  component: string;
  config?: {
    type?: string;
    fields?: any[];
    API?: {
      listAPI?: string;
      deleteAPI?: string;
    };
    actions?: any[];
    operation?: any[];
    props?: {
      style?: {
        textAlign?: string;
      };
    };
  };
}

const config: Config = {
  layout: setting.layout.table,
  title: setting.pageName.table,
  items: [
    // process.env.NODE_ENV === 'development' ?
    //   {
    //     component: 'EditList',
    //   } : { component: 'Empty' },
    {
      component: 'Search',
      config: {
        type:"default",
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
        props:{
          style:{
            "textAlign":"center"
          }
        }
      }
    },
  ],
};

export default config;
