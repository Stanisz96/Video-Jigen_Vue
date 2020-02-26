<template>
  <div>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">Music Videos</div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videos" :key="video._id">
        <!-- {{checkout(video)}} -->
        <VideoListVideo :video="video" class="ma-3 pa-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";
// import Api from "@/services/api";

export default {
  components: {
    VideoListVideo
  },
  computed: {
    ...mapState(["videos", "tags"])
  },
  methods: {
    // checkout: function(v) {
    //   console.log("Video in Videos page:");
    //   console.log(v);
    // }
  },
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
