const printConfigFields = require("./.form/printConfigFields.config");
const jsonConfigFields =require("./.form/jsonConfigFields.config");

module.exports = {
  layout: 'Content',
  title: '表单管理',
  items: [
    {
      component: 'Search',
      config: {
        type:"default",
        fields: [
          {
            field: 'name', label: '表单名称', type: 'search',
            props: {
              placeholder: '请输入',
            }
          }
        ],
      },
    },
    {
      component: 'NewTreeList',
      config: {
        API: {
          listAPI: '/api/crud/virtualForm/virtualForms?typeId=<id>',
          deleteAPI: '/api/crud/virtualForm/virtualForms/(id)'
        },
        tree: {
          API: {
            initAPI: '/api/crud/eavEntityType/eavEntityTypes/groupType',
            appendAPI: undefined,
          }
        },
        actions: [
          // {
          //   title: '添加', type: 'modal',
          //   options: {
          //     modalTitle: '添加用户',
          //     modalWidth: 900,
          //     items: [
          //       {
          //         component: 'Form',
          //         config: {
          //           layout: 'Grid',
          //           API: {
          //             createAPI: '/api/crud/cinema/user'
          //           },
          //           fields: formFields,
          //         }
          //       }
          //     ]
          //   }
          // }
          {
            "title": "新增",
            "type": "path",
            "options": {
              style: "primary",
              "path": "/workFlowManageFR/activitiesFR/activitiesFR-add"
            }
          },
        ],
        fields: [
          { field: 'formName', label: '表单名称' },
          { field: 'note', label: '备注' },
        ],
        operation: [
          // {
          //   title: '编辑', type: 'modal',
          //   options: {
          //     modalTitle: '编辑用户',
          //     modalWidth: 800,

          //     layout: 'Empty',
          //     items: [
          //       {
          //         layout: 'Empty',
          //         component: 'Form',
          //         config: {
          //           layout: 'Grid',
          //           API: {
          //             getAPI: '/api/adm/users/(id)',
          //             updateAPI: '/api/adm/users/(id)',
          //           },
          //           fields: editFormFields,
          //         }
          //       }
          //     ]
          //   }
          // },
          {
            title:"小程序设计",type:"modal",
            options:{
              outside: true,
              modalTitle: '绑定模板',
              modalWidth: 600,
              layout: 'Empty',
              items: [
                {
                  layout: 'Empty',
                  component: 'activity_fields_form',
                  config: {
                    layout: 'Grid',
                    API: {
                      getAPI: '/api/crud/virtualForm/virtualForms/(id)',
                      updateAPI: '/api/crud/virtualForm/virtualForms/(id)',
                    },
                    fields: jsonConfigFields,
                  }
                }
              ]
            }
          },
          {
            title: '设计', type: 'path',
            options:{
              outside: true,
              path: "/workFlowManageFR/activitiesFR/activitiesFR-design"
            }
          },
          {
            title: '打印模板', type: 'modal',
            options:{
              outside: true,
              modalTitle: '绑定模板',
              modalWidth: 600,
              layout: 'Empty',
              items: [
                {
                  layout: 'Empty',
                  component: 'print_config_form',
                  config: {
                    layout: 'Grid',
                    API: {
                      getAPI: '/api/doc/form/(id)',
                      updateAPI: '/api/doc/editFormDoc',
                    },
                    fields: printConfigFields,
                  }
                }
              ]
            }
          },
          {
            title: '打印配置', 
            type: 'path',
            options:{
              outside: true,
              path:"activitiesFR/activitiesFR-activityFields"
            },
            expect: {
              field: "hasDocument",
              value: true
            }
          },
          {
            title: '编辑', type: 'path',
            options:{
              outside: true,
              path: "/workFlowManageFR/activitiesFR/activitiesFR-edit"
            }
          },
          {
            title: "",
            type: 'sort',
            options:{
              entity: "virtualForm"
            }
          },
          {
            title: '删除', type: 'delete'
          }
        ]
      },
    },
  ],
};
