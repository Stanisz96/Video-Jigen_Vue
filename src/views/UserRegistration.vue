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
import { mapState, mapActions } from "vuex";
import UserAuthForm from "@/components/UserAuthForm";

export default {
  components: {
    UserAuthForm
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["users"])
  },
  created() {
    this.loadUsers();
  },
  methods: {
    ...mapActions(["loadUsers", "regUser", "loginUser"]),
    async reqRegisterUser(regInfo) {
      let res = await this.regUser(regInfo);
      if (res.error) {
        alert(res.error);
      } else {
        let user = await this.loginUser(regInfo);
        alert(`Welcome ${user.name}!`);
        this.$router.push("/videos");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>