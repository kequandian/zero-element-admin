import React from 'react';
import ZEle from 'zero-element';
import config from './config';
import qs from 'qs';
import useBreadcrumb from '@/framework/useBreadcrumb';

export default function salesChancEdit({ location }) {
  const { id } = qs.parse(location.search.replace('?', ''));

  useBreadcrumb([
    { title: '首页', path: '/admin' },
    { title: '纠正话术管理',path:'/aiFitness/colloquialism'},
    { title: "新增话术"}
  ]);

  return <div>
    <ZEle
      namespace="colloquialism-add"
      config={config}
      extraData={{
        id,
      }}
    />
  </div>
}