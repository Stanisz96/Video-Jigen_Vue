import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

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
    path: '/register',
    name: 'user-register',
    component: loadView("UserRegistration")
  },
  {
    path: '/admin/users',
    name: 'admin-user-list',
    component: loadView("AdminUserList")
  },
  {
    path: '/admin/videos',
    name: "admin-video-list",
    component: loadView("AdminVideoList"),
    beforeEnter(to, from, next) {
      let currentUser = Cookies.getJSON('currentUser')
      if (currentUser && currentUser.name) {
        next()
      } else {
        console.log(from)
        alert('You are not logged!')
        next(from.path)
      }
    }
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