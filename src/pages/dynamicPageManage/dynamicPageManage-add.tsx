import React,{useRef} from 'react';
import { MainPageConfig } from '@/pages/dynamicPageTool/pageConfig';
// import useBreadcrumb from '@/framework/useBreadcrumb';
import FormTools from '@/pages/dynamicPageTool/container/EditList/components/Form';
import ShowModal from '@/pages/dynamicPageTool/container/EditList/components/showModal';
import { post } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { message } from 'antd';
import {setting} from './config/dynamicPageManage-setting'
import {history} from 'umi'
// import { AddSvg } from '@/container/EditList/svg';

/**
 * 直接更改 /pages/sys/testPageFetch目录下的pageConfig即可，新增与编辑互通
 */

interface Props {
  [key: string]: any;
}

interface FieldItem {
  field?: string;
  type?: string;
  children?: FieldItem[];
  defaultValue?: any;
}

export default function DynamicPageAdd(props: Props): React.ReactElement {
const {
}=props
// useBreadcrumb([
//     { title: '首页', path: '/' },
//     { title: '动态页面新增' },
//   ]);
  const addRef = useRef<any>(null)
  const api = setting.createAPI
  function IsType(item: FieldItem): any {
    let data;
    if(item.defaultValue){
      data = item.defaultValue
    }else{
      if(item.type){
        if(item.type==="number"||item.type==="switch"){
          data = 0
        }else{
          data = ""
        }
      }else{
        data = ""
      }
    }
    return data
  }
  // 增加数据
  function addMessage(): void {
    let theData;
    const endpoint = getEndpoint()
    const apiUrl = `${endpoint}${api}`;
    const options = {
      method:"POST"
    }
    const initData: Record<string, any> = {};
    MainPageConfig.map((item,i)=>{
      if(item.children){
        item.children.map((cItem,ci)=>{
          if (cItem.field) {
            initData[cItem.field] = IsType(cItem)
          }
        })
      }else{
        // 判断值的提交
        if (item.field) {
          initData[item.field] = IsType(item)
        }
      }
    })
    theData = {
      ...initData,
      ...addRef.current?.data
    }
    // console.log(theData,"提交后的DATA")
    post(apiUrl,theData,options)
    .then(resp => {
      if (resp && resp.code === 200) {
        // const Listdata = resp.data.records;
        // console.log(resp)
        message.success("添加成功")
        history.goBack(1)
        // setData(Listdata)
      } else {
        message.error('添加失败')
      }
    })
  }
  const onClose = () => {
    history.goBack(1)
  };
return <ShowModal title={"添加页面"}
    // icon={<AddSvg/>}
    width="100%"
    height="100%"
    initShow={true}
    onSuccess={addMessage}
    onError={onClose}
  >
    <FormTools
      config={MainPageConfig}
      ref={addRef}
    ></FormTools>
  </ShowModal>

}
