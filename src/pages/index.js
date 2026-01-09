/**
 * title: 首页
 * icon: home
 * order: 0
 */
import React from 'react';
import { history } from 'umi';

export default function () {

  // history.push('/checkfiles');
  history.push('/dynamicPageManage');
  // history.push('/dynamicFiles');

  return (
    <div>
    </div>
  );
}
