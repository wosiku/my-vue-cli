<template>
 <div>
  <div id="myEchart" :style="{height:height,width:width}" ref="myEchart"></div>
 </div>
</template>
<script>
import echarts from 'echarts';
import popover from './img/popover.png';
export default {
  data () {
    return {
      chart: null,
      height: '500px',
      width: 'auto'
    };
  },
  mounted () {
    this.chart = echarts.init(this.$refs.myEchart);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      let title = '标题';
      let getNextWeekDates = [1, 2, 3, 4, 5, 6, 7];
      let data = [21, 24, 14, 42, 63, 51, 34];
      let option = {
        title: {
          text: title,
          textStyle: {
            color: '#F6F6F6',
            fontSize: 34,
            fontWeight: 'normal'
          },
          top: 25,
          left: 20
        },
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        xAxis: [
          {
            data: getNextWeekDates,
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
              fontFamily: 'BebasNeueBook',
              fontSize: 30,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            splitNumber: 4,
            type: 'value',
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
            splitArea: {
              show: false
            },
            axisLabel: {
              color: '#F6FCFF',
              fontFamily: 'BebasNeueBook',
              fontSize: 30,
              interval: 0
            }
          }
        ],
        series: [
          {
            name: '人次',
            type: 'line',
            data: data,
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
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#fff',
                borderWidth: 1,
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
          top: 150,
          left: 100,
          bottom: 126
        }
      };
      this.chart.setOption(option);
    }
  }
};
</script>
