<template>
    <div class="register">
        <el-form :model="form" :rules="rules" ref="registerForm" label-width="120px" class="register-form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="fullName">
                <el-input v-model="form.fullName" placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender" placeholder="请选择性别">
                    <el-option label="男" value="male"></el-option>
                    <el-option label="女" value="female"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="出生日期" prop="birthDate">
                <el-date-picker v-model="form.birthDate" type="date" placeholder="请选择出生日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入地址"></el-input>
            </el-form-item>

            <el-form-item label="大学" prop="university">
                <el-input v-model="form.university" placeholder="请输入大学"></el-input>
            </el-form-item>

            <el-form-item label="专业" prop="major">
                <el-input v-model="form.major" placeholder="请输入专业"></el-input>
            </el-form-item>

            <el-form-item label="学位" prop="degree">
                <el-input v-model="form.degree" placeholder="请输入学位"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">注册</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                email: '',
                phone: '',
                fullName: '',
                gender: '',
                birthDate: '',
                address: '',
                university: '',
                major: '',
                degree: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
                fullName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
                birthDate: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
                address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
                university: [{ required: true, message: '请输入大学', trigger: 'blur' }],
                major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
                degree: [{ required: true, message: '请输入学位', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    request.post('http://localhost:8081/seeker/register', this.form)
                        .then(response => {
                            this.$message.success('注册成功');
                            this.$router.push('/login'); // 跳转到登录界面
                        })
                        .catch(error => {
                            this.$message.error('注册失败');
                        });
                } else {
                    this.$message.error('请完善表单信息');
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        }
    }
};
</script>

<style scoped>
.register {
    padding: 20px;
    max-width: 600px;
    margin: auto;
}

.register-form {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-form-item {
    margin-bottom: 20px;
}
</style>