/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { message, Select, Spin } from 'antd';
import qs from 'qs';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { query } from 'zero-element/lib/utils/request';

const { Option } = Select;

interface OptionType {
  [key: string]: string;
}

interface FetchSelectProps {
  formData?: any;
  options: {
    API: string;
    dataField?: string;
    label?: string;
    value?: string;
  };
  onChange?: (data: any) => void;
  field?: string;
  cb?: (data: any) => void;
}

/**
 * FetchSelect component that fetches data from an API and displays it in a Select dropdown
 * @param props - Component props
 */
export default function FetchSelect(props: FetchSelectProps): React.ReactElement {

  const { formData, options, onChange, field, cb } = props

  const {
    API,
    dataField = 'records',
    label: optLabel = 'label',
    value: optValue = 'value',
  } = options;

  const [defaultValue, setDefaultValue] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<OptionType[]>([]);

  // const searchList = location.search.split('=');
  const searchList = location.href.split('?');
  const id = searchList && searchList[1] ? qs.parse(searchList[1]).id as string : '';
  console.log('id == ', id)

  useEffect(_ => {
    if (id && API) {
      getData(id)
    } else {
      console.error('获取id失败')
    }
  }, [id, API])

  useEffect(_ => {

    if (formData) {
      setDefaultValue(formData[field])
    }
  }, [formData, field])

  const getData = (id: string): void => {
    const url = API.replace('(id)', id)
    setLoading(true)
    query(`${getEndpoint()}${url}`)
      .then(resp => {
        const rData = resp.data
        if (rData && rData.code === 200) {
          const respData = formatListData((rData.data[dataField as keyof typeof rData.data] || []) as any[])
          setListData(respData)
        } else {
          // message.error('获取失败')
          console.log('获取下拉框数据失败')
        }
      })
      .finally(_ => {
        setLoading(false)
      })
  }

  //处理成 Select组件适配的数据
  function formatListData(list: any[]): OptionType[] {
    const formatData: OptionType[] = []
    if (list && JSON.stringify(list) != '[]') {
      list.map(item => {
        const formatItem: OptionType = {}
        formatItem[optLabel] = item[optValue]
        formatData.push(formatItem)
      })
    }
    return formatData
  }

  //回调数据
  function handleChange(data: string[]): void {
    let nData: string | OptionType = ''
    if (data.length > 0) {
      nData = data[data.length - 1]
      setDefaultValue(nData)
    } else {
      setDefaultValue(nData)
    }
    if (cb) {
      const value: any = {}
      value[field] = nData ? nData : ''
      cb(value)
    }
  }

  return <Spin spinning={loading}>
    <Select mode='tags' maxTagCount={1} placeholder='请选择' style={{ width: '100%' }} value={defaultValue} onChange={handleChange}>

      {
        listData && listData.map((item: OptionType, index: number) => (
          <Option key={`${item[optLabel]}_selectitem`} value={item[optLabel]}>
            {item[optLabel]}
          </Option>
        ))
      }
    </Select>
  </Spin>
}
