import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';

export default (props) => {
  const { title, options, className, namespace, handle } = props;
  const { onCreate, onCreateList } = handle;
  const {
    modalTitle, modalWidth,
    childAppendField,
    ...rest } = options;
  const [visible, setVisible] = useState(false);

  function handleOpen() {
    setVisible(true);
  }
  function handleClose() {
    setVisible(false);
  }

  function handleSubmit(data) {

    if(data.venderActivities.length > 0){
      var dataList = data.venderActivities;
      dataList.map((item, index) => {
        delete item.id;
        return item;
      })
    }
    // console.log('childAppendField = ', childAppendField);
    // console.log('data = ', JSON.stringify(data));
    // return;
    if (childAppendField) {
      onCreateList(data[childAppendField]);
    } else {
      onCreate(data);
    }
  }

  return <>
    <Button onClick={handleOpen} className={className}>
      {title}
    </Button>
    <Modal
      title= "请选择"
      width={modalWidth}
      visible={visible}
      destroyOnClose={true}
      onCancel={handleClose}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <ZEle
        MODAL={true}
        namespace={namespace}
        config={{
          layout: 'Empty',
          ...rest,
        }}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  </>
}