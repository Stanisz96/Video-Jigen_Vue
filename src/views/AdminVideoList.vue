<template>
  <v-container>
    <h1>Video List</h1>
    <v-btn to="/videos/add">Add Video</v-btn>
    <div class="flex-table tit">
      <div>Name</div>
      <div>Description</div>
      <div>Actions</div>
    </div>
    <div v-for="video in videos" :key="video._id" class="flex-table">
      <div>{{ video.name }}</div>
      <div>{{ video.description | abbreviate }}</div>
      <div class="actions">
        <router-link
          class="link"
          :to="{ name: 'single-video', params: { id: video._id } }"
          >Show</router-link
        >
        <router-link
          class="link"
          :to="{ name: 'admin-video-edit', params: { id: video._id } }"
          >Edit</router-link
        >
        <v-btn class="button" @click="removeVideo(video)">Delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      videos: (state) => state.videoModel.videos,
    }),
  },
  filters: {
    abbreviate(text) {
      if (text) {
        return text && text.slice(0, 40) + "...";
      }
    },
  },
  methods: {
    ...mapActions(["deleteVideo"]),
    removeVideo(video) {
      let response = confirm(`Are you sure you want to delete ${video.name}?`);
      if (response) {
        this.deleteVideo(video);
      }
    },
  },
  destroyed() {
    console.log(`Admin video list has been destroyed!`);
  },
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 1em;
  border-bottom: 1px #5eb56f solid;
  &.tit {
    text-align: center;
  }
  &:nth-of-type(2n) {
    background-color: #e1fae3;
  }

  .actions {
    text-align: center;
    .link {
      padding: 1em;
    }
    .button {
      margin-left: 1em;
    }
  }
}
</style>