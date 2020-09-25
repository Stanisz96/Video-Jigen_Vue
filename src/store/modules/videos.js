import Cookies from 'js-cookie'
import Api from '@/services/api'
import Tools from '@/utils/tools'

export default {
  state: {
    videos: [],
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video)
      state.videos = videos
    },
    DELETE_VIDEO(state, videoId) {
      let videos = state.videos.filter(v => v._id != videoId)
      state.videos = videos
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
    LOGOUT_VIDEOS(state) {
      state.videos = []
    }
  },
  actions: {
    async loadVideos({ commit }) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(userToken, Api, Cookies)
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
    async createVideo({ commit, state }, video) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(userToken, Api, Cookies)
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
    async likeVideo({ commit }, video) {
      let likeVideo = video
      likeVideo.like = !likeVideo.like
      await Api().patch(`/videos/${video._id}`, likeVideo)

      commit('LIKE_VIDEO', likeVideo)
    },
    async editVideo({ commit }, video) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(userToken, Api, Cookies)
      message.then(async (result) => {
        if (result.name == 'OK') {
          await Api().patch(`/videos/${video._id}`, video)

          commit('EDIT_VIDEO', video)
          commit('UPDATE_TAGS', video)
        }
      })
    },
    async deleteVideo({ commit, state }, video) {
      let userToken = { accessToken: Cookies.get('UAT'), refreshToken: Cookies.get('URT') }
      let message = Tools.checkAndSetToken(userToken.accessToken, userToken.refreshToken, Api, Cookies)
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
  }
}
