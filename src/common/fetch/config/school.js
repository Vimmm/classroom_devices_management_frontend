import { NAME_SPACE_SCHOOL } from '../../constants/namespace'
const PREFIX = `/api/${NAME_SPACE_SCHOOL}`

export default {
  namespace: NAME_SPACE_SCHOOL,
  config: [{
    name: `getSchool`,
    path: `${PREFIX}/getSchool`,
    method: 'get'
  }, {
    name: `saveSchool`,
    path: `${PREFIX}/saveSchool`,
    method: 'post'
  }, {
    name: `saveDevice`,
    path: `${PREFIX}/saveDevice`,
    method: 'post'
  }, {
    name: `addDevice`,
    path: `${PREFIX}/addDevice`,
    method: 'post'
  }, {
    name: `applyRepair`,
    path: `${PREFIX}/applyRepair`,
    method: 'post'
  }, {
    name: `changeDevicestatus`,
    path: `${PREFIX}/changeDevicestatus`,
    method: 'post'
  }]
}
