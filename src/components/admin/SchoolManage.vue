<template>
  <div class="schoolManage">
    <el-collapse accordion  v-model="activeName">
      <el-collapse-item
        class="school-header"
        v-for="school in schools"
        :key="school.ID"
        :title="school.name"
        :name="school.ID">
        <el-card class="base-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">编辑基本信息</el-button>
          </div>
          <ul class="base-wrap">
            <li>
              <div class="content-line">
                <p>地址:</p>
                <p>{{school.location}}</p>
              </div>
            </li>
          </ul>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import api from '../../common/fetch'
export default {
  name: 'schoolManage',
  data () {
    return {
      schools: [],
      activeName: 0
    }
  },
  created () {
    api.getAllSchool().then(res => {
      this.schools = res 
      this.activeName = this.schools[0].ID
      console.log(this.activeName)
      
    }).catch(err => this.$message.error(err.toString()))
  },
  methods: {
    handleEditSchoolButton () { console.log(1) }
  }
}
</script>

<style lang="less" scope>
.schoolManage {
  .base-card {
    .base-card
  }
}

</style>