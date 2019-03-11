import Vue from 'vue'
import Router from 'vue-router'
import Interpretation from '@/gua/views/divination/Interpretation.vue'
import Payment from '@/gua/views/divination/Payment.vue'
import Start from '@/gua/views/divination/Start.vue'
import Exchangecode from '@/gua/views/divination/Exchangecode.vue'
import Create from '@/gua/views/divination/Create.vue'
// 支付结果
import PayResult from '@/common/PayResult'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/interpretation',
      name: 'interpretation',
      component: Interpretation
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/code',
      name: 'code',
      component: Exchangecode
    },
    {
      path: '/result',
      name: 'result',
      component: PayResult
    }
  ]
})
