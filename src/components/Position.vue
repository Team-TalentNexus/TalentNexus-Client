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
      Token: localStorage.getItem('token'),
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
    submitFormPosition() {
      this.$refs.positionForm.validate((valid) => {
        if (valid) {
          request.post('http://localhost:8081/company/position', this.positionInfo, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.Token}`
            }
          }).then(response => {
            if (response.code === 200) {
              this.$message.success('职位信息提交成功');
              this.resetForm();  // 调用重置表单方法
            } else {
              this.$message.error(response.message);
            }
          }).catch(error => {
            console.error('提交职位信息时出错:', error);  // 打印错误信息到控制台
            this.$message.error('提交职位信息时出错');
          });
        } else {
          this.$message.error('表单校验失败');
        }
      });
    },
    resetForm() {
      // 清空表单内容
      this.positionInfo = {
        title: '',
        description: '',
        location: '',
        employmentType: '',
        salaryRange: ''
      };
      // 重置表单校验状态
      this.$refs.positionForm.resetFields();
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
