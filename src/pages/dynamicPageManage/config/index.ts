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
  layout: (setting as any).layout.table,
  title: (setting as any).pageName.table,
  items: [
    // process.env.NODE_ENV === 'development' ?
    //   {
    //     component: 'EditList',
    //   } : { component: 'Empty' },
    {
      component: 'Search',
      config: {
        type:"default",
        fields: (setting as any).searchFields,
      },
    },
    {
      component: 'Table',
      config: {
        API: {
          listAPI: (setting as any).listAPI,
          deleteAPI: (setting as any).deleteAPI,
        },
        actions: (setting as any).tableActions,
        fields: (setting as any).tableFields,
        operation: (setting as any).tableOperation,
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
