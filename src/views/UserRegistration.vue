<template>
  <v-container fluid>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">
      Sign in
    </div>
    <v-row>
      <v-spacer />
      <v-col>
        <UserAuthForm
          :submitForm="reqRegisterUser"
          :submitButton="'Register'"
        />
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
    UserAuthForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      users: (state) => state.userModel.users,
    }),
  },
  created() {
    this.loadUsers();
  },
  methods: {
    ...mapActions(["loadUsers", "regUser", "loginUser", "setSnackbar"]),
    async reqRegisterUser(regInfo) {
      let res = await this.regUser(regInfo);
      let showing = true;
      let text, color;
      if (res.error) {
        color = "error";
        text = `${res.error}!`;
      } else {
        color = "success";
        let user = await this.loginUser(regInfo);
        text = `Sign in was successful. Welcome ${user.name}!`;
        this.$router.push({ name: "videos" });
      }
      this.setSnackbar({ showing: showing, text: text, color: color });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>