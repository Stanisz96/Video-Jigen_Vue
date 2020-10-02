<template v-if="videos">
  <v-container fluid>
    <v-row v-show="loaded">
      <v-col md="7" cols="12">
        <div class="video-style">
          <youtube
            :video-id="getVideoId(video)"
            ref="youtube"
            fitParent
            resize
            :resizeDelay="0"
            @ready="loaded = true"
          ></youtube>
        </div>
      </v-col>
      <v-col md="5" cols="12">
        <div class="display-1 mb-3 font-weight-regular">{{ video.name }}</div>
        <v-btn depressed icon small @click="video.like = !video.like">
          <v-icon v-if="video.like" color="#7dbd81">{{
            icons.mdiHeart
          }}</v-icon>
          <v-icon v-else color="#7dbd81">{{ icons.mdiHeartOutline }}</v-icon>
        </v-btn>
        <div class="my-3 video-description">{{ video.description }}</div>
        <div class="d-inline-flex">
          <div
            class="tag"
            v-for="tagId in video.tagIds"
            :key="tagId"
            color="#a1e3a6"
          >
            <v-btn
              v-if="getTag(tagId)"
              class="button mr-2"
              x-small
              :to="{ name: 'tag', params: { id: tagId } }"
              text
              >{{ getTag(tagId).name }}</v-btn
            >
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
  created() {
    this.video = this.videos.find(
      (video) => video._id == this.$route.params.id
    );
  },
  computed: {
    ...mapState({
      videos: (state) => state.videoModel.videos,
      likedVideos: (state) => state.videoModel.likedVideos,
    }),
    ...mapGetters(["getTag"]),
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    ...mapActions(["likeVideo"]),
    playVideo() {
      this.player.playVideo();
    },
    getVideoId(vid) {
      let vidId = vid.videoUrl.split("=")[1];
      vidId = vidId.split("&")[0];
      return vidId;
    },
  },
  data() {
    return {
      loaded: false,
      video: Object,
      icons: {
        mdiHeart,
        mdiHeartOutline,
      },
    };
  },
  destroyed() {
    console.log(`Single video has been destroyed!`);
  },
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