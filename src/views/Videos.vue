<template>
  <div>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">Music Videos</div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videos" :key="video._id">
        <VideoListVideo :video="video" class="ma-3 pa-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";

export default {
  components: {
    VideoListVideo
  },
  computed: {
    ...mapState(["videos", "tags"])
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
