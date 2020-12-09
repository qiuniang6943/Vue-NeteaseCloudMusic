import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MusicHall from '@/views/MusicHall.vue'
import Video from '@/views/Video.vue'
import Ilike from '@/views/Ilike.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        component:MusicHall
      },
      {
        path: 'Video',
        name:'Video',
        component: Video
      },
      {
        path: 'Ilike',
        name:'Ilike',
        component: Ilike
      },
      {
        path: 'Login',
        name:'Login',
        component: Login
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
