<template>
  <v-card max-width="300" hover color="#e1fae3" class="rounded-card">
    {{checkout(video)}}
    <div class="ma-1">
      <router-link :to="{ name: 'single-video', params: { id: video._id} }">
        <v-img :src="video.thumbnail" alt="thumbnail" class="img-card"></v-img>
      </router-link>
      <v-card-title class="flex-wrap pa-1">{{ video.name }}</v-card-title>
      <v-btn depressed icon x-small @click="likeVideo(video._id)" class="ml-2 mb-2">
        <v-icon v-if="liked" color="#7dbd81">{{ icons.mdiHeart }}</v-icon>
        <v-icon v-else color="#7dbd81">{{ icons.mdiHeartOutline }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <v-card-actions class="pa-0">
        <v-container bottom class="pa-1">
          <v-row>
            <v-col cols="10">
              <div class="d-inline-flex flex-wrap">
                <div class="tag" v-for="tagId in video.tagIds" :key="tagId" color="#a1e3a6">
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
            <v-col cols="2">
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show" class="absolute">
          <v-divider></v-divider>

          <v-card-text>{{ video.description }}</v-card-text>
        </div>
      </v-expand-transition>
    </div>
  </v-card>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

export default {
  name: "VideoListVideo",
  props: ["video"],
  computed: {
    ...mapGetters(["getTag"]),
    ...mapState(["likedVideos"]),
    liked() {
      return this.likedVideos.includes(this.video._id);
    }
  },
  data() {
    return {
      hover: false,
      snackbar: false,
      show: false,
      icons: {
        mdiHeart,
        mdiHeartOutline
      }
    };
  },
  methods: {
    ...mapActions(["likeVideo"]),
    checkout: function(v) {
      console.log("Video in VideoListVideo component:");
      console.log(v);
    }
  }
};
</script>

<style lang="scss" scoped>
// html {
//   overflow-y: auto;
// }
.active {
  border-radius: 5em !important;
}
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
.rounded-card {
  // border: 1px solid #7dbd81;
  cursor: default !important;
  border-radius: 1em !important;
}
.img-card {
  box-shadow: 0 0 0.3em 0.05em rgba(19, 119, 32, 0.733);
  border-radius: 1em;
}

// .videos-box {
//   //   cursor: default;
//   //   // user-select: none;
//   //   color: rgba(10, 36, 19, 0.904);
//   //   background-color: #f7fff8;
//   //   border: 0.1em solid rgba(79, 168, 109, 0.671);
//   //   border-radius: 1em;
//   //   margin: 1em;
//   //   text-align: left;
//   //   display: grid;
//   //   grid-template-columns: 25% 75%;
//   //   grid-template-rows: 80% 20%;

//   // img {
//   //   margin: 1em 0 0.5em 1em;
//   //   max-width: 100%;
//   //   padding: 0.4em;
//   //   box-shadow: 0 0 0.3em 0.05em rgba(7, 104, 40, 0.733);
//   //   border-radius: 1em;
//   // }
//   //   .description {
//   //     margin-top: 2em;
//   //     grid-column-start: 2;
//   //     grid-column-end: 3;
//   //     grid-row-start: 1;
//   //     grid-row-end: 2;
//   //     margin-left: 3em;
//   //   }
//   //   .tags {
//   //     grid-column-start: 2;
//   //     grid-column-end: 3;
//   //     grid-row-start: 2;
//   //     grid-row-end: 3;
//   //     margin-left: 3em;
//   //   }
//   //   .tag {
//   //     display: inline-block;

//   //     /*button {
//   //       color: rgba(10, 36, 19, 0.904);
//   //       padding: 0 0.2em 0 0.2em;
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
//   //     }*/
//   //   }
//   //   a {
//   //     grid-column-start: 1;
//   //     grid-column-end: 2;
//   //     grid-row-start: 1;
//   //     grid-row-end: 3;
//   //     color: #2c5031;
//   //     text-decoration: none;
//   //   }
// }
</style>