<template>
 <div>
   <el-input v-model="timeData" placeholder="请输入倒计时（秒）" style="width: 200px;"></el-input>
   <el-button @click="start">{{flag ? '停止' : '开始'}}</el-button>
  <pieChart ref="pieChart"></pieChart>
 </div>
</template>
<script>
import pieChart from './components/pie.vue';
export default {
  components: { pieChart },
  data () {
    return {
      timeData: '',
      val: 0,
      flag: false,
      setIntervals: null
    };
  },
  mounted () {
  },
  methods: {
    start () {
      if (!this.timeData) { this.$message.warning('请输入倒计时'); return; }
      let this_ = this;
      if (!this.flag) {
        this_.setIntervals = setInterval(() => {
          if (this_.val >= (this.timeData * 1000)) {
            clearInterval(this_.setIntervals);
            this.val = 0;
            this.flag = false;
            return;
          }
          this_.val += 100;
          this_.$refs.pieChart.initChart(this_.val, this.timeData * 1000);
        }, 100);
      } else {
        clearInterval(this_.setIntervals);
      }
      this.flag = !this.flag;
    },
    searchNum (x) {
      let num2 = x / 1000;
      let num = String(num2).split('.')[1];
      return num ? 10 ** (num.length) : num2 / (num2 ** 2);
    }
  }
};
</script>
