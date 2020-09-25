<template>
  <v-app :style="bgColor">
    <v-app-bar app color="#5eb56f">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-btn href="#/videos" text x-large class="text--text">Home</v-btn>
      <v-btn
        href="#/admin"
        v-if="currentUser.admin"
        text
        large
        class="text--text"
        >Admin</v-btn
      >

      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        <v-btn href="/" text>
          <span>{{ currentUser.name }}</span>
        </v-btn>
        <v-btn
          @click="
            logoutUser();
            mainPage();
          "
          text
        >
          <span>Logout</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn href="#/login" text>
          <span>Login</span>
        </v-btn>
        <v-btn href="#/register" text>
          <span>Sign In</span>
        </v-btn>
      </div>

      <template v-slot:extension v-if="checkPath">
        <TabsExtension :RouteName="currentRouteName" color="#5eb56f" />
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="300 + 1600 / Math.pow(index + 1, 2)"
      :color="snackbar.color"
      :style="`top: ${index * -70}px`"
    >
      {{ snackbar.text }}
      <v-btn text @click="snackbar.showing = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TabsExtension from "@/components/TabsExtension.vue";

export default {
  name: "App",
  computed: {
    ...mapState({
      currentUser: (state) => state.userModel.currentUser,
      snackbars: (state) => state.guiModel.snackbars,
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    // console.log("loadCurrentUser");
    // console.log(this.isCurrentUserGuest);
    this.loadCurrentUser();
    // // console.log("loadVideos");
    // this.loadVideos();
    // // console.log("loadTags");
    // this.loadTags();
  },
  methods: {
    ...mapActions(["loadVideos", "logoutUser", "loadCurrentUser"]),
    mainPage() {
      this.$router.push({ name: "home" });
    },
  },
  components: {
    TabsExtension,
  },
  data: () => ({
    bgColor: {
      background: "#fafffb",
    },
    checkPath: false,
    isCurrentUserGuest: true,
  }),
  watch: {
    currentRouteName: function (name) {
      this.checkPath = /^admin?/.test(name);
    },
  },
};
</script>


<style lang="scss">
</style>