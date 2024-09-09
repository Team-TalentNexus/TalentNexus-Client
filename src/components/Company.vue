<template>
  <el-container>
    <!-- 左侧菜单 -->
    <el-aside class="aside-class" width="200px">
      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen"
        @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/company/home">
          <i class="el-icon-menu"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
        <el-menu-item index="/company/jobs">
          <i class="el-icon-document"></i>
          <span slot="title">招聘管理</span>
        </el-menu-item>
        <el-menu-item index="/company/position">
          <i class="el-icon-circle-plus-outline"></i>
          <span slot="title">新增招聘</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧主内容 -->
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen() {
      // Handle menu open
    },
    handleClose() {
      // Handle menu close
    }
  }
};
</script>

<style>
.el-container {
  height: 100vh; /* 设置高度为视口高度 */
}

.el-aside {
  background-color: #545c64;
}

.el-menu-vertical-demo {
  height: 100%; /* 菜单高度设置为100% */
}
</style>
