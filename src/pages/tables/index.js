import useBreadcrumb from '@/framework/useBreadcrumb';
import React from 'react';
import ZEle from 'zero-element';
import config from './config/index';

export default () => {
    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '管理员选项',path:'/designpage/config'},
        { title: "报表管理"}
    ]);
    return <ZEle namespace="fieldCustom" config={config} />
}
