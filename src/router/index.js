import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Monads from '../views/Monads.vue'
import MonadsColor from '../views/MonadsColor.vue'
import Videos from '../views/Videos.vue'
import SingleVideo from '../views/SingleVideo.vue'
import TagVideoList from '../views/TagVideoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import("../views/About.vue")
  },
  {
    path: '/monads',
    name: 'monads',
    component: Monads
  },
  {
    path: '/monads/:id',
    name: "monads-color",
    component: MonadsColor,
    params: true
  },
  {
    path: '/videos',
    name: 'videos',
    component: Videos
  },
  {
    path: '/videos/:id',
    name: 'single-video',
    component: SingleVideo,
    params: true
  },
  {
    path: '/videos/tag/:id',
    name: "tag",
    component: TagVideoList,
    params: true
  }
]

const router = new VueRouter({
  routes
})

export default router;