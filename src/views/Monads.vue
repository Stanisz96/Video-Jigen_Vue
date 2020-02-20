<template>
  <div id="app">
    <h1>Frequency control of Monads</h1>
    {{data}}
    <div class="monads_color-container">
      <div v-for="color in monads_color" :key="color.name">
        <router-link :to="{ name: 'monads-color', params: { id: color.id} }">
          <div class="monads_color-box">
            <img :src="color.thumbnail" alt="thumbnail" :style="color.thumbnail_color" />
            <div>
              <h3>{{ color.name }}</h3>
              <p>{{ color.description }}</p>
            </div>
          </div>
        </router-link>
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
  mounted() {
    // Api()
    //   .get("/monads")
    //   .then(data => {
    //     this.data = data;
    //   });
  },
  data() {
    return {
      data: ""
    };
  }
};
</script>

<style scope lang="scss">
.monads_color-container {
  .monads_color-box {
    border: 2px solid cadetblue;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;

    text-align: left;
    display: flex;
    justify-content: flex-start;

    img {
      max-height: 150px;
      padding: 6px;
      margin-right: 20px;
      box-shadow: 0 0 5px 0px rgba(0, 140, 186, 0.5);
      border-radius: 20px;
    }
  }
  a {
    color: #2c3e50;
    text-decoration: none;
  }
}
</style>
