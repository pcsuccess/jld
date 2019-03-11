import { procApi } from '@/api/axios'

export default {
  // 获取迦蓝道用户token
  calendar (params, cb, errorCb) {
    procApi('/api/calendar', cb, errorCb, 'post', params)
  }
}
