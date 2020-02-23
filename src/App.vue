<template>
  <v-app :style="bgColor">
    <v-app-bar app color="#5eb56f">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-btn href="#/videos" text x-large>Home</v-btn>
      <v-btn href="#/admin/videos" text large>Admin</v-btn>

      <v-spacer></v-spacer>
      <v-btn href="/" text>
        <span>Login</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  mounted() {
    this.loadVideos();
  },
  methods: {
    ...mapActions(["loadVideos"])
  },
  components: {},
  data: () => ({
    bgColor: {
      background: "#fafffb"
    }
  })
};
</script>


<style lang="scss">
</style>