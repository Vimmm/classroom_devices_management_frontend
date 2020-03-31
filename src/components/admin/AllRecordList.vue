<template>
  <el-tabs type="border-card" class="record-list" v-model="tabName">
    <el-tab-pane name="0" label="未完成维修的申请记录">
      <all-record-list-item v-if="tabName === '0'" :status="[0,1,2]" :next-status="1" />
    </el-tab-pane>
    <el-tab-pane name="1" label="已完成维修的申请记录">
      <all-record-list-item v-if="tabName === '1'" :status="[3]" :next-status="2" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AllRecordListItem from './AllRecordListItem'
export default {
  name: 'AllRecordList',
  components: { AllRecordListItem },
   data () {
    return {
      tabName: '0'
    }
  }
}
</script>
<style lang="less" scoped>
.record-list {
  margin: 10px;
  width: 100%;
}

</style>
