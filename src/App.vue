<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.addEventListener('hashchange', () => {
      var currentPath = window.location.hash.slice(1); // 获取输入的路由
      if (this.$router.path !== currentPath) {
        // 在路由上加#...之类的会触发，这里路由定义是history模式，无需hash，回到之前的路由
        this.$router.push(currentPath); // 动态跳转
      }
    }, false);
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
