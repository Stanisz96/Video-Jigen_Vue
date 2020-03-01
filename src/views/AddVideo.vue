<template>
  <div>
    <div class="display-2 font-weight-regular my-6 d-flex justify-center">Add Youtube Video</div>
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
              autocomplete="off"
            ></v-text-field>
            <v-textarea
              v-model="video.description"
              :rules="descriptionRules"
              :counter="400"
              label="Description"
              required
              autocomplete="off"
            ></v-textarea>
            <v-text-field
              @change="getThumbnailUrl"
              v-model="video.videoUrl"
              :rules="urlRules"
              :counter="100"
              label="video Url"
              required
              autocomplete="off"
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
              autocomplete="off"
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
          <v-spacer></v-spacer>
          <v-col cols="10" sm="6" md="5" lg="4">
            <VideoListVideo :video="video" :tagModel="tagModel" class="ma-3 pa-2" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import { mapActions, mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";

export default {
  name: "AddVideo",
  components: {
    VideoListVideo
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
    async addVideo(video) {
      if (this.valid) {
        let savedVideo = await this.createVideo(video);
        this.updateTags(savedVideo);

        this.$router.push({ name: "videos" });
      } else {
        alert("Invalid data!");
      }
    }
  },
  data() {
    return {
      video: {
        name: "",
        description: "",
        thumbnail: "https://img.youtube.com/vi/0/0.jpg",
        _id: null,
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
    },
    valid(x) {
      console.log(x);
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