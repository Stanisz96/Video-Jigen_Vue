
  <template>
  <div>
    <v-divider></v-divider>
    <v-tabs align-with-title background-color="#5eb56f">
      <v-tabs-slider color="#a1e3a6"></v-tabs-slider>
      <v-tab to="/admin/videos">Videos</v-tab>
      <v-tab to="/admin/users">Users</v-tab>
    </v-tabs>
  </div>
</template>


<script>
export default {
  props: {
    RouteName: String,
  },
};
</script>

<style>
</style>