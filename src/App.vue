<template>
  <v-app :style="bgColor">
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <span>Monada Jigen</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="#/" target="_blank" text>
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
    this.loadMonads();
  },
  methods: {
    ...mapActions(["loadVideos", "loadMonads"])
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