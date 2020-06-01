<template>
 <div>
  <div id="myEchart" :style="{height:height,width:width}" ref="myEchart"></div>
 </div>
</template>
<script>
import popover from './img/window_blue.png';
import { numberComma } from '@/common/utils';
import echarts from 'echarts';
export default {
  data () {
    return {
      chart: null,
      height: '500px',
      width: 'auto',
      markAreaXAxis: '00:00',
      data: {
        xAxis: [3223, 252, 2535, 232],
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
        top: 102,
        left: 120,
        right: 80,
        bottom: 126.5
      };
      let option = {
        tooltip: {
          trigger: 'axis',
          padding: 0,
          backgroundColor: 'rgba(0,0,0,0)',
          // 这里使用tooltip实现series的label效果是因为 markArea需要随鼠标移动而变化的实现效果，导致了不能正常显示
          formatter: params => {
            return `
            <div style="background: url('${popover}') center center no-repeat; position: relative; width: 160px; height: 80px; color: #020A0F; font-size: 50px; line-height: 50px; text-align: center; padding-top: 12px; font-family: BebasNeueBook;">
              ${numberComma(params[0].value)}
              <div style="position: absolute; left: 50%; bottom: -24px; width: 14px; height: 14px; margin-left: -7px; background: #2bbaff; border-radius: 50%; border: 2px solid #fff;">
            </div>`;
          },
          position: (p, params) => {
            const param = params[0];
            // 转换成点位对应的坐标值
            const point = this.chart.convertToPixel({seriesIndex: 0}, [param.dataIndex, parseInt(param.value)]);
            // 偏移处理
            point[0] = point[0] - 80;
            point[1] = point[1] - 95;
            return point;
          }
        },
        xAxis: [{
          type: 'category',
          data: this.data ? this.data.xAxis : [],
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
            width: '70px',
            height: '30px',
            color: '#F6FCFF',
            margin: 30.5,
            align: 'center',
            fontFamily: 'BebasNeueBook',
            fontSize: '30px',
            interval: 1
          }
        }],
        yAxis: [{
          name: '人次',
          nameLocation: 'end',
          nameGap: 35,
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
            padding: [0, 20, 0, 5],
            fontFamily: 'BebasNeueBook',
            fontSize: '30',
            interval: 0
          }
        }],
        series: [{
          name: '人次',
          type: 'line',
          data: this.data ? this.data.data : [],
          symbolSize: 2,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 3,
              type: 'solid',
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: '#2BDDFF' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#2B68FF' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderWidth: 2,
              borderColor: '#2BBAFF',
              opacity: 1
            }
          },
          markArea: {
            animation: true,
            animationDuration: 100,
            data: [
              [{
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 1,
                    y: 0,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                      offset: 0, color: 'rgba(43,186,255,0.3)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(43,186,255,0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
                xAxis: '00:00'
              }, {
                xAxis: this.markAreaXAxis
              }]
            ]
          },
          // label:{
          //   normal: {
          //     show: true,
          //     formatter: '{c|{c}}',
          //     width: 160,
          //     height: 68,
          //     padding: [12, 0, 0, 0],
          //     backgroundColor: {
          //       image: `${require("../../assets/window_blue.png")}`
          //     },
          //     rich: {
          //       c: {
          //         align: 'center',
          //         fontSize: 50,
          //         fontFamily: 'BebasNeueBook',
          //         lineHeight: 50,
          //         color: '#020A0F',
          //       }
          //     }
          //   }
          // },
          smooth: true,
          smoothMonotone: 'x'
        }],
        grid
      };
      this.chart.setOption(option);
    }
  }
};
</script>
