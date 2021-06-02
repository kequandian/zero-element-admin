module.exports = [
  // {
  //   label: '上传视频',
  //   rules: [
  //     {
  //       type: 'required'
  //     }
  //   ],
  //   options: {
  //     type: 'text'
  //   },
  //   type: 'upload-file',
  //   field: 'vidoSrc'
  // },
  {
    label: "上传视频",
    rules: [
      {
        type: "required"
      }
    ],
    field: "vidoSrc",
    type: "upload_file_single",
    options: {
      title: "点击上传",
      API: "/api/fs/uploadfile",
      acceptType: ".mp4, .avi, .rmvb"
    }
  },
  {
    label: '视频名称',
    rules: [
      {
        type: 'required'
      }
    ],
    props: {
      placeholder: '请输入视频名称',
    },
    width: '350px',
    type: 'input',
    field: 'actionName'
  },
  {
    label: '适用症状',
    rules: [
      {
        type: 'required'
      }
    ],
    props: {
      placeholder: '请输入适用症状',
    },
    width: '350px',
    type: 'input',
    field: 'prescriptionSymptoms'
  },
  {
    label: '动作说明',
    rules: [
      {
        type: 'required'
      }
    ],
    props: {
      placeholder: '请输入动作说明',
      style:{
        width: '350px',
      },
      autoSize: {
        minRows: 5,
      }
    },
    type: 'text-area',
    field: 'trainingType'
  }

];
