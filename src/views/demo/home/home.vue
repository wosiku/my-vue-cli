<template>
<div>
    <div ref="observe" :class="{observesize: observesize}">{{msg}}</div>
    <el-button @click="observesize = !observesize">变化</el-button>
    <div class="main">
       <el-time-picker
          is-range
          v-model="dateValue"
          format='HH:mm'
          value-format="HH:mm"
          range-separator="--"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
      <div class="mainleft">
        <component :is="tab"></component>
      </div>
      <div class="mainright">
        <sidebar :tab.sync="tab"></sidebar>
      </div>
    </div>
    <planClassView></planClassView>
</div>
</template>
<style lang="less" scoped>
.observesize {
  height: 50px;
}
.main {
  width: 500px;
  height: 300px;
  display: flex;
  .mainleft {
    flex: 1;
  }
  .mainright {
    width: 80px;
  }
}
</style>
<script>
import sidebar from './component/sidebar.vue';
import tab1 from './component/tab1.vue';
import tab2 from './component/tab2.vue';
import tab3 from './component/tab3.vue';
import tab4 from './component/tab4.vue';
import planClassView from './planClassView.vue';
export default {
  name: 'home',
  data () {
    return {
      dateValue: '',
      msg: 'home',
      tab: 'tab1',
      observesize: false
    };
  },
  methods: {
    tabclick (tar) {
      this.tab = tar;
    }
  },
  mounted () {
    console.log(document.elementFromPoint(244, 222));
    // 原生监听元素大小方法
    var ro = new ResizeObserver(entries => {
      console.log('element:', entries);
      // for (let entry of entries) {
      //   const cr = entry.contentRect;
      //   console.log('Element:', entry.target);
      //   console.log(`Element size: ${cr.width}px x ${cr.height}px`);
      //   console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
      // }
    });
    ro.observe(this.$refs.observe);
  },
  components: {
    sidebar,
    tab1,
    tab2,
    tab3,
    tab4,
    planClassView
  }
};
</script>
