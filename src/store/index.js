import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'
import App from './modules/App'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  p: '',
  c: '',
  hasPay: '',
  pages: ['gua', 'yunshi']
}

const mutations = {
  [types.SET_PANDC] (state, { p, c }) {
    state.p = p
    state.c = c
    let obj = {
      channelId: c,
      productId: p
    }
    window.localStorage.setItem('pandc', JSON.stringify(obj))
  },
  [types.SET_HASPAY] (state, len) {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = chars.length
    let randomStr = ''
    for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    state.hasPay = randomStr
    sessionStorage.setItem('hasPay', randomStr)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    App
  },
  strict: debug
})
