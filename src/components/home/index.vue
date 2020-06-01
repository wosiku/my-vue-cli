<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">平台</div>
    <div class="content">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <side-bar></side-bar>
      </div>
      <!-- 内容区域 -->
      <div class="container">
        <div class="containerWrap">
          <!-- 面包屑 -->
          <breadNav></breadNav>
          <!-- 面包屑以下 -->
          <div style="padding: 30px;">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sideBar from './../sideBar/index';
import breadNav from './../breadNav/index';
export default {
  name: 'index',
  components: { sideBar, breadNav },
  watch: {
  }
};
</script>
<style scoped lang="less">
  .home {
    width: 100%;
    height: 100%;
    // min-width: 900px;
    // min-height: 600px;
    display: flex;
    flex-direction: column;
    .header {
      height: 74px;
      line-height: 74px;
      background: #fff;
      font-size: 30px;
    }
    .content {
      flex: 1;
      display: flex;
      overflow: hidden;
      .sidebar {
        width: auto;
        // min-width: 150px;
        height: 100%;
      }
      .container {
        border: 1px solid #eee;
        flex: 1;
        height: 100%;
        overflow: auto;
        background: #F7F9FF;
        .containerWrap {
          min-width: 800px;
          min-height: 500px;
        }
      }
    }
  }
</style>
