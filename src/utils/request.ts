import {extend} from 'umi-request'

const request = extend({
  prefix: '/api/',
  credentials: 'include', // 默认请求是否带上cookie
})

export default request
