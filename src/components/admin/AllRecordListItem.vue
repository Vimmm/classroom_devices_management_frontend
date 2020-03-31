<template>
<div>
  <el-collapse accordion class="repair-item">
    <el-collapse-item v-for="records in schoolRepairecord" :key="records.ID">
      <template slot="title" class="repair-item-title">
        <div class="repair-item-title">
          <div class="repair-item-title-content">
            <p class="repair-item-title-content-main">
              <el-tag class="device-status" :type="recordStatus[records.status].type">
                {{recordStatus[records.status].text}}
              </el-tag>
            </p>
            <p class="repair-item-title-content-comment">{{records.comment}}</p>

          </div>
        </div>
      </template>
      <p>备注：{{records.comment}}</p>
      <p>所属维修员：{{records.repairerInfo.name}} {{records.repairerInfo.tel}}</p>
      <p>创建时间：{{ records.create_time | formatterDate }}</p>
      <p>受理时间：{{ records.accept_time | formatterDate }}</p>
      <p>维修员预计到达时间：{{ records.wait_time | formatterDate }}</p>
      <p>维修时间：{{ records.repair_time | formatterDate }}</p>
      <p>完成时间：{{ records.finish_time | formatterDate }}</p>
      <div class="repair-item-detail">
        <el-card class="repair-item-card" header="维修设备信息" shadow="hover" v-if="records.deviceInfo">
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
</div>
</template>

<script>
import api from '../../common/fetch'
import { NAME_SPACE_ADMIN } from '../../common/constants/namespace'

export default {
  name: 'AllRecordListItem',
  props: {
    status: {
      type: Array,
      required: true
    },
    nextStatus: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      schoolRepairecord: [],
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
      recordStatus: {
        //0等待受理 1接受申请， 2维修员到达， 3维修完成
        0: {
          text: '等待受理',
          type: 'danger'
        },
        1: {
          text: '已接受申请',
          type: 'danger'
        },
        2: {
          text: '维修员到达',
          type: 'danger'
        },
        3: {
          text: '维修完成',
          type: 'success'
        }
      }
    }
  },
  computed: {
  },
  created () {
    api[NAME_SPACE_ADMIN].getCharts().then(res=> {
      // console.log(res)
      return res
    }).then(res => { this.schoolRepairecord = res.filter(it => this.status.includes(it.status)) })
  },
  methods: {

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
      }
      .repair-item-title-content-comment {
        width: 550px;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
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
  .el-collapse-item__content p {
    font-size:12px;
    line-height: 28px;
  }
}
</style>
<style lang="less">
.el-collapse-item__content {
    padding-bottom: 15px;
  }
</style>
