import Vue from 'vue'
import Vuex from 'vuex'
import VueYoutube from "vue-youtube"
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import guiModel from '@/store/modules/gui'
import videoModel from '@/store/modules/videos'
import tagModel from '@/store/modules/tags'
import userModel from '@/store/modules/users'

// import guiModel from './modules/gui'
// import videoModel from './modules/videos'
// import tagModel from './modules/tags'
// import userModel from './modules/users'


Vue.use(Vuex)
Vue.use(VueYoutube)

const store = new Vuex.Store({
  modules: {
    guiModel, videoModel, tagModel, userModel
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.getJSON(key),
        setItem: (key, value) => {
          value = JSON.parse(value)
          delete value.currentUser
          Cookies.set(key, value)
        },
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})


export default store