const setting = require('./meetingList-setting.json');

let userInfo = {};
try {
  userInfo = JSON.parse(window.sessionStorage.getItem('userData'));
} catch {};

module.exports = {
  layout: setting.layout.table,
  title: setting.pageName.table,
  items: [
    // process.env.NODE_ENV === 'development' ?
    //   {
    //     component: 'EditList',
    //   } : { component: 'Empty' },
    {
      component: 'Search',
      config: {
        fields: setting.searchFields,
        type:"default"
      },
    },
    {
      component: 'Table',
      config: {
        API: {
          listAPI: `${setting.listAPI}?orgId=${userInfo?.orgId || ''}`,
          appendAPI: '',
          deleteAPI: setting.deleteAPI,
        },
        actions: setting.tableActions,
        fields: setting.tableFields,
        operation: setting.tableOperation,
      },
    }
  ],
};
