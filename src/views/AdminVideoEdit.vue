<template>
  <v-container>
    <v-row>
      <v-spacer cols="0" sm="0" md="1" lg="1" />
      <v-col cols="12 pa-2" sm="4" md="5" lg="5">
        <v-text-field
          v-model="video.name"
          label="Title"
          required
        ></v-text-field>
        <v-textarea
          v-model="video.description"
          label="Description"
          required
        ></v-textarea>
        <v-text-field
          @change="getThumbnailUrl"
          v-model="video.videoUrl"
          label="video Url"
          required
        ></v-text-field>
        <br />
        <v-combobox
          v-model="tagWatch"
          :items="tagNames"
          :search-input.sync="search"
          label="Edit tags to video"
          multiple
          small-chips
          clearable
          deletable-chips
          item-value="_id"
          item-text="name"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "
                  <strong>{{ search }}</strong
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
        <v-btn small @click="saveVideo(video)">Save</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="10" sm="6" md="5" lg="4">
        <VideoListVideo :video="video" :tags="tagModel" class="ma-3 pa-2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import { mapActions, mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";
import { updateTagModelCard } from "@/utils/tools";

export default {
  components: {
    VideoListVideo,
  },
  data() {
    return {
      video: {
        name: "",
        description: "",
        thumbnail: "https://img.youtube.com/vi/0/0.jpg",
        _id: "",
        style: "",
        videoUrl: "",
        tagIds: [],
      },
      tagModel: [],
      tagWatch: [],
      newTags: [
        {
          name: String,
          videosId: Array,
        },
      ],
      valid: false,
      liked: false,
      show: true,
      search: null,
      icons: {
        mdiHeart,
        mdiHeartOutline,
      },
    };
  },
  computed: {
    ...mapState({
      videos: (state) => state.videoModel.videos,
      tags: (state) => state.tagModel.tags,
    }),
    tagNames() {
      return this.tags.map(({ _id, name }) => ({ _id, name }));
    },
    getThumbnail() {
      return this.video.thumbnail.concat(
        this.video.videoUrl.split("v=")[1].split("&")[0],
        "/0.jpg"
      );
    },
  },
  methods: {
    ...mapActions(["editVideo", "updateTags", "addTags", "setSnackbar"]),
    getThumbnailUrl: function (event) {
      this.video.thumbnail = "https://img.youtube.com/vi/".concat(
        event.split("v=")[1].split("&")[0],
        "/0.jpg"
      );
    },
    writeInConsole: function (val) {
      console.log(val);
    },
    getVideoId() {
      return this.video._id;
    },
    async saveVideo() {
      if (this.newTags.length != 0) {
        let createdTags = await this.addTags(this.newTags);

        for (let createdTag of createdTags) {
          this.video.tagIds.push(createdTag._id);
        }
      }
      await this.editVideo(this.video);
      await this.updateTags(this.video);

      this.setSnackbar({
        showing: true,
        text: `${this.video.name} was saved`,
        color: "success",
      });

      this.$router.push({ name: "admin-video-list" });
    },
  },
  mounted() {
    this.video = this.videos.find((v) => v._id == this.$route.params.id);
    let editTag = this.tags.filter((tag) => {
      let filterTag = tag.videosId.filter((_id) => _id == this.video._id);
      return filterTag.length != 0;
    });
    this.tagWatch = editTag.map(({ _id, name }) => ({ _id, name }));
    this.tagModel = this.tagWatch;
  },
  watch: {
    tagWatch(val) {
      this.video.tagIds = val.map((tag) => tag._id);

      [this.tagModel, this.newTags] = updateTagModelCard(val);
    },
  },
  destroyed() {
    console.log(`Admin video edit has been destroyed!`);
  },
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