import Vue from 'vue'
import Vuex from 'vuex'
import VueYoutube from "vue-youtube";
import Api from '@/services/api'
import Tools from '@/utils/tools'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'


Vue.use(Vuex)
Vue.use(VueYoutube)

const store = new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    users: [],
    currentUser: {},
    snackbars: []
  },
  mutations: {
    // SET STATE OBJECTS
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar)
    },
    // ADD TO STATE OBJECTS
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video)
      state.videos = videos
    },

    // DELETE IN STATE OBJECTS
    DELETE_VIDEO(state, videoId) {
      let videos = state.videos.filter(v => v._id != videoId)
      state.videos = videos
    },

    // UPDATE IN STATE OBJECTS
    UPDATE_TAGS(state, video) {
      let videoId = video._id
      let videoTags = video.tagIds
      let tags = state.tags
      tags.forEach(tag => {
        if (videoTags.includes(tag._id)) {
          if (!tag.videosId.includes(videoId)) {
            tag.videosId.push(videoId)
            console.log(`UPDATE_TAGS: ${tag.name}`)
          }
        } else {
          if (tag.videosId.includes(videoId)) {
            tag.videosId = tag.videosId.filter(vid => vid != videoId)
          }
        }
      })
      state.tags = tags
    },
    LIKE_VIDEO(state, video) {
      state.videos.forEach(v => {
        if (v._id == video._id) {
          v.like = video.like
        }
      })
    },
    EDIT_VIDEO(state, video) {
      state.videos.forEach(v => {
        if (v._id == video._id) {
          v = video
        }
      })
    },
    LOGOUT_USER(state) {
      state.currentUser = {}
      Cookies.remove('UAT')
      Cookies.remove('URT')
      Cookies.remove('vuex')
    }
  },
  actions: {
    // Load Data
    async loadVideos({ commit }) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(jwt, userToken.accessToken, userToken.refreshToken, Api, Cookies)
      message.then(async (result) => {
        if (result.name == 'OK') {
          let response = await Api().get("/videos");
          let videos = response.data
          commit('SET_VIDEOS', videos)
        } else {
          console.log(result)
        }
      })
    },
    async loadTags({ commit }) {
      let response = await Api().get("/tags");
      let tags = response.data

      commit('SET_TAGS', tags)
    },
    async loadUsers({ commit }) {
      let response = await Api().get("/users")
      let users = response.data
      commit('SET_USERS', users)
    },
    async loadCurrentUser({ commit }) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(jwt, userToken.accessToken, userToken.refreshToken, Api, Cookies)
      message.then(async (result) => {
        if (result.name == 'OK') {
          let loginRes = await Api().get('/users/login')
          let user = loginRes.data
          commit('SET_CURRENT_USER', user)
        }
      })
    },
    setSnackbar({ commit }, snackbar) {
      commit('SET_SNACKBAR', snackbar)
    },

    // Create Data
    async createVideo({ commit, state }, video) {

      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(jwt, userToken.accessToken, userToken.refreshToken, Api, Cookies)
      message.then(async (result) => {
        if (result.name == 'OK') {
          let response = await Api().post('/videos', video)
          let savedVideo = response.data;
          commit('ADD_VIDEO', savedVideo)
          commit('UPDATE_TAGS', savedVideo)
          for (let tag of state.tags) {
            if (video.tagIds.includes(tag._id)) {
              await Api().patch(`/tags/${tag._id}`, tag)
            }
          }
        }
      })
    },
    async regUser({ commit }, regInfo) {
      try {
        let res = await Api().post('/users', regInfo)
        let response = await Api().get("/users")
        let users = response.data

        commit('SET_USERS', users)
        return res
      } catch (error) {
        return { error: "ERROR! You have not completed your registration" }
      }
    },

    // Update Data
    async updateTags({ commit, state }, video) {
      commit('UPDATE_TAGS', video)
      for (let tag of state.tags) {
        if (video.tagIds.includes(tag._id)) {
          await Api().patch(`/tags/${tag._id}`, tag)
        }
      }
    },
    async likeVideo({ commit }, video) {
      let likeVideo = video
      likeVideo.like = !likeVideo.like
      await Api().patch(`/videos/${video._id}`, likeVideo)

      commit('LIKE_VIDEO', likeVideo)
    },
    async editVideo({ commit }, video) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(jwt, userToken.accessToken, userToken.refreshToken, Api, Cookies)
      message.then(async (result) => {
        if (result.name == 'OK') {
          await Api().patch(`/videos/${video._id}`, video)

          commit('EDIT_VIDEO', video)
          commit('UPDATE_TAGS', video)
        }
      })
    },
    async logoutUser({ commit }) {
      let URT = { token: Cookies.get('URT') }
      await Api().post('/auth/logout', URT)
      commit("LOGOUT_USER")
    },
    async loginUser({ commit }, loginInfo) {
      try {
        let jwt = await Api().post('/auth/login', loginInfo)
        Cookies.set('UAT', jwt.data.accessToken)
        Cookies.set('URT', jwt.data.refreshToken)
        let response = await Api().get('/users/login')
        let user = response.data
        commit("SET_CURRENT_USER", user)

        return user
      } catch (error) {
        return { error: "something wrong with name or pass" }
      }
    },

    // Delete Data
    async deleteVideo({ commit, state }, video) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(jwt, userToken.accessToken, userToken.refreshToken, Api, Cookies)
      message.then(async (result) => {
        if (result.name == 'OK') {
          let delVideo = video
          for (let tag of state.tags) {
            if (tag.videosId.includes(delVideo._id)) {
              tag.videosId = tag.videosId.filter(id => id != delVideo._id)
              let newTag = tag
              await Api().patch(`/tags/${newTag._id}`, newTag)
            }
          }
          await Api().delete(`/videos/${delVideo._id}`)
          delVideo.tagIds = []

          commit('DELETE_VIDEO', delVideo._id)
          commit('UPDATE_TAGS', delVideo)
        }
      })
    }

  },
  modules: {},
  getters: {
    getTag: state => _id => {
      return state.tags.find(t => t._id == _id);
    }
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