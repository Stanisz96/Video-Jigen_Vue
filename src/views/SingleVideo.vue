<template>
  <v-container fluid v-if="findVideo">
    <v-row>
      <v-col md="7" cols="12" v-show="loaded">
        <div class="video-style">
          <youtube
            :video-id="getVideoId(findVideo)"
            ref="youtube"
            fitParent
            resize
            :resizeDelay="0"
            @ready="loaded=true"
          ></youtube>
        </div>
      </v-col>
      <v-col md="5" cols="12">
        <div class="display-1 mb-3 font-weight-regular">{{findVideo.name}}</div>
        <v-btn depressed icon small @click="likeVideo(findVideo._id)">
          <v-icon v-if="liked" color="#7dbd81">{{ icons.mdiHeart }}</v-icon>
          <v-icon v-else color="#7dbd81">{{ icons.mdiHeartOutline }}</v-icon>
        </v-btn>
        <div class="my-3 video-description">{{findVideo.description}}</div>
        <div class="d-inline-flex">
          <div class="tag" v-for="tagId in findVideo.tagIds" :key="tagId" color="#a1e3a6">
            <v-btn
              v-if="getTag(tagId)"
              class="button mr-2"
              x-small
              :to="{ name: 'tag', params: { id: tagId} }"
              text
            >{{getTag(tagId).name}}</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

export default {
  name: "SingleVideo",
  computed: {
    ...mapState(["videos", "likedVideos"]),
    ...mapGetters(["getTag"]),
    player() {
      return this.$refs.youtube.player;
    },
    findVideo: function() {
      return this.videos.find(video => video._id == this.$route.params.id);
    },
    liked() {
      return this.likedVideos.includes(this.findVideo._id);
    }
  },
  methods: {
    ...mapActions(["likeVideo"]),
    playVideo() {
      this.player.playVideo();
    },
    getVideoId(vid) {
      return vid.videoUrl.split("=")[1];
    }
  },
  data() {
    return {
      loaded: false,
      icons: {
        mdiHeart,
        mdiHeartOutline
      }
    };
  }
};
</script>

<style lang="scss">
.video-style {
  iframe {
    box-shadow: 0 0 0.3em 0.05em rgba(19, 119, 32, 0.733);
    border-radius: 1em;
  }
}
</style>