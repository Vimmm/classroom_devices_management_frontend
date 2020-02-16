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
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    redirect: 'admin/school-manage',
    children: [
      {
        path: 'school-manage',
        name: 'schoolManage',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/admin/SchoolManage.vue')
      },
      {
        path: 'repairer-manage',
        name: 'repairerManage',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/admin/RepairerManage.vue')
      },
      {
        path: 'statistic-charts',
        name: 'statisticCharts',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/admin/StatisticCharts.vue')
      },
      {
        path: 'site-update',
        name: 'siteUpdate',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/admin/SiteUpdate.vue')
      }
    ]
  },
  {
    path: '/repairer',
    name: 'repairer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Repairer.vue'),
    redirect: 'repairer/repairer-info',
    children: [
      {
        path: 'repairer-info',
        name: 'repairerInfo',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/repairer/RepairerInfo.vue')
      },
      {
        path: 'supervise-devices',
        name: 'superviseDevices',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/repairer/SuperviseDevices.vue')
      },
      {
        path: 'repair-list',
        name: 'repairList',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/repairer/RepairList.vue')
      },
      {
        path: 'question-update',
        name: 'questionUpdate',
        component: () => import(/* webpackChunkName: "Admin" */ '../components/repairer/QuestionUpdate.vue')
      }
    ]
  },
  {
    path: '/school',
    name: 'school',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/School.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
