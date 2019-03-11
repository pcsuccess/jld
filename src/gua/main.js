import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from '@/store'
import Qs from 'qs'
import url from 'url'
import * as types from '@/store/mutation-types'
import { createInstance } from '@/api/axios'
import wx from 'weixin-js-sdk'
import 'weui'

Vue.config.productionTip = false
// 指定Vue的Http插件
Vue.prototype.$http = createInstance()
Vue.use(wx)

router.beforeEach((to, from, next) => {
  let query = Qs.parse(url.parse(window.location.href).query)
  if (query && query.p && query.c) {
    store.dispatch('createPAndC', query)
    store.commit(types.SET_PANDC, query)
  }
  next()
})

router.afterEach((to, from) => {
  if (to.query && to.query.p && to.query.c) {
    store.dispatch('createPAndC', to.query)
    store.commit(types.SET_PANDC, to.query)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
