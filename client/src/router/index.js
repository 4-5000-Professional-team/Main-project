import Vue from 'vue'
import VueRouter from 'vue-router'
import Cashier from '../views/Cashier.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cashier',
    component: Cashier
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/Members.vue')
  },
  {
    path: '/box',
    name: 'Box',
    component: () => import('../views/Box.vue')
  },
  {
    path: '/shift',
    name: 'Shift',
    component: () => import('../views/Shift.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue')
  },
  {
    path: '/auxiliary',
    name: 'Auxiliary',
    component: () => import('../views/Auxiliary.vue')
  },
  {
    path: '/exit',
    name: 'Exit',
    component: () => import('../views/Exit.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
