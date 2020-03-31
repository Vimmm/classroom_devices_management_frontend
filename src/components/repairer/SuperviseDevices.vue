<template>
  <div class="supervise-devices">
    <el-card class="supervise-devices-cards" v-for="school in userInfo.schools" :key="school.ID" :header="school.name">
      <el-table :data="school.devices" stripe border style="width: 777px;">
        <el-table-column show-overflow-tooltip prop="name" label="名称" width="97"/>
        <el-table-column show-overflow-tooltip prop="type" label="类型" width="97">
          <template slot-scope="scope">
            <span>{{deviceForm[scope.row.type].text}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="device_number" label="编号" width="97" />
        <el-table-column show-overflow-tooltip prop="device_model" label="型号" width="97" />
        <el-table-column show-overflow-tooltip :formatter="dateFormatter" prop="product_time" label="生产日期" width="97" />
        <el-table-column show-overflow-tooltip :formatter="dateFormatter" prop="start_time" label="安装时间" width="97" />
        <el-table-column show-overflow-tooltip :formatter="dateFormatter" prop="end_time" label="预计报废时间" width="97" />
        <el-table-column show-overflow-tooltip label="设备状态" width="97">
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
import { NAME_SPACE_REPAIRER } from '../../common/constants/namespace'
import { formatterDate } from '../../plugins/filters'

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
      },
      deviceForm: {
        //1：屏幕 2：摄像头，3：话筒，4：多媒体计算机
        1: {
          text: '屏幕'
        },
        2: {
          text: '摄像头'
        },
        3: {
          text: '话筒'
        },
        4: {
          text: '多媒体计算机'
        }
      }
    }
  },
  created () {
    api[NAME_SPACE_REPAIRER].getUserinfo().then(([res]) => {
      this.userInfo = res
    })
  },
  methods: {
    dateFormatter(row, col, value, index) {
      return formatterDate(value)
    }
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

<style lang="less">
.el-table th{
  background: #F5F7FA;
  color: #666;
  font-weight: bold;
  text-align: center;
}
.el-table .cell.el-tooltip p,
.el-table .cell.el-tooltip{
  text-align: center;
}
.el-card__header {
  font-size: 16px;
  font-weight: bold;
}
</style>
