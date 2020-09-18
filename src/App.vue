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

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s=>s.showing)"
      :key="snackbar.text+Math.random()"
      v-model="snackbar.showing"
      :timeout="200+2000/(index+1)"
      :color="snackbar.color"
      :style="`bottom: ${index*60+10}px`"
    >
      {{snackbar.text}}
      <v-btn text @click="snackbar.showing=false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TabsExtension from "@/components/TabsExtension.vue";

export default {
  name: "App",
  computed: {
    ...mapState(["currentUser", "snackbars"]),
    currentRouteName() {
      return this.$route.name;
    }
  },
  created() {
    this.loadCurrentUser();
    this.loadVideos();
    this.loadTags();
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