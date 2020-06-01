<template>
  <div class="side-bar-tem">
    <div class="offNo" :class="offNoIcon" @click="isCollapse = !isCollapse"></div>
    <el-scrollbar style="height: 100%;">
      <el-menu
      :default-active="defaultActive"
      :class="menuWidth"
      @open="handleOpen"
      @close="handleClose"
      @select="menuSelect"
      :unique-opened="true"
      :router="true"
      :collapse="isCollapse">

        <!-- 循环 -->
        <el-submenu v-for="(item, index) of menuData" :key="'item'+index" :index="item.id">

          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>

          <div v-for="(menuItemA, indexA) of item.menus" :key="'menuItemA'+indexA">
            <template v-if="menuItemA && menuItemA.submenus">
              <el-menu-item-group>
                <el-submenu :index="menuItemA.id">
                  <template slot="title">
                    <i :class="menuItemA.icon"></i>
                    <span slot="title">{{menuItemA.title}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item v-for="(menuItemB, indexB) of menuItemA.submenus" :key="'menuItemB'+indexB" :index="menuItemB.url">{{menuItemB.title}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu-item-group>
            </template>

            <template v-else>
              <el-menu-item :index="menuItemA.url">{{menuItemA.title}}</el-menu-item>
            </template>

          </div>

        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import menuData from './menuData.js';
export default {
  data () {
    return {
      isCollapse: false,
      menuData
    };
  },
  computed: {
    defaultActive () {
      return this.$store.state.menuActive;
    },
    offNoIcon () {
      return this.isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left';
    },
    menuWidth () {
      return this.isCollapse ? 'el-menu-vertical-small' : 'el-menu-vertical-big';
    }
  },
  watch: {
    '$route': {
      handler: function (to, from) {
        // this.$store.commit('setMenuActive', this.$route.path);
        // localStorage.setItem('menuActive', this.$route.path);
        // console.log(to, from, '$route watch =============');
      },
      deep: true
    }
  },
  created () {
    localStorage.setItem('menuData', JSON.stringify(menuData));
    this.getBreadNav(this.addTitle(), this.$route.path);
    // console.log(this.getBreadNav(this.addTitle(), this.$route.path), 'this.getBreadNav(this.addTitle(), this.$route.path)');
  },
  methods: {
    addTitle () {
      let menu = this.menuData;
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
          if (menu[i].menus[j].url === path) {
            breadNav = menu[i].menus[j].breadNav;
          }
          if (menu[i].menus[j].submenus && menu[i].menus[j].submenus.length > 0) {
            for (let k = 0; k < menu[i].menus[j].submenus.length; k++) {
              if (menu[i].menus[j].submenus[k].url === path) {
                breadNav = menu[i].menus[j].submenus[k].breadNav;
              }
            }
          }
        }
      }
      return breadNav;
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath, 'opennnnn');
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    menuSelect (val) {
      console.log(val);
      localStorage.setItem('menuActive', val);
    }
  }
};
</script>
<style lang="less" scoped>
  .side-bar-tem {
    height: 100%;
    position: relative;
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /deep/.el-submenu__title {
      text-align: start;
    }
    .el-menu-vertical-big:not(.el-menu--collapse) {
      width: 180px;
      transform: all 0.5s inherit;
    }
    .el-menu-vertical-small:not(.el-menu--collapse) {
      width: 80px;
      transform: all 0.5s inherit;
    }
    .offNo {
      position: absolute;
      text-align: start;
      line-height: 50px;
      top: 45%;
      width: 25px;
      height: 50px;
      right: -25px;
      border-radius: 0 25px 25px 0;
      background: #e1e1e1;
      cursor: pointer;
      z-index: 999;
    }
  }
</style>
