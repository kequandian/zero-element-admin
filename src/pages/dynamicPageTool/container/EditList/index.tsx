import React, { useState, useRef } from 'react';
import { Drawer, Button, message, Empty, Spin, Tooltip, Popconfirm } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle'
import './public/index.less'
import { query as queryMethod, post, update, remove } from 'zero-element/lib/utils/request';
import { AddSvg, DeleteSvg, Edit } from './svg'
import ShowModal from './components/showModal';
import ShowAddModal from './components/showAddModal';
import OneMany from './components/oneMany';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import _ from 'lodash'
import {
  fieldModelConfig
} from './config/pageConfig'
import FormTools from './components/Form';

import handleFormData from './utils/cleanFormRateData'

import styles from './index.less';

// Remove umi imports
// import { withRouter, history } from 'umi';

interface FieldConfig {
  label?: string;
  field: string;
  type?: string;
  children?: FieldConfig[];
  defaultValue?: any;
}

interface ConfigType {
  api?: string;
  ModelConfig?: FieldConfig[];
  title?: string;
  field?: string;
  PageId?: string;
  projectId?: string;
  name?: string;
  NoModal?: boolean;
  showAdd?: boolean;
  showDelete?: boolean;
  svg?: React.ReactElement;
  cb?: (refresh: boolean) => void;
  query?: Record<string, any>;
}

interface EditListProps {
  config: ConfigType;
  namespace?: string;
  // Add location prop if using withRouter alternative
  location?: {
    query: Record<string, string>;
  };
  history?: any;
  match?: any;
}

function EditList(props: EditListProps): React.ReactElement {
  const { config, namespace } = props
  const {
    api = "/api/crud/fields/fieldses",
    ModelConfig = fieldModelConfig,
    title,
    field,
    PageId = "",
    projectId = "",
    name = "",
    NoModal = false,
    showAdd = true,
    showDelete = true,
    svg = <Edit />,
    cb,
    query = {}
  } = config;
  // message.loading("开始加载")
  const addRef = useRef<any>(null)


  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[] | null>(null)
  const [itemId, setItemId] = useState<string | null>(null)

  const showDrawer = (): void => {
    setVisible(true);
  };
  const onClose = (): void => {
    setVisible(false);
    if (cb) {
      cb(true)
    }
  };

  // 获取id
  // const [id,setId] = useState(0)
  // let PageId;
  // const getParams = () =>{
  //   var array = window.location.href.split("?");
  //   if ((parseInt(array.length) - parseInt(1)) > 0) {
  //        var array1 = array[1].split("&");
  //        if (array1.length > 0) {
  //           //  console.log(array1)
  //            for(var i in array1){
  //              console.log(array1[i])
  //              if(array1[i].indexOf("id=")!==-1){
  //              console.log(array1[i].split("id=")[1])
  //              PageId = array1[i].split("id=")[1]
  //              }
  //            }
  //        }
  //    }
  // }

  // getParams()

  useDidMount(_ => {
    getListData()
  });

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

  //获取列表数据
  function getListData(): void {
    setLoading(true)
    let endpoint = getEndpoint()
    let apiUrl = ""
    let queryData: Record<string, any> = {}
    if (PageId) {
      queryData = {
        pageId: PageId,
        ...query
      };
    }

    // console.log(PageId, "PAGEID")
    if (PageId !== "") {
      apiUrl = `${endpoint}${api}`;
    } else {
      apiUrl = `${endpoint}${api}/${projectId}`
    }

    queryMethod(apiUrl, queryData)
      .then(resp => {
        const restData = resp.data
        if (restData && restData.code === 200) {
          const Listdata = restData.data;
          // message.success("加载成功")
          if (PageId !== "") {
            setData(Listdata.records)
          } else {
            setData(Listdata)
          }
        } else {
          message.error('获取页面配置信息失败')
        }
      }).catch(err => {
        message.error('获取页面配置信息失败 == ', err)
      }).finally(_ => {
        setLoading(false)
        // getListData()
      })
  }

  // 增加数据
  function addMessage(): void {
    setLoading(true)
    let theData: any;
    let endpoint = getEndpoint()
    const apiUrl = `${endpoint}${api}`;
    let options = {
      method: "POST"
    }
    let initData: any = {};
    ModelConfig.map((item: FieldConfig, i: number) => {
      if (item.children) {
        item.children.map((cItem: FieldConfig, ci: number) => {
          initData[cItem.field] = IsType(cItem)
        })
      } else {
        // 判断值的提交
        initData[item.field] = IsType(item)
      }
    })
    theData = {
      ...initData,
      ...(addRef.current?.data || {}),
      "pageId": PageId
    }

    //处理冗余数据
    theData = handleFormData(theData)

    // console.log(theData,"提交后的DATA")
    post(apiUrl, theData, options)
      .then(resp => {

        const restData = resp.data
        if (restData && restData.code === 200) {
          // const Listdata = resp.data.records;
          // console.log(resp)
          message.success("添加成功")
          // setVisible(false);
          // if(cb){
          //   cb(true)
          // }
          // setData(Listdata)
        } else {
          message.error('添加失败')
        }
      }).finally(_ => {
        setLoading(false)
        getListData()
      })
  }

  // 删除
  function handleDelete(id: string): void {
    message.loading("开始删除")
    setLoading(true)
    let endpoint = getEndpoint()
    console.log(id)
    const apiUrl = `${endpoint}${api}/${id}`;
    let options = {
      method: "DELETE"
    }
    let PutData: any;
    for (var i = 0; i < (data as any[]).length; i++) {
      // console.log("I",i)
      if ((data as any[])[i].id === id) {
        // console.log(data[i])
        PutData = (data as any[])[i]
      }
    }
    remove(apiUrl, PutData, options)
      .then(resp => {
        const restData = resp.data
        if (restData && restData.code === 200) {
          // const Listdata = resp.data.records;
          // console.log(resp)
          message.success("删除成功")
          setTimeout(() => {
            // setVisible(false);
            // if(cb){
            //   cb(true)
            // }
          }, 500)
          // setData(Listdata)
        } else {
          message.error('删除失败')
        }
      }).finally(_ => {
        setLoading(false)
        getListData()
      })
  }

  // 提交更改
  function handleSuccess(id: string): void {
    setLoading(true)
    let endpoint = getEndpoint()
    let apiUrl = `${endpoint}${api}/${id}`;

    let options = {
      method: "PUT"
    }
    let PutData: any;
    if (PageId) {
      for (var i in data) {
        console.log(_.get((data as any[])[i], "pageId"), PageId, "ID")
        if (_.get((data as any[])[i], "id") == id) {
          PutData = (data as any[])[i]
          apiUrl = `${endpoint}${api}/${id}`;
          // console.log(PutData)
        }
      }
    } else {
      PutData = data
    }

    //formViewType不为one-mary时, 清空对应配置数据
    // if(PutData.formViewType != 'one-mary'){
    //   PutData.fieldViewOneManyOptions = ''
    // }

    //处理冗余数据
    PutData = handleFormData(PutData)

    update(apiUrl, PutData)
      .then(resp => {
        const restData = resp.data
        if (restData && restData.code === 200) {
          // const Listdata = resp.data.records;
          // console.log(resp)
          message.success("更改成功")
          // setVisible(false);
          // if(cb){
          //   cb(true)
          // }
          // history.go(0)
          // setData(Listdata)
        } else {
          message.error('更改失败')
        }
      })
      .finally(_ => {
        setLoading(false)
        getListData()
      })
  }

  return <div className="Drawer-edit-box">
    <Tooltip title={name} placement="bottom">
      <Button onClick={showDrawer} className="edit-box" icon={svg}>
      </Button>
    </Tooltip>
    <Drawer
      title={name}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width="300"
      bodyStyle={{ paddingTop: '0px', overflowY: 'scroll', maxHeight: '600px' }}
      footer={showAdd && data ? [
        <ShowAddModal title={"添加" + name}
          icon={<AddSvg />}
          onSuccess={addMessage}
          key="show_add_modal"
        >
          <FormTools
            config={ModelConfig}
            ref={addRef}
          // unUseDefaultValue={true}//新增时候需要使用默认值
          ></FormTools>
        </ShowAddModal>
      ] : null}
    >

      {data ? Array.isArray(data) ? (
        <Spin spinning={loading}>
          {data.map((item: any, i: number) => (
            <div className={styles.listItem} key={`list_key_${i}`}>
              <ShowModal title={_.get(item, title) || "组件无名称"}
                titleLabel={title}
                field={_.get(item, field) || "空"}
                fieldLabel={field}
                type="card"
                onSuccess={() => handleSuccess(item.id)}
                key={i}
              >
                <FormTools
                  formData={item}
                  config={ModelConfig}
                  unUseDefaultValue={true}
                />
              </ShowModal>
              {showDelete ? (
                <Popconfirm
                  title={`确定要删除${_.get(item, title)}?`}
                  onConfirm={() => handleDelete(item.id)}
                  onCancel={() => { }}
                  okText="是"
                  cancelText="否"
                >
                  <div className={[styles.delGroup]}>
                    <DeleteSvg />
                    删除
                  </div>
                </Popconfirm>
              ) : null}
            </div>
          ))}
        </Spin>
      ) : NoModal ? <>
        <FormTools
          formData={data}
          config={ModelConfig}
          unUseDefaultValue={true}
        ></FormTools>
        <div className="EditList_ButtonGroup">
          <Button type="primary" style={{ "float": "right" }} onClick={() => handleSuccess(projectId as string)}>提交</Button>
          <Button style={{ "float": "right", marginRight: "5px" }} onClick={() => onClose()}>取消</Button>
        </div>

      </> : <div><>
          <ShowModal title={_.get(data, title) || "组件无名称"}
            titleLabel={title}
            field={_.get(data, field) || "空"}
            fieldLabel={field}
            type="card"
            onSuccess={() => handleSuccess(projectId as string)}
          >
            <FormTools
              formData={data}
              config={ModelConfig}
              unUseDefaultValue={true}
            ></FormTools>
          </ShowModal>
          {showDelete ? <div style={{ cursor: "pointer", fontWeight: "bolder", position: "relative", height: "50px", lineHeight: "50px", float: "right", top: "-50px", right: "20px" }} onClick={() => handleDelete(PageId)}><DeleteSvg />删除</div> : null}
        </>


      </div> : <Spin spinning={loading}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Spin>
      }

      {/* {showAdd && data ? <ShowModal title={"添加" + name}
        icon={<AddSvg />}
        onSuccess={addMessage}
      >
        <FormTools
          config={ModelConfig}
          ref={addRef}
        // unUseDefaultValue={true}//新增时候需要使用默认值
        ></FormTools>
      </ShowModal> : null} */}
    </Drawer>
  </div>
}

// Remove withRouter HOC as it's umi-specific
// export default withRouter(EditList);
export default EditList;
