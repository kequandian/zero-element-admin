import React, { useState, useMemo, useEffect } from 'react';
import _ from 'lodash';
import ZEle from 'zero-element';
import { message, Spin } from 'antd';
import { query } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { LS } from 'zero-element/lib/utils/storage';

// import { testData } from './test';

interface DynamicPageProps {
  pageConfigNs: string
  pageConfigApi: string;        // 页面配置API （优先）
  pageConfigData: Object;       // 页面配置数据, 优先于 pageConfigApi
  __nsPageConfig?: object;  // 传递给 ZEle 的配置
}

export default function DynamicPage (props:DynamicPageProps) {

  const [pageConfig, setPageConfig] = useState<object>({});
  const [spinning, setSpinning] = useState<boolean>(false);
  const [namespace, setNamespace] = useState('dynamicPage')

  useEffect(() => {
    setNamespace(`dynamicPage_${props.pageConfigNs}`)

    if (props.pageConfigApi) {
      fetchPageConfigData(props.pageConfigApi);
    }else if (props.pageConfigData) {
      setPageConfig(props.pageConfigData);
      LS.set('currentPageConfig', pageConfig)
    }
  }, [props.pageConfigApi || props.pageConfigData]);


  // useEffect(() => {
  //   if (props.pageConfigData) {
  //     setNamespace(`dynamicPage_${props.pageConfigNs}`)
  //     setPageConfig(props.pageConfigData);
  //   }
  // }, [props.pageConfigData]);


  const getRequestUrl = (pageConfigApi) => {
    const url:string = pageConfigApi.includes('http') ? pageConfigApi : (getEndpoint() + pageConfigApi);
    const query = window.location.search ? window.location.search.replace('?', '') : (window.location.href.includes('?')? window.location.href.substring(window.location.href.indexOf('?') + 1) : undefined);
    if (query) {
      const urlWithQuery = url + (url.includes('?') ? `&${query}` : `?${query}`);
      return urlWithQuery
    }

    return url;
  }

  async function fetchPageConfigData (pageConfigApi) {
    // below two lines for debug
    // setPageConfig(testData);
    // return;

    setSpinning(true);

    //start fetch page config data
    const res = await query(getRequestUrl(pageConfigApi));
    if (_.get(res, 'data.code') !== 200) {
      message.error(_.get(res, 'data.message') || '获取页面配置信息失败');
    }
    setPageConfig(_.get(res, 'data.data.form') || _.get(res, 'data.data') || {});
    LS.set('currentPageConfig', pageConfig)

    setSpinning(false);
  }

  const ZEleElement = useMemo(() => {
    const config = props.__nsPageConfig? props.__nsPageConfig : {
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
    <Spin spinning={spinning}>
      {Object.keys(pageConfig).length > 0 && ZEleElement}
    </Spin>
  )
}
