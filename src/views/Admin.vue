<template>
  <div class="admin layout">
    <slide-bar v-bind="sliderBar"/>
    <router-view class="admin-content"/>
  </div>
</template>

<script>
import SlideBar from '../components/common/sliderbar'
export default {
  name: 'Admin',
  data () {
    return {
      sliderBar: {
        img: 'https://i.ibb.co/sCpTKmJ/admin.jpg',
        identity: '管理员',
        menuList: [{
          text: '教学点管理',
          name: 'schoolManage'
        }, {
          text: '维修员管理',
          name: 'repairerManage'
        }, {
          text: '维修记录',
          name: 'allRecordList'
        }, {
          text: '统计报表',
          name: 'statisticCharts'
        }, {
          text: '站点维护',
          name: 'siteUpdate'
        }]
      }
    }
  },
  components: {
    SlideBar
  }
}
</script>
<style lang="less">
.admin {
  .admin-content {
    flex-grow: 1;
    flex-shrink: 1;
    box-sizing: border-box;
    padding: 10px 0 20px 15px;
  }
  // height: 20000px;
}
</style>
