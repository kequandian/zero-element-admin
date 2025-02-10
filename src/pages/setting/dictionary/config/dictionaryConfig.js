
module.exports = {
  layout: 'Empty',
  // title: '数字字典管理',
  items: [
    {
      layout: 'Empty',
      component: 'Dictionary',
      config: {
        API: {
          listAPI: '/api/adm/config/field/option/groups/<id>/data',
          // deleteAPI: '/api/adm/config/field/tree/(id)'
        },
        tree: {
          API: {
            initAPI: '/api/adm/config/field/option/tree',
            // appendAPI: '/api/adm/config/field/options/<id>',
            // searchAPI: '/api/test',
          }
        },
      },
    },
  ],
};
