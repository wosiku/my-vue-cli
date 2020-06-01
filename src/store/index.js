import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    menuActive: localStorage.getItem('menuActive') || '/home' // 默认激活菜单
  },
  mutations: {
    setMenuActive (state, val) {
      state.menuActive = val;
    }
  },
  getters: {
  }
});
export default store;
