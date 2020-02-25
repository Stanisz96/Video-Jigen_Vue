<template>
  <div>
    <div class="display-2 font-weight-regular my-6 d-flex justify-center">Add Youtube Video</div>
    <!-- <button @click="writeInConsole(video.tagIds)">CONSOLE</button> -->
    <v-form v-model="valid">
      <v-container>
        <v-row justify="center">
          <v-spacer />
          <v-col cols="12 pa-2" sm="4" md="5" lg="5">
            <v-text-field
              v-model="video.name"
              :rules="titleRules"
              :counter="50"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="video.description"
              :rules="descriptionRules"
              :counter="400"
              label="Description"
              required
            ></v-textarea>
            <v-text-field
              @change="getThumbnailUrl"
              v-model="video.videoUrl"
              :rules="urlRules"
              :counter="100"
              label="video Url"
              required
            ></v-text-field>
            <br />
            <v-combobox
              v-model="tagModel"
              :items="tagNames"
              :search-input.sync="search"
              hint="Maximum of 5 tags"
              label="Add tags to video"
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
            <v-btn small @click="addVideo(video)">Add Video</v-btn>
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
                          <div class="tag" v-for="tag in tagModel" :key="tag._id" color="#a1e3a6">
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
    </v-form>
  </div>
</template>

<script>
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import { mapActions, mapState } from "vuex";
import mongoose from "mongoose";

export default {
  name: "AddVideo",
  mounted() {
    // this._id = new mongoose.Types.ObjectId();
    console.log(this.video._id);
  },
  computed: {
    ...mapState(["tags"]),
    tagNames() {
      return this.tags.map(({ _id, name }) => ({ _id, name }));
    },
    getThumbnail() {
      return this.video.thumbnail.concat(
        this.video.videoUrl.split("v=")[1].split("&")[0],
        "/0.jpg"
      );
    }
  },
  methods: {
    ...mapActions(["createVideo", "updateTags"]),
    getThumbnailUrl: function(event) {
      this.video.thumbnail = "https://img.youtube.com/vi/".concat(
        event.split("v=")[1].split("&")[0],
        "/0.jpg"
      );
    },
    writeInConsole: function(val) {
      console.log(val);
    },
    addVideo(video) {
      this.createVideo(video);
      console.log("ID befor updateTags");
      console.log(video._id.toString());
      this.$router.push({ name: "videos" });
    }
  },
  data() {
    return {
      video: {
        name: "",
        description: "",
        thumbnail: "https://img.youtube.com/vi/0/0.jpg",
        _id: mongoose.Types.ObjectId(),
        videoUrl: "",
        tagIds: []
      },
      tagModel: [],
      valid: false,
      liked: false,
      show: true,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 50 || "Title must be less than 50 characters"
      ],
      descriptionRules: [
        v => v.length <= 400 || "Descripion must be less than 200 characters"
      ],
      urlRules: [
        v => v.length <= 100 || "Title must be less than 50 characters",
        v => /.+v=.+/.test(v) || "Path to video is invalid"
      ],
      search: null,
      icons: {
        mdiHeart,
        mdiHeartOutline
      }
    };
  },
  watch: {
    tagModel(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tagModel.pop());
      }
      this.video.tagIds = val.map(tag => tag._id);
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