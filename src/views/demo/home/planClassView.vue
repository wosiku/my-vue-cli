<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="周视图" name="0"></el-tab-pane>
      <el-tab-pane label="月视图" name="1"></el-tab-pane>
    </el-tabs>
    <div class="flex-1 flex-c">
      <div v-show="showGrid == true" class="flex-c flex-1">
        <view-left></view-left>
      </div>
      <div v-show="showGrid == false" class="flex-c flex-1">
        月视图
        <!-- <view-right></view-right> -->
      </div>
    </div>
  </div>
</template>

<script>
import viewLeft from './planWeek.vue';
export default {
  components: { viewLeft },
  data () {
    return {
      activeName: '0',
      showGrid: true
    };
  },
  mounted () {

  },
  computed: {},
  watch: {},
  methods: {
    handleTabClick (tab, event) {
      if (tab.name === '0') {
        this.showGrid = true;
      } else if (tab.name === '1') {
        this.showGrid = false;
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>
