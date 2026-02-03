import React from 'react';
import ZEle from 'zero-element';
import config from './.form/dataService-detail.form';

const DataServiceDetail: React.FC = (): React.ReactElement => (
  <ZEle namespace="dataService_detail" config={config} />
);

export default DataServiceDetail;
