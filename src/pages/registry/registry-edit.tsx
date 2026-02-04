import React from 'react';
import ZEle from 'zero-element';
import setting from './config/registry-setting.json';

export default function RegistryEdit(): React.ReactElement {
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

  return <ZEle namespace="registry-edit" config={config} />;
}
