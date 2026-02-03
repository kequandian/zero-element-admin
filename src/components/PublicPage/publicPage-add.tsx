import React, { useState, useMemo, useEffect } from 'react';
import { Spin } from 'antd';
import DynamicPage from '@/components/DynamicPage';
import useQuery from '../hooks/useQuery';
import { get as getPageServer } from './config';
import { getid as getCurrentPageId } from './config';

export default function PublicPageAdd(): React.ReactElement {
  const [namespace, setNamespace] = useState('dynamicPage');
  const [pageConfigUrl, setPageConfigUrl] = useState('');
  const [spinning, setSpinning] = useState(true);

  // get query params from url
  const pageId = useMemo(() => {
    const queryData = useQuery();
    const { pageid, pageId } = queryData;
    return pageid || pageId || getCurrentPageId();
  }, []);

  useEffect(() => {
    if (pageId) {
      const pageUrl = getPageServer();
      if (pageUrl) {
        setNamespace(`dynamicPage_${pageId}`);
        setPageConfigUrl(`${pageUrl}?id=${pageId}`);
        setSpinning(false);
      }
    }
  }, [pageId]);

  if (pageId) {
    return <DynamicPage pageConfigNs={namespace} pageConfigApi={pageConfigUrl} pageConfigData={{}} __nsRouterPageId={1} />;
  }

  return <Spin spinning={spinning}>从url?pageid=中获取pageId失败!</Spin>;
}
