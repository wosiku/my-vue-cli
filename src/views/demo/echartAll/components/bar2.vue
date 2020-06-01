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
      var dataArr = [14, 59, 34, 3];
      const maxX = 59;
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 80,
          right: 20,
          top: 100,
          bottom: 126
        },
        xAxis: [
          {
            type: 'category',
            data: dataArr,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#2B2D2F',
                type: 'solid'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 25,
              showMinLabel: true,
              formatter: val => val.slice(0, 4),
              margin: 20
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff',
              fontSize: 30,
              fontFamily: 'BebasNeueBook'
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#2B2D2F'
              }
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '故障数',
            type: 'bar',
            barWidth: 28,
            data: dataArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2BBAFF'},
                    {offset: 1, color: 'rgba(0,239,219,0.10)'}
                  ]
                )
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside',
                fontSize: 40,
                fontWeight: 'bold',
                fontFamily: 'BebasNeueBook',
                color: '#fff',
                formatter: params => `${params.value}` === `${maxX}` && params.value ? params.value : ''
              }
            }
            // markPoint: {
            //   symbol: 'bin',
            //   data: [
            //     { type: 'max', name: '最大值', label: { color: '#fff', fontSize: '40', fontFamily: 'BebasNeueBook', fontWeight: 'bold' } },
            //   ]
            // }
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
