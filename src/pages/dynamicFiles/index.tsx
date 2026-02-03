// import DynamicPage from '@/components/DynamicPage';
import React from 'react';
import PublicPage from '@/components/PublicPage';
// const pageConfigApi = '/forms?id=12100'
import setting from './config/checkfiles-setting.json';

export default (): React.ReactElement => {
  // return <DynamicPage pageConfigNs={1010} pageConfigApi={pageConfigApi} />
  return <PublicPage pageServer={'/forms'} pageData={setting} />;
};
