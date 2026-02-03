import React from 'react';
import ProjectActivities from './config/dataService/detail';
// import useBreadcrumb from '@/framework/useBreadcrumb';

interface DataServiceDetailProps {
  [key: string]: any;
}

const DataServiceDetail: React.FC<DataServiceDetailProps> = (props): React.ReactElement => {
  //     useBreadcrumb([
  //     { title: '首页', path: '/' },
  //     { title: '系统管理', path: '/sys' },
  //     { title: '数据服务', path: '/sys/dataService' },
  //     { title: '数据详情' },
  // ]);
  return <ProjectActivities />;
};

export default DataServiceDetail;
