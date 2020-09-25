<template>
  <div>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">
      Music Videos
    </div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videos" :key="video._id">
        <VideoListVideo :video="video" :active="true" class="ma-3 pa-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";

export default {
  created() {
    this.loadVideos();
    this.loadTags();
    // console.log("loadedTagsInVideos");
  },
  components: {
    VideoListVideo,
  },
  computed: {
    ...mapState({
      videos: (state) => state.videoModel.videos,
      tags: (state) => state.tagModel.tags,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadVideos", "loadTags"]),
  },
};
</script>

<style lang="scss">
</style>
