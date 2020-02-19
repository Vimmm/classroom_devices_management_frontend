<template>
  <div class="layout">
    <slide-bar v-bind="sliderBar"/>
    <router-view/>
  </div>
</template>

<script>
import SlideBar from '../components/common/sliderbar'
import api from '../common/fetch'
import { NAME_SPACE_SCHOOL } from '../common/constants/namespace'
export default {
  name: 'Admin',
  data () {
    return {
      sliderBar: {
        img: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        identity: '教学点',
        menuList: [{
          text: '教学点信息',
          name: 'schoolInfo'
        }, {
          text: '设备管理',
          name: 'deviceManage'
        }, {
          text: '维修记录',
          name: 'recordList'
        }]
      }
    }
  },
  components: {
    SlideBar
  },
  created () {
    api[NAME_SPACE_SCHOOL].getSchool().then(([school]) => {
      this.sliderBar.identity = school.name
    })
  }
}
</script>
