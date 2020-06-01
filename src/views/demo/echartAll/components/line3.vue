<template>
 <div>
  <div id="myEchart" :style="{height:height,width:width}" ref="myEchart"></div>
 </div>
</template>
<script>
import { numberComma } from '@/common/utils';
import echarts from 'echarts';
export default {
  data () {
    return {
      chart: null,
      height: '500px',
      width: 'auto',
      dataLast: {
        xAxis: [223, 252, 2535, 232],
        data: [4223, 552, 5535, 932]
      },
      dataNow: {
        data: [232, 3123, 2323, 6323]
      }
    };
  },
  mounted () {
    this.chart = echarts.init(this.$refs.myEchart);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      const grid = {
        left: 125,
        top: 92,
        right: 40,
        bottom: 126
      };
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            if (params.length === 2) {
              return `
                <div style="font-family: BebasNeueBold; font-size: 40px; line-height: 40px; color:#F2FFFF">
                  ${numberComma(params[1].value)}
                </div>
                <div style="font-family: BebasNeueBold; font-size: 40px; line-height: 40px; color:#2BD8DD">
                  ${numberComma(params[0].value)}
                </div>`;
            } else if (params.length === 1) {
              return `
                <div style="font-family: BebasNeueBold; font-size: 40px; line-height: 40px; color:#F2FFFF">
                  ${numberComma(params[0].value)}
                </div>
              `;
            }
          },
          // axisPointer: {
          //   // 坐标轴指示器，坐标轴触发有效
          //   type: "line", // 默认为直线，可选为：'line' | 'shadow'
          //   shadowStyle: {
          //     color: {
          //       type: "radial",
          //       x: 0.5,
          //       y: 0.5,
          //       r: 5,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: "rgba(43,216,221,.5)" // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "rgba(43,216,221,.1)" // 100% 处的颜色
          //         }
          //       ],
          //       globalCoord: false // 缺省为 false
          //     }
          //   },
          //   z: 1,
          // },
          backgroundColor: '#021522',
          padding: [10, 15]

          // position: function(point, params, dom, rect, size) {
          //   // canvas 尺寸
          //   const viewSize = size.viewSize;
          //   // x、y起始坐标
          //   const xStart = grid.left;
          //   const yStart = grid.bottom;
          //   // x、y结束坐标
          //   const xEnd = viewSize[0] - grid.right;
          //   const yEnd = viewSize[1] - grid.top;
          //   // x、y轴长度
          //   const xLen = xEnd - xStart;
          //   const yLen = yEnd - yStart;
          //   console.log(point, params, rect, size);
          // }
        },
        legend: {
          color: ['#F6FFFC', '#2BDD9E'],
          data: [this.getCurrentMonth().lastMonth, this.getCurrentMonth().month],
          right: 250,
          top: 5,
          Width: 50,
          Height: 30,
          itemWidth: 16,
          itemHeight: 16,
          orient: 'horizontal',
          itemGap: 40,
          selectedMode: false,
          textStyle: {
            fontFamily: 'MicrosoftYaHeiSemilight',
            fontSize: 24,
            color: '#F6FCFF',
            lineHeight: 64
          },
          icon: 'circle'
        },
        xAxis: [
          {
            type: 'category',
            data: this.dataLast ? this.dataLast.xAxis : [],
            axisLine: {
              lineStyle: {
                color: '#2B2D2F',
                type: 'solid'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#2B2D2F'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 30,
              color: '#F6FCFF',
              padding: [0, 20, 0, 5],
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
            nameGap: 30,
            type: 'value',
            axisTick: {
              show: false
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
            splitLine: {
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
            name: this.getCurrentMonth().month,
            type: 'line',
            color: '#2BDD9E',
            data: this.dataNow ? this.dataNow.data : [],
            lineStyle: {
              normal: {
                width: 2,
                type: 'solid',
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#2BD8DD ' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#2BDD9E ' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            symbol: 'circle',
            symbolSize: 0.1,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#2BD8DD',
                borderWidth: 0,
                borderColor: 'rgba(43, 216, 221, .6)'
              }
            },
            // label: {
            //   normal: {
            //     show: true,
            //     fontSize: 40,
            //     fontFamily: 'BebasNeueBook',
            //     fontWeight: 'bold',
            //     formatter: params => numberComma(params.value),
            //   }
            // },
            smooth: true,
            smoothMonotone: 'x',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(43,216,221,0.9)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(43,221,158,0.1)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            z: 9
          }, {
            name: this.getCurrentMonth().lastMonth,
            type: 'line',
            data: this.dataLast ? this.dataLast.data : [],
            lineStyle: {
              normal: {
                width: 2,
                type: 'solid',
                color: {
                  type: 'linear',
                  colorStops: [
                    {
                      offset: 0.8,
                      color: '#F2FFFF' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#F6FFFC' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            symbol: 'circle',
            symbolSize: 0.1,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#F2FFFF',
                borderWidth: 0,
                borderColor: 'rgba(43, 216, 221, .6)'
              }
            },
            // label: {
            //   normal: {
            //     show: true,
            //     fontSize: 40,
            //     fontFamily: 'BebasNeueBook',
            //     fontWeight: 'bold',
            //     formatter: params => numberComma(params.value),
            //   }
            // },
            smooth: true,
            smoothMonotone: 'x',
            z: 9
          }
        ],
        grid
      };
      this.chart.setOption(option);
    },
    getCurrentMonth () {
      let date = new Date();
      let month = date.getMonth() + 1 + '月';
      let lastMonth = date.getMonth() + '月';
      return {month, lastMonth};
    }
  }
};
</script>
