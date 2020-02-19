<template>
  <div class="device-manage">
    <el-card class="base-card">
      <div slot="header" class="base-header">
        <span>设备信息</span>
      </div>
      <el-button class="add-device-button" type="text" @click="addDeviceDrawer = true">添加设备</el-button>
      <el-table :data="school.devices" stripe border style="width: 100%">
        <el-table-column show-overflow-tooltip label="名称" min-width="50">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.name" placeholder="请输入名称" />
            <p v-else>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="类型" min-width="50">
          <template slot-scope="scope">
            <el-select v-if="scope.row.isEdit" v-model="scope.row.type" placeholder="请选择类型">
              <el-option
                v-for="item in deviceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <p v-else>{{deviceTypeOptions.find(option => option.value === scope.row.type).label}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="编号" min-width="50">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.device_number" placeholder="请输入编号" />
            <p v-else>{{scope.row.device_number}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="型号" min-width="50">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.device_model" placeholder="请输入型号" />
            <p v-else>{{scope.row.device_model}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="生产日期" min-width="50">
          <template slot-scope="scope">
            <el-date-picker v-if="scope.row.isEdit" v-model="scope.row.product_time" type="date" placeholder="选择日期" format="yyyy/M/dd" value-format="timestamp" />
            <p v-else>{{ new Date(scope.row.product_time).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="安装时间" min-width="50">
          <template slot-scope="scope">
            <el-date-picker v-if="scope.row.isEdit" v-model="scope.row.start_time" type="date" placeholder="选择日期" format="yyyy/M/dd" value-format="timestamp" />
            <p v-else>{{ new Date(scope.row.start_time).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="预计报废时间" min-width="50">
          <template slot-scope="scope">
            <el-date-picker v-if="scope.row.isEdit" v-model="scope.row.end_time" type="date" placeholder="选择日期" format="yyyy/M/dd" value-format="timestamp" />
            <p v-else>{{ new Date(scope.row.end_time).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="设备状态" min-width="50">
          <template slot-scope="scope">
            <el-select v-if="scope.row.isEdit" v-model="scope.row.device_status" placeholder="请选择状态">
              <el-option
                v-for="item in deviceStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <p v-else>{{ deviceStatusOptions.find(option => option.value === scope.row.device_status).label }}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="编辑" width="55">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isEdit" @click="saveSchoolDevice(scope.row)" type="text" size="small">保存</el-button>
            <el-button v-else @click="scope.row.isEdit = true" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="报修" width="55">
          <template slot-scope="scope">
            <el-button @click="applyRepair(scope.row.ID)" :disabled="scope.row.device_status !== 0" type="text" size="small">报修</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-drawer
      :with-header="false"
      :visible.sync="addDeviceDrawer"
      direction="rtl"
      >
      <div class="add-school-drawer">
        <el-form :model="addDeviceFrom" :rules="rules" ref="addDevices">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="addDeviceFrom.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="编号：" prop="device_number">
            <el-input v-model="addDeviceFrom.device_number" placeholder="请输入编号" />
          </el-form-item>
          <el-form-item label="型号：" prop="device_model">
            <el-input v-model="addDeviceFrom.device_model" placeholder="请输入型号" />
          </el-form-item>
          <el-form-item label="类型：" prop="type">
            <el-select v-model="addDeviceFrom.type" placeholder="请选择类型">
              <el-option
                v-for="item in deviceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产时间：" prop="product_time">
            <el-date-picker v-model="addDeviceFrom.product_time" type="date" placeholder="选择日期" format="yyyy/M/dd" value-format="timestamp" />
          </el-form-item>
          <el-form-item label="安装时间：" prop="start_time">
            <el-date-picker v-model="addDeviceFrom.start_time" type="date" placeholder="选择日期" format="yyyy/M/dd" value-format="timestamp" />
          </el-form-item>
          <el-form-item label="预计报废时间：" prop="end_time">
            <el-date-picker v-model="addDeviceFrom.end_time" type="date" placeholder="选择日期" format="yyyy/M/dd" value-format="timestamp" />
          </el-form-item>
          <el-form-item label="设备状态" prop="device_status">
            <el-select v-model="addDeviceFrom.device_status" placeholder="请选择状态">
              <el-option
                v-for="item in deviceStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="addDeviceDrawer = false">取 消</el-button>
          <el-button type="primary" :loading="addDeviceLoading" @click="addDevice">{{ addDeviceLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
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
    },
    async applyRepair (ID) {
      const { value } = await this.$prompt('描述设备问题', '申请报修', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).catch(() => this.$message.info('取消输入'))
      if (value) {
        const status = await api[NAME_SPACE_SCHOOL].applyRepair({
          device: ID,
          comment: value
        })
        if (status) {
          const [changedDevice] = await api[NAME_SPACE_SCHOOL].changeDevicestatus({ ID, device_status: 1 })
          this.$set(this.school.devices, this.school.devices.findIndex(it => it.ID === ID), changedDevice)
        } else {
          this.$message({
            type: 'info',
            message: '提交报修记录失败'
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.device-manage {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .base-card {
    box-sizing: border-box;
    margin: 10px;
  }
}
</style>
