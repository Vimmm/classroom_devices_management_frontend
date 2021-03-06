import axios from 'axios'
import schoolConfig from './config/school'
import repairerConfig from './config/repairer'
import loginConfig from './config/login'
import logoutConfig from './config/logout'
import adminConfig from './config/admin'

const configs = [].concat(
  schoolConfig.config.map(it => ({ ...it, namespace: schoolConfig.namespace })),
  repairerConfig.config.map(it => ({ ...it, namespace: repairerConfig.namespace })),
  loginConfig.config.map(it => ({ ...it, namespace: loginConfig.namespace })),
  adminConfig.config.map(it => ({ ...it, namespace: adminConfig.namespace })),
  logoutConfig.config.map(it => ({ ...it, namespace: logoutConfig.namespace }))
)
const SUCCESS = 0

const createAxiosConf = (method = 'get', params) => {
  if (method === 'get') {
    return { params }
  } else return params
}

axios.interceptors.response.use(function (response) {
  // console.log('response', response)
  if (response.status === 200 && response.data.code === SUCCESS) {
    return response.data.data
  } else if (response.status === 200) {
    return Promise.reject(new Error(response.data.message))
  } else {
    return Promise.reject(new Error('status fail'))
  }
}, function (error) {
  console.log('error', error)
  if (/401$/.test(error.toString())) {
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default configs.reduce((fetchs, conf) => ({
  ...fetchs,
  [conf.namespace]: {
    ...fetchs[conf.namespace],
    [conf.name]: params => axios[conf.method || 'get'](conf.path, createAxiosConf(conf.method, params))
  }
}), {})
