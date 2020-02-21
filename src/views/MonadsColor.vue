<template>
  <div>
    <img :src="findColor.thumbnail" alt="thumbnail" :style="findColor['thumbnail-color']" />
    <h1>{{findColor.name}}</h1>
    <div class="mcolor-description">{{findColor.description}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MonadsColor",
  computed: {
    findColor: function() {
      return this.monads_color.find(color => color.id == this.$route.params.id);
    },
    ...mapState(["monads_color"])
  }
};
</script>

<style scoped>
/* img {
  max-width: 40%;
  padding: 500px;
  box-shadow: 0 0 5px 2px rgba(0, 140, 186, 0.5);
  border-radius: 20px;
}
.mcolor-description {
  max-width: 70%;
  text-align: center;
  display: inline-block;
} */
</style>