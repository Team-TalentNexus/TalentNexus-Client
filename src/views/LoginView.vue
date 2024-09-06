jp<template>
    <div class="shopping-classify">
        <div class="login-wrap">
            <el-form class="login-container">
                <h1 class="title">用户登录</h1>
                <el-form-item>
                    <el-input type="text" v-model="user.username" placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="user.password" placeholder="用户密码"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
                </el-form-item>
                <el-row style="text-align: center;margin-top: -10px;">
                    <el-link type="primary" @click="goRegister">注册账号</el-link>
                    <el-link type="primary" @click="find">忘记密码</el-link>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },

        };
    },
    methods: {
        goRegister() {
            this.$router.push('/register');
        },
        login() {
            if (this.user.username == '' || this.user.password == '') {
                this.$message.error('用户名或密码不能为空');
                return;
            } else {
                axios.post('http://localhost:8081/seeker/login', this.user).then(res => {
                    res.data
                    if (res.data.code == 200) {
                        this.$message.success('登录成功');
                        localStorage.setItem('token', res.data.data);
                        localStorage.setItem('user', JSON.stringify(res.data.data.user));
                        this.$router.push('/employeeHome');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        find() {
            this.$router.push('/find');
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
</style>