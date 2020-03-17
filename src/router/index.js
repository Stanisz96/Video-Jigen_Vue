import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

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
    path: '/admin',
    name: 'admin',
    component: loadView("Admin"),
    beforeEnter(to, from, next) {
      let currentUser = store.state.currentUser
      if (currentUser && currentUser.admin) {
        next()
      } else {
        console.log(from)
        alert('You are not in admin mode!')
        next(from.path)
      }
    },
    children: [
      {
        path: 'videos',
        name: "admin-video-list",
        component: loadView("AdminVideoList")
      },
      {
        path: 'users',
        name: 'admin-user-list',
        component: loadView("AdminUserList")
      },
      {
        path: 'video/:id/edit',
        name: 'admin-video-edit',
        component: loadView("AdminVideoEdit"),
        params: true
      }
    ]
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