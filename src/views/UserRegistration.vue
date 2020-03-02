<template>
  <v-container fluid>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">Sign in</div>
    <v-row>
      <v-spacer />
      <v-col>
        <UserAuthForm :submitForm="reqRegisterUser" :submitButton="'Register'" />
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
    ...mapActions(["regUser"]),
    async reqRegisterUser(regInfo) {
      let user = await this.regUser(regInfo);
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