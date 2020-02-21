import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { makeServer } from './mirage/server'
import vuetify from './plugins/vuetify';
// import { Server, JSONAPISerializer, Model } from 'miragejs'
// import videoJSON from './mirage/videos.json'
//import mcolorJSON from './mirage/monads_color.json'



Vue.config.productionTip = false

if (process.env.NODE_ENV === "development") {
  makeServer()
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
