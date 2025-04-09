import React, { useState } from 'react';
import ZEle from 'zero-element';
import qs from 'qs';
import { message, Spin } from 'antd'
import { useDidMount, useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { query } from 'zero-element/lib/utils/request';
import useBreadcrumb from '@/framework/useBreadcrumb';
import { LS } from 'zero-element/lib/utils/storage';

import { pageUrl } from './config';
import { getPageId } from '@/utils/dynamicPageTools';

export default () => {

  useBreadcrumb([
    { title: '首页', path: '/' },
    { title: '在线开发', path: '/nocode' },
  ]);
  
  // const pathname = window.location.pathname;
  const pageId = LS.get('currentPageId') || '';

    const [pageConfig, setPageConfig] = useState('')
    const [spining, setSpining] = useState(true)
    const [namespace, setNamespace ] = useState('dynamicPage_edit')
    // const [tips, setTips] = useState("获取数据中")

    useDidMount(_ => {
        initPageConfig()
    });

    function initPageConfig() {
      
      // const index = pathname.lastIndexOf("\/");
      // const pathNameStr = pathname.substring(0,index);

      // const { pageId, entityName } = getPageId(pathNameStr)

      //用于设置namespace
      setNamespace(`dynamicPage_edit_${pageId}`)

      let pageConfigUrl = `${pageUrl}?id=${pageId}`


        query(pageConfigUrl, {})
          .then(resp => {
            setSpining(false)
            const response = resp.data
            if (response && response.code === 200) {
                const configData = response.data;
                setPageConfig(configData)
                // setTips("加载完成")

            } else {
                message.error('获取页面配置信息失败')
                // setTips("加载完成")
            }
          }).catch(err => {
            setSpining(false)
            message.error('获取页面配置信息失败')
          })
    }

    if(pageConfig){
        const config = {
            layout: pageConfig.layout.form,
            title: pageConfig.pageName.edit,
            items: [
              {
                component: 'Form',
                config: {
                  API: {
                    getAPI: pageConfig.getAPI,
                    updateAPI: pageConfig.updateAPI,
                  },
                  layout: 'Grid',
                  layoutConfig: {
                    value: Array(pageConfig.columns).fill(~~(24 / pageConfig.columns)),
                  },
                  fields: pageConfig.updateFields || pageConfig.formFields,
                },
              },
            ],
          }

        return (
            <ZEle namespace="dynamicPage_edit" config={config} />
        )
    } else {
        return <Spin spinning={spining} ></Spin>
    }
};
