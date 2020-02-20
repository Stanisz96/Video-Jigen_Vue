import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Server } from 'miragejs'
import videosJSON from './mirage/videos.json'
import mcolorJSON from './mirage/monads_color.json'

let server = new Server({
  routes() {
    this.get("/videos", function ({ db }) {
      return db.videos

    }),
      this.get("/monads", function ({ db }) {
        return db.monads_color
      })
  }
})

server.db.loadData({
  videos: videosJSON,
  monads_color: mcolorJSON
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  server,
  render: h => h(App),
}).$mount('#app')
