<template>
  <v-app :style="bgColor">
    <v-app-bar app color="#5eb56f">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-btn href="#/videos" text x-large class="text--text">Home</v-btn>
      <v-btn href="#/admin" v-if="currentUser.admin" text large class="text--text">Admin</v-btn>

      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        <v-btn href="/" text>
          <span>{{currentUser.name}}</span>
        </v-btn>
        <v-btn @click="logoutUser" text>
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

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TabsExtension from "@/components/TabsExtension.vue";

export default {
  name: "App",
  computed: {
    ...mapState(["currentUser"]),
    currentRouteName() {
      return this.$route.name;
    }
  },
  created() {
    this.loadVideos();
    this.loadTags();
    this.loadCurrentUser();
  },
  methods: {
    ...mapActions(["loadVideos", "loadTags", "logoutUser", "loadCurrentUser"])
  },
  components: {
    TabsExtension
  },
  data: () => ({
    bgColor: {
      background: "#fafffb"
    },
    checkPath: false
  }),
  watch: {
    currentRouteName: function(name) {
      this.checkPath = /^admin?/.test(name);
    }
  }
};
</script>


<style lang="scss">
</style>