<template>
  <v-container>
    <v-form>
      <v-text-field v-model="loginInfo.name" label="Name"></v-text-field>
      <v-text-field v-model="loginInfo.password" label="Password" type="password"></v-text-field>
    </v-form>
    <v-btn small @click="reqloginUser">Login</v-btn>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginInfo: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async reqloginUser() {
      let user = await this.loginUser(this.loginInfo);
      if (user.error) {
        alert(user.error);
      } else {
        alert(`Welcome ${user.name}!`);
      }
    }
  }
};
</script>

<style>
</style>