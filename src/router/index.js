import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Videos from '../views/Videos.vue'
// import SingleVideo from '../views/SingleVideo.vue'
// import TagVideoList from '../views/TagVideoList.vue'
// import AddVideo from '../views/AddVideo.vue'
// import AdminVideoList from '../views/AdminVideoList.vue'
// import AdminVideoEdit from '../views/AdminVideoEdit.vue'
// import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

function loadView(view) {
  return () => import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: loadView("Home")
  },
  {
    path: '/about',
    name: 'about',
    component: loadView("About")
  },
  {
    path: '/login',
    name: 'user-login',
    component: loadView("UserLogin")
  },
  {
    path: '/admin/users',
    name: 'admin-user-list',
    component: loadView("AdminUserList")
  },
  {
    path: '/admin/videos',
    name: "admin-video-list",
    component: loadView("AdminVideoList")
  },
  {
    path: '/admin/video/:id/edit',
    name: 'admin-video-edit',
    component: loadView("AdminVideoEdit"),
    params: true
  },
  {
    path: '/videos',
    name: 'videos',
    component: loadView("Videos")
  },
  {
    path: '/videos/add',
    name: "add-video",
    component: loadView("AddVideo")
  },
  {
    path: '/videos/:id',
    name: 'single-video',
    component: loadView("SingleVideo"),
    params: true
  },
  {
    path: '/videos/tag/:id',
    name: "tag",
    component: loadView("TagVideoList"),
    params: true
  }

]

const router = new VueRouter({
  routes
})



export default router;