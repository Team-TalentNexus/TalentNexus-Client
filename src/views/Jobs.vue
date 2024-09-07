<template>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="正在招" name="second">
            <router-view></router-view>
          </el-tab-pane> 
          <el-tab-pane label="已招满" name="third">
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeName: 'first' // 默认选中的标签
      };
    },
    methods: {
      handleClick(tab, event) {
        // 这里可以处理标签点击事件
      },
      collapse() {
        // 实现折叠功能
      }
    }
  };
  </script>
  