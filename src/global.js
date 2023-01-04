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


import path from '@/actionItemType/path';
import tabs from '@/actionItemType/tabs';

import vPath from '@/valueType/path';

import { message } from 'antd';

import Content from '@/../zero-antd-dep/layout/Content';

import './rewrite.less';

//自定义组件--未使用
import Setting from '@/container/Setting';
import FieldListAdd from '@/pages/workFlowManageFR/activitiesFR/components/FieldListAdd';
import FieldModalCheckbox from '@/pages/workFlowManageFR/activitiesFR/components/FieldModalCheckbox';
import TreeSelectFetch from '@/components/TreeSelectFetch';
//自定义组件--已使用
import CSet_CustomForm from '@/components/CustomForm';
import CSet_CustomFormFR from '@/components/CustomFormFR';
import CSet_DataManageFormAdd from '@/pages/sys/activitiesCustom/config/dataManage/components/Form';
import CSet_DataReportTreeList from '@/pages/sys/dataReport/components/DataReportTreeList';
import VTSet_InputSwitch from '@/components/ValueType/InputSwitch';
import FITSet_group_title from '@/components/FormItemType/Group';
import FITSet_dynamic_radio from '@/components/FormItemType/DynamicRadio';
import FITSet_local_radio from '@/components/FormItemType/LocalRadio';
import FITSet_modal_radio from '@/components/FormItemType/ModalRadio';
import FITSet_Perm from '@/formItemType/Perm';

import FITSet_UploadImageCard from '@/formItemType/UploadImageCard';
import FITSet_Agree_Agreement from '@/formItemType/AgreeAgreement'

import Dictionary from '@/container/Dictionary';
import FITSet_upload_file_single from '@/components/FormItemType/UploadFileSingle';
import FITSet_download_file from '@/components/FormItemType/DownloadFile';
import FITSet_normal_download_file from '@/components/FormItemType/NormalDownloadFile';
import CSet_activity_fields_form from '@/components/ActivityFieldsForm';
import CSet_print_config_form from '@/pages/workFlowManageFR/activitiesFR/components/PrintConfigForm';
import FITSet_field_table from '@/pages/workFlowManageFR/activitiesFR/components/FieldTable';
import CSet_load_html_page from '@/components/LoadHtmlPage';
import AITSet_export_file from '@/actionItemType/ExportFile';
import FITSet_input_box from '@/components/FormItemType/InputBox';


//Test
import CSet_new_tree_list from '@/components/TList';

//配置 
import { Config } from './devConfig'
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

/** 
 * @开发环境配置
 * @关于Config配置 配置来源 src/devConfig.js > endpoint 项
 * @优先级 src/devConfig.js 中 endpoint 高于 public/config.js 中 window.ZEle.endpoint
 * @说明 此地方不设置生产环境endpoint设置 默认为public/config.js 中的 window.ZEle.endpoint 值
*/

if (process.env.NODE_ENV === 'development') {
  //# $ cat /c/Windows/System32/drivers/etc/hosts
  //# 192.168.3.239:8090 demo.smallsaas.cn:8080
  // setEndpoint('http://cn1.utools.club:58116');
  setEndpoint(Config.endpoint);
  // setEndpoint('http://localhost:8080');
  // saveToken({
  //   token: '',
  // });
}else {
  // setEndpoint('http://localhost:8080');
  // setEndpoint(Config.endpoint);  //取消注释后为devConfig.js中值
}

LayoutSet({
  Content,
});

CSet({
  'custom_form': CSet_CustomForm,
  'Setting': Setting,
  'custom_form_fr': CSet_CustomFormFR,
  'Dictionary': Dictionary,
  'data_manage_form_add' : CSet_DataManageFormAdd,
  'activity_fields_form' : CSet_activity_fields_form,
  'print_config_form': CSet_print_config_form,
  'data_report_tree_list': CSet_DataReportTreeList,
  'LoadHtmlPage': CSet_load_html_page,
  'NewTreeList': CSet_new_tree_list,
});

LASet({

});

//表单组件
FITSet({
  'upload-image-card':FITSet_UploadImageCard,
  'agree-agreement':FITSet_Agree_Agreement,
  'perm': FITSet_Perm,
  'FieldListAdd': FieldListAdd,
  'FieldModalCheckbox': FieldModalCheckbox,
  'tree-select-fetch': TreeSelectFetch,
  'group-title' : FITSet_group_title,
  'dynamic_radio' : FITSet_dynamic_radio,
  'local_radio' : FITSet_local_radio,
  'local_modal_radio': FITSet_modal_radio,
  'upload_file_single': FITSet_upload_file_single,
  'field_table': FITSet_field_table,
  'download_file_btn': FITSet_download_file,
  'normal_download_file': FITSet_normal_download_file,
  'inputBox': FITSet_input_box,
});

AITSet({
  path,
  tabs,
  'exportFile': AITSet_export_file,
});

//列表 & 详情
VTSet({
  'path': vPath,
  'input-switch' : VTSet_InputSwitch,
});
