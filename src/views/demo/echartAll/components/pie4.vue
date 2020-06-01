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
      width: 'auto',
      percentage: 43,
      colorStyle: 1
    };
  },
  computed: {
    colorMod () {
      let c1 = {
        '1': '#011d1e',
        '2': '#01121e',
        '3': '#011d1e'
      }[this.colorStyle];
      let c2 = {
        '1': 'rgba(43,216,221,1)',
        '2': 'rgba(43,186,255,1)',
        '3': 'rgba(43,221,158,1)'
      }[this.colorStyle];
      let c3 = {
        '1': 'rgba(43,216,221,0.1)',
        '2': 'rgba(43,186,255,0.1)',
        '3': 'rgba(43,221,158,0.1)'
      }[this.colorStyle];
      return [c1, c2, c3];
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.bar2);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      let percentage = this.percentage;
      let title = '标题';
      let option = {
        title: {
          text: title,
          left: 'center',
          top: '60%',
          textStyle: {
            color: '#AFB8BD',
            padding: 0,
            fontWeight: 0,
            fontSize: 34 // 大小
          }
        },
        series: [
          {
            type: 'pie',
            clockWise: false,
            radius: ['79%', '86%'], // %7的间距
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,

            data: [
              {
                value: 100 - Math.round(percentage),
                itemStyle: {
                  normal: {
                    color: this.colorMod[0]
                    // shadowColor: '#29D202',
                    // shadowBlur: 20
                  }
                }
              },
              {
                value: Math.round(percentage),
                label: {
                  normal: {
                    // formatter: '{d}%',
                    formatter: ['{a|{d}}', '{b| %}'].join(''),
                    position: 'center',
                    show: true,
                    rich: {
                      a: {
                        fontSize: '100',
                        fontWeight: 'normal',
                        color: '#ffffff',
                        padding: [60, 0, 0, 0],
                        fontFamily: 'BebasNeueBold'
                      },
                      b: {
                        fontSize: '34',
                        padding: [60, 0, 40, -10],
                        fontWeight: 'normal',
                        color: '#AFB8BD',
                        fontFamily: 'BebasNeueBook'
                      }
                    }
                  }
                },
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: this.colorMod[1] // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: this.colorMod[2] // 100% 处的颜色
                        }
                      ],
                      global: false // 缺省为 false
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
