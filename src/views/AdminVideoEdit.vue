<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="0" sm="0" md="1" lg="1" />
      <v-col cols="12 pa-2" sm="4" md="5" lg="5">
        <v-text-field v-model="video.name" label="Title" required></v-text-field>
        <v-textarea v-model="video.description" label="Description" required></v-textarea>
        <v-text-field @change="getThumbnailUrl" v-model="video.videoUrl" label="video Url" required></v-text-field>
        <br />
        <v-combobox
          v-model="tagModel"
          :items="tagNames"
          :search-input.sync="search"
          label="Edit tags to video"
          multiple
          small-chips
          clearable
          deletable-chips
          item-value="id"
          item-text="name"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "
                  <strong>{{ search }}</strong>". Press
                  <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
        <v-btn small @click="saveVideo(video)">Save</v-btn>
      </v-col>
      <!-- <v-col cols="2" sm="1" md="1" lg="2" /> -->
      <v-spacer></v-spacer>
      <v-col cols="10" sm="6" md="5" lg="4">
        <v-card width="300" hover color="#e1fae3" class="rounded-card pa-2">
          <div class="ma-1">
            <!-- <div v-if="url == 'undefined'">
                  <v-img src="https://img.youtube.com/vi/0/0.jpg" alt="thumbnail" class="img-card"></v-img>
                </div>
            <div v-else>-->
            <v-img :src="video.thumbnail" alt="thumbnail" class="img-card"></v-img>
            <!-- </div> -->
            <v-card-title class="flex-wrap pa-1">{{ video.name }}</v-card-title>
            <v-btn depressed icon x-small @click="liked=!liked" class="ml-2 mb-2">
              <v-icon v-if="liked" color="#7dbd81">{{ icons.mdiHeart }}</v-icon>
              <v-icon v-else color="#7dbd81">{{ icons.mdiHeartOutline }}</v-icon>
            </v-btn>
            <!-- <v-spacer></v-spacer> -->
            <v-divider></v-divider>
            <v-card-actions class="pa-0">
              <v-container bottom class="pa-1">
                <v-row>
                  <v-col cols="10">
                    <div class="d-inline-flex flex-wrap">
                      <div class="tag" v-for="tag in tagModel" :key="tag.id" color="#a1e3a6">
                        <v-btn class="button mr-2" x-small text>{{tag.name}}</v-btn>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["videos", "tags"]),
    tagNames() {
      return this.tags.map(({ id, name }) => ({ id, name }));
    },
    getThumbnail() {
      return this.video.thumbnail.concat(
        this.video.videoUrl.split("v=")[1].split("&")[0],
        "/0.jpg"
      );
    }
  },
  methods: {
    ...mapActions(["editVideo", "updateTags"]),
    getThumbnailUrl: function(event) {
      this.video.thumbnail = "https://img.youtube.com/vi/".concat(
        event.split("v=")[1].split("&")[0],
        "/0.jpg"
      );
    },
    writeInConsole: function(val) {
      console.log(val);
    },
    saveVideo() {
      //console.log(this.video);
      this.editVideo(this.video);
      this.updateTags(this.video);
      this.$router.push({ name: "admin-video-list" });
    }
  },
  mounted() {
    this.video = this.videos.find(v => v.id == this.$route.params.id);
    let x = this.tags.filter(tag => {
      let lol = tag.videosId.filter(id => id == this.video.id);
      return lol.length != 0;
    });
    this.tagModel = x.map(({ id, name }) => ({ id, name }));
  },
  data() {
    return {
      video: {
        name: "",
        description: "",
        thumbnail: "https://img.youtube.com/vi/0/0.jpg",
        id: "",
        style: "",
        videoUrl: "",
        tagIds: []
      },
      tagModel: [],
      valid: false,
      liked: false,
      show: true,
      search: null,
      icons: {
        mdiHeart,
        mdiHeartOutline
      }
    };
  },
  watch: {
    tagModel(val) {
      this.video.tagIds = val.map(tag => tag.id);
    }
  }
};
</script>

<style lang='scss' scoped>
.rounded-card {
  cursor: default !important;
  border-radius: 1em !important;
}
.img-card {
  box-shadow: 0 0 0.3em 0.05em rgba(19, 119, 32, 0.733);
  border-radius: 1em;
}
</style>