import React from 'react';
import ZEle from 'zero-element';
const setting = require('./config/checkfiles-setting.json');

export default function () {
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
              fields: setting.createFields || setting.formFields,
            },
          },
        ],
      }
    return <ZEle namespace="checkfiles-add" config={config} />
  }