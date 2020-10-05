<template>
  <v-container>
    <h1>Tag List</h1>
    <v-btn to="/videos/add">Add Tag</v-btn>
    <div class="flex-table tit">
      <div>Name</div>
      <div>Tagged videos</div>
      <div>Actions</div>
    </div>
    <div v-for="tag in tags" :key="tag._id" class="flex-table">
      <div>{{ tag.name }}</div>
      <div>{{ tag.videosId.toString() | abbreviate }}</div>
      <div class="actions">
        <router-link class="link" :to="{ name: 'tag', params: { id: tag._id } }"
          >Show</router-link
        >
        <v-btn class="button" @click="removeTag(tag)">Delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tagModel.tags,
    }),
  },
  filters: {
    abbreviate(text) {
      if (text) {
        return text && text.slice(0, 30) + "...";
      }
    },
  },
  methods: {
    ...mapActions(["deleteTag"]),
    removeTag(tag) {
      let response = confirm(`Are you sure you want to delete ${tag.name}?`);
      if (response) {
        this.deleteTag(tag);
      }
    },
  },
  destroyed() {
    console.log(`Admin video list has been destroyed!`);
  },
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 1em;
  border-bottom: 1px #5eb56f solid;
  &.tit {
    text-align: center;
  }
  &:nth-of-type(2n) {
    background-color: #e1fae3;
  }

  .actions {
    text-align: center;
    .link {
      padding: 1em;
    }
    .button {
      margin-left: 1em;
    }
  }
}
</style>