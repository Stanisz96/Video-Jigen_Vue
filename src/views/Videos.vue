<template>
  <div>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">Music Videos</div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video" class="ma-3 pa-2"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";
// import Api from "@/services/api";

export default {
  name: "videos",
  components: {
    VideoListVideo
  },
  computed: {
    ...mapState(["videos", "tags"])
  },
  methods: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss">
// .header {
//   text-align: center;
//   margin-top: 1em;
// }
</style>
