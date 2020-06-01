<template>
 <div>
  <div id="myEchart" :style="{height:height,width:width}" ref="myEchart"></div>
 </div>
</template>
<script>
import { dateFormat } from '@/common/utils';
import popover from './img/popover.png';
import echarts from 'echarts';
export default {
  data () {
    return {
      chart: null,
      height: '500px',
      width: 'auto',
      data: [124, 334, 3342, 123, 1125, 231, 5132]
    };
  },
  mounted () {
    this.chart = echarts.init(this.$refs.myEchart);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      let option = {
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        xAxis: [
          {
            type: 'category',
            data: this.getNextWeekDates(),
            axisLine: {
              lineStyle: {
                color: '#2B2D2F',
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              width: '65px',
              height: '30px',
              margin: 30,
              color: '#F6FCFF',
              padding: [0, 10, 0, 50],
              fontFamily: 'BebasNeueBook',
              fontSize: '30px',
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '人次',
            nameLocation: 'end',
            nameGap: 40,
            type: 'value',
            splitNumber: 4,
            min: '5',
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#2B2D2F'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#333'
              }
            },
            nameTextStyle: {
              color: '#F6FCFF',
              padding: [0, 140, 0, 0],
              fontSize: '34'
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              color: '#F6FCFF',
              padding: [0, 5, 0, 5],
              fontFamily: 'BebasNeueBook',
              fontSize: '30',
              interval: 0
            }
          }
        ],
        series: [
          {
            name: '人次',
            type: 'line',
            data: this.data ? this.data : [],
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2,
                type: 'solid',
                color: {
                  type: 'linear',

                  colorStops: [
                    {
                      offset: 0,
                      color: '#2BD8DD' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#2BDD9E' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#fff',
                borderWidth: 2,
                borderColor: '#2BD8DD',
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                formatter: '{c|{c}}',
                width: 160,
                height: 58,
                padding: [12, 0, 0, 0],
                backgroundColor: {
                  image: popover
                },
                rich: {
                  c: {
                    align: 'center',
                    fontSize: 50,
                    fontFamily: 'BebasNeueBook',
                    lineHeight: 50,
                    color: '#020A0F'
                  }
                }
              }
            },
            markPoint: {
              // 提示框设置 对话框
              symbol: `image://${popover}`, // 标记的图形
              symbolSize: [160, 70],
              symbolOffset: [0, -46],
              label: {
                offset: [0, 0] // 文本在框中的位置偏移
              },
              animationDelay: 500,
              animationDuration: 500,
              silent: true,
              itemStyle: {
                color: '#2BDD9E'
              },
              data: [
                { type: 'max', name: '最大值', label: { color: '#020A0F', fontSize: '50', fontFamily: 'BebasNeueBook' } }
              ]
            },
            smooth: true,
            smoothMonotone: 'x',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(43,186,255,0.9)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,239,219,0.1)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ],
        grid: {
          left: 110,
          top: 102,
          right: 40,
          bottom: 126
        }
      };
      this.chart.setOption(option);
    },
    getNextWeekDates () {
      const now = new Date();
      const aDay = 24 * 60 * 60 * 1000;
      let arr = [];
      let i = 0;
      while (++i <= 7) {
        arr.push(dateFormat(now.getTime() + (aDay * i), 'MM.DD'));
      }
      return arr;
    }
  }
};
</script>
