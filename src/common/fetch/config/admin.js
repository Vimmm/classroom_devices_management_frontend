const PREFIX = '/api/admin'
export default [{
  name: 'getAllSchool',
  path: `${PREFIX}/getallSchool`,
  method: 'get'
}, {
  name: 'saveSchool',
  path: `${PREFIX}/saveSchool`,
  method: 'post'
}, {
  name: 'addSchool',
  path: `${PREFIX}/addSchool`,
  method: 'post'
}, {
  name: 'saveDevice',
  path: `${PREFIX}/saveDevice`,
  method: 'post'
}, {
  name: 'addDevice',
  path: `${PREFIX}/addDevice`,
  method: 'post'
}, {
  name: 'getallRepairer',
  path: `${PREFIX}/getallRepairer`,
  method: 'get'
}, {
  name: 'saveRepairer',
  path: `${PREFIX}/saveRepairer`,
  method: 'post'
}, {
  name: 'addRepairer',
  path: `${PREFIX}/addRepairer`,
  method: 'post'
}]
