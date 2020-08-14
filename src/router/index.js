// 新路由把公共home组件分离出去，这样router-view才生效第三层子路由transition动画
import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/home/index';

Vue.use(Router);

export default new Router({
  mode: 'history', // 注释了，路由上就出现#号
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/views/demo/home/home.vue'], resolve)
        }
      ]
    },
    {
      path: '/lock',
      component: resolve => require(['@/components/lock/index'], resolve)
    },
    {
      path: '/404',
      component: Layout,
      redirect: '/404',
      children: [
        {
          path: '/404',
          component: resolve => require(['@/components/404/index'], resolve)
        }
      ]
    },
    {
      path: '/hellow-world',
      component: Layout,
      redirect: '/hellow-world',
      children: [
        {
          path: '/hellow-world',
          name: 'hellow',
          component: resolve => require(['@/views/demo/home/HelloWorld.vue'], resolve)
        }
      ]
    },
    {
      path: '/my',
      component: Layout,
      redirect: 'my/bpmnjs',
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
        },
        {
          path: 'baiduMap',
          component: resolve => require(['@/views/demo/baiduMap/index'], resolve)
        },
        {
          path: 'lock',
          component: resolve => require(['@/components/lock/index'], resolve)
        }
      ]
    },
    {
      path: '/move',
      component: Layout,
      redirect: '/move',
      children: [
        {
          path: '/move',
          name: 'move',
          component: resolve => require(['@/views/demo/home/planClassView'], resolve)
        }
      ]
    },
    {
      path: '/slot',
      component: Layout,
      redirect: '/slot',
      children: [
        {
          path: '/slot',
          name: 'slot',
          component: resolve => require(['@/views/demo/home/slot/index'], resolve)
        }
      ]
    },
    {
      path: '/echarts',
      component: Layout,
      redirect: '/echarts',
      children: [
        {
          path: '/echarts',
          name: 'echarts',
          component: resolve => require(['@/views/demo/home/echarts/index'], resolve)
        }
      ]
    },
    {
      path: '/defineProperty',
      component: Layout,
      redirect: '/defineProperty',
      children: [
        {
          path: '/defineProperty',
          component: resolve => require(['@/views/demo/defineProperty/index'], resolve)
        }
      ]
    },
    {
      path: '/pengzhuang',
      component: Layout,
      redirect: '/pengzhuang',
      children: [
        {
          path: '/pengzhuang',
          component: resolve => require(['@/views/demo/pengzhuang/index'], resolve)
        }
      ]
    },
    {
      path: '/editor',
      component: Layout,
      redirect: '/editor',
      children: [
        {
          path: '/editor',
          component: resolve => require(['@/views/demo/editor/index'], resolve)
        }
      ]
    },
    {
      path: '/editor-update',
      component: Layout,
      redirect: '/editor-update',
      children: [
        {
          path: '/editor-update',
          component: resolve => require(['@/views/demo/editor/index2'], resolve)
        }
      ]
    },
    {
      path: '/myWorkStation',
      component: Layout,
      redirect: '/myWorkStation/doneList3',
      children: [
        {
          path: '/myWorkStation/doneList3',
          component: resolve => require(['@/views/demo/home/echarts/index'], resolve)
        }
      ]
    },
    {
      path: '/promise',
      component: Layout,
      redirect: '/promise',
      children: [
        {
          path: '/promise',
          component: resolve => require(['@/views/demo/promise/index'], resolve)
        }
      ]
    },
    {
      path: '/debounceOrThrottle',
      component: Layout,
      redirect: '/debounceOrThrottle',
      children: [
        {
          path: '/debounceOrThrottle',
          component: resolve => require(['@/views/demo/debounceOrThrottle/index'], resolve)
        }
      ]
    },
    {
      path: '/mixins',
      component: Layout,
      redirect: '/mixins',
      children: [
        {
          path: '/mixins',
          component: resolve => require(['@/views/demo/mixins/index'], resolve)
        }
      ]
    }
  ]
});
