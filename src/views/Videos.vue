<template>
  <div id="app">
    <h1>Music Videos</h1>
    <div class="videos-container">
      <div v-for="video in videos" :key="video.name">
        <router-link :to="{ name: 'single-video', params: { id: video._id} }">
          <div class="videos-box">
            <img :src="video.thumbnail" alt="thumbnail" :style="video.style" />
            <div>
              <h3>{{ video.name }}</h3>
              <p>{{ video.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Api from "@/services/api";

export default {
  name: "videos",
  computed: {
    ...mapState(["videos"])
  },
  data() {
    return {};
  }
};
</script>

<style scope lang="scss">
.videos-container {
  .videos-box {
    border: 2px solid cadetblue;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;

    text-align: left;
    display: flex;
    justify-content: flex-start;

    img {
      max-height: 150px;
      padding: 6px;
      margin-right: 20px;
      box-shadow: 0 0 5px 0px rgba(0, 140, 186, 0.5);
      border-radius: 20px;
    }
  }
  a {
    color: #2c3e50;
    text-decoration: none;
  }
}
</style>
