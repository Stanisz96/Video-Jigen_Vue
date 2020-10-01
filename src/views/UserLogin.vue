<template>
  <v-container fluid>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">
      Login
    </div>
    <v-row>
      <v-spacer />
      <v-col>
        <UserAuthForm :submitForm="reqloginUser" :submitButton="'Login'" />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import UserAuthForm from "@/components/UserAuthForm";

export default {
  components: {
    UserAuthForm,
  },
  methods: {
    ...mapActions(["loginUser", "setSnackbar"]),
    async reqloginUser(loginInfo) {
      let user = await this.loginUser(loginInfo);
      let text, color;
      let showing = true;
      if (user.error) {
        color = "error";
        text = `${user.error}!`;
      } else {
        color = "success";
        text = `Welcome ${user.name}!`;
        this.$router.push({ name: "videos" });
      }
      this.setSnackbar({ showing: showing, text: text, color: color });
    },
  },
  destroyed() {
    console.log(`User login has been destroyed!`);
  },
};
</script>

<style lang="scss" scoped>
</style>