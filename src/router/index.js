import Vue from 'vue'
import VueRouter from 'vue-router'
import BoxOffice from '../views/BoxOffice.vue'
import MovieRecommend from '../views/MovieRecommend.vue'
import MovieDetail from '../views/MovieDetail.vue'
import MbtiDetail from '../views/MbtiDetail.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BoxOffice
  },
  {
    path: '/boxoffice',
    name: 'BoxOffice',
    component: BoxOffice
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/movierecommend',
    name: 'MovieRecommend',
    component: MovieRecommend
  },
  {
    path: '/movierecommend/:mbtiId',
    name: 'MbtiDetail',
    component: MbtiDetail,
    props: true,
  },
  {
    path: '/boxoffice/:movie_id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
