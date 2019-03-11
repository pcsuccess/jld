import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/yunshi/views/fortune/Create.vue'
import Demon from '@/yunshi/views/fortune/Demon.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'demon',
      component: Demon
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    }
  ]
})
