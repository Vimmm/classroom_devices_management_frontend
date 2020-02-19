import { NAME_SPACE_COMMON } from '../../constants/namespace'
const PREFIX = `/api/${NAME_SPACE_COMMON}`

export default {
  namespace: NAME_SPACE_COMMON,
  config: [{
    name: `login`,
    path: `${PREFIX}/login`,
    method: 'post'
  }]
}
