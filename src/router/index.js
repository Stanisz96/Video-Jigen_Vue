import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Videos from '../views/Videos.vue'
import SingleVideo from '../views/SingleVideo.vue'
import TagVideoList from '../views/TagVideoList.vue'
import AddVideo from '../views/AddVideo.vue'
import AdminVideoList from '../views/AdminVideoList.vue'

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
    path: '/admin/videos',
    name: "admin-video-list",
    component: AdminVideoList
  },
  {
    path: '/videos',
    name: 'videos',
    component: Videos
  },
  {
    path: '/videos/add',
    name: "add-video",
    component: AddVideo
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