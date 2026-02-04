import { getModel } from 'zero-element/lib/Model';

import { set as golbalSet } from 'zero-element/lib/config/global';
import { set as APIConfig } from 'zero-element/lib/config/APIConfig';

import { set as setEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { saveToken, removeToken } from 'zero-element/lib/utils/request/token';

import { set as LayoutSet } from 'zero-element/lib/config/layout';
import { set as ContainerSet } from 'zero-element/lib/config/container';
import { set as LASet } from 'zero-element/lib/config/listAction';
import { set as FITSet } from 'zero-element/lib/config/formItemType';
import { set as AITSet } from 'zero-element/lib/config/actionItemType';
import { set as VTSet } from 'zero-element/lib/config/valueType';

import path from '@/pages/dynamicPageTool/compx/actionItemType/path';

import EditList from '@/pages/dynamicPageTool/container/EditList/index';
import AITSet_FromModal from '@/pages/dynamicPageTool/compx/actionItemType/FromModal';
import CSet_DynamicPageForm from '@/pages/dynamicPageManage/compx/DynamicPageForm';
import CSet_DynamicPageShowConfig from '@/pages/dynamicPageManage/compx/DynamicPageShowConfig';
import AITSet_DownloadPage from '@/pages/dynamicPageManage/compx/onDownloadPage';

import { message } from 'antd';

import { Config } from './devConfig';

const globalModel = getModel('global');

// Create a compatible router navigation object
// This will be initialized when the router is available
let navigate: ((path: string) => void) | null = null;

const router = {
  push: (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      // Fallback: directly manipulate window location hash
      window.location.hash = path;
    }
  },
  goBack: () => {
    window.history.back();
  },
};

// Export a function to set the navigate function from the router
export function setNavigate(nav: (path: string) => void) {
  navigate = nav;
}

APIConfig({
  'DEFAULT_current': '1',
  'DEFAULT_pageSize': '10',

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
  router: (path: string) => {
    router.push(path);
  },
  goBack: () => {
    router.goBack();
  },
  Unauthorized: (_data: any) => {
    removeToken();
    router.push('/401');
  },
  getPerm() {
    return globalModel.getPerm();
  },
  RequestError: (props: { data?: any }) => {
    const { data = {} } = props;
    if (data.errors && data.errors.length) {
      data.errors.forEach((msg: any) => {
        message.error(JSON.stringify(msg));
      });
    } else {
      message.error(data.message || '无法连接服务器');
    }
  }
});

if (process.env.NODE_ENV === 'development') {
  setEndpoint(Config.endpoint);
  saveToken({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEiLCJ1c2VySWQiOiIxIiwidGVuYW50T3JnSWQiOjEsImFjY291bnQiOiJhZG1pbiIsInVzZXJUeXBlIjoxMDAsImRldlVzZXJUeXBlIjowLCJiVXNlclR5cGUiOiJTWVNURU0iLCJhcHBpZCI6IiIsImlhdCI6MTY3ODY3NTYyMiwianRpIjoiMSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNjc4OTM0ODIyfQ.quSUbUPbqkXXRJRmaa6kq3oy8t6HvjqXtF_ndDlecikDlbQPZjTUNq2ZY1qo8hM4uXiAhRuGrqTE38pzFUv0YQ',
  });
}

LayoutSet({});

ContainerSet({
  'EditList': EditList,
  'DynamicPageForm': CSet_DynamicPageForm,
  'DynamicPageShowConfig': CSet_DynamicPageShowConfig
});

VTSet({});

LASet({
  'onFromModal': AITSet_FromModal,
  'onDownloadPage': AITSet_DownloadPage
});

AITSet({
  path,
  'fromModal': AITSet_FromModal,
});

FITSet({});
