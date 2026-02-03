import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import _ from 'lodash';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle'
import FormTools from '@/pages/dynamicPageTool/container/EditList/components/Form';
import { query, post } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { message } from 'antd';

interface FieldConfig {
  field: string;
  children?: FieldConfig[];
  type?: string;
  defaultValue?: any;
}

interface APIConfig {
  createAPI?: string;
  getAPI?: string;
  updateAPI?: string;
}

interface OptionsType {
  modalTitle?: string;
  modalWidth?: string | number;
  modalStyle?: React.CSSProperties;
  api?: APIConfig;
  fields?: FieldConfig[];
}

interface HandleType {
  onRefresh?: () => void;
}

interface HooksType {
  onSubmitActionModal?: () => void;
}

interface FromModalProps {
  title: string | React.ReactNode;
  className?: string;
  options: OptionsType;
  namespace?: string;
  handle: HandleType;
  hooks?: HooksType;
  [key: string]: any;
}

export default function FromModal(props: FromModalProps): React.ReactElement {

  const { title, className, options, namespace, handle, hooks = {}, ...restProps } = props;
  const { modalTitle, modalWidth, modalStyle = {}, api = {}, fields, ...rest } = options;
  const { createAPI = '', getAPI = '', updateAPI = '' } = api;
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const { onSubmitActionModal } = hooks;

  const { onRefresh } = handle;

  function handleOpen(): void {
    setVisible(true);
  }
  function handleClose(): void {
    setVisible(false);
  }

  const addRef = useRef<any>(null)

  function IsType(item: FieldConfig): any {
    let data;
    if (item.defaultValue !== undefined) {
      data = item.defaultValue
    } else {
      if (item.type) {
        if (item.type === "number" || item.type === "switch") {
          data = 0
        } else {
          data = ""
        }
      } else {
        data = ""
      }
    }
    return data
  }

  // 增加数据
  function addMessage(): void {
    let theData: any;
    let endpoint = getEndpoint()
    const apiUrl = `${endpoint}${createAPI}`;
    let options = {
      method: "POST"
    }
    let initData: any = {};

    if (fields) {
      fields.map((item: FieldConfig, i: number) => {
        if (item.children) {
          item.children.map((cItem: FieldConfig, ci: number) => {
            initData[cItem.field] = IsType(cItem)
          })
        } else {
          // 判断值的提交
          initData[item.field] = IsType(item)
        }
      })
    }

    theData = {
      ...initData,
      ...(addRef.current?.data || {})
    }
    setLoading(true)
    // console.log(apiUrl," === apiUrl")
    // console.log(theData," === 提交后的DATA")

    post(apiUrl, theData, options)
      .then(resp => {
        if (_.get(resp, 'status') === 200 && _.get(resp, 'data.code') === 200) {
          // const Listdata = resp.data.records;
          // console.log(resp)
          message.success("添加成功")
          setVisible(false)
          //刷新页面
          onRefresh?.();
        } else {
          message.error('添加失败')
        }
      })
      .finally(_ => {
        setLoading(false)
      })
  }

  //获取详情数据
  function getDetail(): void {

    let endpoint = getEndpoint()
    // const apiUrl = `${endpoint}${getAPI.replace('(id)', id)}`;

    // setLoading(true)
    // console.log(apiUrl," === apiUrl")
    // console.log(theData," === 提交后的DATA")

    // promiseAjax(apiUrl,theData,options)
    //   .then(resp => {
    //     if (resp && resp.code === 200) {
    //       // const Listdata = resp.data.records;
    //       // console.log(resp)
    //       message.success("添加成功")
    //       setVisible(false)
    //       //刷新页面
    //       onRefresh();
    //     } else {
    //       message.error('添加失败')
    //     }
    //   })
    //   .finally(_ => {
    //     setLoading(false)
    //   })
  }

  return <>
    <Button onClick={handleOpen} className={className}>
      {title}
    </Button>
    <Modal
      style={modalStyle}
      title={modalTitle}
      width={modalWidth}
      visible={visible}
      destroyOnClose={true}
      bodyStyle={{
        padding: 0,
        marginBottom: '20px'
      }}
      onOk={addMessage}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" style={{ marginRight: '20px' }} loading={loading} onClick={addMessage}>
          确定
        </Button>,

      ]}
    >
      {/* <ZEle
        MODAL={true}
        // namespace={`${namespace}_actionModal`}
        namespace={namespace}
        {...restProps}
        config={{
          layout: 'Empty',
          ...rest,
        }}
        onClose={handleCloseAndQuery}
        onSubmit={onSubmitActionModal ? handleSubmit : undefined}
        loading={loading}
      /> */}
      <div style={{ margin: '20px' }}>
        <FormTools
          config={fields || []}
          ref={addRef}
        ></FormTools>
      </div>
    </Modal>

  </>
}
