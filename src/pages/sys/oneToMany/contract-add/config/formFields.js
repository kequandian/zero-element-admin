module.exports = [
  { label: '合约编号', field: 'powerContractNum', type: 'plain', span: 24, },
  { field: 'group_1', type: 'group', value: '账户', span: 24, },
  {
    label: '账户', field: 'accountID', type: 'modal-radio',
    options: {
      API: '/api/account/accounts',
      modalWidth: 980,
      label: 'accountNumber',
      eidtLabel: 'accountNumber',
      searchFields: [
        { field: 'IDNumber', label: '证件号', type: 'input' },
        {
          label: '证件类型', field: 'IDType', type: 'select-field',
          options: {
            API: '/api/adm/config/fields',
            field: 'idType',
            label: 'value',
            value: 'name',
          },
        },
      ],
      fields: [
        { label: '账户编号', field: 'accountNumber' },
        { label: '账户名称', field: 'accountName' },
        { label: '姓', field: 'lastName' },
        { label: '名', field: 'firstName' },
        { label: '称呼', field: 'contactName' },
        { label: '性别', field: 'sex' },
        { label: '公司编号', field: 'companyNumber' },
        { label: '联系电话', field: 'phone' },
        { label: '联系电话', field: 'phone' },
        { label: '出生年月', field: 'DOB', valueType: 'date' },
        { label: '证件号', field: 'IDNumber' },
      ],
      saveData: {
        name: 'name',
        email: 'email',
        registeredWechat: 'registeredWechat',
        address: 'address',
        isOrganization: 'isOrganization',
        accountName: 'accountName',
        registeredMobile: 'registeredMobile',
        IDType: 'IDType',
        IDNumber: 'IDNumber',
        lastName: 'lastName',
        firstName: 'firstName',
        DOB: 'DOB',
      },
    },
    rules: ['required'],
  },
  {
    label: '', field: '_create', type: 'path-button',
    options: {
      title: '新建账户',
      path: '/contract/account-add',
      namespace: 'contract_account',
    }
  },


  { field: 'group_2', type: 'group', value: '基本信息', span: 24, },
  { label: '称呼', field: 'name', type: 'plain' },
  { label: '电子邮件', field: 'email', type: 'plain' },
  { label: '绑定微信', field: 'registeredWechat', type: 'plain' },
  { label: '联系地址', field: 'address', type: 'plain' },
  {
    label: '账户类型', field: 'isOrganization', type: 'plain', options: {
      map: {
        0: '个人',
        1: '组织',
      }
    }
  },
  { label: '账号名称', field: 'accountName', type: 'plain' },

  { field: 'group_3', type: 'group', value: '关键信息', span: 24, },
  { label: '注册手机', field: 'registeredMobile', type: 'plain' },
  { label: '证件类别', field: 'IDType', type: 'plain' },
  { label: '证件号', field: 'IDNumber', type: 'plain' },
  { label: '姓', field: 'lastName', type: 'plain' },
  { label: '名', field: 'firstName', type: 'plain' },
  { label: '出生日期', field: 'DOB', type: 'plain' },

  { field: 'group_4', type: 'group', value: 'ICP信息', span: 24, },
  { label: 'ICP No.', field: 'icp', type: 'plain' },
  { label: 'Unit', field: 'unit', type: 'plain' },
  { label: 'Propetry Name', field: 'property', type: 'plain' },
  { label: 'Number', field: 'number', type: 'plain' },
  { label: 'Street', field: 'street', type: 'plain' },
  { label: 'Suburb', field: 'suburb', type: 'plain' },
  { label: 'Town', field: 'town', type: 'plain' },
  { label: 'Region', field: 'region', type: 'plain' },
  { label: 'Post Code', field: 'postcode', type: 'plain' },

  { field: 'group_5', type: 'group', value: '合约基本信息', span: 24, },
  { label: '套餐名称', field: 'powerContractPlan.powerContractPlanName', type: 'plain' },
  { label: '/KWh', field: 'pricePerKWH', type: 'plain' },
  { label: '/Day', field: 'pricePerDay', type: 'plain' },
  {
    label: 'PPD', field: 'ppd', type: 'plain', options: {
      format: '<ppd> %',
    }
  },
  { label: '合约期', field: 'contractMonth', type: 'plain' },
  { label: '押金', field: 'deposit', type: 'plain' },
  { label: 'WelcomeCredit', field: 'welcomeCredit', type: 'plain' },
  {
    label: '必须自动扣费', field: 'isDirectDebit', type: 'plain', options: {
      map: {
        1: '是',
        0: '否',
      }
    }
  },
  {
    label: '自动续约', field: 'isAutoRenew', type: 'plain', options: {
      map: {
        1: '是',
        0: '否',
      }
    }
  },
  {
    label: '计费周期', field: 'billing', type: 'plain',
    options: {
      format: '{billingCycle} {cycleUnitText}',
      placeholder: '-',
    }
  },
  { label: '套餐简介', field: 'packageInfo', type: 'plain' },
  { label: '合约生效日期', field: 'contractStartDate', type: 'plain' },
  {
    label: '对齐日期', field: 'alignmentDate', type: 'date',
    options: {
      format: 'DD/MM/YYYY',
    },
    rules: ['required'],
  },
  {
    label: '断电限制', field: 'disconnectionRestriction', type: 'radio',
    value: 0,
    options: [
      { label: '是', value: 1 },
      { label: '否', value: 0 },
    ],
  },
  {
    label: '医疗限制', field: 'medicalRestrictionType', type: 'select',
    options: [
      { label: '', value: '' },
      { label: 'MDV', value: 'MDV' },
      { label: 'MDN', value: 'MDN' },
    ],
  },

  { label: '', field: 'contactID', type: 'hidden', span: 1 },
  { label: '', field: 'accountNumber', type: 'hidden', span: 1 },
  { label: '', field: 'powerContractApplicationID', type: 'hidden', span: 1 },
  { label: '', field: 'powerContractApplicationModel', type: 'hidden', span: 1 },
  { field: 'group_6', type: 'group', value: '合同开始时各个电表的读数', span: 24, },
  {
    label: '',
    field: 'startReading',
    type: 'one-mary',
    span: 24,
    options: {
      JSONString: true,
      actions: [
        {
          title: '添加初始读数', type: 'children-modal-add', options: {
            modalTitle: '添加合同开始时各个电表的读数',
            modalWidth: 680,
            items: [
              {
                layout: 'Empty',
                component: 'ChildrenForm',
                config: {
                  layout: 'Grid',
                  layoutConfig: {
                    value: [12, 12],
                  },
                  API: {},
                  fields: [
                    {
                      label: '仪表序列号', field: 'meterSerialNo', type: 'input',
                      rules: ['required'],
                    },
                    {
                      label: '注册号', field: 'registerNo', type: 'input',
                      rules: ['required'],
                    },
                    {
                      label: '读数', field: 'reading', type: 'input',
                      rules: ['required'],
                    },
                    {
                      label: '读数类型', field: 'readType', type: 'select',
                      options: [
                        { label: 'A', value: 'A' },
                        { label: 'E', value: 'E' },
                        { label: 'M', value: 'M' },
                      ],
                      rules: ['required'],
                    },
                  ],
                },
              }
            ],
          }
        },
      ],
      fields: [
        { label: '仪表序列号', field: 'meterSerialNo' },
        { label: '注册号', field: 'registerNo' },
        { label: '读数', field: 'reading' },
        { label: '读数类型', field: 'readType' },
      ],
      operation: [
        {
          title: '移除', type: 'removeChild',
          options: {
            outside: true,
          }
        },
      ],
    },
    rules: ['required'],
  }
];