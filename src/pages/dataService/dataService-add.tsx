import React from 'react';
import ProjectActivities from './config/dataService/add';
//  import useBreadcrumb from '@/framework/useBreadcrumb';

interface DataServiceAddProps {
  [key: string]: any;
}

const DataServiceAdd: React.FC<DataServiceAddProps> = (props): React.ReactElement => {
  // useBreadcrumb([
  //     { title: '首页', path: '/' },
  //     { title: '系统管理', path: '/sys' },
  //     { title: "新增数据" },
  // ]);
  return <ProjectActivities />;
};

export default DataServiceAdd;
