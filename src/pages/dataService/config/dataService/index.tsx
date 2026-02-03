import React from 'react';
import ZEle from 'zero-element';
import config from './config';

const DataServiceIndex: React.FC = (): React.ReactElement => (
  <ZEle namespace="data_service" config={config} />
);

export default DataServiceIndex;
