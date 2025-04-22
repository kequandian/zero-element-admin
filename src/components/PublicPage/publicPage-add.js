import React, { useState, useMemo, useEffect } from 'react';
// import { LS } from 'zero-element/lib/utils/storage';
import DynamicPage from '@/components/DynamicPage';
import useQuery from '../hooks/useQuery'  
// const pageUrl = '/forms'
import { get as getPageServer } from './config';
import { getid as getCurrentPageId } from './config';


export default () => {

  const [namespace, setNamespace] = useState('dynamicPage')
  const [pageConfigUrl, setPageConfigUrl] = useState('')
  const [spinning, setSpinning] = useState(true)

  // get query params from url
  const pageId = useMemo(() => {
    const queryData = useQuery()
    const { pageid, pageId } = queryData
    return pageid || pageId || getCurrentPageId()
    // || LS.get('currentPageId')
  }, [])

  useEffect( () => {
    if (pageId) {
      const pageUrl = getPageServer()
      setNamespace(`dynamicPage_${pageId}`)
      setPageConfigUrl(`${pageUrl}?id=${pageId}`)
      setSpinning(false)
    }
  }, [pageId]);

  if(pageId){
     return <DynamicPage pageConfigNs={namespace} pageConfigApi={pageConfigUrl} pageConfigData={{}} __nsPageRouter={1} />
  }

  return <Spin spinning={spinning}>从url?pageid=中获取pageId失败!</Spin>
};
