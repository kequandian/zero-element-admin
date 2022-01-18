import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';

function getPort(){
  let endpoint = getEndpoint()
  let host = document.location.host
  let url = document.location.href
  let http = url.split("//")[0]
  if(["",null,undefined].includes(endpoint)){
    endpoint = http+ "//"+ host
  }
  return endpoint
}
getPort()
export const setting = {
  "pageName": {
    "table": "动态页面管理",
    "new": "新增动态页面",
    "edit": "编辑动态页面"
  },
  "listAPI": "/api/crud/lowMainPage/lowMainPages",
  "createAPI": "/api/crud/lowMainPage/lowMainPages",
  "getAPI": "/api/crud/lowMainPage/lowMainPages/[id]",
  "updateAPI": "/api/crud/lowMainPage/lowMainPages/[id]",
  "deleteAPI": "/api/crud/lowMainPage/lowMainPages/(id)",
  "columns": 1,
  "createFields": [
    { "label":"页面名称","field":"pageName","type":"input","rules": [
      {
        "type": "required"
      }
    ],
    "props": {
      "placeholder": "请输入"
    } },
    {
      "label": "页面标题",
      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input",
      "field": "pageTitle"
    },
    { "label":"数据接口", "field":"apiEndpoint",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"新建页面标题", "field":"formAddTitle",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"页面视图标题", "field":"formViewTitle",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"页面编辑标题", "field":"formEditTitle",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"页面内容布局", "field":"contentLayout",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"组件列表排序", "field":"contentItems",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"组件容器属性", "field":"contentItemContainerStyle",
      "type": "json" },
    { "label":"列表字段", "field":"listFields",
      "type": "json" },
    { "label":"列表操作排列", "field":"listOperationFields",
      "type": "json" },
    { "label":"表单新建字段排列", "field":"formAddFields",
      "type": "json" },
    { "label":"列表视图字段排列", "field":"formViewFields",
      "type": "json" },
    { "label":"列表编辑字段排列", "field":"formEditFields",
      "type": "json" },
    { "label":"表单默认内容布局", "field":"formDefaultContentLayout",
      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"表单模态框默认宽度", "field":"formDefaultWidth",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" }
  ],
  "updateFields": [
    { "label":"页面名称","field":"pageName","type":"input","rules": [
      {
        "type": "required"
      }
    ],
    "props": {
      "placeholder": "请输入"
    } },
    {
      "label": "页面标题",
      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input",
      "field": "pageTitle"
    },
    { "label":"数据接口", "field":"apiEndpoint",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"新建页面标题", "field":"formAddTitle",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"页面视图标题", "field":"formViewTitle",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"页面编辑标题", "field":"formEditTitle",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"页面内容布局", "field":"contentLayout",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"组件列表排序", "field":"contentItems",      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"组件容器属性", "field":"contentItemContainerStyle",
      "type": "json" },
    { "label":"列表字段", "field":"listFields",
      "type": "json" },
    { "label":"列表操作排列", "field":"listOperationFields",
      "type": "json" },
    { "label":"表单新建字段排列", "field":"formAddFields",
      "type": "json" },
    { "label":"列表视图字段排列", "field":"formViewFields",
      "type": "json" },
    { "label":"列表编辑字段排列", "field":"formEditFields",
      "type": "json" },
    { "label":"表单默认内容布局", "field":"formDefaultContentLayout",
      "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" },
    { "label":"表单模态框默认宽度", "field":"formDefaultWidth", "rules": [
        {
          "type": "required"
        }
      ],
      "props": {
        "placeholder": "请输入"
      },
      "type": "input" }
  ],
  "map": {},
  "layout": {
    "table": "Content",
    "form": "TitleContent"
  },
  "tableActions": [
    {
      "title": "添加",
      "type": "path",
      "options": {
        "outside": true,
        "style": "primary",
        "path": "dynamicPage/dynamicPage-add"
      }
    }
  ],
  "tableOperation": [
    {
      "title": "编辑整体页面",
      "type": "path",
      "options": {
        "outside": true,
        "path": "sys/testPageFetch"
      }
    },
    {
      "title": "编辑页面",
      "type": "path",
      "options": {
        "outside": true,
        "path": "dynamicPage/dynamicPage-edit"
      }
    },
    {
      "title": "加载字段",
      "type": "request",
      "options": {
        "outside": true,
        "tips": "确定要加载该页面数据接口的字段吗?",
        "API": "/addLowFields",
        "method": "post",
        "data":{
          "endpoint":getPort(),
          "token":getToken()
        },
        "query":{
          "pageId":"id",
          "originApi": "apiEndpoint"
        }
      }
    },
    {
      "title": "生成导航",
      "type": "request",
      "options": {
        "outside": true,
        "tips": "确定要生成该页面的导航吗?",
        "API": "/api/crud/menu/menus",
        "method": "post",
        "data":{
          "menuType":"M",
          "pid": "62",
          "endpoint":getPort()
        },
        "query":{
          "id":"id",
          "menuName":"pageTitle",
          "component":"/sys/testPageFetch?id=[id]"
        }
      }
    },
    {
      "title": "删除",
      "type": "delete",
      "options": {
        "outside": false
      }
    }
  ],
  "searchFields": [
    {
      "label": "页面标题",
      "field": "pageTitle",
      "type": "search",
      "props": {
        "placeholder": ""
      }
    }
  ],
  "tableFields": [
    { "label":"页面名称","field":"pageName" },
    { "label":"页面标题", "field":"pageTitle" },
    { "label":"新建页面标题", "field":"formAddTitle" },
    { "label":"页面视图标题", "field":"formViewTitle" },
    { "label":"页面编辑标题", "field":"formEditTitle" },
    { "label":"数据接口", "field":"apiEndpoint" },
    { "label":"页面内容布局", "field":"contentLayout" },
    { "label":"表单默认内容布局", "field":"formDefaultContentLayout" },
    { "label":"表单模态框默认宽度", "field":"formDefaultWidth" }
  ],
  "viewConfig": [
    {
      "title": "详情",
      "type": "plain",
      "fields": [
        { "label":"页面名称","field":"pageName" },
        { "label":"页面标题", "field":"pageTitle" },
        { "label":"数据接口", "field":"apiEndpoint" },
        { "label":"新建页面标题", "field":"formAddTitle" },
        { "label":"页面视图标题", "field":"formViewTitle" },
        { "label":"页面编辑标题", "field":"formEditTitle" },
        { "label":"页面内容布局", "field":"contentLayout" },
        { "label":"组件列表排序", "field":"contentItems" },
        { "label":"组件容器属性", "field":"contentItemContainerStyle" },
        { "label":"列表字段", "field":"listFields" },
        { "label":"列表操作排列", "field":"listOperationFields" },
        { "label":"表单新建字段排列", "field":"formAddFields" },
        { "label":"列表视图字段排列", "field":"formViewFields" },
        { "label":"列表编辑字段排列", "field":"formEditFields" },
        { "label":"表单默认内容布局", "field":"formDefaultContentLayout" },
        { "label":"表单模态框默认宽度", "field":"formDefaultWidth" }
      ]
    }
  ]
}