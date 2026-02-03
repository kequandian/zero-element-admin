import React from 'react';
import ZEle from 'zero-element';
// import DetailsTemplate from '@/components/Details/DetailsTemplate';

// Define the shape of the config imported from JSON
interface ConfigSetting {
  layout?: {
    form?: string;
  };
  pageName?: {
    view?: string;
  };
  columns?: number;
  getAPI?: string;
  viewConfig?: any[];
  formFields?: any[];
}

// Since we can't import JSON directly in TypeScript without proper configuration,
// we'll import the JavaScript version and type it
const setting: ConfigSetting = require('./config/dynamicPageTool-detail.config.json');

interface TestPageFetchDetailProps {
  // Add props if needed
}

export default function TestPageFetchDetail(_props: TestPageFetchDetailProps): React.ReactElement {

  const config = {
    layout: setting.layout?.form,
    title: setting.pageName?.view,
    items: [
      {
        component: 'Form',
        config: {
          API: {
            getAPI: setting.getAPI,
          },
          layout: 'Grid',
          layoutConfig: {
            value: Array(setting.columns || 1).fill(~~(24 / (setting.columns || 1))),
          },
          fields: setting.viewConfig || setting.formFields,
          otherProps: {
            footerButton: false
          }
        },
      },
    ],
  }

  return <ZEle namespace="dynamicPageTool_detail-view" config={config} />
}
