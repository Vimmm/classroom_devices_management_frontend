<template>
  <div class="login">
    <img :src="imgSrc" class="logo">
    <h1 class="title">同步课堂维修系统</h1>
    <el-form ref="form" :model="form" label-width="50px" label-position="left" class="loginForm">
      <el-form-item label="账号">
        <el-input v-model="form.inputAccount" placeholder="请输入账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.inputPasswords" placeholder="请输入密码" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="form.inputIdentity" placeholder="请选择登陆身份" style="display:block;">
          <el-option label="教学点" value="school"></el-option>
          <el-option label="维修员" value="repairer"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../common/fetch'
import { NAME_SPACE_COMMON } from '../common/constants/namespace'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        inputAccount: '',
        inputPasswords: '',
        inputIdentity: ''
      },
      imgSrc: require('../assets/images/logo.png')
    }
  },
  methods: {
    onSubmit () {
      api[NAME_SPACE_COMMON].login(this.form).then(res => {
        this.$router.push(res)
      })
        .catch(err => {
          this.$message.error(err.toString())
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .logo {
    width: 120px;
    height: 120px;
    margin: 25px auto;
  }
  .title {
    font-family: "楷体";
    font-size: 48px;
    color: #303133;
    margin-bottom: 50px;
  }
  .loginForm {
    width:350px;
    margin: 0 auto;
  }
}
</style>

<style lang="less">
.el-button.el-button--primary {
  background-color: #1295d9;
}
</style>
