<template>
  <div>
    <div class="box">
      <el-button @click="childFlag = true">选择</el-button>{{dayClone}}{{day}}
      <child v-show="childFlag" :childFlag.sync="childFlag" @selectDay='selectDay'></child>
      <span>{{ msg }}</span>
      <el-button class="dftbutton">默认按钮</el-button>
      <div class="shade-div" ref="shadeDiv" @mousedown.stop="shadedivMousedown" @mouseup.stop="shadedivMouseup" @mousemove.stop="shadedivMousemove">
        <div class="shade" ref="shade" @mousedown.stop="shadeMousedown" @mouseup="shadeMouseup" @mousemove="shadeMousemove"></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios'
import child from './child.vue';
export default {
  name: 'hellow',
  data () {
    return {
      childFlag: false,
      day: '永不',
      msg: 'Welcome to Your Vue.js App..',
      moveFlag: false,
      moveFlag2: false,
      clientX: 0,
      clientY: 0,
      disX: 0,
      disY: 0
    };
  },
  computed: {
    dayClone () {
      if (Object.prototype.toString.call(this.day) !== '[object Array]') {
        return this.day;
      }
      function compare (property, desc) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          if (desc === true) {
            return value1 - value2;
          } else {
            return value2 - value1;
          }
        };
      }
      let day = this.day;
      console.log(day, 'day');
      day.sort(compare('order', true));
      let show = '';
      day.forEach((ele, ind) => {
        if (!ele.show) {
          show += (ele.week);
        }
      });
      return show;
    },
    shadedivLeft () {
      return this.$refs.shadeDiv.offsetLeft;
    },
    shadedivRight () {
      return this.$refs.shadeDiv.offsetLeft + this.$refs.shadeDiv.offsetWidth;
    },
    shadedivTop () {
      return this.$refs.shadeDiv.offsetTop;
    },
    shadedivBottom () {
      return this.$refs.shadeDiv.offsetTop + this.$refs.shadeDiv.offsetHeight;
    }
  },
  methods: {
    keyupFn () {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 27) {
          setTimeout(() => {
            this.$options.data();
            this.$refs.shade.style.display = 'none';
            this.$refs.shade.style.left = '0px';
            this.$refs.shade.style.top = '0px';
            this.$refs.shade.style.width = '0px';
            this.$refs.shade.style.height = '0px';
          }, 100);
        }
      };
    },
    selectDay (day) {
      this.day = day;
    },
    shadedivMousedown (e) {
      this.moveFlag = true;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      this.$refs.shade.style.display = 'block';
      this.$refs.shade.style.left = this.clientX + 'px';
      this.$refs.shade.style.top = this.clientY + 'px';
    },
    shadedivMousemove (e) {
      if (this.moveFlag) {
        let left = e.clientX - this.clientX;
        let top = e.clientY - this.clientY;
        this.$refs.shade.style.width = left + 'px';
        this.$refs.shade.style.height = top + 'px';
      }
    },
    shadedivMouseup (e) {
      this.moveFlag = false;
    },
    shadeMousedown (e) {
      this.moveFlag2 = true;
      let odiv = e.target;
      this.disX = e.clientX - odiv.offsetLeft;
      this.disY = e.clientY - odiv.offsetTop;
      this.disW = odiv.offsetWidth;
      this.disH = odiv.offsetHeight;
    },
    shadeMousemove (e) {
      if (this.moveFlag2) {
        let left = e.clientX - this.disX;
        let top = e.clientY - this.disY;
        // 边界处理
        let leftMax = this.shadedivRight - this.disW;
        let topMax = this.shadedivBottom - this.disH;
        left = left < this.shadedivLeft ? this.shadedivLeft : left;
        left = left > leftMax ? leftMax : left;
        top = top < this.shadedivTop ? this.shadedivTop : top;
        top = top > topMax ? topMax : top;
        this.$refs.shade.style.left = left + 'px';
        this.$refs.shade.style.top = top + 'px';
      }
    },
    shadeMouseup (e) {
      this.moveFlag2 = false;
    }
  },
  components: {
    child
  },
  created () {
    this.keyupFn();
    // axios.post('api/test').then(res => console.log(res)).catch(err => console.log(err))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// 媒体查询，当屏幕小于1300时，用以下样式
.dftbutton {
  width: 150px;
  height: 50px;
}
@media screen and (max-width: 1300px) {
  .dftbutton {
    width: 90px;
    height: 40px;
  }
}
.shade-div {
  position: relative;
  width: 400px;
  height: 600px;
  background: url(/static/img/mm1.jpg) no-repeat;
  background-size: cover;
  .shade {
    display: none;
    width: 0px;
    height: 0px;
    outline: 9999px solid rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    border: 1px solid red;
    cursor: move;
  }
}
  .box {
    span {
      color: red;
    }
  }
</style>
