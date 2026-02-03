import React, { useState, useMemo, useEffect } from 'react';

import DynamicPage from '@/components/DynamicPage';
import useQuery from '../hooks/useQuery';
import { set as setPageServer } from './config';
import { setid as setCurrentPageId } from './config';

interface PublicPageProps {
  pageServer: string;  // page server url
  pageData: any;  // page data
}

export default function PublicPage(props: PublicPageProps): React.ReactElement {
  const { pageServer, pageData } = props;

  const [namespace, setNamespace] = useState('dynamicPage');
  const [pageConfigUrl, setPageConfigUrl] = useState('');

  // save page server for other internal pages
  setPageServer(pageServer);

  // get query params from url
  const pageId = useMemo(() => {
    const queryData = useQuery();
    const { pageid, pageId } = queryData;
    return pageid || pageId;
  }, []);

  useEffect(() => {
    if (pageId) {
      setNamespace(`dynamicPage_${pageId}`);
      setPageConfigUrl(`${pageServer}?id=${pageId}`);
      setCurrentPageId(pageId);
    }
  }, [pageId, pageServer]);

  return <DynamicPage pageConfigNs={namespace} pageConfigApi={pageConfigUrl} pageConfigData={pageData} />;
}
