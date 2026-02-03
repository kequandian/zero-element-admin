import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import FormTool from './Form'
import { Tabs } from 'antd'
import _ from 'lodash'

const { TabPane } = Tabs;

interface FieldConfig {
  label?: string;
  field: string;
  type?: string;
  children?: FieldConfig[];
  defaultValue?: any;
}

interface OneManyProps {
  formData?: any;
  config?: FieldConfig[];
  unUseDefaultValue?: boolean;
}

interface OneManyRef {
  data: any;
}

function OneManyComponent(props: OneManyProps, ref: React.Ref<OneManyRef>): React.ReactElement {
  const {
    formData,
    config,
    unUseDefaultValue
  } = props
  const InputRef = useRef<any>(null)

  function getFormData(field: string): any {
    return _.get(formData, field)
  }

  function callback(key: string): void {
    console.log(formData);
  }

  useImperativeHandle(ref,
    () => {
      return {
        data: InputRef.current?.data
      }
    })

  return <>
    <Tabs defaultActiveKey="1" onChange={callback} type="editable-card">
      {typeof formData === "object" ? (formData as any[]).map((item: any, i: number) => <>
        <TabPane tab={"布局" + (i + 1)} key={i}>
          <FormTool
            formData={item}
            key={i}
            ref={InputRef}
            config={config}
            unUseDefaultValue={unUseDefaultValue}
          ></FormTool>
        </TabPane>
      </>
      ) : null}
    </Tabs>
  </>
}

const OneMany = forwardRef(OneManyComponent);
export default OneMany;
