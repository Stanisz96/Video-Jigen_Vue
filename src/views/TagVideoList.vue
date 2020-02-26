<template>
  <div v-if="tag">
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">Tag: {{tag.name}}</div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videosOnTag" :key="video._id">
        <VideoListVideo :video="video" class="ma-2 pa-2" />
      </div>
    </div>
  </div>
  <!--  -->
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VideoListVideo from "../components/VideoListVideo";

export default {
  name: "TagVideoList",
  components: {
    VideoListVideo
  },
  computed: {
    ...mapGetters(["getTag"]),
    ...mapState(["videos"]),
    tag() {
      return this.getTag(this.$route.params.id);
    },
    videosOnTag() {
      // console.log(`Videos with ${this.tag.name} tag`);
      // console.log(this.tag.videosId);
      return this.videos.filter(v => this.tag.videosId.includes(v._id));
    }
  }
};
</script>

<style>
</style>