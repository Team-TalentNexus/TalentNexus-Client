<template>
    <el-card>
      <!-- 职位信息表单 -->
      <div class="position-info">
        <el-form ref="positionForm" :model="positionInfo" label-width="120px" :rules="rules" class="position-form">
          <el-form-item label="职位名称" prop="title">
            <el-input v-model="positionInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="职位描述" prop="description">
            <el-input type="textarea" v-model="positionInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="地点" prop="location">
            <el-input v-model="positionInfo.location"></el-input>
          </el-form-item>
          <el-form-item label="雇佣类型" prop="employmentType">
            <el-input v-model="positionInfo.employmentType"></el-input>
          </el-form-item>
          <el-form-item label="薪资范围" prop="salaryRange">
            <el-input v-model="positionInfo.salaryRange"></el-input>
          </el-form-item>
        </el-form>
      </div>
  
      <!-- 提交按钮 -->
      <div class="footer-buttons">
        <el-button style="margin-top: 12px;" @click="submitFormPosition">提交</el-button>
      </div>
    </el-card>
  </template>
  
  <script>
  import request from '@/utils/request';
  
  export default {
    data() {
      return {
        userToken: localStorage.getItem('token'),
        positionInfo: {
          title: '',
          description: '',
          location: '',
          employmentType: '',
          salaryRange: ''
        },
        rules: {
          title: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
          description: [{ required: true, message: '请输入职位描述', trigger: 'blur' }],
          location: [{ required: true, message: '请输入地点', trigger: 'blur' }],
          employmentType: [{ required: true, message: '请输入雇佣类型', trigger: 'blur' }],
          salaryRange: [{ required: true, message: '请输入薪资范围', trigger: 'blur' }]
        }
      };
    },
    methods: {
      async submitFormPosition() {
        this.$refs.positionForm.validate(async (valid) => {
          if (valid) {
            // 提交职位信息
            try {
              const response = await request.post('http://localhost:8081/seeker/position', this.positionInfo, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.userToken}`
                }
              });
  
              if (response.data.code === 200) {
                this.$message.success('职位信息提交成功');
              } else {
                this.$message.error(response.data.message);
              }
            } catch (error) {
              console.error('提交职位信息时出错:', error);  // 打印错误信息到控制台
              this.$message.error('提交职位信息时出错');
            }
          } else {
            this.$message.error('表单验证失败，请检查输入');
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .position-info {
    margin-bottom: 20px;
  }
  
  .footer-buttons {
    margin-top: 12px;
  }
  </style>
  