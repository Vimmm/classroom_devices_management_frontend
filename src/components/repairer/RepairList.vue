<template>
  <el-tabs type="border-card" class="repair-list" v-model="tabName">
    <el-tab-pane name="0" label="待受理">
      <repair-list-item v-if="tabName === '0'" :status="0" :next-status="1" />
    </el-tab-pane>
    <el-tab-pane name="1" label="待到达">
      <repair-list-item v-if="tabName === '1'" :status="1" :next-status="2" />
    </el-tab-pane>
    <el-tab-pane name="2" label="待完成">
      <repair-list-item v-if="tabName === '2'" :status="2" :next-status="3" />
    </el-tab-pane>
    <el-tab-pane name="3" label="已完成">
      <repair-list-item v-if="tabName === '3'" :status="3" :next-status="4" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import RepairListItem from './RepairListItem'
export default {
  name: 'repairList',
  components: { RepairListItem },
  data () {
    return {
      tabName: '0'
    }
  }
}
</script>

<style lang="less" scoped>
.repair-list {
  margin: 10px;
  width: 100%;
}
</style>
