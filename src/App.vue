<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp;
      <router-link to="/about">About</router-link>&nbsp;|&nbsp;
      <router-link to="/monads">Monads</router-link>&nbsp;|&nbsp;
      <router-link to="/videos">Videos</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.loadVideos();
    this.loadMonads();
  },
  methods: {
    ...mapActions(["loadVideos", "loadMonads"])
  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    &.router-link-exact-active {
      color: #42b983;
    }

    & {
      color: #114930;
    }
  }
}
</style>
