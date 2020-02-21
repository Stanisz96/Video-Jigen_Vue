import Vue from 'vue'
import Vuex from 'vuex'
import VueYoutube from "vue-youtube";
import Api from '@/services/api'
//import uuid from 'uuid'

Vue.use(Vuex)
Vue.use(VueYoutube)

export default new Vuex.Store({
  state: {
    monads_color: [],
    videos: [],
    tags: []
  },
  mutations: {
    // SET STATE OBJECTS
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_MONADS(state, monads) {
      state.monads_color = monads;
    },
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    // ADD TO STATE OBJECTS
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video)
      state.videos = videos
    }
  },
  actions: {
    // Load Date
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
    },
    async loadMonads({ commit }) {
      let response = await Api().get("/api/monads");
      let monads = response.data.data
      monads.forEach(m => {
        m.attributes.id = m.id
      });
      commit('SET_MONADS', monads.map(m => m.attributes))
    },
    // Create Date
    async createVideo({ commit }, video) {
      let response = await Api().post('/api/videos', video)
      let savedVideo = response.data.data;
      savedVideo = { _id: savedVideo.id, ...savedVideo.attributes }
      commit('ADD_VIDEO', savedVideo)
      return savedVideo;
    }

  },
  modules: {},
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id == id);
    }
  }
})