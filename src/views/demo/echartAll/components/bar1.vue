<template>
 <div>
  <div id="myEchart" :style="{height:height,width:width}" ref="myEchart"></div>
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
    this.chart = echarts.init(this.$refs.myEchart);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      var titleArr = ['童话世界', '海洋乐园', '雪山水上王国'];
      var resultArr = [6100, 3200, 2800];
      var sumArr = [12000, 12000, 12000];
      let option = {
        grid: {
          show: 'true',
          borderWidth: '0',
          height: '100%', // 进度条之间的高
          width: '62%', // 进度条的总宽
          x: '20%', // 进度条的padding-left
          y: '0%'
        },
        tooltip: {
          show: false, // 取消鼠标悬浮出现的提示框
          enterable: false,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b0}: {c0}'
        },
        // backgroundColor: 'black',        //背景色
        xAxis: {
          show: false, // 是否显示x轴
          type: 'value'
        },
        yAxis: {
          type: 'category',
          inverse: true, // 让y轴数据逆向
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666' // y轴字体颜色
            },
            formatter: function (value) {
              // console.log('{lg|' + '}' + '{title|' + value + '}')
              return [
                '{lg|' + '}' + '{title|' + value + '} '
              ].join('\n');
            },
            // 定义富文本标签
            rich: {
              lg: {
                fontWeight: 'bold',
                fontSize: 20, // 字体默认12
                color: '#08C',
                padding: [0, 5, 0, 0]
              },
              title: {
                color: '#AFB8BD',
                fontSize: 30, // y轴标题字体大小
                fontWeight: 'lighter',
                fontFamily: 'MicrosoftYaHeiSemilight',
                padding: [0, 40, 0, 0]
                // borderWidth: 1,
                // borderColor: '#08c'
                // textareaBorderColor: '#08c',
              }
            }
          },
          splitLine: {show: false}, // 横向的线
          axisTick: {show: false}, // y轴的端点
          axisLine: {show: false}, // y轴的线
          data: titleArr
        },
        series: [
          {
            name: '数据内框',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    // {offset: 0, color: 'black'}, // 开头
                    {offset: 0.1, color: 'rgba(0,239,219,0.1)'}, // 开头
                    {offset: 1, color: '#2BBAFF'} // 开头
                  ]
                ),
                shadowBlur: 5,
                shadowColor: '#00EFDB', // 阴影
                shadowOffsetX: 3,
                shadowOffsetY: 0
              }
            },
            label: {
              normal: {
                show: false,
                position: 'right',
                padding: [0, 0, 0, 20],
                color: '#ffffff',
                fontSize: 20
              }
            },
            barWidth: 16,
            data: resultArr // 数据源
          },
          {
            name: '外框',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                color: 'rgba(255, 255, 255, 0.14)' // rgba设置透明度0.14
              }
            },
            barGap: '-100%',
            z: 0,
            barWidth: 16,
            data: sumArr, // 外圈数据
            label: {
              normal: {
                show: true,
                position: 'right',
                padding: [0, 0, 0, 30],
                color: '#ffffff',
                fontSize: 50, // 条形数据字体大小
                fontFamily: 'BebasNeueBook',
                formatter: function (param) {
                  return resultArr[param.dataIndex];
                }
              }
            }
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
