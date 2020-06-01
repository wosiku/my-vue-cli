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
      let percentage = 30;
      let title = '标题';
      // 外圈第1个饼图的value
      let bigPieOne = 100 - percentage - 0.5;
      // 外圈第2个饼图的value
      let bigPieTwo = 0.5;
      // 外圈第3个饼图的value
      let bigPieThree = percentage;
      // 内圈虚线的第一个饼图value
      let smallPieOne = 100 - percentage;
      // 内圈虚线的第2个饼图value
      let smallPieTwo = percentage;
      let option = {
        // backgroundColor: 'black',
        title: {
          text: title,
          // subtext: '空闲率',
          left: 'center',
          top: '30%',
          textStyle: {
            color: '#AFB8BD',
            padding: 0,
            fontWeight: 0,
            fontSize: 34 // 大小
          }
          // subtextStyle: {//副标题的属性
          //     color: '#AFB8BD',
          //     fontSize: 15,//大小
          // },
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          name: '',
          type: 'gauge',
          radius: '80%',
          startAngle: 0,
          endAngle: 359.9,
          splitNumber: 90, // 分割内圈虚线的粗细 ，如果太细会导致一片黑，调小就好
          axisTick: {
            show: false
          },
          splitLine: {
            length: 139,
            lineStyle: {
              width: 4,
              color: 'black'
            }
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          detail: {
            show: false
          },
          data: [{
            value: 0,
            name: ''
          }]
        },
        {
          name: '',
          type: 'pie',
          radius: ['50%', '50%'],
          silent: true,
          z: 0,
          zlevel: 0,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          data: [{
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                color: '#02edff'
              }
            }
          }]
        },
        {
          name: '',
          type: 'pie',
          radius: ['68%', '61%'],
          silent: true,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          z: 0,
          zlevel: 0,
          data: [{
            value: smallPieOne,
            name: '',
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#2BBAFF' // 内圈虚线完成的颜色
              }
            }
          },
          {
            value: smallPieTwo,
            name: '',
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#2BBAFF', // 内圈虚线未完成的颜色
                opacity: '0.5'
              }
            }
          }
          ]
        },
        {// 外圈边框
          name: 'pie',
          type: 'pie',
          silent: true, // 取消交互效果，这里只是要看起来是外边框
          clockWise: true,
          startAngle: 0,
          radius: ['70.5%', '100%'], // 外圈宽度
          hoverAnimation: false,
          center: ['50%', '50%'],
          data: [
            {
              value: 1,
              label: {
                normal: {
                  formatter: '{d}',
                  position: 'center',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#4850BA' // 外圈边框颜色
                }
              }
            }
          ]
        },
        {
          name: 'pie',
          type: 'pie',
          silent: true,
          clockWise: true,
          startAngle: 90,
          label: {
            normal: {
              show: false // 隐藏指标和指标线线
            }
          },
          radius: ['71%', '99.5%'], // 外圈宽度
          hoverAnimation: false,
          center: ['50%', '50%'],
          data: [{
            value: bigPieOne,
            label: {
              normal: {
                // formatter: '{d}%',
                formatter: ['{a|{d}}', '{b| %}'].join(''),
                position: 'center',
                show: false,
                rich: {
                  a: {
                    fontSize: '80',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    // padding: [0,0,15,15],
                    fontFamily: 'BebasNeueBold'
                  },
                  b: {
                    fontSize: '55',
                    padding: [0, 0, 10, 0],
                    fontWeight: 'normal',
                    color: '#AFB8BD',
                    fontFamily: 'BebasNeueBook'
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: 'rgba(30, 38, 84, 1)'}, // 开头
                    {offset: 1, color: 'rgba(39, 173, 188, 1)'} // 结尾 鲜艳的部分
                  ]
                ),
                shadowColor: '#2BBAFF',
                shadowBlur: 1
              }
            }
          },
          {// 高亮的一个小盒子
            value: bigPieTwo,
            name: '',
            itemStyle: {
              color: '#00f7fb',
              borderColor: '#00f7fb',
              borderWidth: 0
            }
          },
          {
            value: bigPieThree,
            name: '',
            label: {
              normal: {
                formatter: ['{a|{d}}', '{b| %}'].join(''),
                position: 'center',
                show: true,
                rich: {
                  a: {
                    fontSize: '100',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    padding: [-60, 0, 0, 30],
                    fontFamily: 'BebasNeueBold'
                  },
                  b: {
                    fontSize: '34',
                    padding: [-90, 0, 0, -10],
                    fontWeight: 'normal',
                    color: '#AFB8BD',
                    fontFamily: 'BebasNeueBook'
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#1F2F5B', // 未完成的圆环的颜色
                shadowColor: '#1F2F5B',
                shadowBlur: 1
              },
              emphasis: {
                color: 'rgba(30, 38, 84, 1)' // 未完成的圆环的颜色
              }
            }
          }]
        }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
