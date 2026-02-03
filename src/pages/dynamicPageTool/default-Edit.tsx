import React from 'react';
import ZEle from 'zero-element';
import { TheConfig } from './index'

interface PageConfigType {
  layout?: {
    form?: string;
  };
  pageName?: {
    edit?: string;
    name?: string;
  };
  columns?: number;
  getAPI?: string;
  updateAPI?: string;
  updateFields?: any[];
  formFields?: any[];
}

interface DefaultEditProps {
  // Add props if needed
}

export default function DefaultEdit(_props: DefaultEditProps): React.ReactElement {
  if (TheConfig) {
    const pageConfig = {
      layout: TheConfig.layout?.form,
      title: TheConfig.pageName?.edit,
      items: [
        {
          component: 'Form',
          config: {
            API: {
              getAPI: TheConfig.getAPI,
              updateAPI: TheConfig.updateAPI,
            },
            layout: 'Grid',
            layoutConfig: {
              value: Array(TheConfig.columns || 1).fill(~~(24 / (TheConfig.columns || 1))),
            },
            fields: TheConfig.updateFields || TheConfig.formFields,
          },
        },
      ],
    }
    return <ZEle namespace={`${TheConfig.pageName?.name || "default"}_edit`} config={pageConfig} />;
  } else {
    return <div>无页面配置信息！</div>
  }
}
