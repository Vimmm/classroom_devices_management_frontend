<template>
  <div class="school-info">
    <el-card class="base-card">
      <div slot="header" class="base-header">
        <span>基本信息</span>
        <el-button type="text" v-if="school.isEdit" @click="saveSchoolBaseInfo">保存</el-button>
        <el-button type="text" v-else @click="school.isEdit = true">编辑基本信息</el-button>
      </div>
      <el-form class="base-form" :model="school" :rules="rules" :ref="school.ID" label-width="100px">
        <el-form-item class="base-form-item" label="名称：" prop="name">
          <el-input v-if="school.isEdit" v-model="school.name" placeholder="请输入教学点名称" />
          <p v-else>{{school.name}}</p>
        </el-form-item>
        <el-form-item class="base-form-item" label="类型：" prop="type">
          <el-select v-if="school.isEdit" v-model="school.type" placeholder="请选择状态">
            <el-option
              v-for="item in schoolTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-else>{{(schoolTypeOptions.find(option => option.value === school.type) || {}).label}}</p>
        </el-form-item>
        <el-form-item class="base-form-item" label="地址：" prop="location">
          <el-input v-if="school.isEdit" v-model="school.location" placeholder="请输入地址" />
          <p v-else>{{school.location}}</p>
        </el-form-item>
        <el-form-item class="base-form-item" label="电话：" prop="tel">
          <el-input v-if="school.isEdit" v-model="school.tel" placeholder="请输入电话" />
          <p v-else>{{school.tel}}</p>
        </el-form-item>
        <el-form-item class="base-form-item" label="账号：" prop="account">
          <p>{{school.account}}</p>
        </el-form-item>
        <el-form-item class="base-form-item" label="密码：" prop="passwords">
          <el-input v-if="school.isEdit" v-model="school.passwords" placeholder="请输入密码" />
          <p v-else>{{school.passwords}}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '../../common/fetch'
import { NAME_SPACE_SCHOOL } from '../../common/constants/namespace'
import isNil from 'lodash/isNil'
export default {
  name: 'SchoolInfo',
  data () {
    return {
      school: {},
      addDeviceDrawer: false,
      addDeviceLoading: false,
      addDeviceFrom: {
        name: '',
        device_number: null,
        device_model: null,
        type: 1,
        product_time: Date.now(),
        start_time: Date.now(),
        end_time: Date.now(),
        school: null,
        device_status: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        passwords: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        device_status: [
          { required: true, message: '请输选择状态', trigger: 'change' }
        ]
      },
      schoolTypeOptions: [{
        value: 1,
        label: '教学点'
      }, {
        value: 2,
        label: '中心校'
      }],
      deviceStatusOptions: [{
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '待维修'
      }, {
        value: 2,
        label: '报废'
      }],
      // （1：屏幕 2：摄像头，3：话筒，4：多媒体计算机）
      deviceTypeOptions: [{
        value: 1,
        label: '屏幕'
      }, {
        value: 2,
        label: '摄像头'
      }, {
        value: 3,
        label: '话筒'
      }, {
        value: 4,
        label: '多媒体计算机'
      }]
    }
  },
  async created () {
    this.school = await api[NAME_SPACE_SCHOOL].getSchool().then(([res]) => ({
      ...res,
      isEdit: false,
      devices: res.devices.map(it => ({ ...it, isEdit: false }))
    }))
  },
  methods: {
    mapSchool (school) {
      school.isEdit = false
      if (school.devices) {
        school.devices = school.devices.map(device => {
          device.isEdit = false
          return device
        })
      }
      return school
    },
    async saveSchoolBaseInfo () {
      this.$refs[this.school.ID].validate(async (valid) => {
        if (valid) {
          const [updatedSchool] = await api[NAME_SPACE_SCHOOL].saveSchool(this.school).catch(e => this.$message.error(e.toString()))
          const devices = this.school.devices
          console.log(this.mapSchool)
          this.school = { ...this.mapSchool(updatedSchool), devices }
          this.$message.success('更新成功')
        } else this.$message.error('请填写相关基本信息')
      })
    },
    async saveSchoolDevice (device) {
      if (!isNil(device.name) && !isNil(device.device_status)) {
        const [updatedDevice] = await api[NAME_SPACE_SCHOOL].saveDevice(device).catch(e => this.$message.error(e.toString()))
        const updatedDeviceIndex = this.school.devices.findIndex(device => device.ID === updatedDevice.ID)
        this.$set(this.school.devices, updatedDeviceIndex, { ...updatedDevice, isEdit: false })
        this.$message.success('更新成功')
      } else this.$message.error('请填写相关设备信息')
    },
    async addDevice () {
      this.addDeviceLoading = true
      this.$refs['addDevices'].validate(async (valid) => {
        if (valid) {
          const [addDevice] = await api[NAME_SPACE_SCHOOL].addDevice({ ...this.addDeviceFrom, school: this.school.ID }).catch(e => this.$message.error(e.toString()))
          this.school.devices.push({ ...addDevice, isEdit: false })
          this.addDeviceDrawer = false
          this.$message.success('添加成功')
        } else this.$message.error('请填写相关基本信息')
      })
      this.addDeviceLoading = false
    }

  }
}
</script>

<style lang="less" scoped>
.school-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
    .base-card {
      // flex-grow: 1;
      box-sizing: border-box;
      margin: 10px;
      .base-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }
      .base-form {
        display: flex;
        flex-wrap: wrap;
        .base-form-item {
          flex-grow: 1;
          flex-shrink: 0;
          width: 40%;
        }
      }
      .base-wrap {
        .base-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          .base-label {
            width: 40px;
          }
        }
      }
    }
  }
</style>
