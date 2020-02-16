<template>
  <div class="repairer-manage">
    <el-button class="add-repairer-button" type="text" @click="addRepairerDrawer = true">添加维修员</el-button>
    <el-collapse accordion v-model="activeName">
        <el-collapse-item
          class="repairer-header"
          v-for="repairer in repairers"
          :key="repairer.ID"
          :title="repairer.name"
          :name="repairer.ID">
          <el-card class="base-card">
            <div slot="header" class="base-header">
              <span>基本信息与分管教学点</span>
              <el-button type="text" v-if="repairer.isEdit" @click="saveRepairerBaseInfo(repairer)">保存</el-button>
              <el-button type="text" v-else @click="repairer.isEdit = true">编辑基本信息</el-button>
            </div>
            <el-form class="base-form" :model="repairer" :rules="rules" :ref="repairer.ID" label-width="120px">
              <el-form-item class="base-form-item" label="姓名：" prop="name">
                <el-input v-if="repairer.isEdit" v-model="repairer.name" placeholder="请输入姓名" />
                <p v-else>{{repairer.name}}</p>
              </el-form-item>
              <el-form-item class="base-form-item" label="电话：" prop="tel">
                <el-input v-if="repairer.isEdit" v-model="repairer.tel" placeholder="请输入电话" />
                <p v-else>{{repairer.tel}}</p>
              </el-form-item>
              <el-form-item class="base-form-item" label="地址：" prop="address">
                <el-input v-if="repairer.isEdit" v-model="repairer.address" placeholder="请输入地址" />
                <p v-else>{{repairer.address}}</p>
              </el-form-item>
              <el-form-item class="base-form-item" label="微信：" prop="weixin">
                <el-input v-if="repairer.isEdit" v-model="repairer.weixin" placeholder="请输入微信" />
                <p v-else>{{repairer.weixin}}</p>
              </el-form-item>
              <el-form-item class="base-form-item" label="账户：" prop="account">
                <el-input v-if="repairer.isEdit" v-model="repairer.account" placeholder="请输入账户" />
                <p v-else>{{repairer.account}}</p>
              </el-form-item>
              <el-form-item class="base-form-item" label="密码：" prop="passwords">
                <el-input v-if="repairer.isEdit" v-model="repairer.passwords" placeholder="请输入密码" />
                <p v-else>{{repairer.passwords}}</p>
              </el-form-item>
              <el-form-item class="base-form-item" label="分管教学点：" prop="school">
                <el-select v-if="repairer.isEdit" v-model="repairer.school" multiple placeholder="请选择">
                  <el-option
                    v-for="item in schools"
                    :key="item.ID"
                    :label="item.name"
                    :value="item.ID">
                  </el-option>
                </el-select>
                <p v-else>{{schools.filter(it => repairer.school.includes(it.ID)).map(s => s.name).join('，')}}</p>
              </el-form-item>
            </el-form>
          </el-card>
        </el-collapse-item>
    </el-collapse>

    <el-drawer
      :with-header="false"
      :visible.sync="addRepairerDrawer"
      direction="rtl"
      >
      <div class="add-school-drawer">
        <el-form :model="addRepairerForm" :rules="rules" ref="addRepairer">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="addRepairerForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="addRepairerForm.tel" placeholder="请输入电话" />
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="addRepairerForm.address" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item label="微信：" prop="weixin">
            <el-input v-model="addRepairerForm.weixin" placeholder="请输入微信" />
          </el-form-item>
          <el-form-item label="账户：" prop="account">
            <el-input v-model="addRepairerForm.account" placeholder="请输入账户" />
          </el-form-item>
          <el-form-item label="密码：" prop="passwords">
            <el-input v-model="addRepairerForm.passwords" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="分管教学点：" prop="school">
            <el-select v-model="addRepairerForm.school" multiple placeholder="请选择">
              <el-option
                v-for="item in schools"
                :key="item.ID"
                :label="item.name"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="addRepairerDrawer = false">取 消</el-button>
          <el-button type="primary" :loading="addRepairerLoading" @click="addRepairerInfo">{{ addRepairerLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from '../../common/fetch'

export default {
  name: 'repairerManage',
  data () {
    return {
      repairers: [],
      schools: [],
      activeName: 0,
      addRepairerDrawer: false,
      addRepairerLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        passwords: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      },
      addRepairerForm: {
        name: '',
        address: '',
        tel: '',
        weixin: '',
        role: 2,
        account: '',
        passwords: '',
        school: []
      }
    }
  },
  created () {
    Promise.all([
      api.getallRepairer(),
      api.getAllSchool()
    ])
      .then(([repairers, schools]) => {
        this.repairers = repairers.map(repairer => this.mapRepairer(repairer))
        this.activeName = this.repairers[0].ID
        this.schools = schools
        console.log(this.schools.map(it => it.ID).join(','))
      }).catch(err => this.$message.error(err.toString()))
  },
  methods: {
    mapRepairer (repairer) {
      repairer.isEdit = false
      repairer.school = repairer.school.map(school => school.ID)
      return repairer
    },
    saveRepairerBaseInfo (repairer) {
      this.$refs[repairer.ID][0].validate(async (valid) => {
        if (valid) {
          const [updatedRepairer] = await api.saveRepairer(repairer).catch(e => this.$message.error(e.toString()))
          const updatedRepairerIndex = this.repairers.findIndex(it => it.ID === updatedRepairer.ID)
          this.$set(this.repairers, updatedRepairerIndex, this.mapRepairer(updatedRepairer))
          this.$message.success('更新成功')
        } else this.$message.error('请填写相关基本信息')
      })
    },
    async addRepairerInfo () {
      this.addRepairerLoading = true
      this.$refs['addRepairer'].validate(async (valid) => {
        if (valid) {
          const [updatedRepairer] = await api.addRepairer(this.addRepairerForm).catch(e => this.$message.error(e.toString()))
          this.repairers.push(this.mapRepairer(updatedRepairer))
          this.addRepairerDrawer = false
          this.$message.success('添加成功')
        } else this.$message.error('请填写相关基本信息')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.repairer-manage {
  .add-school-button {
    width: 100%;
  }
  .base-card {
    .base-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
