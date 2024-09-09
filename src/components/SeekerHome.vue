<template>
  <el-row type="flex" justify="center" align="middle" style="height: 100vh; background-color: #f0f0f0;">
    <el-col :span="12">
      <el-card shadow="hover">
        <div style="text-align: center; font-size: 30px; font-weight: bold; color: #333;">
          欢迎使用校企慧求职管理系统
        </div>
        <el-button type="text" style="position: absolute; top: 20px; right: 20px;" @click="logout">退出登录</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "WelcomePage",
  methods: {
    logout() {
      // 清除本地存储中的 token
      localStorage.removeItem('token');  
      // 你可以在清除 token 后，跳转到登录页面或执行其他操作
      this.$router.push('/'); 
    }
  }
};
</script>

<style scoped>
/* 你可以根据需要自定义样式 */
</style>
