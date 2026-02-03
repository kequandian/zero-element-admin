import React from 'react';
import ProjectActivities from './config/dataService/edit';
// import useBreadcrumb from '@/framework/useBreadcrumb';

interface DataServiceEditProps {
  [key: string]: any;
}

const DataServiceEdit: React.FC<DataServiceEditProps> = (props): React.ReactElement => {
  //     useBreadcrumb([
  //     { title: '首页', path: '/' },
  //     { title: '系统管理', path: '/sys' },
  //     { title: '数据服务', path: '/sys/dataService' },
  //     { title: '数据编辑' },
  //     ]);
  return <ProjectActivities />;
};

export default DataServiceEdit;
