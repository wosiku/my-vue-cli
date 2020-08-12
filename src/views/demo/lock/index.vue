<template>
  <div class="lockDiv">
    <div class="top">
      <div class="content">
        <img src="./components/image/adminLogo.png" />
        <b>LANIF</b>
        <span>Adimn</span>
      </div>
    </div>
    <div class="con">
      <p>欢迎您回来</p>
      <p>使用图案进行解锁</p>
      <div :class="{vibrate: isAnimation}">
        <div ref="patternLock"></div>
      </div>
      <p>
        <el-button icon="el-icon-question" @click="dialogVisible = !dialogVisible">图案提示</el-button>
      </p>
    </div>
    <div class="foot">
      <p class="p1">{{date}}</p>
      <p class="p2">{{hours}}<span class="point">:</span>{{min}}<span class="point">:</span>{{sec}}</p>
    </div>
    <!-- 查看图片弹框 -->
    <el-dialog class="picDialog" :visible.sync="dialogVisible" :append-to-body='true'>
      <img width="310px" src="./components/image/pattern.png" alt="">
    </el-dialog>
  </div>
</template>
<script>
import './components/PatternLock/style/index.less';
import PatternLock from './components/PatternLock/PatternLock.js';
export default {
  data () {
    return {
      dialogVisible: false,
      lock: null,
      howPattern: false,
      patternError: null,
      isAnimation: false,
      // time
      date: '',
      hours: '',
      min: '',
      sec: '',
      monthNames: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
      dayNames: [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ],
      timer: null
      // time
    };
  },
  mounted () {
    this.lock = new PatternLock(this.$refs.patternLock, {
      enableSetPattern: true
    });
    this.onCheckPattern();
    this.formatClock();
    this.timer = setInterval(this.formatClock, 1000);
  },
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    formatClock () {
      const now = new Date();
      const hours = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      this.date = `${now.getFullYear()} ${this.monthNames[now.getMonth()]} ${now.getDate()} ${this.dayNames[now.getDay()]}`;
      this.hours = hours < 10 ? '0' + hours : hours;
      this.min = min < 10 ? '0' + min : min;
      this.sec = sec < 10 ? '0' + sec : sec;
    },
    onCheckPattern () {
      const lock = '14753';
      this.lock.checkForPattern(
        lock,
        () => {
          this.onChange(true);
          console.log('You unlocked your app');
        },
        () => {
          this.onChange(false);
          console.log('Pattern is not correct');
        }
      );
    },
    onChange (lock) {
      if (lock) {
        alert('解锁成功');
      } else {
        // alert('解锁失败');
        this.isAnimation = true;
        setTimeout(() => {
          this.isAnimation = false;
        }, 300);
      }
    }
  }
};
</script>
<style lang="less" scoped>
  .lockDiv {
    background: #152238;
    height: 100%;
    display: flex;
    flex-direction: column;
    .vibrate {
      transform: translate3d(0,0,0);
      -webkit-animation: vibrate 0.5s linear 1 both;
      animation: vibrate 0.5s linear 1 both;
      @-webkit-keyframes vibrate {
        0% {
          -webkit-transform: translate(0);
                  transform: translate(0);
        }
        10% {
          -webkit-transform: translate(-4px, -4px);
                  transform: translate(-4px, -4px);
        }
        20% {
          -webkit-transform: translate(4px, -4px);
                  transform: translate(4px, -4px);
        }
        30% {
          -webkit-transform: translate(-4px, 4px);
                  transform: translate(-4px, 4px);
        }
        40% {
          -webkit-transform: translate(4px, 4px);
                  transform: translate(4px, 4px);
        }
        50% {
          -webkit-transform: translate(-4px, -4px);
                  transform: translate(-4px, -4px);
        }
        60% {
          -webkit-transform: translate(4px, -4px);
                  transform: translate(4px, -4px);
        }
        70% {
          -webkit-transform: translate(-4px, 4px);
                  transform: translate(-4px, 4px);
        }
        80% {
          -webkit-transform: translate(-4px, -4px);
                  transform: translate(-4px, -4px);
        }
        90% {
          -webkit-transform: translate(4px, -4px);
                  transform: translate(4px, -4px);
        }
        100% {
          -webkit-transform: translate(0);
                  transform: translate(0);
        }
      }
      @keyframes vibrate {
        0% {
          -webkit-transform: translate(0);
                  transform: translate(0);
        }
        10% {
          -webkit-transform: translate(-4px, -4px);
                  transform: translate(-4px, -4px);
        }
        20% {
          -webkit-transform: translate(4px, -4px);
                  transform: translate(4px, -4px);
        }
        30% {
          -webkit-transform: translate(-4px, 4px);
                  transform: translate(-4px, 4px);
        }
        40% {
          -webkit-transform: translate(4px, 4px);
                  transform: translate(4px, 4px);
        }
        50% {
          -webkit-transform: translate(-4px, -4px);
                  transform: translate(-4px, -4px);
        }
        60% {
          -webkit-transform: translate(4px, -4px);
                  transform: translate(4px, -4px);
        }
        70% {
          -webkit-transform: translate(-4px, 4px);
                  transform: translate(-4px, 4px);
        }
        80% {
          -webkit-transform: translate(-4px, -4px);
                  transform: translate(-4px, -4px);
        }
        90% {
          -webkit-transform: translate(4px, -4px);
                  transform: translate(4px, -4px);
        }
        100% {
          -webkit-transform: translate(0);
                  transform: translate(0);
        }
      }
    }
    .top {
      height: 110px;
      display: flex;
      align-items: flex-end;
      padding-left: 120px;
      .content {
        display: flex;
        align-items: center;
        color: #fff;
        img {
          width: 45px;
        }
        b {
          margin-left: 15px;
        }
      }
    }
    .con {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        text-align: center;
        color: #fff;
      }
    }
    .foot {
      height: 160px;
      color: #fff;
      padding-right: 50px;
      p {
        text-align: right;
      }
      .p1 {
        font-size: 20px;
      }
      .p2 {
        font-size: 60px;
        font-weight: 900;
        font-family: Roboto;
        // letter-spacing: 2px;
        // line-height: 80px;
        .point {
          padding: 0 4px;
          animation: 1s ease 0s normal none infinite flash;
          position: relative;
          top: -5px;
        }
      }
    }
  }
  @keyframes flash{
    0% {opacity:1.0;}
    50% {opacity:0; }
    100% {opacity:1.0;}
  }
  .picDialog {
    /deep/.el-dialog {
      background: #152238;
      width: 350px;
    }
  }
</style>
