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
            console.log(`ADD VIDEO TO TAG: ${tag.name}`)
          }
        } else {
          if (tag.videosId.includes(videoId)) {
            console.log(`REMOVE VIDEO FROM TAG: ${tag.name}`)
            tag.videosId = tag.videosId.filter(vid => vid != videoId)
          }
        }
      })
      state.tags = tags;
    },
    LOGOUT_TAGS(state) {
      state.tags = []
    }
  },
  actions: {
    async loadTags({ commit }) {
      console.log("loadTags")
      let response = await Api().get("/tags");
      let tags = response.data
      commit('SET_TAGS', tags)
    },
    async updateTags({ commit, state }, video) {
      console.log("updateTags")
      let videoId = video._id
      let videoTags = video.tagIds
      let tags = state.tags
      for (let tag of tags) {
        if (videoTags.includes(tag._id)) {
          if (!tag.videosId.includes(videoId)) {
            console.log(`ADD VIDEO TO TAG: ${tag.name}`)
            tag.videosId.push(videoId)
            let newTag = tag
            await Api().patch(`/tags/${newTag._id}`, newTag)
          }
        } else {
          if (tag.videosId.includes(videoId)) {
            console.log(`REMOVE VIDEO FROM TAG: ${tag.name}`)
            tag.videosId = tag.videosId.filter(vid => vid != videoId)
            let newTag = tag
            await Api().patch(`/tags/${newTag._id}`, newTag)

          }
        }
      }
      commit('SET_TAGS', tags)

      // for (let tag of state.tags) {
      //   if (video.tagIds.includes(tag._id)) {
      //     console.log(tag)
      //     await Api().patch(`/tags/${tag._id}`, tag)
      //   }
      // }
    },
  },
  getters: {
    getTag: state => _id => {
      return state.tags.find(t => t._id == _id);
    }
  },
}
