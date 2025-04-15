import React, { useState, useMemo, useEffect } from 'react';
import _ from 'lodash';
import ZEle from 'zero-element';
import { message, Spin } from 'antd';
import { query } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';

// import { testData } from './test';

interface DynamicPageProps {
  pageConfigNs: string
  pageConfigApi: string; // 页面配置API （优先）
  pageConfigData: Object; // 页面配置数据, 优先于 pageConfigApi
}

export default function DynamicPage (props:DynamicPageProps) {

  const [pageConfig, setPageConfig] = useState<object>({});
  const [spining, setSpining] = useState<boolean>(false);
  const [namespace, setNamespace] = useState('dynamicPage')

  useEffect(() => {
    setNamespace(`dynamicPage_${props.pageConfigNs}`)

    if (props.pageConfigApi) {
      fetchPageConfigData(props.pageConfigApi);
    }else if (props.pageConfigData) {
      setPageConfig(props.pageConfigData);
    }
  }, [props.pageConfigApi || props.pageConfigData]);


  // useEffect(() => {
  //   if (props.pageConfigData) {
  //     setNamespace(`dynamicPage_${props.pageConfigNs}`)
  //     setPageConfig(props.pageConfigData);
  //   }
  // }, [props.pageConfigData]);


  const getRequestUrl = (pageConfigApi) => {
    let url:string = pageConfigApi;
    let query = window.location.search.replace('?', '');
    if (!query && window.location.href.includes('?')) {
      query = window.location.href.substring(window.location.href.indexOf('?') + 1);
    }
    if (!url.includes('http')) {
      url = getEndpoint() + url;
    }
    if (query) {
      url+= (url.includes('?') ? `&${query}` : `?${query}`);
    }
    return url;
  }

  async function fetchPageConfigData (pageConfigApi) {
    // below two lines for debug
    // setPageConfig(testData);
    // return;

    setSpining(true);

    //start fetch page config data
    const res = await query(getRequestUrl(pageConfigApi));
    if (_.get(res, 'data.code') !== 200) {
      message.error(_.get(res, 'data.message') || '获取页面配置信息失败');
    }
    setPageConfig(_.get(res, 'data.data.form') || _.get(res, 'data.data') || {});
    //}} 

    setSpining(false);
  }

  const ZEleElement = useMemo(() => {
    const config = {
      layout: _.get(pageConfig, 'layout.table') || '',
      title: _.get(pageConfig, 'pageName.table') || '',
      items: [
        {
          component: 'Search',
          config: {
            fields: _.get(pageConfig, 'searchFields') || [],
          },
        },
        {
          component: 'Table',
          config: {
            API: {
              listAPI: _.get(pageConfig, 'listAPI') || '',
              deleteAPI: _.get(pageConfig, 'deleteAPI'),
            },
            actions: _.get(pageConfig, 'tableActions') || '',
            fields: _.get(pageConfig, 'tableFields') || [],
            operation: _.get(pageConfig, 'tableOperation') || '',
          },
        },
      ],
    }
    return (
      <ZEle namespace={namespace} config={config} />
    )
  }, [pageConfig]);

  return (
    <Spin spinning={spining}>
      {Object.keys(pageConfig).length > 0 && ZEleElement}
    </Spin>
  )
}
