<template>
  <div class="repairer layout">
    <slide-bar v-bind="sliderBar"/>
    <h1>This is an repairer page aa </h1>
    <router-view/>
  </div>
</template>

<script>
import SlideBar from '../components/common/sliderbar'
export default {
  name: 'Repairer',
  data () {
    return {
      sliderBar: {
        img: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        identity: '维修员',
        menuList: [{
          text: '个人信息',
          name: 'repairerInfo'
        }, {
          text: '分管设备',
          name: 'superviseDevices'
        }, {
          text: '维修列表',
          name: 'repairList'
        }, {
          text: '问题更新',
          name: 'questionUpdate'
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
.repairer {
  // height: 20000px;
}
</style>
