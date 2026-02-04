import React from 'react';
import ZEle from 'zero-element';
import setting from './config/checkfiles-setting.json';

export default function CheckFilesEdit(): React.ReactElement {
  const config = {
    layout: setting.layout.form,
    title: setting.pageName.edit,
    items: [
      {
        component: 'Form',
        config: {
          API: {
            getAPI: setting.getAPI,
            updateAPI: setting.updateAPI,
          },
          layout: 'Grid',
          layoutConfig: {
            value: Array(setting.columns).fill(~~(24 / setting.columns)),
          },
          fields: setting.updateFields || (setting as any).formFields,
        },
      },
    ],
  };

  return <ZEle namespace="checkfiles-edit" config={config} />;
}
