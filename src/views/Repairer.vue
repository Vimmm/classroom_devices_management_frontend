<template>
  <div class="repairer layout">
    <slide-bar v-bind="sliderBar"/>
    <router-view/>
  </div>
</template>

<script>
import SlideBar from '../components/common/sliderbar'
import api from '../common/fetch'
import { NAME_SPACE_REPAIRER } from '../common/constants/namespace'
export default {
  name: 'Repairer',
  data () {
    return {
      sliderBar: {
        img: 'https://i.ibb.co/ZLq3fVN/repairer.jpg',
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
        }]
      }
    }
  },
  components: {
    SlideBar
  },
  created () {
    api[NAME_SPACE_REPAIRER].getUserinfo().then(([user]) => {
      this.sliderBar.identity = user.name
    })
  }
}
</script>
<style lang="less">
.repairer {
  // height: 20000px;
}
</style>
