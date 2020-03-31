import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import filters from './plugins/filters'

import echarts from 'echarts'

import './assets/css/reset.css'
import './assets/css/global.css'

Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'mini' }

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
