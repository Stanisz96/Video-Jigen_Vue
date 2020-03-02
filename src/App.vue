<template>
  <v-app :style="bgColor">
    <v-app-bar app color="#5eb56f">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-btn href="#/videos" text x-large>Home</v-btn>
      <v-btn href="#/admin/videos" text large>Admin</v-btn>

      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        <v-btn href="/" text>
          <span>{{currentUser.name}}</span>
        </v-btn>
        <v-btn @click="logoutUser" text>
          <span>Logout</span>
        </v-btn>
      </div>
      <v-btn v-else href="#/login" text>
        <span>Login</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    this.loadVideos();
    this.loadTags();
    this.loadCurrentUser();
  },
  methods: {
    ...mapActions(["loadVideos", "loadTags", "logoutUser", "loadCurrentUser"])
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