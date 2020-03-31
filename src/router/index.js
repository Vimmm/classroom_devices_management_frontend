import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'
// import Admin from '../views/Admin.vue'
// import Repairer from '../views/Repairer.vue'
// import School from '../views/School.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    redirect: 'admin/school-manage',
    children: [
      {
        path: 'school-manage',
        name: 'schoolManage',
        component: () => import('../components/admin/SchoolManage.vue')
      },
      {
        path: 'repairer-manage',
        name: 'repairerManage',
        component: () => import('../components/admin/RepairerManage.vue')
      },
      {
        path: 'allrecord-list',
        name: 'allRecordList',
        component: () => import('../components/admin/AllRecordList.vue')
      },
      {
        path: 'statistic-charts',
        name: 'statisticCharts',
        component: () => import('../components/admin/StatisticCharts.vue')
      },
      {
        path: 'site-update',
        name: 'siteUpdate',
        component: () => import('../components/admin/SiteUpdate.vue')
      }
    ]
  },
  {
    path: '/repairer',
    name: 'repairer',
    component: () => import('../views/Repairer.vue'),
    redirect: 'repairer/repairer-info',
    children: [
      {
        path: 'repairer-info',
        name: 'repairerInfo',
        component: () => import('../components/repairer/RepairerInfo.vue')
      },
      {
        path: 'supervise-devices',
        name: 'superviseDevices',
        component: () => import('../components/repairer/SuperviseDevices.vue')
      },
      {
        path: 'repair-list',
        name: 'repairList',
        component: () => import('../components/repairer/RepairList.vue')
      },
      {
        path: 'question-update',
        name: 'questionUpdate',
        component: () => import('../components/repairer/QuestionUpdate.vue')
      }
    ]
  },
  {
    path: '/school',
    name: 'school',
    component: () => import('../views/School.vue'),
    redirect: 'school/school-info',
    children: [
      {
        path: 'school-info',
        name: 'schoolInfo',
        component: () => import('../components/school/SchoolInfo.vue')
      },
      {
        path: 'device-manage',
        name: 'deviceManage',
        component: () => import('../components/school/deviceManage.vue')
      },
      {
        path: 'record-list',
        name: 'recordList',
        component: () => import('../components/school/RecordList.vue')
      },
      {
        path: 'common-problem',
        name: 'commonProblem',
        component: () => import('../components/school/CommonProblem.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
