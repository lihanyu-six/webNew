import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import layout from '../views/layout/index.vue'
import searchResult from '../views/searchResult/index'
import artDetails from '../views/artDetails/index.vue'
import userInfo from '../views/userInfo/index.vue'
import xiaoZhi from '../views/xiaoZhi/index.vue'
import son from './son'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/checkLogin',
    component: login
  },
  {
    path: '/searchResult',
    component: searchResult
  },
  {
    path: '/artDetails',
    component: artDetails
  },
  {
    path: '/layout',
    component: layout,
    children: son
  },
  {
    path: '/userInfo',
    component: userInfo
  },
  {
    path: '/xiaoZhi',
    component: xiaoZhi
  }
]

const router = new VueRouter({
  routes
})

export default router
