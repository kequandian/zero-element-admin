import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/testPageFetch-detail.config.json';
    
export default () => {

  return <DetailsTemplate
    namespace="testPageFetch_detail"
    setting={setting}
    config={setting.viewConfig}
  />
}