/* eslint-disable no-unused-vars */
import model from '@/models';
import zeroAntd from './zero-antd-dep';

import { history } from 'umi';
import { getModel } from 'zero-element/lib/Model';

import { set as golbalSet } from 'zero-element/lib/config/global';
import { set as APIConfig } from 'zero-element/lib/config/APIConfig';

import { set as setEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { saveToken, removeToken } from 'zero-element/lib/utils/request/token';

import { set as LayoutSet } from 'zero-element/lib/config/layout';
import { set as CSet } from 'zero-element/lib/config/container';
import { set as LASet } from 'zero-element/lib/config/listAction';
import { set as FITSet } from 'zero-element/lib/config/formItemType';
import { set as AITSet } from 'zero-element/lib/config/actionItemType';
import { set as VTSet } from 'zero-element/lib/config/valueType';


import onPath from '@/listAction/onPath';

import path from '@/actionItemType/path';
import tabs from '@/actionItemType/tabs';

import vPath from '@/valueType/path';

import { message } from 'antd';

import Content from '@/../zero-antd-dep/layout/Content';

import './rewrite.less';

//自定义组件--未使用
import Setting from '@/container/Setting';
import FieldListAdd from '@/pages/workFlowManage/activities/components/FieldListAdd';
import FieldModalCheckbox from '@/pages/workFlowManage/activities/components/FieldModalCheckbox';
import AITSet_childrenModalAdd from "@/pages/workFlowManage/activities/components/CModalAdd";
import TreeSelectFetch from '@/components/TreeSelectFetch';
//自定义组件--已使用
import CSet_CustomForm from '@/components/CustomForm';
import VTSet_InputSwitch from '@/components/ValueType/InputSwitch';
import FITSet_group_title from '@/components/FormItemType/Group';
import FITSet_dynamic_radio from '@/components/FormItemType/DynamicRadio';
import FITSet_local_radio from '@/components/FormItemType/LocalRadio';
import FITSet_Perm from '@/formItemType/Perm';

const globalModel = getModel('global');

APIConfig({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,

  'REQUEST_FIELD_current': 'pageNum',
  'REQUEST_FIELD_pageSize': 'pageSize',
  'REQUEST_FIELD_field': 'orderBy',
  'REQUEST_FIELD_order': 'sort',
  'REQUEST_FIELD_ascend': 'ASC',
  'REQUEST_FIELD_descend': 'DESC',

  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
});
golbalSet({
  router: (path) => {
    history.push(path);
  },
  goBack: () => {
    history.goBack();
  },
  Unauthorized: () => {
    removeToken();
    history.push('/login');
  },
  getPerm() {
    return globalModel.getPerm();
  },
  RequestError: ({ data = {} }) => {
    if (data.errors && data.errors.length) {
      data.errors.forEach(msg => {
        message.error(JSON.stringify(msg));
      })
    } else {
      message.error(data.message || '无法连接服务器');
    }
  }
});


if (process.env.NODE_ENV === 'development') {
  //# $ cat /c/Windows/System32/drivers/etc/hosts
  //# 192.168.3.239:8090 demo.smallsaas.cn:8080
  setEndpoint('http://192.168.3.239:8090');
  // saveToken({
  //   token: '',
  // });
}else {
  setEndpoint('http://192.168.3.239:8090');
}

LayoutSet({
  Content,
});

CSet({
  'custom_form': CSet_CustomForm,
  'Setting': Setting,
});

LASet({
  'onPath': onPath,
});

//表单组件
FITSet({
  'perm': FITSet_Perm,
  'FieldListAdd': FieldListAdd,
  'FieldModalCheckbox': FieldModalCheckbox,
  'tree-select-fetch': TreeSelectFetch,
  'group-title' : FITSet_group_title,
  'dynamic_radio' : FITSet_dynamic_radio,
  'local_radio' : FITSet_local_radio,
});

AITSet({
  path,
  tabs,
  'AITSet_childrenModalAdd': AITSet_childrenModalAdd,
});

VTSet({
  'path': vPath,
  'input-switch' : VTSet_InputSwitch,
});
