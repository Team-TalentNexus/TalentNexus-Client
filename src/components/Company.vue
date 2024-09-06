<template>
    <el-container style="min-height: 100vh">
      <el-aside width=200px style="background-color:#ccc"> <!--width="sideWidth+'px'"导航栏动态宽度-->
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
                background-color="rgb(48,65,86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        > 
          <div style="height: 60px; line-height: 60px; text-align:center" >
            <b style="color: white">校企慧</b>
          </div>
            <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <span slot="title">职位管理</span>
            </el-menu-item>
            <el-menu-item index="2" >
                <i class="el-icon-search"></i>
                <span slot="title">搜索</span>
            </el-menu-item>
        </el-menu>
      </el-aside>
 
      <el-container>
          <el-header style="font-size: 12px;border-bottom: 1px solid #ccc; line-height: 60px;display:flex">
            <div style="flex: 1; font-size: 25px">
              <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
            </div>
          <el-dropdown style="width: 100px;cursor:pointer">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                    
                </el-tab-pane>
                <el-tab-pane label="正在招" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="待开发" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="审核中" name="fourth">定时任务补偿</el-tab-pane>
                <el-tab-pane label="未通过" neme="fifth"></el-tab-pane>
                <el-tab-pane label="已招满" neme="fifth"></el-tab-pane>
            </el-tabs>
        </el-main>
      </el-container>
    </el-container>
 
</template>
<script>
</script>
<!--顶部的横栏颜色定义-->
<style>
.headerBg{
  background: #ccc !important;
}
</style>
43