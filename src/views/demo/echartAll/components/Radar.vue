<template>
 <div>
  <div id="bar2" :style="{height:height,width:width}" ref="bar2"></div>
 </div>
</template>
<script>
import echarts from 'echarts';
export default {
  data () {
    return {
      chart: null,
      height: '500px',
      width: 'auto'
    };
  },
  mounted () {
    this.chart = echarts.init(this.$refs.bar2);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      let option = {
        tooltip: {},
        radar: {
          name: {
            show: true,
            color: '#AFB8BD',
            fontFamily: 'MicrosoftYaHeiSemilight',
            fontSize: 19
          },
          splitNumber: 3,
          axisLine: {
            lineStyle: {
              color: 'rgba(98,105,246,0.3)',
              type: 'solid',
              width: 2
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(98,105,246,0.3)',
              type: 'solid',
              width: 1
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#0d162c', '#0d162c', '#08111f']

            }
          },
          indicator: [
            {
              name: '摄像头',
              max: 6500
            },
            {
              name: '充电桩',
              max: 16000
            },
            {
              name: '信息屏',
              max: 30000
            },
            {
              name: 'Wi-Fi',
              max: 38000
            },
            {
              name: '票闸',
              max: 52000
            },
            {
              name: '门禁',
              max: 25000
            }
          ]
        },
        series: [{
          type: 'radar',
          label: {
            show: false
          },
          data: [{
            value: [4300, 10000, 28000, 35000, 50000, 19000]
          }
          ],
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(43,221,158,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(43,216,221,1)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            width: 3

          }
        }]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
