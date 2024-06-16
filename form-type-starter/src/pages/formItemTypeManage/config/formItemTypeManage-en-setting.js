module.exports = {
    "pageName": {
        "table": "框架组件管理",
        "new": "表单组件",
        "edit": "编辑菜单"
    },
    "listAPI": "/ap",
    "createAPI": "/api/u/product/products",
    "getAPI": "/api/u/product/products/[id]",
    "updateAPI": "/api/u/product/products/[id]",
    "deleteAPI": "/api/u/product/products/(id)",
    "columns": 1,
    "type": "default",
    "createFields": [
        {
            "label": "参考文档",
            "type": "LinkButton",
            "field": "type_0",
            "options": {
                "title": "点击进入",
                "linkUrl": "https://github.com/kequandian/zero-element-docs/blob/master/docs/guide/config.md#formField"
            }
        },
        {
            "label": "plain",
            "type": "plain",
            "field": "type_1"
        },
        {
            "label": "image",
            "type": "image",
            "field": "type_2",
            "options": {
                "value": [
                    {
                        "url": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    }
                ]
            }
        },
        {
            "label": "empty",
            "type": "empty",
            "field": "type_3"
        },
        {
            "label": "hidden",
            "type": "hidden",
            "field": "type_4"
        },
        {
            "label": "group",
            "type": "group",
            "field": "type_5"
        },
        {
            "label": "input",
            "type": "input",
            "field": "type_6",
            "options":{
                "width": "200"
            }
        },
        {
            "label": "password",
            "type": "password",
            "field": "type_7"
        },
        {
            "label": "number",
            "type": "number",
            "field": "type_8"
        },
        {
            "label": "radio",
            "type": "radio",
            "field": "type_9",
            "options": [
                {
                    "label": "选项一",
                    "value": "选项一"
                },
                {
                    "label": "选项二",
                    "value": "选项二"
                },
                {
                    "label": "选项三",
                    "value": "选项三"
                }
            ]
        },
        {
            "field": "type_10",
            "label": "select",
            "type": "select",
            "options": [
                {
                    "label": "选项一",
                    "value": "选项一"
                },
                {
                    "label": "选项二",
                    "value": "选项二"
                },
                {
                    "label": "选项三",
                    "value": "选项三"
                }
            ]
        },
        {
            "label": "checkbox",
            "type": "checkbox",
            "field": "type_11",
            "options": [
                {
                    "label": "选项一",
                    "value": "选项一"
                },
                {
                    "label": "选项二",
                    "value": "选项二"
                },
                {
                    "label": "选项三",
                    "value": "选项三"
                }
            ]
        },
        // {
        //     "label": "pcd",
        //     "type": "pcd",
        //     "field": "type_12",
        //     "options": {
        //         "API": ""
        //     }
        // },
        {
            "label": "captcha",
            "type": "captcha",
            "field": "type_13",
            "options": {
                "API": ""
            }
        },
        {
            "label": "tags",
            "type": "tags",
            "field": "type_13"
        },
        {
            "label": "download",
            "field": "type_14",
            "type": "download",
            "options": {
                "title": "点击下载",
                "url": "templateUrl"
            }
        },
        {
            "label": "json",
            "field": "type_15",
            "type": "json"
        },
        {
            "label": "week",
            "field": "type_16",
            "type": "week"
        },
        {
            "label": "month",
            "field": "type_17",
            "type": "month"
        },
        {
            "label": "range",
            "field": "type_18",
            "type": "range"
        },
        {
            "label": "direct-upload",
            "field": "type_19",
            "type": "direct-upload",
            "options": {
                "title": "点击上传",
                "url": "templateUrl"
            }
        },
        {
            "label": "time-range",
            "field": "type_20",
            "type": "time-range"
        },
        {
            "field": "type_21",
            "label": "table-select",
            "type": "table-select"
        },
        {
            "field": "type_22",
            "label": "modal-radio",
            "type": "modal-radio",
            "options": {
                "title": "选择",
                "label": "name",
                "editLabel": "name",
                "value": "projectId",
                "API": "/api/u/product/products",
                "fields": [
                    {
                        "label": "商品名称",
                        "field": "name"
                    },
                    {
                        "label": "价格",
                        "field": "price"
                    }
                ]
            }
        },
        {
            "field": "type_23",
            "label": "modal-checkbox",
            "type": "modal-checkbox",
            "options": {
                "title": "选择",
                "label": "name",
                "editLabel": "name",
                "value": "id",
                "pagination": true,
                "API": "/api/u/product/products",
                "saveData": {
                    "masterRelations": "value"
                },
                "fields": [
                    {
                        "label": "商品名称",
                        "field": "name"
                    },
                    {
                        "label": "价格",
                        "field": "price"
                    }
                ]
            }
        },
        {
            "label": "upload-image",
            "field": "type_24",
            "type": "upload-image",
            "options": {
                "title": "点击上传",
                "url": "templateUrl"
            }
        },
        {
            "label": "upload-file",
            "field": "type_25",
            "type": "upload-file",
            "options": {
                "title": "点击上传",
                "url": "templateUrl"
            }
        },
        {
            "label": "checkbox-fetch",
            "type": "checkbox-fetch",
            "field": "type_26",
            "options": {
                "API": "/api/u/product/products",
                "label": "name",
                "value": "id"
            }
        },
        {
            "field": "type_27",
            "label": "select-fetch",
            "type": "select-fetch",
            "options": {
                "API": "/api/u/product/products",
                "label": "name",
                "value": "id"
            }
        },
        {
            "field": "type_28",
            "label": "select-field",
            "type": "select-field",
            "options": {
                "API": "/api/u/product/products",
                "label": "name",
                "value": "id"
            }
        },
        {
            "label": "text-area",
            "type": "text-area",
            "field": "type_29"
        },
        {
            "label": "rich-text",
            "type": "rich-text",
            "field": "type_30"
        },
        {
            "label": "one-mary",
            "field": "type_31",
            "type": "one-mary",
            "options": {
                "fields": [
                    {
                        "label": "选项一",
                        "field": "选项一"
                    },
                    {
                        "label": "选项二",
                        "field": "选项二"
                    }
                ]
            }
        },
        {
            "label": "number-range",
            "field": "type_32",
            "type": "number-range"
        },
        // {
        //     "label": "pcdm",
        //     "field": "type_33",
        //     "type": "pcdm"
        // },
        // {
        //     "label": "pcdForSearch",
        //     "field": "type_34",
        //     "type": "pcdForSearch"
        // }
    ],
    "updateFields": [],
    "map": {},
    "layout": {
        "table": "Content",
        "form": "TitleContent"
    },
    "tableActions": [],
    "tableOperation": [],
    "searchFields": [],
    "tableFields": []
}