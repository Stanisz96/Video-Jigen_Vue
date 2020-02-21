<template>
  <div id="app">
    <h1 class="header">Frequency control of Monads</h1>
    {{data}}
    <div class="monads_color-container">
      <div v-for="color in monads_color" :key="color.name">
        <div class="monads_color-box">
          <router-link :to="{ name: 'monads-color', params: { id: color.id} }">
            <img :src="color.thumbnail" alt="thumbnail" :style="color['thumbnail-color']" />
          </router-link>
          <div class="description">
            <h3>{{ color.name }}</h3>
            <p>{{ color.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import Api from "@/services/api";

export default {
  name: "monads",
  components: {},
  computed: mapState(["monads_color"]),
  mounted() {},
  data() {
    return {
      data: ""
    };
  }
};
</script>

<style scoped lang="scss">
// .header {
//   text-align: center;
//   margin-top: 1em;
// }
// .monads_color-container {
//   .monads_color-box {
//     cursor: default;
//     background-color: #f7fff8;
//     border: 0.1em solid rgba(79, 168, 109, 0.671);
//     border-radius: 1em;
//     margin: 1em;

//     text-align: left;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     grid-template-rows: 80% 20%;

//     img {
//       margin: 1em 0 0.5em 1em;
//       max-width: 100%;
//       padding: 0.4em;
//       box-shadow: 0 0 5px 1px rgba(7, 104, 40, 0.733);
//       border-radius: 1em;
//     }
//     .description {
//       margin-top: 1em;
//       grid-column-start: 2;
//       grid-column-end: 3;
//       grid-row-start: 1;
//       grid-row-end: 2;
//       margin-left: 3em;
//     }
//     .tags {
//       grid-column-start: 2;
//       grid-column-end: 3;
//       grid-row-start: 2;
//       grid-row-end: 3;
//       margin-left: 3em;
//     }
//     .tag {
//       display: inline-block;

//       button {
//         background-color: #ddfae0;
//         margin: 0.2em;
//         box-shadow: 0 0 3px 0px rgba(23, 214, 17, 0.5);
//         border-radius: 0.6em;
//         border: 1px groove rgba(79, 168, 109, 0.671);
//       }
//     }

//     a {
//       grid-column-start: 1;
//       grid-column-end: 2;
//       grid-row-start: 1;
//       grid-row-end: 3;
//       color: #2c5031;
//       text-decoration: none;
//     }
//   }
// }
</style>
