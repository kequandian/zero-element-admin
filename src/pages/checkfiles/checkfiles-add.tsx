import React from 'react';
import ZEle from 'zero-element';
import setting from './config/checkfiles-setting.json';

export default function CheckFilesAdd(): React.ReactElement {
  const config = {
    layout: setting.layout.form,
    title: setting.pageName.new,
    items: [
      {
        component: 'Form',
        config: {
          API: {
            createAPI: setting.createAPI,
          },
          layout: 'Grid',
          layoutConfig: {
            value: Array(setting.columns).fill(~~(24 / setting.columns)),
          },
          fields: setting.createFields || (setting as any).formFields,
        },
      },
    ],
  };
  return <ZEle namespace="checkfiles-add" config={config} />;
}
