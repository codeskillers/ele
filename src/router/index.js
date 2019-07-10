import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/aa'
// import Goods from '@/components/goods/goods'
import Seller from '@/components/Seller'
import Ratings from '@/components/Ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
