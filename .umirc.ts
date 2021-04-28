import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/user-list', component: '@/pages/examples/UserList' },
    { path: '/user-list-select', component: '@/pages/examples/UserListSelect' },
    {
      path: '/user-group-list-select',
      component: '@/pages/examples/UserListSelectWithGroup',
    },
  ],
  fastRefresh: {},
});
