import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  mode: 'history', // 注释了，路由上就出现#号
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: resolve => require(['@/components/home/index'], resolve),
      children: [
        // 经典功能
        {
          path: '/my',
          component: resolve => require(['@/views/demo/my/index'], resolve),
          redirect: {path: '/my/bpmnjs'},
          children: [
            { // bpmn
              path: 'bpmnjs',
              component: resolve => require(['@/views/demo/bpmn/index'], resolve)
            },
            {
              path: 'echarts',
              component: resolve => require(['@/views/demo/echartAll/index'], resolve)
            },
            {
              path: 'selectDay',
              component: resolve => require(['@/views/demo/selectDay/index'], resolve)
            },
            {
              path: 'tableExcel',
              component: resolve => require(['@/views/demo/tableExcel/index'], resolve)
            },
            {
              path: 'blobDownload',
              component: resolve => require(['@/views/demo/blobDownload/index'], resolve)
            }
          ]
        },
        {
          path: '/404',
          component: resolve => require(['@/components/404/index'], resolve)
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/views/demo/home/home.vue'], resolve)
        },
        {
          path: '/hellow-world',
          name: 'hellow',
          component: resolve => require(['@/views/demo/home/HelloWorld.vue'], resolve)
        },
        {
          path: '/move',
          name: 'move',
          component: resolve => require(['@/views/demo/home/planClassView'], resolve)
        },
        {
          path: '/slot',
          name: 'slot',
          component: resolve => require(['@/views/demo/home/slot/index'], resolve)
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: resolve => require(['@/views/demo/home/echarts/index'], resolve)
        },
        {
          path: '/defineProperty',
          component: resolve => require(['@/views/demo/defineProperty/index'], resolve)
        },
        {
          path: '/pengzhuang',
          component: resolve => require(['@/views/demo/pengzhuang/index'], resolve)
        },
        {
          path: '/editor',
          component: resolve => require(['@/views/demo/editor/index'], resolve)
        },
        {
          path: '/editor-update',
          component: resolve => require(['@/views/demo/editor/index2'], resolve)
        },
        {
          path: '/myWorkStation/doneList3',
          component: resolve => require(['@/views/demo/home/echarts/index'], resolve)
        },
        {
          path: '/promise',
          component: resolve => require(['@/views/demo/promise/index'], resolve)
        },
        {
          path: '/debounceOrThrottle',
          component: resolve => require(['@/views/demo/debounceOrThrottle/index'], resolve)
        },
        {
          path: '/mixins',
          component: resolve => require(['@/views/demo/mixins/index'], resolve)
        }
      ]
    }
  ]
});
