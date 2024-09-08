<template>
  <div class="register-container">
    <el-card class="register-card">
      <el-form ref="registerForm" :model="registerInfo" label-width="100px" :rules="rules" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="registerInfo.companyName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNumber">
          <el-input v-model="registerInfo.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="公司网站" prop="website">
          <el-input v-model="registerInfo.website"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="registerInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="公司描述" prop="description">
          <el-input type="textarea" v-model="registerInfo.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request';

export default {
  data() {
    return {
      registerInfo: {
        username: '',
        password: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        website: '',
        address: '',
        description: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        website: [{ required: true, type: 'url', message: '请输入有效的网址', trigger: 'blur' }],
        address: [{ required: true, message: '请输入公司地址', trigger: 'blur' }],
        description: [{ required: true, message: '请输入公司描述', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          request.post('http://localhost:8081/company/register', this.registerInfo)
            .then(response => {
              this.$message.success('注册成功');
              this.$router.push('/cLogin'); // 跳转到登录界面
            })
            .catch(error => {
              this.$message.error('注册失败');
            });
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 40%; /* 占屏幕宽度的1/4 */
}

.register-form {
  width: 100%;
}
</style>
