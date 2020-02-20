<template>
  <div>
    <youtube v-if="showVideo" :video-id="getVideoId(findVideo)" ref="youtube"></youtube>
    <!-- {{this.$refs.youtube.width + "lol"}} -->

    <!-- <img :src="findVideo.thumbnail" alt="thumbnail" :style="findVideo.style" /> -->
    <h1>{{findVideo.name}}</h1>
    <!-- <button @click="showVideo=true"></button> -->
    <div class="video-description">{{findVideo.description}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Api from "@/services/api";

export default {
  name: "SingleVideo",
  computed: {
    ...mapState(["videos"]),
    player() {
      return this.$refs.youtube.player;
    },
    findVideo: function() {
      // this.signleVideo = this.videos.find(
      //   video => video.id == this.$route.params.id
      // );
      return (
        this.videos.find(video => video._id == this.$route.params.id) || {}
      );
    }
  },
  data() {
    return {
      video: "",
      showVideo: true
    };
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    getVideoId(vid) {
      return vid.videoUrl.split("=")[1];
    }
  }
};
</script>

<style scope>
.video-box {
  display: inline-block;
  height: 460px;
  width: 60%;
}
iframe {
  position: relative;
  height: 460px;
  width: 60%;
  /* height: calc(attr(data-width px, inherit) * 0.4) + "px"; */
  padding: 5px;
  box-shadow: 0 0 5px 2px rgba(6, 186, 0, 0.5);
  border-radius: 20px;
  scroll-behavior: unset;
}
.video-description {
  max-width: 70%;
  text-align: center;
  display: inline-block;
}
</style>