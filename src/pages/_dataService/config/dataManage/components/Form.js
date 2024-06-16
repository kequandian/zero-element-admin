/* eslint-disable no-restricted-globals */
import React, { useRef, useMemo, useState } from 'react';
import { Form } from 'antd';
import { formatAPI } from 'zero-element/lib/utils/format';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, message } from 'antd';
import { getFormItem } from 'zero-element-antd/lib/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import global from 'zero-element/lib/config/global';
import useFormHandle from 'zero-element-antd/lib/container/Form/utils/useFormHandle';
import extraFieldType from 'zero-element-antd/lib/container/Form/utils/extraFieldType';
import canPortal from 'zero-element-antd/lib/utils/canPortal';
import { setPageData, getPageData, clearPageData, getHooks } from 'zero-element/lib/Model';
import './index.css';

import promiseAjax from '@/utils/promiseAjax';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';

const defaultLabelCol = {
  xs: { span: 8, },
};
const defaultWrapperCol = {
  // xs: { span: 16, },
};
export default function BaseForm(props) {
  const [form] = Form.useForm();

  const forceUpdate = useForceUpdate();
  const {
    MODAL, namespace, config, extraData = {},
    onClose, onSubmit, extraEl,
    loading: propsLoading,
    forceInitForm,
    footer,
    hooks = {},
    formRef,
    keepData = false, // 卸载 BaseForm 时不销毁 model.formData
  } = props;
  const {
    API = {},
    layout = 'Empty', layoutConfig = {},
    fields: fieldsCfg,
    path,
    goBack: gobackOpt = true,
    footer: footerOpt,
    requestOptions,
  } = config;
  const { layoutType = 'inline' } = layoutConfig; // inline vertical horizontal
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    extraData,
  }, config);
  const { router, goBack } = global;

  const renderGoBack = extraEl && extraEl.current && goBack;

  const { loading, data, model, handle } = formProps;
  const { onGetData, onFormMap } = getHooks(namespace);
  const pageDataFormData = getPageData(namespace).formData;

  const initData = useRef({
    ...extraData,
    ...pageDataFormData,
    ...data,
  });

  const {
    onFormatValue,
    handleFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect,
  } = useFormHandle(form, {
    namespace,
    config,
    forceInitForm,
    onGetOne: handleGetData,
  });
  const extraFields = useRef([]);
  const [fields, setFields] = useState(fieldsCfg);
  const { onGetOne, onCreateForm, onUpdateForm, onClearForm } = handle;
  const [canRenderForm, setCanRenderForm] = useState(API.getAPI ? false : true);
  const [queryUrlList, setQueryUrlList] = useState('');
  const [_loading, setLoading] = useState(false);
  // useMemo(recordDefaultValue, [fields]);


  useDidMount(_ => {

    const urlList = getQueryUrlParam();
    recordDefaultValue();

    //getFormApi 为表单UI api
    if (API.getFormApi) {
      handleGetAddData(urlList);
    }
    if (typeof formRef === 'object') {
      formRef.current = form;
    }
  });

  useWillUnmount(_ => {
    // if (!keepData) {
    if (!keepData || MODAL) {
      onClearForm();
      clearPageData(namespace, 'formData');
    }
  });

  //获取路由并封装为json
  function getQueryUrlParam(url) {
    const searchString = location.search
    const urlList = {};
    function handleData(value) {
      const v = value.split('=')
      urlList[v[0]] = v[1]
    }

    if (searchString) {
      const sl = searchString.substring(searchString.indexOf('?') + 1, searchString.length);
      let slList;
      if (sl.indexOf('&') != -1) {
        slList = sl.split('&')
      } else {
        slList = sl
      }
      if (Array.isArray(slList)) {
        slList.map(item => handleData(item))
      } else {
        handleData(slList)
      }
    }

    if (urlList && JSON.stringify(urlList) != '{}') {
      setQueryUrlList(urlList)
      return urlList
    } else {
      console.log('获取不到路由参数')
    }
  }

  //获取添加页面配置数据
  function handleGetAddData(urlList) {
    setCanRenderForm(false);
    setLoading(true)
    const getFormApi = API.getFormApi;
    var rtValue = handleChangeApiParam(getFormApi);
    const formatApi = getFormApi.replace(`(${rtValue})`, urlList[rtValue]);

    const apiUrl = `${getEndpoint()}${formatApi}`
    const queryData = {}
    promiseAjax(apiUrl, queryData).then((response) => {
      const { code, data } = response || {};

      if (code === 200 && data) {
        const applyFormInfo = handleFormInfo(data.formInfo);
        let formData = data;
        if (typeof onGetData === 'function') {
          formData = onGetData(data);
        }

        initData.current = formData;
        const { extra, images, tags } = formData;
        setPageData(namespace, 'formData', formData);
        form.setFieldsValue({ ...initData.current });

        if (Array.isArray(images) || Array.isArray(tags)) {
          const otherField = [];

          if (Array.isArray(images)) {
            otherField.push({ lable: '', field: 'tags', type: 'tags' });
          }
          if (Array.isArray(images)) {
            otherField.push({ lable: '', field: 'images', type: 'upload-image' });
          }

          setFields([
            ...fields,
            ...otherField,
          ]);
        }
        if (extra && Array.isArray(extra.items)) {
          setExtraFields(extra.items);
        } else {
          forceUpdate();
        }

        if (applyFormInfo && applyFormInfo.length > 0) {
          setFields([
            ...applyFormInfo
          ])
        }
      }
    })
      .finally(_ => {
        setCanRenderForm(true);
        setLoading(false)
        if(API.getAPI && API.updateAPI){
          handleGetData();
        }
      })
  }

  //获取编辑数据
  function handleGetData() {
    setCanRenderForm(false);
    onGetOne({}).then((response) => {
      const { code, data } = response || {};
      // const applyFormInfo = handleFormInfo(data.formInfo);
      if (code === 200 && data) {
        let formData = data;
        if (typeof onGetData === 'function') {
          formData = onGetData(data);
        }

        initData.current = formData;
        // const { extra, images, tags } = formData;
        setPageData(namespace, 'formData', formData);
        form.setFieldsValue({ ...initData.current });

        // if (extra && Array.isArray(extra.items)) {
        //   setExtraFields(extra.items);
        // } else {
        //   forceUpdate();
        // }

        // setFields([
        //   ...applyFormInfo,
        //   ...fields
        // ])

      }
    })
      .finally(_ => {
        setCanRenderForm(true);
      })
  }

  function handleFormInfo(formInfo) {
    if (formInfo && JSON.stringify(formInfo) != '{}') {

      const items = formInfo.layoutJson[0].items;

      // const fieldList = [];

      // layoutJson.map(item => {

      //   if (typeof item.title == 'string') {
      //     const titleGroud = { "field": "_group", "type": "group-title", "defaultValue": `${item.title}` }
      //     fieldList.push(titleGroud);
      //   }

      //   if (Array.isArray(item.items) && item.items.length > 0) {
      //     item.items.map(item => {
      //       fieldList.push(item);
      //     })
      //   }
      // })
      // return fieldList;
      if(items){
        
      const newFields = items.map((item, i) => {
        extraFields.current.push(item.field);
        return {
          label: item.label,
          field: item.field,
          type: extraFieldType[item.type] || 'input'
        }
        })
      return [
        ...fields,
        ...newFields
      ]
      
      }else{
        return [];
      }

    } else {
      return [];
    }
  }

  function setExtraFields(items) {
    setFields([
      ...fields,
      ...items.map((item, i) => {
        extraFields.current.push(item.attr);
        return {
          label: item.fieldName,
          field: ['extra', 'items', String(i), 'value'],
          type: extraFieldType[item.fieldType] || 'input',
          value: ['extra', 'items', String(i), 'value'],
        }
      }),
    ]);
  }

  function recordDefaultValue() {
    fields.forEach(item => {
      const { field, value } = item;
      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
    form.setFieldsValue({ ...initData.current });
    forceUpdate();
  }

  function handleSubmitForm(values) {
    const extraSubmit = {};
    fields.forEach(field => {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    })
    let submitData = {
      ...extraSubmit,
      ...pageDataFormData,
      ...values,
    };
    delete submitData.formInfo

    handleFormatValue(submitData);

    // 修改并提交 extra 里面的数据
    // if (extraFields.current.length) {
    //   const extraData = submitData.extra.items;
    //   submitData.extra.items = pageDataFormData.extra.items;

    //   extraFields.current.forEach(field => {
    //     const index = submitData.extra.items.findIndex(item => item.attr === field);
    //     const find = submitData.extra.items[index];

    //     if (find) {
    //       find.value = extraData[index].value;
    //     }
    //   });
    // }

    // if (typeof onSubmit === 'function') {
    //   onSubmit(submitData, handleResponse);
    //   return false;
    // }

    // if (typeof onFormMap === 'function') {
    //   submitData = onFormMap(submitData, pageDataFormData);
    // }

    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData,
        options: requestOptions,
      }).then(handleResponse);
    } else {
      handleCreateData(submitData)
    }

  }

  //提交数据
  function handleCreateData(subData) {
    setLoading(true)
    const createAPI = API.createAPI;
    var rtValue = handleChangeApiParam(createAPI);
    const formatApi = createAPI.replace(`(${rtValue})`, queryUrlList[rtValue]);
    const apiUrl = `${getEndpoint()}${formatApi}`
    const queryData = subData;

    promiseAjax(apiUrl, queryData, { method: 'POST' })
      .then(resp => {
        if (resp && resp.code === 200) {
          const data = resp.data;
          if (onClose) {
            //控制modal关闭事件
            onClose(data);
          }
        } else {
          console.log('提交失败 = ', resp.message);
        }
      })
      .finally(_=>{
        setLoading(false)
      })
  }

  //
  function handleResponse(data = {}, opt = {}) {
    const { message: msg = '操作成功' } = opt;
    if (data.code === 200) {
      if (msg) {
        message.success(msg);
      }
      if (onClose) {
        onClose(data);
      }
      if (router) {
        if (path) {
          const fPath = formatAPI(path, {
            namespace,
          });
          router(fPath);
          return false;
        }
      }
      if (!MODAL && gobackOpt && goBack) {
        goBack();
      }
    } else {
      message.error(`操作失败: ${data.message}`);
    }
  }

  function handleGoBack() {
    if (path) {
      const fPath = formatAPI(path, {
        namespace,
      });
      router(fPath);
    } else {
      goBack();
    }
  }

  function handleReset() {
    form.resetFields();
    forceUpdate();
  }

  function renderFooter() {
    function onSubmit() {
      form.submit();
    }

    if (footer !== undefined || footerOpt !== undefined) {
      return footer;
    }

    const classes = MODAL ? 'ant-modal-footer' : 'ZEle-Form-footer';
    return <div className={classes}>
      <Button onClick={handleReset}>重置</Button>
      <Button type="primary" htmlType="submit" onClick={onSubmit}>保存</Button>
    </div>
  }

  //替换 api 参数值 用小括号包住， 如: /api/(id)
  function handleChangeApiParam(value) {
    var rt = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(value);
    return rt[2]
  }

  return <Spin spinning={propsLoading || loading || _loading}>
    {renderGoBack && canPortal(extraEl, <Button onClick={handleGoBack}>返回</Button>)}
    <div className={fields.length ? 'ant-modal-body' : undefined}>
      {canRenderForm ? (
        <Form
          form={form}
          layout={layoutType}
          labelCol={defaultLabelCol}
          wrapperCol={defaultWrapperCol}
          initialValues={initData.current}
          onValuesChange={onValuesChange}
          onFinish={handleSubmitForm}
        >
          <Render n={layout} {...layoutConfig}>
            {fields.map(field => getFormItem(field, model, {
              namespace,
              form,
              handle: {
                onFormatValue,
                onSaveOtherValue,
                onExpect,
              },
              hooks,
              extraData,
            }))}
          </Render>
        </Form>
      ) : <Form form={form} />}
    </div>
    {renderFooter()}
  </Spin>
}