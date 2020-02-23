<template>
  <v-container>
    <h1>Video List</h1>
    <v-btn to="/videos/add">Add Video</v-btn>
    <div class="flex-table">
      <div>Name</div>
      <div>Description</div>
      <div>Actions</div>
    </div>
    <div v-for="video in videos" :key="video.id" class="flex-table">
      <div>{{ video.name}}</div>
      <div>{{ video.description | abbreviate}}</div>
      <div class="actions">
        <router-link :to="{ name: 'single-video',params: {id: video.id}}">Show</router-link>
        <!-- <router-link :to="">Edit</router-link>
        <router-link :to="">Delite</router-link>-->
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["videos"])
  },
  filters: {
    abbreviate(text) {
      if (text) {
        return text && text.slice(0, 40);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 1em;
  border-bottom: 1px #5eb56f solid;

  &:nth-of-type(2n) {
    background-color: #e1fae3;
  }

  .actions {
    * {
      padding-right: 2em;
    }
  }
}
</style>