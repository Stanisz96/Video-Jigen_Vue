<template>
  <div class="video-container">
    <div class="video-box">
      <youtube :video-id="getVideoId(findVideo)" ref="youtube"></youtube>
      <div class="tags">
        <div class="tag" v-for="tagId in findVideo.tagIds" :key="tagId">
          <router-link :to="{ name: 'tag', params: { id: tagId} }">
            <button>{{getTag(tagId).name}}</button>
          </router-link>
        </div>
      </div>
      <h1>{{findVideo.name}}</h1>
      <!-- <button @click="showVideo=true"></button> -->
      <div class="video-description">{{findVideo.description}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import Api from "@/services/api";

export default {
  name: "SingleVideo",
  computed: {
    ...mapState(["videos"]),
    ...mapGetters(["getTag"]),
    player() {
      return this.$refs.youtube.player;
    },
    findVideo: function() {
      // this.signleVideo = this.videos.find(
      //   video => video.id == this.$route.params.id
      // );
      return this.videos.find(video => video.id == this.$route.params.id) || {};
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    getVideoId(vid) {
      console.log(vid["video-url"]);
      return vid["video-url"].split("=")[1];
    }
  }
};
</script>

<style lang="scss">
// .video-container {
//   // background-color: #f7fff8;
//   //border: 0.1em solid rgba(79, 168, 109, 0.671);
//   //border-radius: 1em;
//   //text-align: center;
//   // .video-box {
//   //   margin: 1em;
//   //   iframe {
//   //     position: relative;
//   //     height: 25em;
//   //     width: 60%;

//   //     padding: 0.3em;
//   //     box-shadow: 0 0 0.2em 0.1em rgba(7, 104, 40, 0.733);
//   //     border-radius: 1em;
//   //     //scroll-behavior: unset;
//   //   }
//   //   .video-description {
//   //     max-width: 70%;
//   //     display: inline-block;
//   //   }
//   //   .tag {
//   //     display: inline-block;

//   //     button {
//   //       background-color: #ddfae0;
//   //       margin: 0.2em;
//   //       box-shadow: 0 0 0.2em 0 rgba(23, 214, 17, 0.5);
//   //       border-radius: 0.6em;
//   //       border: 1px groove rgba(79, 168, 109, 0.671);
//   //       &:focus {
//   //         outline: none;
//   //       }
//   //       &:active {
//   //         background-color: #a5dbaa;
//   //       }
//   //     }
//   //   }
//   // }
// }
</style>