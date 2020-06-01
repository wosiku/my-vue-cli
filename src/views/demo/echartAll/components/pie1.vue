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
      let title = '酒店剩余房间';
      let amount = 30;
      let num1 = 22;
      let num2 = 45;
      let num3 = 30;

      let sum = Number(num1) + Number(num2) + Number(num3);
      let value1 = (num1 / sum * 100).toFixed(2);
      let value2 = (num2 / sum * 100).toFixed(2);
      let value3 = (num3 / sum * 100).toFixed(2);
      // 虚线部分 data循环次数 1.75为基数，不是很准，但还行
      let dottedNum = Math.ceil(value3 * 1.75);
      // data初始化
      let scaleData = [{
        'name': '',
        'value': value1
      },
      {
        'name': '',
        'value': value2
      }
      ];
      let rich = {
        white: {
          color: '#ddd',
          align: 'center',
          padding: [5, 0]
        }
      };
      let placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      };
      let data = [];
      for (let i = 0; i < scaleData.length; i++) {
        data.push({
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 25,
              // shadowBlur: 30,
              color: {
                colorStops: [{
                  offset: 0,
                  color: '#00f7fb' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#00b3f2' // 100% 处的颜色
                }]
              },
              borderColor: {
                colorStops: [{
                  offset: 0,
                  color: '#00f7fb' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#00b3f2' // 100% 处的颜色
                }]
              }
              // shadowColor: 'rgba(142, 152, 241, 0.6)'
            }
          }
        }, {
          value: 2, // 盒子间距
          name: '',
          itemStyle: placeHolderStyle
        });
      }
      data[2].itemStyle = {
        normal: {
          borderWidth: 0,
          // shadowBlur: 30,
          color: 'rgba(43,186,255,0.5)',
          borderColor: {
            colorStops: [{
              offset: 0,
              color: '#2BBAFF' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#2BBAFF' // 100% 处的颜色
            }]
          }
        // shadowColor: 'rgba(142, 152, 241, 0.6)'
        }
      };
      data[3].value = 1;
      // 最后一段虚线
      let data2 = [];
      for (let i = 0; i < dottedNum; i++) {
        data2.push({
          value: 0.1, // 盒子间距
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: '#D8D8D8',
              borderColor: '#D8D8D8',
              borderWidth: 0.1
            }
          }
        }, {
          value: 0.5, // 盒子间距
          name: '',
          itemStyle: placeHolderStyle
        });
      }
      // 合并data
      data = [...data, ...data2, { // 最后一段间隙
        value: 1, // 盒子间距
        name: '',
        itemStyle: placeHolderStyle
      }];
      let seriesObj = [{
        name: '',
        type: 'pie',
        clockWise: true, // 顺时针
        radius: ['90%', '93%'], // 控制环形圈的大小
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'center',
              color: '#ddd',
              // formatter: function() {
              //     return '例子'
              // },
              rich: rich
            },
            labelLine: {
              show: false
            }
          }
        },
        data: data
      }];
      let option = {
        title: {
          text: title,
          subtext: amount,
          left: 'center',
          top: '25%',
          textStyle: {
            color: '#AFB8BD',
            fontSize: 34,
            fontWeight: 100,
            fontFamily: 'MicrosoftYaHei',
            lineHeight: 34
          },
          subtextStyle: { // 副标题的属性
            fontFamily: 'BebasNeueBold',
            color: '#F6F6F6',
            fontSize: 100, // 大小
            textAlign: 'center',
            lineHeight: 100
          }
        },
        // backgroundColor: 'black',
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      };
      this.chart.setOption(option);
    }
  }
};
</script>
