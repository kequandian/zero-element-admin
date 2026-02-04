import React, { useState, useMemo, useEffect } from 'react';
import _ from 'lodash';
import ZEle from 'zero-element';
import qs from 'qs';

import { message, Spin } from 'antd';
import { query } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
// import { LS } from 'zero-element/lib/utils/storage';
const enum PageId {
  ADD = 1,
  EDIT = 2,
  VIEW = 3,
}

interface DynamicPageProps {
  pageConfigNs?: string
  pageConfigApi?: string;        // 页面配置API （优先）
  pageConfigData?: Object;       // 页面配置数据, 优先于 pageConfigApi
  __nsRouterPageId?: number;    // 传递给 ZEle 的子页面类型 [PAGE_ID_ADD, PAGE_ID_EDIT, PAGE_ID_VIEW]
}

export default function DynamicPage (props:DynamicPageProps) {

  const [pageConfig, setPageConfig] = useState<object>({});
  const [spinning, setSpinning] = useState<boolean>(false);
  const [namespace, setNamespace] = useState('dynamicPage')

  useEffect(() => {
    setNamespace(`dynamicPage_${props.pageConfigNs}`)

    if (props.pageConfigData) {
      setPageConfig(props.pageConfigData);
    }else if (props.pageConfigApi) {
      fetchPageConfigData(props.pageConfigApi);
    }
  }, [props.pageConfigData||props.pageConfigApi]);


  // useEffect(() => {
  //   if (props.pageConfigData) {
  //     setNamespace(`dynamicPage_${props.pageConfigNs}`)
  //     setPageConfig(props.pageConfigData);
  //   }
  // }, [props.pageConfigData]);


  const getRequestUrl = (pageConfigApi) => {
    const url:string = pageConfigApi.includes('http') ? pageConfigApi : (getEndpoint() + pageConfigApi);

    const routeParam = window.location.search ? qs.parse(window.location.search.replace('?', '')) : undefined;
    const query =  routeParam || (window.location.href.includes('?')? window.location.href.substring(window.location.href.indexOf('?') + 1) : undefined);
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
    // LS.set('currentPageConfig', pageConfig)
    setSpinning(false);
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
    
    const configAdd = {
          layout: _.get(pageConfig, 'layout.form') || '',
          title: _.get(pageConfig, 'pageName.new') || '',
          items: [
            {
              component: 'Form',
              config: {
                API: {
                  createAPI: _.get(pageConfig, 'createAPI') || '',
                },
                layout: 'Grid',
                layoutConfig: {
                  value: Array(_.get(pageConfig, 'columns') || 1).fill(~~(24 / (_.get(pageConfig, 'columns') || 1))),
                },
                fields: _.get(pageConfig, 'createFields') || _.get(pageConfig, 'formFields') || [],
              },
            },
          ],
        }
    const configEdit = {
      layout: _.get(pageConfig, 'layout.form') || '',
      title: _.get(pageConfig, 'pageName.edit') || '',
      items: [
        {
          component: 'Form',
          config: {
            API: {
              getAPI: _.get(pageConfig, 'getAPI') || '',
              updateAPI: _.get(pageConfig, 'updateAPI') || '',
            },
            layout: 'Grid',
            layoutConfig: {
              value: Array(_.get(pageConfig, 'columns') || 1).fill(~~(24 / (_.get(pageConfig, 'columns') || 1))),
            },
            fields: _.get(pageConfig, 'updateFields') || _.get(pageConfig, 'formFields') || [],
          },
        },
      ],
    }
    
    const configView = {
      layout: _.get(pageConfig, 'layout.form') || '',
      title: _.get(pageConfig, 'pageName.view') || '',
      items: [
        {
          component: 'Form',
          config: {
            API: {
              getAPI: _.get(pageConfig, 'getAPI') || '',
            },
            layout: 'Grid',
            layoutConfig: {
              value: Array(_.get(pageConfig, 'columns') || 1).fill(~~(24 / (_.get(pageConfig, 'columns') || 1))),
            },
            fields: _.get(pageConfig, 'viewConfig') || _.get(pageConfig, 'formFields') || [],
            otherProps: {
              footerButton: false
            }
          },
        },
      ],
    }


    const currentConfig = props.__nsRouterPageId === PageId.ADD ? configAdd :
        (props.__nsRouterPageId === PageId.EDIT ? configEdit :
          (props.__nsRouterPageId === PageId.VIEW ? configView : config))
    return (
      <ZEle namespace={namespace} config={currentConfig} />
    )
  }, [pageConfig]);

  return (
    <Spin spinning={spinning}>
      {Object.keys(pageConfig).length > 0 && ZEleElement}
    </Spin>
  )
}
