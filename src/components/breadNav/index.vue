<template>
  <div class="breadNav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) of breadNav" :to="{ path: item.url }" :key = "'breadnav' + index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      breadNav: []
    };
  },
  created () {
    this.breadNav = this.getBreadNav(this.addTitle(), this.$route.path);
  },
  methods: {
    addTitle () {
      let menu = localStorage.getItem('menuData') ? JSON.parse(localStorage.getItem('menuData')) : [];
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].menus.length; j++) {
          menu[i].menus[j].breadNav = [
            {title: menu[i].title, url: menu[i].url},
            {title: menu[i].menus[j].title, url: menu[i].menus[j].url}
          ];
          if (menu[i].menus[j].submenus && menu[i].menus[j].submenus.length > 0) {
            for (let k = 0; k < menu[i].menus[j].submenus.length; k++) {
              menu[i].menus[j].submenus[k].breadNav = [
                {title: menu[i].title, url: menu[i].url},
                {title: menu[i].menus[j].title, url: menu[i].menus[j].url},
                {title: menu[i].menus[j].submenus[k].title, url: menu[i].menus[j].submenus[k].url}
              ];
            }
          }
        }
      }
      console.log(menu, 'addtitleddddddd');
      return menu;
    },
    getBreadNav (menu, path) {
      let breadNav = [];
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].menus.length; j++) {
          if (menu[i].menus[j].submenus && menu[i].menus[j].submenus.length > 0) {
            for (let k = 0; k < menu[i].menus[j].submenus.length; k++) {
              if (menu[i].menus[j].submenus[k].url === path) {
                breadNav = menu[i].menus[j].submenus[k].breadNav;
              }
            }
          } else {
            if (menu[i].menus[j].url === path) {
              breadNav = menu[i].menus[j].breadNav;
            }
          }
        }
      }
      return breadNav;
    }
  },
  watch: {
    '$route' () {
      this.breadNav = this.getBreadNav(this.addTitle(), this.$route.path);
    }
  }
};
</script>
<style lang="less" scoped>
  .breadNav {
    padding: 20px;
    background: #fff;
  }
</style>
