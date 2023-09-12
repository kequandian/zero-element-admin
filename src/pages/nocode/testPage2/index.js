import React, { useState, useEffect } from 'react';
import ZEle from 'zero-element';
import qs from 'qs';
import { message, Spin } from 'antd'
import { useDidMount, useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { query } from 'zero-element/lib/utils/request';
// import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { LS } from 'zero-element/lib/utils/storage';

import { pageUrl } from './config';
import { getPageId } from '@/utils/dynamicPageTools';

export default (props) => {

    const pathname = window.location.pathname;
    const routeParam = window.location.search.replace('?', '');
    
    const [pageConfig, setPageConfig] = useState('')
    const [spining, setSpining] = useState(true)
    const [namespace, setNamespace ] = useState('dynamicPage')

    useEffect(_ => {
      if(routeParam){
        setSpining(true)
        const pageId = routeParam.split('=')[1]
        initPageConfig(pageId)
      }
    }, [routeParam]);

    function initPageConfig(pageId) {

      const { entityName } = getPageId(pathname)
      //用于设置namespace
      setNamespace(entityName)

      if(!pageId){
        message.error('获取页面ID异常')
        return
      }

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
    
    function handlePage(){
      const config = {
        layout: pageConfig.layout.table,
        title: pageConfig.pageName.table,
        items: [
          {
            component: 'Search',
            config: {
              fields: pageConfig.searchFields,
            },
          },
          {
            component: 'Table',
            config: {
              API: {
                listAPI: pageConfig.listAPI,
                deleteAPI: pageConfig.deleteAPI,
              },
              actions: pageConfig.tableActions,
              fields: pageConfig.tableFields,
              operation: pageConfig.tableOperation,
            },
          },
        ],
      }

      return <ZEle namespace={namespace} config={config} />
    }

    return <Spin spinning={spining} >
      {pageConfig && handlePage()}
    </Spin>


   
};
