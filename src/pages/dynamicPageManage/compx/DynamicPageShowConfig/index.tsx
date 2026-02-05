/* eslint-disable no-restricted-globals */
import React, { useRef, useState } from 'react';
import { Button, Spin, Form } from 'antd';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import useFormHandle from 'zero-element-antd/lib/container/Form/utils/useFormHandle';
import { useDidMount, useForceUpdate, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle'
import { query as queryMethod, update, post } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { message as msg, Drawer } from 'antd';
import copyTOClipboard from 'copy-text-to-clipboard';

interface APIConfig {
  getAPI?: string;
}

interface QueryConfig {
  id: string;
}

interface Config {
  API: APIConfig;
  toConfigAPI?: string;
  message?: string;
  query?: QueryConfig;
}

interface Props {
  MODAL?: boolean;
  config: Config;
  options?: any;
  namespace?: string;
  extraData?: Record<string, any>;
  hooks?: Record<string, any>;
  onClose?: () => void;
  forceInitForm?: boolean;
  keepData?: boolean;
}

export default (props: Props): React.ReactElement => {

  const {
    MODAL, config,
    options, namespace,
    extraData = {},
    hooks = {},
    onClose,
    forceInitForm,
    keepData=false
  } = props;

  const {
    API:{
      getAPI='',
    },
    toConfigAPI='/toconfig',
    message = '操作成功',
    query = {
      id: 'id'
    }
  } = config;

  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    extraData,
    config,
  });

  const { data, model, handle } = formProps;
  const { onGetOne, onCreateForm, onUpdateForm, onClearForm } = handle;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const [pageConfigData, setPageConfigData] = useState<string>('');

  useDidMount(() => {
    if (getAPI) {
      handleGetData()
    }
  });

  useWillUnmount(() => {
    // if (!keepData) {
  });

  const {
    onFormatValue,
    handleFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect,
  } = useFormHandle({
    namespace,
    config,
    forceInitForm,
    onGetOne: handleGetData,
  });


  //获取数据
  function handleGetData(): void {

    setLoading(true);
    onGetOne({}).then((response) => {
      const { code, data } = response || {};
      if (code === 200 && data) {
        getPageConfigData(data)
      }
    })
      .finally(() => {
        setLoading(false);
      })
  }

  function getPageConfigData(jsonData: any): void {
    console.log(' endpoint = ', getEndpoint())
    const apiUrl = `${getEndpoint()}${toConfigAPI}`; //转换地址
    const options = {
      method: "post"
    }
    post(apiUrl, jsonData, options)
      .then(resp => {
        // console.log(value,"VALUE")
        const restData = resp.data
        if (restData.code === 200) {
          const data = JSON.stringify(restData.data);
          setPageConfigData(data)
          console.log(' 页面配置信息 = ', data)
        } else {
          msg.error('获取页面配置信息失败')
        }
      })
      .catch(value => {

      })
  }

  function handleCancel(): void {
    if(onClose){
      //关闭modal方法
      onClose()
    }
    // forceUpdate();
  }

  function copyJson(): void {
    if(pageConfigData){
      copyTOClipboard(pageConfigData)
      msg.info('复制成功');
    }else{
      msg.info('复制内容不存在')
    }
  }

    //保存按钮点击事件
    function renderFooter(): React.ReactElement {

      // const classes = MODAL ? 'ant-modal-footer' : 'ZEle-Form-footer';
      return <div className={'ant-modal-footer'}>
        <Button onClick={copyJson}>复制</Button>
        <Button type="primary" htmlType="submit" onClick={handleCancel}>确定</Button>
      </div>
    }

  return <>
  <Spin spinning={loading === true}>
    <div style={{ margin: '20px'}}>
          <div style={{ whiteSpace: 'pre-wrap'}}>{pageConfigData}</div>
          { renderFooter() }
      </div>
  </Spin>

  </>
}
