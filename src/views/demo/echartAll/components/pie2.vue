<template>
 <div>
  <div id="bar2" :style="{height:height,width:width}" ref="bar2"></div>
 </div>
</template>
<script>
import echarts from 'echarts';
import { numberComma } from '@/common/utils';
export default {
  data () {
    return {
      chart: null,
      height: '500px',
      width: 'auto',
      title: '标题',
      subtitle: 24324
    };
  },
  mounted () {
    this.chart = echarts.init(this.$refs.bar2);
    // 把配置和数据放这里
    this.setOption();
  },
  methods: {
    setOption () {
      // data初始化
      let data = [];
      let healthy = 30; // 多少个圆圈有颜色
      for (let i = 0; i <= 40; i++) {
        // 总共多少个圆圈
        if (i <= healthy) {
          data.push({
            value: [0, i],
            name: 'real'
          });
        } else {
          data.push({
            value: [0, i],
            name: 'unreal',
            visualMap: false
          });
        }
      }
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: this.title,
          subtext: numberComma(this.subtitle),
          left: 'center',
          top: '25%',
          textStyle: {
            color: '#AFB8BD',
            padding: 0,
            fontSize: 34,
            fontWeight: 'normal',
            fontFamily: 'MicrosoftYaHei',
            textAlign: 'center',
            lineHeight: 34
          },
          subtextStyle: {
            // 副标题的属性
            color: '#F6F6F6',
            fontSize: 100, // 大小
            fontFamily: 'BebasNeueBold',
            textAlign: 'center',
            lineHeight: 100
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}'
        },

        visualMap: {
          max: 50,
          inRange: {
            color: ['rgba(0,239,219, 0)', 'rgba(43,186,255, 1)']
          },
          show: false // 取消值域选择器
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['93%', '100%'], // 控制盒子高，就是粗细
            center: ['50%', '50%'],
            clockwise: true,
            data: data,
            color: ['black'],
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#020A0F',
                borderWidth: 5 // 盒子间距
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]

        // backgroundColor: 'black'
      };
      this.chart.setOption(option);
    }
  }
};
</script>
