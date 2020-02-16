import axios from 'axios'
import schoolConfig from './config/school'
import repairerConfig from './config/repairer'
import loginConfig from './config/login'
import adminConfig from './config/admin'

const configs = [].concat(
  schoolConfig,
  repairerConfig,
  loginConfig,
  adminConfig
)
const SUCCESS = 0

const createAxiosConf = (method = 'get', params) => {
  if (method === 'get') {
    return { params }
  } else return params
}

axios.interceptors.response.use(function (response) {
  if (response.status === 200 && response.data.code === SUCCESS) {
    return response.data.data
  } else if (response.status === 200) {
    return Promise.reject(new Error(response.data.message))
  } else {
    return Promise.reject(new Error('status fail'))
  }
}, function (error) {
  return Promise.reject(error)
})

export default configs.reduce((fetchs, conf) => {
  fetchs[conf.name] = params => axios[conf.method || 'get'](conf.path, createAxiosConf(conf.method, params))
  return fetchs
}, {})
