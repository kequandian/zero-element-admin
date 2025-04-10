import React, { useState, useEffect } from 'react';
import ZEle from 'zero-element';
import { message, Spin } from 'antd'
import { query } from 'zero-element/lib/utils/request';
import { LS } from 'zero-element/lib/utils/storage';
// import useBreadcrumb from '@/framework/useBreadcrumb';

// import { pageUrl } from './config';

export default (props) => {
  const pageUrl = 'http://192.168.3.210:8089/forms'

  const pageId = window.location.search.replace('?', '').split("=")[1];
  // const title = getPageTitle(pageId)
  console.log('pageId=', pageId)
  return <Spin spinning={false} >
    <div>{pageId}</div>
  </Spin>
  LS.set('currentPageId', pageId)

  // useBreadcrumb([
  //   { title: '首页', path: '/' },
  //   { title: '在线开发', path: '/nocode' },
  // ]);

  const [pageConfig, setPageConfig] = useState('')
  const [spining, setSpining] = useState(true)
  const [namespace, setNamespace] = useState('dynamicPage')

  useEffect(_ => {
    if (pageId) {
      // setPageConfig('')
      setSpining(true)
      initPageConfig()
    }
  }, [pageId]);

  function initPageConfig() {

    //用于设置namespace
    setNamespace(`dynamicPage_${pageId}`)

    if (!pageId) {
      message.error('获取页面ID异常')
      return
    }

    const pageConfigUrl = `${pageUrl}?id=${pageId}`

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

  function handlePage() {

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
