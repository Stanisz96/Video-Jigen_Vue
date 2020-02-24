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
      if (window.localStorage.getItem("addedVideos") === null) {
        state.videos = videos;
        window.localStorage.setItem('addedVideos', JSON.stringify(videos))
        console.log("wczytywane na nowo")
      }
      else {
        state.videos = JSON.parse(window.localStorage.addedVideos)
        console.log("wczytywane z localStorage")
      }
    },
    SET_TAGS(state, tags) {
      if (window.localStorage.getItem("tags") === null) {
        state.tags = tags
        window.localStorage.setItem('tags', JSON.stringify(tags))
        window.localStorage.tags = JSON.stringify(tags)
      } else {
        state.tags = JSON.parse(window.localStorage.tags)
      }
    },
    SET_LIKED_VIDEOS(state, likedVideos) {
      state.likedVideos = likedVideos
    },

    // ADD TO STATE OBJECTS
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video)
      state.videos = videos
      window.localStorage.addedVideos = JSON.stringify(videos)
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
      let videoId = video.id
      let videoTags = video.tagIds
      console.log("videoTags")
      console.log(videoTags)
      let tags = state.tags
      tags.forEach(tag => {
        if (videoTags.includes(tag.id)) {
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
      window.localStorage.tags = JSON.stringify(tags)
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
      let response = await Api().get("/api/videos");
      let videos = response.data.data

      let tags = response.data.included.filter(i => i.type === "tags")
      videos.forEach(v => {
        v.attributes.tagIds = v.relationships.tags.data.map(t => t.id)
        v.attributes.id = v.id
      });
      tags.forEach(t => {
        t.attributes.id = t.id
        t.attributes.videosId = t.relationships.videos.data.map(v => v.id)
      });
      commit('SET_VIDEOS', videos.map(v => v.attributes))
      commit('SET_TAGS', tags.map(t => t.attributes))

      let likedVideos
      if (window.localStorage.getItem("likedVideos") !== null) {
        likedVideos = JSON.parse(window.localStorage.likedVideos)
      } else {
        window.localStorage.setItem('likedVideos', '[]')
        likedVideos = JSON.parse(window.localStorage.likedVideos)
      }
      commit('SET_LIKED_VIDEOS', likedVideos)
    },

    // Create Data
    async createVideo({ commit }, video) {
      let response = await Api().post('/api/videos', video)
      let savedVideo = response.data.data;

      let relationships = savedVideo.relationships.tags.data
      savedVideo = { id: savedVideo.id, ...savedVideo.attributes }
      savedVideo.tagIds = relationships.map(x => x.id)

      commit('ADD_VIDEO', savedVideo)
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
    getTag: state => id => {
      return state.tags.find(t => t.id == id);
    }
  }
})