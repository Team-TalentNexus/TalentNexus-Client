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
            <el-page-header @back="goBack" content="发布职位" style="flex: 1; font-size: 25px">
            </el-page-header>
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
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
        </el-main>
      </el-container>
    </el-container>
 
</template>
<script>
export default {
  data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
  methods: {
    goBack() {
      console.log('go back');
    },
    onSubmit() {
        console.log('submit!');
    }
  }
}
</script>
<!--顶部的横栏颜色定义-->
<style>
.headerBg{
  background: #ccc !important;
}
</style>
43