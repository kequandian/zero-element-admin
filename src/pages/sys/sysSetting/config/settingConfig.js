
module.exports = {
  layout: 'Empty',
  // title: '系统配置管理',
  items: [
    {
      layout: 'Empty',
      component: 'Setting',
      config: {
        API: {
          listAPI: '/api/adm/config/field/fields/groups/tree',
          getAPI: '/api/adm/config/field/fields/groups/<id>/data',
          updateAPI: '/api/adm/config/field/fields/<id>',
        },
      },
    },
  ],
};
