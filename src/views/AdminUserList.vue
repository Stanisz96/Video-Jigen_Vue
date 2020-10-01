<template>
  <div>
    <div v-for="user in users" :key="user._id">
      {{ user.name }}
      <v-btn x-small @click="loginUser(user)">Login</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      users: (state) => state.userModel.users,
    }),
  },
  created() {
    this.loadUsers();
  },
  methods: {
    ...mapActions(["loadUsers", "loginUser"]),
  },
  destroyed() {
    console.log(`Admin user list has been destroyed!`);
  },
};
</script>

<style>
</style>