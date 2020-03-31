<template>
<div>
  <el-collapse accordion class="repair-item">
    <el-collapse-item v-for="records in applyRecords" :key="records.ID">
      <template slot="title" class="repair-item-title">
        <div class="repair-item-title">
          <div class="repair-item-title-content">
            <p class="repair-item-title-content-main" v-if="status===1">上门维修时间{{ records.wait_time | formatterDate }}</p>
            <p class="repair-item-title-content-main">{{records.schoolInfo.name}}</p>
            <p class="repair-item-title-content-comment">{{records.comment}}</p>
          </div>
          <div>
            <el-button v-if="status < 3" @click.stop="handleButtonClick(records.ID)">{{buttonText}}</el-button>
          </div>
        </div>
      </template>
      <p>备注：{{records.comment}}</p>
      <p>创建时间：{{ records.create_time | formatterDate }}</p>
      <p>受理时间：{{ records.accept_time | formatterDate }}</p>
      <p>维修员预计到达时间：{{ records.wait_time | formatterDate }}</p>
      <p>维修时间：{{ records.repair_time | formatterDate }}</p>
      <p>完成时间：{{ records.finish_time | formatterDate }}</p>

      <div class="repair-item-detail">
        <el-card class="repair-item-card" header="学校信息" shadow="hover" v-if="records.schoolInfo">
          <p>名称：{{records.schoolInfo.name}}</p>
          <p>类型：
            <el-tag class="device-status" :type="schoolStatus[records.schoolInfo.type].type">
              {{schoolStatus[records.schoolInfo.type].text}}
            </el-tag>
          </p>
          <p>地址：{{records.schoolInfo.location}}</p>
          <p>电话：{{records.schoolInfo.tel}}</p>
        </el-card>
        <el-card class="repair-item-card" header="待维修设备信息" shadow="hover" v-if="records.deviceInfo">
          <p>名称：{{records.deviceInfo.name}}</p>
          <p>编号：{{records.deviceInfo.device_number}}</p>
          <p>型号：{{records.deviceInfo.device_model}}</p>
          <p>状态：
            <el-tag class="device-status" :type="deviceStatus[records.deviceInfo.device_status].type">
              {{deviceStatus[records.deviceInfo.device_status].text}}
            </el-tag>
          </p>
          <p>生产时间：{{ records.deviceInfo.product_time | formatterDate }}</p>
          <p>安装时间：{{ records.deviceInfo.start_time | formatterDate }}</p>
          <p>报废时间：{{ records.deviceInfo.end_time | formatterDate }}</p>
        </el-card>
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-dialog title="选择预计出发维修时间" :visible.sync="waitTimeDialog">
    <el-date-picker
      v-model="waitTime"
      type="date"
      :picker-options="pickerOptions"
      value-format="timestamp"
      placeholder="选择日期">
    </el-date-picker>
    <el-button @click="changeRecords" :disabled="waitTime===null">完成</el-button>
  </el-dialog>
</div>
</template>

<script>
import api from '../../common/fetch'
import { NAME_SPACE_REPAIRER } from '../../common/constants/namespace'

export default {
  props: {
    status: {
      type: Number,
      required: true
    },
    nextStatus: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      applyRecords: [],
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
      schoolStatus: {
        1: {
          text: '教学点',
          type: 'success'
        },
        2: {
          text: '中心校',
          type: ''
        }
      },
      waitTimeDialog: false,
      waitTime: null,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      currentId: null
    }
  },
  computed: {
    buttonText () {
      switch (this.status) {
        case 0:
          return '接受申请'
        case 1:
          return '到达教学点'
        case 2:
          return '完成维修'
        default:
          return '完成'
      }
    }
  },
  created () {
    api[NAME_SPACE_REPAIRER].getApplyrecords({
      status: this.status
    }).then(res => { this.applyRecords = res })
  },
  methods: {
    async handleButtonClick (ID) {
      this.currentId = ID
      if (this.status === 0) this.waitTimeDialog = true
      else this.changeRecords()
      // else console.log('123')
    },
    async changeRecords () {
      if (await api[NAME_SPACE_REPAIRER].changerecordstatus({
        ID: this.currentId, status: this.nextStatus, wait_time: this.waitTime
      })) {
        this.waitTime = null
        api[NAME_SPACE_REPAIRER].getApplyrecords({
          status: this.status
        }).then(res => { this.applyRecords = res })
      } else this.$message.error('处理失败')
      this.waitTimeDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
.repair-item {
  .repair-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .repair-item-title-content {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      p {
        margin-right: 20px;
        flex-shrink: 0;
        font-size: 14px;
      }
      .repair-item-title-content-comment {
        width: 550px;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .repair-item-detail {
    margin-top: 10px;
    display: flex;
    .repair-item-card {
      width: 45%;
      flex-grow: 1;
    }
    .repair-item-card:nth-child(1) {
      margin-right: 10px;
    }
  }
}
</style>
