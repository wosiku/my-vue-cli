<template>
  <div class="main">
    <div class="left common">
      <img src="@/assets/logo.png" />
      <b>WOSIKU</b>
      <span>Adimn</span>
      <ul>
        <li><i class="el-icon-ice-cream"></i></li>
        <li><i class="el-icon-magic-stick"></i></li>
        <li><i class="el-icon-full-screen"></i></li>
        <li @click="lockFn"><i class="el-icon-lock"></i></li>
      </ul>
    </div>
    <div class="center common">WOSIKU</div>
    <div class="right common">
      <ul>
        <li><i class="el-icon-s-promotion"></i></li>
        <li><i class="el-icon-shopping-cart-2"></i></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    };
  },
  methods: {
    lockFn () {
      this.$router.push('/lock');
    }
  }
};
</script>
<style lang="less" scoped>
  .main {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .common {
      height: 100%;
      display: flex;
      align-items: center;
      ul {
        height: 100%;
        display: flex;
        padding: 0 10px;
        li {
          width: 50px;
          height: 100%;
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &:hover {
            background: #f1f1f1;
            i {
              color: #409EFF;
            }
          }
          i {
            width: 22px;
          }
        }
      }
    }
    .left {
        img {
          width: 30px;
        }
        b {
          margin: 0 5px;
        }
    }
    .center {

    }
    .right {

    }
  }
</style>
