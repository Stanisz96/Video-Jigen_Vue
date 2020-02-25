import Vue from 'vue'
import Vuex from 'vuex'
import VueYoutube from "vue-youtube";
import Api from '@/services/api'


Vue.use(Vuex)
Vue.use(VueYoutube)

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    likedVideos: []
  },
  mutations: {
    // SET STATE OBJECTS
    SET_VIDEOS(state, videos) {
      state.videos = videos;
      console.log("Load videos data:")
      console.log(videos)
    },
    SET_TAGS(state, tags) {
      state.tags = tags
      console.log("Load tags data:")
      console.log(tags)
    },
    SET_LIKED_VIDEOS(state, likedVideos) {
      state.likedVideos = likedVideos
    },

    // ADD TO STATE OBJECTS
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video)
      state.videos = videos
    },
    LIKE_VIDEO(state, videoId) {
      let likedVideos = []
      if (!state.likedVideos.includes(videoId)) {
        likedVideos = state.likedVideos.concat(videoId)
      } else {
        likedVideos = state.likedVideos.filter(lv => {
          return lv != videoId
        })
      }
      state.likedVideos = likedVideos
      if (window.localStorage.getItem("likedVideos") === null) {
        window.localStorage.setItem('likedVideos', JSON.stringify(likedVideos))
      } else {
        window.localStorage.likedVideos = JSON.stringify(likedVideos)
      }
    },

    // DELETE IN STATE OBJECTS
    DELETE_VIDEO(state, videoId) {

      let videos = state.videos.filter(v => v.id != videoId)
      state.videos = videos
      window.localStorage.addedVideos = JSON.stringify(state.videos)
    },

    // UPDATE IN STATE OBJECTS
    UPDATE_TAGS(state, video) {
      let videoId = video._id
      let videoTags = video.tagIds
      console.log("videoTags")
      console.log(videoTags)
      let tags = state.tags
      tags.forEach(tag => {
        if (videoTags.includes(tag._id)) {
          if (!tag.videosId.includes(videoId)) {
            tag.videosId.push(videoId)
          }
        } else {
          if (tag.videosId.includes(videoId)) {
            tag.videosId = tag.videosId.filter(vid => vid != videoId)
          }
        }
      })
      console.log(tags)
      state.tags = tags
    },
    EDIT_VIDEO(state, video) {
      state.videos.forEach(v => {
        if (v.id == video.id) {
          v = video

        }
      })
      window.localStorage.addedVideos = JSON.stringify(state.videos)
    }

  },
  actions: {
    // Load Data
    async loadVideos({ commit }) {
      console.log("send GET/videos")
      let response = await Api().get("/videos");
      let videos = response.data
      console.log("GET/videos response data:")
      console.log(videos)

      // let tags = response.data.included.filter(i => i.type === "tags")
      // videos.forEach(v => {
      //   v.attributes.tagIds = v.relationships.tags.data.map(t => t.id)
      //   v.attributes.id = v.id
      // });
      // tags.forEach(t => {
      //   t.attributes.id = t.id
      //   t.attributes.videosId = t.relationships.videos.data.map(v => v.id)
      // });

      commit('SET_VIDEOS', videos)
      // commit('SET_TAGS', tags.map(t => t.attributes))

      let likedVideos = []
      // if (window.localStorage.getItem("likedVideos") !== null) {
      //   likedVideos = JSON.parse(window.localStorage.likedVideos)
      // } else {
      //   window.localStorage.setItem('likedVideos', '[]')
      //   likedVideos = JSON.parse(window.localStorage.likedVideos)
      // }
      commit('SET_LIKED_VIDEOS', likedVideos)
    },
    async loadTags({ commit }) {
      console.log("send GET/tags")
      let response = await Api().get("/tags");
      let tags = response.data
      console.log("GET/tags response data:")
      console.log(tags)
      commit('SET_TAGS', tags)
    },

    // Create Data
    async createVideo({ commit }, video) {
      let response = await Api().post('/videos', video)
      let savedVideo = response.data;
      console.log("Saved video:")
      console.log(savedVideo)

      commit('ADD_VIDEO', savedVideo)
      commit('UPDATE_TAGS', savedVideo)
      return savedVideo;
    },

    // Update Data
    likeVideo({ commit }, videoId) {
      commit('LIKE_VIDEO', videoId)
    },
    updateTags({ commit }, video) {
      commit('UPDATE_TAGS', video)
    },
    async editVideo({ commit }, video) {
      commit('EDIT_VIDEO', video)
    },

    // Delete Data
    async deleteVideo({ commit }, video) {
      commit('DELETE_VIDEO', video.id)
    }
  },
  modules: {},
  getters: {
    getTag: state => _id => {
      return state.tags.find(t => t._id == _id);
    }
  }
})