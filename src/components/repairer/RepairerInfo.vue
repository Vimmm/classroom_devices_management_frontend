<template>
  <el-card class="repairer-info">
    <div class="repairer-button">
      <el-button type="text" v-if="userInfo.isEdit" @click="saveUserInfo">保存</el-button>
      <el-button type="text" v-else @click="userInfo.isEdit = true">编辑基本信息</el-button>
    </div>
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="">
      <el-form-item label="姓名：" prop="name">
        <el-input v-if="userInfo.isEdit" v-model="userInfo.name" />
        <p v-else>{{userInfo.name}}</p>
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input v-if="userInfo.isEdit" v-model="userInfo.address" />
        <p v-else>{{userInfo.address}}</p>
      </el-form-item>
      <el-form-item label="电话：" prop="tel">
        <el-input v-if="userInfo.isEdit" v-model="userInfo.tel" />
        <p v-else>{{userInfo.tel}}</p>
      </el-form-item>
      <el-form-item label="微信：" prop="weixin">
        <el-input v-if="userInfo.isEdit" v-model="userInfo.weixin" />
        <p v-else>{{userInfo.weixin}}</p>
      </el-form-item>
      <el-form-item label="账户：" prop="account">
        <p>{{userInfo.account}}</p>
      </el-form-item>
      <el-form-item label="密码：" prop="passwords">
        <el-input v-if="userInfo.isEdit" v-model="userInfo.passwords" />
        <p v-else>{{userInfo.passwords}}</p>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import api from '../../common/fetch'
import { NAME_SPACE_REPAIRER } from '../../common/constants/namespace'

export default {
  name: 'repairerInfo',
  data () {
    return {
      userInfo: {},
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        address: [{ required: true, message: '请输入地址', trigger: 'change' }],
        tel: [{ required: true, message: '请输入电话', trigger: 'change' }]
      },
      deviceStatus: {
        // 0正常，1待维修，2报废
        0: {
          text: '正常',
          type: 'success'
        },
        1: {
          text: '待维修',
          type: 'warning'
        },
        2: {
          text: '报废',
          type: 'info'
        }
      }
    }
  },
  created () {
    api[NAME_SPACE_REPAIRER].getUserinfo().then(([res]) => {
      this.userInfo = { ...res, isEdit: false }
    })
  },
  methods: {
    saveUserInfo () {
      api[NAME_SPACE_REPAIRER].saveUserinfo(this.userInfo).then(([res]) => {
        console.log(res)
        this.userInfo = { ...res, isEdit: false }
      })
    }
  },
  activated () { console.log(1) }
}
</script>

<style lang="less" scoped>
.repairer-info {
  margin: 10px;
  width: 100%;
  box-sizing: border-box;
  .repairer-button {
    display: flex;
    flex-direction: row-reverse;
  }
  .device-status {
    width: 100%;
    text-align: center;
  }
}
</style>
