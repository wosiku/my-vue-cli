<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <prelude></prelude>
    </div>
    <div class="content">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <side-bar></side-bar>
      </div>
      <!-- 内容区域 -->
      <div class="container">
        <!-- 面包屑 -->
        <div class="breadNav">
          <breadNav></breadNav>
        </div>
        <!-- 面包屑以下 -->
        <div class="contentArea">
          <transition name="fade-transform" mode="out-in">
            <router-view class="routerView"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import prelude from './../header/index';
import sideBar from './../sideBar/index';
import breadNav from './../breadNav/index';
export default {
  name: 'index',
  components: { prelude, sideBar, breadNav },
  watch: {
  }
};
</script>
<style scoped lang="less">
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

  .home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      height: 74px;
      background: #fff;
    }
    .content {
      flex: 1;
      display: flex;
      overflow: hidden;
      .sidebar {
        width: auto;
        height: 100%;
      }
      .container {
        border: 1px solid #eee;
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-width: 800px;
        min-height: 500px;
        overflow: auto;
        background: #F7F9FF;
        .breadNav {
          height: auto;
        }
        .contentArea {
          flex: 1;
          // overflow: hidden;
          .routerView {
            height: 100%;
          }
        }
      }
    }
  }
</style>
