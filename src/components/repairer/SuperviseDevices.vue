<template>
  <div class="supervise-devices">
    <el-card class="supervise-devices-cards" v-for="school in userInfo.schools" :key="school.ID" :header="school.name">
      <el-table :data="school.devices" stripe border style="width: 100%">
        <el-table-column show-overflow-tooltip prop="name" label="名称" min-width="50" />
        <el-table-column show-overflow-tooltip prop="type" label="类型" min-width="50" />
        <el-table-column show-overflow-tooltip prop="device_number" label="编号" min-width="50" />
        <el-table-column show-overflow-tooltip prop="device_model" label="型号" min-width="50" />
        <el-table-column show-overflow-tooltip prop="product_time" label="生产日期" min-width="50" />
        <el-table-column show-overflow-tooltip prop="start_time" label="安装时间" min-width="50" />
        <el-table-column show-overflow-tooltip prop="end_time" label="预计报废时间" min-width="50" />
        <el-table-column show-overflow-tooltip label="设备状态" min-width="50">
          <template slot-scope="scope">
            <el-tag class="device-status" :type="deviceStatus[scope.row.device_status].type">{{deviceStatus[scope.row.device_status].text}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import api from '../../common/fetch'
export default {
  name: 'superviseDevices',
  data () {
    return {
      userInfo: {},
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
    api.getUserinfo().then(([res]) => {
      this.userInfo = res
    })
  }
}
</script>

<style lang="less" scoped>
.supervise-devices {
  margin: 10px;
  width: 100%;
  box-sizing: border-box;
  .supervise-devices-cards {
    margin-bottom: 10px;
  }
}
</style>
