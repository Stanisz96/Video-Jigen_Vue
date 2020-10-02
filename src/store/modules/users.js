import Cookies from 'js-cookie'
import Api from '@/services/api'
import { checkAndSetToken } from '@/utils/tools'

export default {
  state: {
    users: [],
    guests: [],
    currentUser: {},
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    LOGOUT_USER(state) {
      state.currentUser = {}
      // state.videos = []
      // state.tags = []
      Cookies.remove('UAT')
      Cookies.remove('URT')
      console.log("logout")
    }
  },
  actions: {
    async loadUsers({ commit }) {
      let response = await Api().get("/users")
      let users = response.data
      commit('SET_USERS', users)
    },
    async loadCurrentUser({ commit }) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      // Create guest
      if (userToken.accessToken == undefined && userToken.refreshToken == undefined) {
        return true
      }
      else {
        let message = checkAndSetToken(userToken, Api, Cookies)
        message.then(async (result) => {
          if (result.name == 'OK') {
            let loginRes = await Api().get('/users/login')
            let user = loginRes.data
            commit('SET_CURRENT_USER', user)
          }
        })
        return false
      }
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
    async logoutUser({ commit }) {
      let URT = { token: Cookies.get('URT') }
      await Api().post('/auth/logout', URT)
      commit("LOGOUT_USER")
      commit("LOGOUT_VIDEOS", null, { root: true })
      commit("LOGOUT_TAGS", null, { root: true })
    },
    async loginUser({ commit }, loginInfo) {
      try {
        let jwt = await Api().post('/auth/login_user', loginInfo)
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
  }
}
