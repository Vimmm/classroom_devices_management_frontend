import { NAME_SPACE_REPAIRER } from '../../constants/namespace'
const PREFIX = `/api/${NAME_SPACE_REPAIRER}`

export default {
  namespace: NAME_SPACE_REPAIRER,
  config: [{
    name: `getUserinfo`,
    path: `${PREFIX}/getUserinfo`,
    method: 'get'
  }, {
    name: `saveUserinfo`,
    path: `${PREFIX}/saveUserinfo`,
    method: 'post'
  }, {
    name: `getApplyrecords`,
    path: `${PREFIX}/getApplyrecords`,
    method: 'get'
  }, {
    name: `changerecordstatus`,
    path: `${PREFIX}/changerecordstatus`,
    method: 'post'
  }]
}
