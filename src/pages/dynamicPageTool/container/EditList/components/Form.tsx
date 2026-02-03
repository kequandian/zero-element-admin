import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react"
import { Input, Select, Switch, InputNumber, Checkbox, Collapse, Button, Tabs, message, Modal, Popover, Tooltip } from 'antd'
import { QuestionOutlined } from '@ant-design/icons';
import { useDidMount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle'
import { query, post, update, remove } from 'zero-element/lib/utils/request';
import _ from 'lodash'
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
// Remove problematic JSON import
// import TheJson from '@/../zero-antd-dep/formItemType/JSON'
// Remove umi history import
// import { history } from 'umi'
import ArrayComponent from './Array/index'
import ColorSelect from "./ColorSelect";
import FontSelect from "./FontSelect";
import FetchSelect from "./fetchSelect";

import { TipsIconSvg } from './public/svg';

interface FieldConfig {
  label?: string;
  field: string;
  type?: string;
  mode?: string;
  options?: any[] | string;
  toolTips?: any;
  header?: string;
  children?: FieldConfig[];
  defaultValue?: any;
  placeholder?: string;
  addonAfter?: string;
  expect?: {
    field: string;
    value: string;
  };
  items?: FieldConfig[];
}

interface FormRef {
  data: Record<string, any>;
}

interface FormToolsProps {
  formData?: Record<string, any>;
  config?: FieldConfig[];
  unUseDefaultValue?: boolean;
}

const FormTools = forwardRef<FormRef, FormToolsProps>((props, ref) => {

  const {
    formData,
    config,
    unUseDefaultValue = false //是否使用默认值
  } = props

  const CheckboxGroup = Checkbox.Group
  const { Panel } = Collapse;
  const [data, setData] = useState<Record<string, any>>({ type: 'path' })
  const [modalVisable, setModalVisable] = useState<boolean>(false)
  const [actionModalData, setActionModalData] = useState<any[]>([])
  const [theModalData, setTheModalData] = useState<any[]>([])
  const forceUpdate = useForceUpdate();

  let endpoint = getEndpoint()
  let ModalUrl = "/api/crud/modalItemBasicO/modalItemBasicOs"
  let actionModalUrl = "/api/crud/modalItemBasic/modalItemBasics"
  const [modalData, setModalData] = useState<any[]>()

  useDidMount(_ => {

    let modalId = getDefaultData("id")

    if (!modalId) {
      return
    }
    // console.log(modalId);
    let queryData = {
      modalId: modalId
    }
    let options = {
      method: "GET"
    }
    query(endpoint + actionModalUrl, queryData, options)
      .then(resp => {
        setActionModalData(resp.data.records)
      })
    query(endpoint + ModalUrl, queryData, options)
      .then(resp => {
        setModalData(resp.data.records)
      })
  })

  //回调参数
  useImperativeHandle(ref,
    () => {
      return {
        data
      }
    })

  useEffect(_ => {
    //
    if (formData) {
      setData(formData)
    }

  }, [formData])


  function getFormData(field: string): any {
    return _.get(formData, field, "")

  }

  function getDefaultData(field: string, defaultValue?: any, isAdd?: boolean): any {
    let defaultData;
    let dData = getFormData(field)
    if (dData) {
      defaultData = dData
    } else if (!unUseDefaultValue || isAdd) {
      defaultData = defaultValue
    }
    return defaultData
  }

  function getSwitchData(field: string, defaultValue?: any): boolean {
    let sData = getFormData(field)
    let value: boolean;
    if (sData === "1" || sData === 1 || sData === true) {
      value = true
    } else if (!unUseDefaultValue) {
      value = defaultValue
    } else {
      value = false
    }
    return value
  }

  function ChangeValue(field: string, e: React.ChangeEvent<HTMLInputElement>): void {
    let newVData = { ...data }
    newVData[field] = e.target.value
    setData(newVData)
    //forceUpdate()
  }

  function childChangeValue(field: string, e: React.ChangeEvent<HTMLInputElement>, defaultValue?: any): void {
    if (defaultValue) {
      setTheModalData(defaultValue)
    }
    let childData = [...theModalData];
    childData[field] = e.target.value
    setTheModalData(childData)
  }

  function ActionChangeValue(field: string, e: React.ChangeEvent<HTMLInputElement>, defaultValue?: any): void {
    if (defaultValue) {
      setActionModalData(defaultValue)
    }
    let childData = [...actionModalData];
    childData[field] = e.target.value
    setActionModalData(childData)
  }

  function defaultChange(field: string, e: any): void {
    let newCData = { ...data }
    newCData[field] = e
    setData(newCData)
    // forceUpdate()
  }

  function switchChange(field: string, e: boolean): void {
    let newSData = { ...data }
    newSData[field] = e ? 1 : 0
    setData(newSData)
    // forceUpdate()
  }

  function JsonChange(field: string, e: any): void {
    let newJData = { ...data }
    newJData[field] = JSON.stringify(e)
    setData(newJData)
    // forceUpdate()
  }

  function GetJsonValue(field: string): any {
    let jData = getFormData(field)
    let json: any
    if (jData && jData.indexOf("{") !== -1) {

      json = JSON.parse(jData)
    } else {
      json = {}
    }
    return json
  }

  function handleSelect(field: string, e: string): void {
    let newSeData = { ...data }
    newSeData[field] = e.toString()
    setData(newSeData)
    forceUpdate()
  }

  function getSelectData(field: string, defaultValue?: any): any {
    let SelectData
    let theForm = getFormData(field)
    if (theForm) {
      let newData = theForm.toString()
      if (newData.indexOf('[') != -1) {
        let newValue = newData.replace(/\[/g, "")
        let thenValue = newValue.replace(/\]/g, "")
        let allValue = thenValue.replace(/"/g, "")
        let json = allValue.split(',')
        SelectData = json
      } else {
        SelectData = theForm
      }
    } else if (!unUseDefaultValue) {
      SelectData = defaultValue
    }
    return SelectData
  }


  // 选择项
  const selectEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    return <>{item.mode === "multiple" ? (
      <CheckboxGroup
        defaultValue={getSelectData(item.field, item.defaultValue)}
        style={{ width: "100%" }}
        options={item.options as any[]}
        onChange={(e) => handleSelect(item.field, e as any)}
        key={`${i}_checkbox`}
      ></CheckboxGroup>
    )
      : (
        <Select
          defaultValue={data && data[item.field] ? data[item.field] : getSelectData(item.field, item.defaultValue)}
          value={data && data[item.field] ? data[item.field] : getSelectData(item.field, item.defaultValue)}
          style={{ width: "100%" }}
          options={item.options as any[]}
          placeholder='请选择'
          onChange={(e) => handleSelect(item.field, e as string)}
          key={`${i}_select`}
        />
      )
    </>
  }

  //通过API获取数据下拉框
  function fetchSelectFunc(item: FieldConfig, i: number): React.ReactElement {
    // console.log(' item === ', item)
    const callback = (field: string, v: any) => {
      defaultChange(field, v[field])
    }
    return <FetchSelect cb={(v) => callback(item.field, v)} formData={formData} {...item} key={`${i}_fetchselect`} />
  }

  //json项
  const jsonEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    // Using a placeholder instead of the imported TheJson component
    return <Input.TextArea
      value={GetJsonValue(item.field)}
      onChange={(e) => JsonChange(item.field, e.target.value)}
      key={i}
      placeholder="JSON configuration"
    />
  }

  // switch项
  const switchEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    return <Switch defaultChecked={getSwitchData(item.field, item.defaultValue)}
      onChange={(e) => switchChange(item.field, e)}
      key={`${i}_switch`}
    />
  }

  // 默认input
  const inputEndpoint = (item: FieldConfig, i: number): React.ReactElement => {

    return <Input
      defaultValue={data && data[item.field] ? data[item.field] : getSelectData(item.field, item.defaultValue)}
      placeholder={item.placeholder || "请输入" + item.label}
      addonAfter={item.addonAfter}
      onChange={(e) => ChangeValue(item.field, e)}
      key={getDefaultData(item.field, item.defaultValue)}
      size="middle"
    />
  }

  const numberEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    return <InputNumber
      addonAfter={item.addonAfter}
      defaultValue={getDefaultData(item.field, item.defaultValue)}
      placeholder={item.placeholder || "请输入" + item.label}
      onChange={(e) => defaultChange(item.field, e)}
      key={i}
      size="middle"
    />
  }

  function getData(value: any, field: string): any {
    return _.get(value, field, "")
  }

  function getItemDefault(item: any, field: string, defaultValue?: any): any {
    let defaultData;
    let dData = getData(item, field)
    // console.log(item,"ITEM")
    if (dData) {
      defaultData = dData
    } else if (!unUseDefaultValue) {
      defaultData = defaultValue
      setTheModalData(defaultValue)
      setActionModalData(defaultValue)
    }
    return defaultData
  }

  //修改
  function putModalData(url: string, modalId: string, defaultData: any, submitData: any): void {
    let newdata = {
      ...defaultData,
      ...submitData,
      modalId: modalId
    }
    let options = {
      method: "PUT"
    }

    update(`${url}/${defaultData.id}`, newdata, options)
      .then(resp => {
        if (resp.code === 200) {
          message.success("更改成功")
        } else {
          message.success("更改失败")
        }
        // history.go(0)
        // Alternative: use window.location.reload()
        window.location.reload()
      })
  }

  //新增
  function addModalData(url: string, modalId: string, submitData: any): void {
    setModalVisable(false)
    let newdata = {
      ...submitData,
      modalId: modalId
    }
    let options = {
      method: "POST"
    }
    post(url, newdata, options)
      .then(resp => {
        if (resp.code === 200) {
          message.success("增加成功")
        } else {
          message.success("增加失败")
        }
        // history.go(0)
        // Alternative: use window.location.reload()
        window.location.reload()
      })
  }

  function cancel(): void {
    setModalVisable(false)
  }

  //删除
  function deleteModal(url: string, id: string): void {
    let newurl = url + "/" + id
    let options = {
      method: "delete"
    }
    remove(newurl, {}, options)
      .then(resp => {
        if (resp.code === 200) {
          message.success("删除成功")
        } else {
          message.error("删除失败")
        }
        // history.go(0)
        // Alternative: use window.location.reload()
        window.location.reload()
      })
  }

  function showModal(e: any, url: string): void {
    if (typeof e === "string") {
      if (e.indexOf("layout") !== -1) {
        let id = e.replace(/layout/, "")
        console.log(id)
        deleteModal(url, id)
      }
    } else {
      setModalVisable(true)
    }
  }

  const { TabPane } = Tabs

  const ModalEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    return <>
      <Tabs style={{ "padding": "10px" }} type="editable-card" onEdit={(e) => showModal(e, endpoint + ModalUrl)}>{modalData ? modalData.map((mdata: any, m: number) => <TabPane tab={`布局${m + 1}`} key={`layout${mdata.id}`}>{item.items?.map((newItem: FieldConfig, It: number) => <>{newItem.label ? <div key={It}>{newItem.label}：</div> : null}
        <Input
          defaultValue={getItemDefault(mdata, newItem.field, newItem.defaultValue)}
          placeholder={newItem.placeholder || "请输入" + (newItem.label || "...")}
          addonAfter={newItem.addonAfter}
          onChange={(e) => childChangeValue(newItem.field, e, mdata)}
          key={getItemDefault(modalData, newItem.field, newItem.defaultValue)}
          size="middle"
        >
        </Input></>)}<Button style={{ float: "right", marginTop: "20px" }} type="primary" onClick={() => putModalData(endpoint + ModalUrl, getDefaultData("id"), mdata, theModalData)}>更改</Button></TabPane>) : <></>}</Tabs>
      <Modal
        title={"新增配置"} visible={modalVisable} onCancel={cancel} onOk={() => addModalData(endpoint + ModalUrl, getDefaultData("id"), theModalData)}
      >
        {item.items?.map((newItem: FieldConfig, It: number) => <>{newItem.label ? <div key={It}>{newItem.label}：</div> : null}<Input
          defaultValue={getDefaultData(newItem.field, newItem.defaultValue, true)}
          placeholder={newItem.placeholder || "请输入" + (newItem.label || "...")}
          addonAfter={newItem.addonAfter}
          onChange={(e) => childChangeValue(newItem.field, e)}
          key={getDefaultData(newItem.field, newItem.defaultValue, true)}
          size="middle"
        >
        </Input></>)}
      </Modal>
    </>
  }

  const ActionModalEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    return <>
      <Tabs style={{ "padding": "10px" }} type="editable-card" onEdit={(e) => showModal(e, endpoint + actionModalUrl)}>{actionModalData ? actionModalData.map((mdata: any, m: number) => <TabPane tab={`布局${m + 1}`} key={`layout${mdata.id}`}>{item.items?.map((newItem: FieldConfig, It: number) => <>{newItem.label ? <div key={It}>{newItem.label}：</div> : null}<Input
        defaultValue={getItemDefault(mdata, newItem.field, newItem.defaultValue)}
        placeholder={newItem.placeholder || "请输入" + (newItem.label || "...")}
        addonAfter={newItem.addonAfter}
        onChange={(e) => ActionChangeValue(newItem.field, e, mdata)}
        key={getItemDefault(actionModalData, newItem.field, newItem.defaultValue)}
        size="middle"
      >
      </Input></>)}<Button style={{ float: "right", marginTop: "20px" }} type="primary" onClick={() => putModalData(endpoint + actionModalUrl, getDefaultData("id"), mdata, actionModalData)}>更改</Button></TabPane>) : <></>}</Tabs>
      <Modal
        title={"新增配置"} visible={modalVisable} onCancel={cancel} onOk={() => addModalData(endpoint + actionModalUrl, getDefaultData("id"), actionModalData)}
      >
        {item.items?.map((newItem: FieldConfig, It: number) => <>{newItem.label ? <div key={It}>{newItem.label}：</div> : null}<Input
          defaultValue={getDefaultData(newItem.field, newItem.defaultValue, true)}
          placeholder={newItem.placeholder || "请输入" + (newItem.label || "...")}
          addonAfter={newItem.addonAfter}
          onChange={(e) => ActionChangeValue(newItem.field, e)}
          key={getDefaultData(newItem.field, newItem.defaultValue, true)}
          size="middle"
        >
        </Input></>)}
      </Modal>
    </>
  }

  function Thetest(e: any): void {
    console.log(e, "Array")
  }

  const ArrayEndpoint = (item: FieldConfig, i: number): React.ReactElement => {
    return <><ArrayComponent onChange={(e) => Thetest(e)}></ArrayComponent></>
  }

  //跳转至表单实例页面
  function gotoComponentsExample(pathUrl: string): void {
    if (pathUrl) {
      let path = `${endpoint || window.location.origin}${pathUrl}`
      const w = window.open('about:blank');
      if (w) {
        w.location.href = path
      }
    }
  }

  //表单项提示
  function handleFormItemTips(data: any): React.ReactElement {
    if (data) {
      if (data.type === 'link') {
        return <a href="#" onClick={() => gotoComponentsExample(data.path)} title={data.tipsValue} ><TipsIconSvg color={"#1890ff"} /></a>
      }
      if (data.type === 'one-mary') {
        function gotoOneMaryDocx(): void {
          let path = `https://github.com/kequandian/zero-element-admin/blob/main/resource/docs/%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E4%B8%80%E5%AF%B9%E5%A4%9A%E6%98%BE%E7%A4%BA.md`
          const w = window.open('about:blank');
          if (w) {
            w.location.href = path
          }
        }
        return <a href="#" onClick={() => gotoOneMaryDocx()} title={data.tipsValue} ><TipsIconSvg color={"#1890ff"} /></a>
      }
      if (data.type === 'toolTip') {
        return (
          <Tooltip placement="rightTop" title={data.tipsValue}>
            <a href="#" ><TipsIconSvg color={"#1890ff"} /></a>
          </Tooltip>
        )
      }
    }
    return <></>
  }

  //渲染表单项
  const AllFormType = (item: FieldConfig, i: number): React.ReactElement | null => {

    // expect 为是否显示组件判断
    const { expect = {} } = item;
    if (JSON.stringify(expect) !== '{}') {
      const { field: expectField, value: expectValue } = expect;
      if (data[expectField] !== expectValue) {
        return null
      }
    }

    return (
      <div className="dynamic_column" key={`${i}`}>
        {
          item.label ? (
            <div key={i}>{item.label}： {handleFormItemTips(item.toolTips)}</div>
          ) : null
        }
        {
          item.type === "JSON" ? jsonEndpoint(item, i) :
            item.type === "select" ? selectEndpoint(item, i) :
              item.type === "switch" ? switchEndpoint(item, i) :
                item.type === "number" ? numberEndpoint(item, i) :
                  item.type === "Modal" ? ModalEndpoint(item, i) :
                    item.type === "fetchSelect" ? fetchSelectFunc(item, i) :
                      item.type === "ActionModal" ? ActionModalEndpoint(item, i) :
                        item.type === "Array" ? ArrayEndpoint(item, i) :
                          item.type === "color" ? (
                            <ColorSelect
                              options={item.options as any[]}
                              value={getDefaultData(item.field, item.defaultValue)}
                              onChange={(e) => ChangeValue(item.field, e as any)} />
                          ) : (
                            item.type === "text" ? (
                              <FontSelect
                                options={item.options as any[]}
                                value={getDefaultData(item.field, item.defaultValue)}
                                onChange={(e) => ChangeValue(item.field, e as any)} />
                            ) : (inputEndpoint(item, i))
                          )
        }
      </div>
    )
  }


  return <>
    {
      config && config.map((item, i) =>
        item.children ? <Collapse key={`${i}_collapse`}>
          <Panel header={item.header}>
            {item.children.map((child, a) => AllFormType(child, a))}
          </Panel>
        </Collapse> : AllFormType(item, i))
    }
  </>
})

export default FormTools;
