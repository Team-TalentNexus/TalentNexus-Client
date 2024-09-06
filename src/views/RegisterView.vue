<template>
    <div class="shopping-classify">
        <div class="login-wrap">
            <el-form class="login-container">
                <h1 class="title">用户注册</h1>
                <el-form-item>
                    <el-input type="text" v-model="user.userName" placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="user.userPassword" placeholder="用户密码"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.userEmail" type="text" placeholder="用户邮箱" autocomplete="off"
                        class="email_inpt"></el-input>
                    <el-button type="primary" :loading="type" @click="sendCheckCode">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" v-model="checkCode" placeholder="请输入验证码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="register">注册账号</el-button>
                </el-form-item>
                <el-row style="text-align: center;margin-top: -10px;">
                    <el-link type="primary" @click="goLogin">返回登录</el-link>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                userName: '',
                userPassword: '',
                userEmail: ''
            },
            type: false,
            checkCode: ''

        }
    },
    methods: {
        //验证邮箱
        valideEmail(email) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        },
        //发送验证码
        sendCheckCode() {
            if (this.user.userEmail == '') {
                this.$message.error('请输入邮箱');
                return;
            } else if (!this.valideEmail(this.user.userEmail)) {
                this.$message.error('请输入正确的邮箱');
                return;

            }
            this.type = true;
            var _this = this;
            this.$axios.post('/user/sendCheckCode', this.user.userEmail).then(function (response) {
                if (response.data.code == 200) {
                    _this.$message.success('验证码已发送');
                } else {
                    _this.$message.error(response.data.msg);
                }
            })
        },
        register() {
            if (this.user.userEmail == '') {
                this.$message.error('请输入邮箱');
                return;
            } else if (!this.valideEmail(this.user.userEmail)) {
                this.$message.error('请输入正确的邮箱');
                return;
            }
            if (this.user.userPassword == '') {
                this.$message.error('请输入密码');
                return;
            }
            if (this.checkCode == '') {
                this.$message.error('请输入验证码');
                return;
            }
            //发送请求
            var _this = this;
            this.$axios.post('/user/register', this.user).then(function (response) {
                if (response.data.code == 200) {
                    _this.$message.success('注册成功');
                    _this.$router.push('/login');
                } else {
                    _this.$message.error(response.data.msg);
                }
            })
        },
        goLogin() {
            this.$router.push("/login")
        }
    }
}
</script>

<style>
  .shopping-classify {
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    position: fixed;
  }



  .login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .email_inpt {
    width: 200px;
  }
</style>