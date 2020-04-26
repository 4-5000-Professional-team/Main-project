import Vue from 'vue'
import VueRouter from 'vue-router'
import Cashier from '../views/Cashier.vue'
import utils from '../assets/utils/util.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cashier',
    component: Cashier,
    beforeEnter(to, from, next) {
      const cookie = utils.getCookie("user");
      if (cookie == null || cookie == undefined) {
        next('/logoin')
      } else {
        next();
      }
    }
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/Members.vue'),
    beforeEnter(to, from, next) {
      const cookie = utils.getCookie("user");
      if (cookie == null || cookie == undefined) {
        next('/logoin')
      } else {
        next();
      }
    }
  },
  {
    path: '/box',
    name: 'Box',
    component: () => import('../views/Box.vue'),
    beforeEnter(to, from, next) {
      const cookie = utils.getCookie("user");
      if (cookie == null || cookie == undefined) {
        next('/logoin')
      } else {
        next();
      }
    }
  },
  {
    path: '/shift',
    name: 'Shift',
    component: () => import('../views/Shift.vue'),
    beforeEnter(to, from, next) {
      const cookie = utils.getCookie("user");
      if (cookie == null || cookie == undefined) {
        next('/logoin')
      } else {
        next();
      }
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    beforeEnter(to, from, next) {
      const cookie = utils.getCookie("user");
      if (cookie == null || cookie == undefined) {
        next('/logoin')
      } else {
        next();
      }
    }
  },
  {
    path: '/auxiliary',
    name: 'Auxiliary',
    component: () => import('../views/Auxiliary.vue'),
    beforeEnter(to, from, next) {
      const cookie = utils.getCookie("user");
      if (cookie == null || cookie == undefined) {
        next('/logoin')
      } else {
        next();
      }
    }
  },
  {
    path: '/exit',
    name: 'Exit',
    component: () => import('../views/Exit.vue')
  },
  {
    path: '/logoin',
    name: 'Logoin',
    component: () => import('../views/Logoin.vue')
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
