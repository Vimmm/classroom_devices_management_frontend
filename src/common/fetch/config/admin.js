import { NAME_SPACE_ADMIN } from '../../constants/namespace'
const PREFIX = `/api/${NAME_SPACE_ADMIN}`

export default {
  namespace: NAME_SPACE_ADMIN,
  config: [{
    name: `getAllSchool`,
    path: `${PREFIX}/getallSchool`,
    method: 'get'
  }, {
    name: `saveSchool`,
    path: `${PREFIX}/saveSchool`,
    method: 'post'
  }, {
    name: `addSchool`,
    path: `${PREFIX}/addSchool`,
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
    name: `getallRepairer`,
    path: `${PREFIX}/getallRepairer`,
    method: 'get'
  }, {
    name: `saveRepairer`,
    path: `${PREFIX}/saveRepairer`,
    method: 'post'
  }, {
    name: `addRepairer`,
    path: `${PREFIX}/addRepairer`,
    method: 'post'
  }, {
    name: `getCharts`,
    path: `${PREFIX}/getCharts`,
    method: 'get'
  }]
}
