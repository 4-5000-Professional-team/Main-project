import Vue from 'vue'
import VueRouter from 'vue-router'
import Cashier from '../views/Cashier.vue'
import util from '../assets/utils/util.js'
Vue.use(VueRouter)
const fn = (to, from, next) => {
  const user = util.getCookie('user')
  if (!user) next('/login')
  else next()
}
const routes = [
  {
    path: '/',
    name: 'Cashier',
    component: Cashier,
    beforeEnter: fn
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/Members.vue'),
    beforeEnter: fn
  },
  {
    path: '/box',
    name: 'Box',
    component: () => import('../views/Box.vue'),
    beforeEnter: fn
  },
  {
    path: '/shift',
    name: 'Shift',
    component: () => import('../views/Shift.vue'),
    beforeEnter: fn
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    beforeEnter: fn
  },
  {
    path: '/auxiliary',
    name: 'Auxiliary',
    component: () => import('../views/Auxiliary.vue'),
    beforeEnter: fn
  },
  {
    path: '/exit',
    name: 'Exit',
    component: () => import('../views/Exit.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
