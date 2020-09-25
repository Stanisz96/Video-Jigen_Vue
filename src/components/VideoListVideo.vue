<template>
  <v-card
    max-width="300"
    hover
    color="#d3f8d6"
    class="rounded-card"
    v-if="active"
  >
    <div class="ma-1">
      <router-link :to="{ name: 'single-video', params: { id: video._id } }">
        <v-img :src="video.thumbnail" alt="thumbnail" class="img-card"></v-img>
      </router-link>
      <v-card-title class="flex-wrap pa-1">{{ video.name }}</v-card-title>
      <v-btn depressed icon x-small @click="likeVideo(video)" class="ml-2 mb-2">
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
            <v-col cols="2">
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
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
  <v-card v-else width="300" hover color="#d3f8d6" class="rounded-card pa-2">
    <div class="ma-1">
      <v-img :src="video.thumbnail" alt="thumbnail" class="img-card"></v-img>
      <v-card-title class="flex-wrap pa-1">{{ video.name }}</v-card-title>
      <v-btn depressed icon x-small @click="liked = !liked" class="ml-2 mb-2">
        <v-icon v-if="liked" color="#7dbd81">{{ icons.mdiHeart }}</v-icon>
        <v-icon v-else color="#7dbd81">{{ icons.mdiHeartOutline }}</v-icon>
      </v-btn>
      <v-divider></v-divider>
      <v-card-actions class="pa-0">
        <v-container bottom class="pa-1">
          <v-row>
            <v-col cols="10">
              <div class="d-inline-flex flex-wrap">
                <div
                  class="tag"
                  v-for="tag in tags"
                  :key="tag._id"
                  color="#a1e3a6"
                >
                  <v-btn class="button mr-2" x-small text>{{ tag.name }}</v-btn>
                </div>
              </div>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
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
import { mapGetters, mapActions } from "vuex";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

export default {
  name: "VideoListVideo",
  props: {
    video: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["getTag"]),

    liked() {
      return this.video.like;
    },
  },
  data() {
    return {
      hover: false,
      snackbar: false,
      show: false,
      icons: {
        mdiHeart,
        mdiHeartOutline,
      },
    };
  },
  methods: {
    ...mapActions(["likeVideo"]),
  },
};
</script>

<style lang="scss" scoped>
.active {
  border-radius: 5em !important;
}
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
.rounded-card {
  cursor: default !important;
  border-radius: 1em !important;
}
.img-card {
  box-shadow: 0 0 0.3em 0.05em rgba(19, 119, 32, 0.733);
  border-radius: 1em;
}
</style>