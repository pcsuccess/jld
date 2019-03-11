import { procApi } from '@/api/axios'

export default {
  // 获取解卦结果
  getgua (params, cb, errorCb) {
    procApi('/api/getgua', cb, errorCb, 'post', params)
  }
}
