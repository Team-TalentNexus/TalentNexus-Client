<template>
  <div id="app">
    <router-view />
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>注册登录</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
        <el-menu-item index="/userInfo">用户信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/employeeHome">
      <i class="el-icon-menu"></i>
      <span slot="title">求职者首页</span>
    </el-menu-item>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
