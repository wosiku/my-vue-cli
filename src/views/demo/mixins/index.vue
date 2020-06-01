<template>
  <div>
    <div>{{msg}}</div>
    <el-button @click="clickFn">点击调用混入里的方法</el-button>
      <p class="countRunning" v-countRunning data-target='52556'>0</p>
      <NumberGrow :value="720000"></NumberGrow>
      <NumberGrow :value="1000"></NumberGrow>
      <NumberGrow :value="2000"></NumberGrow>
  </div>
</template>
<script>
import mixinsC from './js/mixins.js';
import NumberGrow from './js/num.vue';
export default {
  mixins: [mixinsC],
  components: { NumberGrow },
  data () {
    return {
    };
  }
};
</script>
