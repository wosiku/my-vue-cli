// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
// 解决点击当前面包屑报错问题
import Router from 'vue-router';
import '@/components/js/animation.js';

// import VueQuillEditor from 'vue-quill-editor';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';

// bpmn-js
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

console.log(this.$router, 'router', router);
// addRoutes动态添加路由
router.addRoutes([
  { // bpmn
    path: '/bpmn',
    component: resolve => require(['@/views/demo/bpmn/index'], resolve)
  }
]);

const routerPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error);
};
router.beforeEach((to, from, next) => {
  // 刷新页面，跳转路由时左侧菜单默认路由能同步显示正确
  store.state.menuActive = to.path;
  if (to.matched.length === 0) { // 跳转到没注册的路由则重定向到/404页面
    next('/404');
  } else if (!!localStorage.getItem('isLock') && to.path !== '/lock') { // 锁屏状态
    next('/lock');
  } else {
    next();
  }
});

Vue.use(ElementUI);

Vue.directive('countRunning', {
  bind (el, binding, vnode, oldVnode) {
    const targetDomCount = el.getAttribute('data-target'); // data-target为目标值

    let step = (targetDomCount * 10) / (1 * 1000);
    let current = 0;
    let start = 0;
    let t = setInterval(function () {
      start += step;
      if (start > targetDomCount) {
        clearInterval(t);
        start = targetDomCount;
        t = null;
      }
      if (current === start) {
        return;
      }
      current = ~~start;
      el.innerHTML = current;
    }, 10);
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'

});
