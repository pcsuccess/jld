import { procApi } from '@/api/axios'

export default {
  createPAndC (params, cb, errorCb) {
    procApi('/cms_api/open/visit/count', cb, errorCb, 'get', params)
  },
  // 获取迦蓝道用户token
  getGarandTokenAsync (params, cb, errorCb) {
    procApi('/api/register', cb, errorCb, 'post', params)
  },
  // 创建订单
  createOrderAsync (params, cb, errorCb) {
    procApi('/cms_api/open/orders', cb, errorCb, 'post', params)
  },
  // 获取订单信息
  searchProductInfo (orderNo, cb, errorCb) {
    procApi('/cms_api/open/orders/' + orderNo, cb, errorCb, 'get', {})
  },
  // 查完整结果
  searchCompleteRes (params, cb, errorCb) {
    procApi('/api/getstars', cb, errorCb, 'post', params)
  }
}
