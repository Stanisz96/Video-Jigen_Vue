import Vue from 'vue'
import Vuex from 'vuex'
import VueYoutube from "vue-youtube";
import Api from '@/services/api'


Vue.use(Vuex)
Vue.use(VueYoutube)

export default new Vuex.Store({
  state: {
    videos: [],
    tags: []
  },
  mutations: {
    // SET STATE OBJECTS
    SET_VIDEOS(state, videos) {
      state.videos = videos;
      // console.log("Load videos data:")
      // console.log(videos)
    },
    SET_TAGS(state, tags) {
      state.tags = tags
      // console.log("Load tags data:")
      // console.log(tags)
    },

    // ADD TO STATE OBJECTS
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video)
      state.videos = videos
    },
    LIKE_VIDEO(state, video) {
      // let likeVideo = state.videos.find(v => v._id == video._id)
      // likeVideo.like = !likeVideo.like
      // state.videos.find(v => v._id == video._id) = likeVideo

      state.videos.forEach(v => {
        if (v._id == video._id) {
          v.like = video.like
        }
      })
    },

    // DELETE IN STATE OBJECTS
    DELETE_VIDEO(state, videoId) {
      let videos = state.videos.filter(v => v._id != videoId)
      state.videos = videos
    },

    // UPDATE IN STATE OBJECTS
    UPDATE_TAGS(state, video) {
      // console.log(`Update Tags for video with ID: ${video._id}`)
      let videoId = video._id
      let videoTags = video.tagIds
      let tags = state.tags
      // let updatedTags
      tags.forEach(tag => {
        if (videoTags.includes(tag._id)) {
          if (!tag.videosId.includes(videoId)) {
            tag.videosId.push(videoId)

            //  updatedTags.push(tag)
          }
        } else {
          if (tag.videosId.includes(videoId)) {
            tag.videosId = tag.videosId.filter(vid => vid != videoId)

            //  updatedTags.push(tag)
          }
        }
      })
      state.tags = tags
      // if (updatedTags != null) {
      //   updatedTags.forEach(uTag => {
      //     await Api().patch(`/tags/${uTag._id}`, uTag)
      //   })
      // }
    },
    EDIT_VIDEO(state, video) {
      state.videos.forEach(v => {
        if (v._id == video._id) {
          v = video
        }
      })

    }
  },
  actions: {
    // Load Data
    async loadVideos({ commit }) {
      let response = await Api().get("/videos");
      let videos = response.data

      commit('SET_VIDEOS', videos)
    },
    async loadTags({ commit }) {
      // console.log("send GET/tags")
      let response = await Api().get("/tags");
      let tags = response.data
      // console.log("GET/tags response data:")
      // console.log(tags)
      commit('SET_TAGS', tags)
    },

    // Create Data
    async createVideo({ commit }, video) {
      let response = await Api().post('/videos', video)
      let savedVideo = response.data;
      // console.log("Saved video:")
      // console.log(savedVideo)

      commit('ADD_VIDEO', savedVideo)
      commit('UPDATE_TAGS', savedVideo)
      return savedVideo;
    },

    // Update Data
    async updateTags({ state }, video) {
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

      await Api().patch(`/videos/${video._id}`, video)
      commit('EDIT_VIDEO', video)
      commit('UPDATE_TAGS', video)
    },

    // Delete Data
    async deleteVideo({ commit, state }, video) {
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

  },
  modules: {},
  getters: {
    getTag: state => _id => {
      return state.tags.find(t => t._id == _id);
    }
  }
})