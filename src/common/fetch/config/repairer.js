const PREFIX = '/api/repairer'

export default [{
  name: 'getUserinfo',
  path: `${PREFIX}/getUserinfo`,
  method: 'get'
}, {
  name: 'saveUserinfo',
  path: `${PREFIX}/saveUserinfo`,
  method: 'post'
}, {
  name: 'getApplyrecords',
  path: `${PREFIX}/getApplyrecords`,
  method: 'get'
}, {
  name: 'changerecordstatus',
  path: `${PREFIX}/changerecordstatus`,
  method: 'post'
}]
