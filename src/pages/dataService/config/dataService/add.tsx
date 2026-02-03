import React from 'react';
import ZEle from 'zero-element';
import config from './.form/dataService-add.form';

const DataServiceAdd: React.FC = (): React.ReactElement => (
  <ZEle namespace="dataService_add" config={config} />
);

export default DataServiceAdd;
