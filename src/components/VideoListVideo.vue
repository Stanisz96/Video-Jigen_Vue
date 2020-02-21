<template>
  <v-card max-width="400" elevation="4" color="light ml" class="rounded-card">
    <div class="ma-1">
      <router-link :to="{ name: 'single-video', params: { id: video.id} }">
        <v-img :src="video.thumbnail" alt="thumbnail" :style="video.style" class="img-card"></v-img>
      </router-link>
      <v-card-title class="flex-wrap">{{ video.name }}</v-card-title>
      <!-- <div class="description"> -->
      <!-- <v-card-text>{{ video.description }}</v-card-text> -->
      <!-- </div> -->
      <v-card-actions>
        <div class="d-inline-flex">
          <div class="tag" v-for="tagId in video.tagIds" :key="tagId">
            <v-btn
              class="light md mr-2"
              :x-small="true"
              :to="{ name: 'tag', params: { id: tagId} }"
              text
            >{{getTag(tagId).name}}</v-btn>
          </div>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "VideoListVideo",
  props: ["video"],
  computed: {
    ...mapGetters(["getTag"])
  }
};
</script>

<style lang="scss">
// html {
//   overflow-y: auto;
// }
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
.rounded-card {
  // border: 1px solid #7dbd81;
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