import React, { useState, useMemo, useEffect } from 'react';
import { LS } from 'zero-element/lib/utils/storage';

import DynamicPage from '@/components/DynamicPage';
import useQuery from '../hooks/useQuery'  
const pageUrl = '/forms'

export default () => {

  const [namespace, setNamespace] = useState('dynamicPage')
  const [pageConfigUrl, setPageConfigUrl] = useState('')
  const [spinning, setSpinning] = useState<boolean>(false);

  // get query params from url
  const pageId = useMemo(() => {
    const queryData = useQuery()
    const { id, pageId } = queryData
    return pageId || id
  }, [])

  useEffect( () => {
    if (pageId) {
      setNamespace(`dynamicPage_${pageId}`)
      setPageConfigUrl(`${pageUrl}?id=${pageId}`)
      
      LS.set('currentPageId', pageId)
    }
  }, [pageId]);

  // get pageConfig from private storage
  const pageConfig = LS.get('currentPageConfig') || {};

  const ZEleAddPage = useMemo(() => {
    const config = {
      layout: pageConfig.layout.form,
      title: pageConfig.pageName.new,
      items: [
        {
          component: 'Form',
          config: {
            API: {
              createAPI: pageConfig.createAPI,
            },
            layout: 'Grid',
            layoutConfig: {
              value: Array(pageConfig.columns).fill(~~(24 / pageConfig.columns)),
            },
            fields: pageConfig.createFields || pageConfig.formFields,
          },
        },
      ],
    }
  
    return <DynamicPage pageConfigNs={namespace} pageConfigApi={pageConfigUrl} pageConfigData={{}} __nsPageConfig={config} />
  }, [pageConfig])

    return (
      <Spin spinning={spinning}>
        {Object.keys(pageConfig).length > 0 && ZEleAddPage}
      </Spin>
    )
};
