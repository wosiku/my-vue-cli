<template>
  <div>
    <div>
      <el-date-picker
        style="width: 240px;"
        type="dates"
        v-model="periodicFreSpeDate"
        @focus="periodicFreSpeDateFocus"
        @change="periodicFreSpeDateChange"
        value-format="yyyy-M-d"
        format="d"
        :default-value="new Date('2015/03/01')"
        placeholder="选择一个或多个日期">
      </el-date-picker>
    </div>
    <div>value: {{periodicFreSpe}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      periodicFreSpeDate: [],
      periodicFreSpe: ''
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      let dateValue = '1,3,5,7,9';
      this.periodicFreSpeDate = dateValue.split(',').map(ele => { return ('2015-3-' + String(ele)); });
      this.periodicFreSpe = dateValue;
    },
    periodicFreSpeDateFocus (e) {
      this.$nextTick(() => {
        // 改造 频次为每月时，日期控件的样式
        e.popperElm.setAttribute('id', 'periodicFreSpeDatePicker');
      });
    },
    // 每月时 频次数据处理
    periodicFreSpeDateChange (newv) {
      this.periodicFreSpe = newv && (newv.map(ele => { return ele.split('-')[2]; })).join(',');
    }
  }
};
</script>
<style lang="less">
  /* 日期控件修改 */
  #periodicFreSpeDatePicker {
    .el-date-picker__header {
      display: none;
    }
    table tbody tr:nth-child(1), table tbody tr:nth-child(2) {
      display: none !important;
    }
    table tbody tr:nth-child(7) td:nth-child(4), table tbody tr:nth-child(7) td:nth-child(5), table tbody tr:nth-child(7) td:nth-child(6), table tbody tr:nth-child(7) td:nth-child(7){
      display: none !important;
    }
  }
</style>
