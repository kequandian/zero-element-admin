import React from 'react';
import ZEle from 'zero-element';
import config from './.form/dataService-edit.form';

const DataServiceEdit: React.FC = (): React.ReactElement => (
  <ZEle namespace="dataService_edit" config={config} />
);

export default DataServiceEdit;
