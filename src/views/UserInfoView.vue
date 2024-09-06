<template>
    <div class="userInfo">
        <h1>用户信息</h1>
        <el-form class="form-class" label-width="80px" :model="user">
            <el-form-item label="用户名">
                <el-input v-model="user.name" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="user.email" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" :disabled="editable"></el-input>
            </el-form-item>

            <!-- 判断 user.individual 是否为 true -->
            <el-form-item v-if="user.individual" label="性别">
                <el-input v-model="user.gender" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item v-if="user.individual" label="大学">
                <el-input v-model="user.university" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item v-if="user.individual" label="专业">
                <el-input v-model="user.major" :disabled="editable"></el-input>
            </el-form-item>

            <!-- 如果 user.individual 为 false 则显示公司 -->
            <!-- 如果 user.individual 为 false，则显示这些表单项 -->
            <el-form-item v-if="!user.individual" label="公司">
                <el-input v-model="user.company" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item v-if="!user.individual" label="网址">
                <el-input v-model="user.website" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item v-if="!user.individual" label="介绍">
                <el-input v-model="user.description" :disabled="editable"></el-input>
            </el-form-item>



            <el-form-item label="手机号">
                <el-input v-model="user.phone" :disabled="editable"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="user.address" :disabled="editable"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width:48%;" @click="edit">编辑用户信息</el-button>
                <el-button type="success" style="width: 48%;" @click="saveEdit">保存用户信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        // 获取用户信息
        return {
            user: {
                individual: false,
                name: '123',
                email: '123@mail.com',
                password: '123',
                gender: '男',
                address: '123',
                university: '123',
                major: '123',
                degree: '123',
                phone: '123',

                company: 'TX',
                website: '123',
                description: '123',
            },
            editable: true
        }
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            // TODO
            // user = localStorage.getItem('user')
        },
        // 更新用户信息
        updateUserInfo() {
            // TODO
        },
        edit() {
            this.editable = false
        },
        saveEdit() {
            // TODO
            var editUserInfo = this.user
            if (this.editable) {
                this.$message.error('请先点击编辑按钮')
            } else if (this.user.name == '' || this.user.email == '' || this.user.password == '' || this.user.phone == '') {
                this.$message.error('请输入完整信息')
            } else if (this.user.password.length < 6) {
                this.$message.error('密码长度不能小于6位')
            } else {
                this.editable = true
                this.$message.success('保存成功')
            }
        }
    },
    mounted() {
        this.getUserInfo()
    }

}
</script>

<style scoped>
.user-info {
    text-align: center;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
}

.form-class {
    width: 600px;
    margin: 0 auto;

}
</style>
