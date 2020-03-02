<template>
  <v-container fluid>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">Login</div>
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
    UserAuthForm
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loginUser"]),
    async reqloginUser(loginInfo) {
      let user = await this.loginUser(loginInfo);
      if (user.error) {
        alert(user.error);
      } else {
        alert(`Welcome ${user.name}!`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>