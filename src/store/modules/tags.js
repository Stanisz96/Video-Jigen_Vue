import Api from '@/services/api'

export default {
  state: {
    tags: [],
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags
    },
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
    LOGOUT_TAGS(state) {
      state.tags = []
    }
  },
  actions: {
    async loadTags({ commit }) {
      let response = await Api().get("/tags");
      let tags = response.data
      commit('SET_TAGS', tags)
    },
    async updateTags({ commit, state }, video) {
      commit('UPDATE_TAGS', video)
      for (let tag of state.tags) {
        if (video.tagIds.includes(tag._id)) {
          await Api().patch(`/tags/${tag._id}`, tag)
        }
      }
    },
  },
  getters: {
    getTag: state => _id => {
      return state.tags.find(t => t._id == _id);
    }
  },
}
