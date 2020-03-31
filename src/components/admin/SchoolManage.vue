<template>
  <div class="schoolManage">
    <el-button class="add-school-button" type="text" @click="addSchoolDrawer = true">
      <i class="el-icon-circle-plus-outline"></i>
      添加教学点</el-button>
    <el-collapse accordion  v-model="activeName">
      <school-manage-item v-for="school in schools" :key="school.ID" :school="school" @update="updateSchool"/>
    </el-collapse>
    <el-drawer
      :with-header="false"
      :visible.sync="addSchoolDrawer"
      direction="rtl"
      >
      <div class="add-school-drawer">
        <el-form :model="addSchoolFrom" :rules="rules">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="addSchoolFrom.name" placeholder="请输入教学点名称" />
          </el-form-item>
          <el-form-item label="类型：" prop="type">
            <el-select v-model="addSchoolFrom.type" placeholder="请选择状态">
              <el-option
                v-for="item in schoolTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址：" prop="location">
            <el-input v-model="addSchoolFrom.location" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="addSchoolFrom.tel" placeholder="请输入电话" />
          </el-form-item>
          <el-form-item label="账号：" prop="account">
            <el-input v-model="addSchoolFrom.account" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码：" prop="passwords">
            <el-input v-model="addSchoolFrom.passwords" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="addSchoolDrawer = false">取 消</el-button>
          <el-button type="primary" :loading="addSchoolLoading" @click="addSchoolInfo">{{ addSchoolLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from '../../common/fetch'
import { NAME_SPACE_ADMIN } from '../../common/constants/namespace'
import isNil from 'lodash/isNil'
import SchoolManageItem from './SchoolManageItem'

export default {
  name: 'schoolManage',
  components: { SchoolManageItem },
  data () {
    return {
      schools: [],
      activeName: 0,
      addSchoolDrawer: false,
      addSchoolFrom: {
        // ID: 1,
        name: '',
        type: 1,
        location: '',
        tel: '',
        account: '',
        passwords: ''
      },
      schoolTypeOptions: [{
        value: 1,
        label: '教学点'
      }, {
        value: 2,
        label: '中心校'
      }],
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
      addSchoolLoading: false
    }
  },
  created () {
    api[NAME_SPACE_ADMIN].getAllSchool().then(res => {
      this.schools = res.map(school => this.mapSchool(school))
      this.activeName = this.schools[0].ID
    }).catch(err => this.$message.error(err.toString()))
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
    updateSchool (school) {
      const schoolIndex = this.schools.findIndex(it => it.ID === school.ID)
      this.$set(this.schools, schoolIndex, school)
    },
    async addSchoolInfo () {
      this.addSchoolLoading = true
      if (
        this.addSchoolFrom.name &&
        !isNil(this.addSchoolFrom.type) &&
        this.addSchoolFrom.location &&
        this.addSchoolFrom.tel &&
        this.addSchoolFrom.account &&
        this.addSchoolFrom.passwords) {
        const [addSchool] = await api[NAME_SPACE_ADMIN].addSchool(this.addSchoolFrom).catch(e => this.$message.error(e.toString()))
        this.schools.push({ ...this.mapSchool(addSchool), devices: [] })
        this.addSchoolDrawer = false
        this.$message.success('添加成功')
      } else this.$message.error('请填写相关基本信息')
      this.addSchoolLoading = false
    }
  }
}
</script>

<style lang="less" scope>
.schoolManage {
  .add-school-drawer {
    box-sizing: border-box;
    padding: 10px;
  }
  .add-school-button, .add-device-button {
    font-size: 14px;
    width: 100%;
  }
  .base-cards {
    .base-card {
      flex-grow: 1;
      box-sizing: border-box;
      margin: 10px;
      .base-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
}

</style>
