import React from 'react';
// import useBreadcrumb from '@/framework/useBreadcrumb';
import Activities from './config/dataService';

interface DataServiceProps {
  [key: string]: any;
}

const DataService: React.FC<DataServiceProps> = (props): React.ReactElement => {
  //     useBreadcrumb([
  //     { title: '首页', path: '/' },
  //     { title: '系统管理', path: '/sys' },
  //     { title: '数据服务'}
  // ]);
  return <Activities />;
};

export default DataService;
