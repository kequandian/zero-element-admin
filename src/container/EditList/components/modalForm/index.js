import React, { useContext, useEffect, useState } from 'react';
import { message as msg } from 'antd';
import qs from 'qs';
import { query, post, update, remove, download } from 'zero-element/lib/utils/request';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import TableForm from './tableForm';
import './index.less'

const methodMap = {
    'get': query,
    'post': post,
    'put': update,
    'delete': remove
  };

function getFieldList(pageId){

}

// Index
export default function Index(props) {

    const { field, type, cbChange } = props;
    const { id } = qs.parse(location.search.replace('?', ''));
    const getFieldApi = `/api/pageconfig/lowMainPage/lowMainPages/${id}`;
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState([]);
    
    const endpoint = getEndpoint();
    
    useEffect(_=>{
        const match = methodMap['get'];
        match(endpoint+getFieldApi, {}).then(rsp => {
            const rspData = rsp.data
            if(rspData){
                if(rspData.code == 200){
                    const list = rspData.data.lowFieldss
                    const ls = []
                    list.map(item => {
                        const fieldItem = {}
                        fieldItem.label = item.fieldBinding
                        fieldItem.value = item.fieldBinding
                        ls.push(fieldItem)
                    })
                    setFields(ls)
                }else{
                    msg.error(rspData.message)
                }
            }
          }).catch(_ => {
            msg.error(JSON.stringify(_))
          }); // 
    },[])

    const callback = (data) => {
        let newData = []
        data && data.length > 0 && data.map(item =>{
            delete item.key
            newData.push(item)
        })
        cbChange(field, newData)
    }

    return (
        <TableForm fields={fields} {...props} cb={callback} />
    );
};