<template>
  <div style="padding: 30px;">
    <el-button @click="debounceBtn">防抖（规定时间内连续点击，只执行一次）</el-button>
    <el-button @click="throttleBtn">节流(一ffdfs直点击，每隔规定时间执行一次)</el-button>
  </div>
</template>
<script>
import { debounce, throttle } from './debounceOrThrottle';
export default {
  data () {
    return {
    };
  },
  methods: {
    // 防抖
    debounceBtn: debounce(function () {
      this.$message.success('规定时间内连续点击，只执行一次');
    }, 2000),
    // 节流
    throttleBtn: throttle(function () {
      this.$message.success('规定时间内连续点击，只执行一次');
    }, 2000)
  }
};
</script>
