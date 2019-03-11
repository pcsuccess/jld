import * as types from '../mutation-types'
import commonApi from '@/api/common'
import yunshiApi from '@/api/yunshi'
import jieguaApi from '@/api/jiegua'

const state = {
  token: ''
}

// getters
const getters = {
  token: state => state.token
}

const actions = {
  // 创建 PV、UV
  createPAndC ({commit}, params) {
    return new Promise((resolve, reject) => {
      commonApi.createPAndC(params, res => {
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  },
  // 获取迦蓝道用户token
  getGarandTokenAsync ({commit}, params) {
    return new Promise((resolve, reject) => {
      commonApi.getGarandTokenAsync(params, res => {
        commit(types.SET_GARANDTOKEN, res.token)
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  },
  // 创建订单
  createOrderAsync ({commit}, params) {
    return new Promise((resolve, reject) => {
      commonApi.createOrderAsync(params, res => {
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  },
  // 根据订单号查询订单
  searchProductInfo ({commit}, params) {
    return new Promise((resolve, reject) => {
      commonApi.searchProductInfo(params, res => {
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  },
  // 查完整结果
  searchCompleteRes ({commit}, params) {
    return new Promise((resolve, reject) => {
      commonApi.searchCompleteRes(params, res => {
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  },
  // 获取日运势结果
  calendar ({commit}, params) {
    return new Promise((resolve, reject) => {
      yunshiApi.calendar(params, res => {
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  },
  // 获取解卦结果
  getgua ({commit}, params) {
    return new Promise((resolve, reject) => {
      jieguaApi.getgua(params, res => {
        resolve(res)
      }, errMsg => {
        reject(errMsg)
      })
    })
  }
}

// mutations
const mutations = {
  [types.SET_GARANDTOKEN] (state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
