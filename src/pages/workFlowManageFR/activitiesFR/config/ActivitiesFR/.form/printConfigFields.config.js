module.exports = [
  {
    "field": "docId",
    "label": "打印表单模板",
    "type": "modal-radio",
    "props": {},
    "rules": [
      // {
      //   "type": "required"
      // }
    ],
    "options": {
      "title": "选择模板",
      "label": "name",
      "editLabel": "docName",
      "value": "id",
      "pagination": true,
      "API": "/api/doc",
      "fields": [
        {
          "label": "文档名",
          "field": "name"
        },
        // {
        //   "label": "表单",
        //   "field": "entityName"
        // }
      ]
    }
  },
  // {
  //   "field": "fieldList",
  //   "label": "",
  //   "type": "field_table",
  //   "props": {},
  //   "rules": []
  // }
]
