<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.name"
      label="Name"
      :rules="authRules.name"
    ></v-text-field>
    <v-text-field
      v-if="submitButton == 'Register'"
      v-model="userInfo.email"
      label="E-mail"
      :rules="authRules.email"
    ></v-text-field>
    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :type="showPass ? 'text' : 'password'"
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="authRules.password"
      @click:append="showPass = !showPass"
      counter
    ></v-text-field>
    <v-btn small @click="submitForm(userInfo)" :disabled="!valid">{{
      submitButton
    }}</v-btn>
  </v-form>
</template>

<script>
import { authRules } from "@/utils/validations";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      users: (state) => state.userModel.users,
    }),
  },
  mounted() {
    if (this.submitButton == "Register") {
      let uniqueName = (v) => this.unique(v) || "Username is already taken";
      authRules.name[2] = uniqueName;
    } else {
      authRules.name.splice(2, 1);
    }
  },
  data() {
    return {
      valid: false,
      showPass: false,
      authRules,
      userInfo: {
        name: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    unique(v) {
      let isUnique = !this.users.some((item) => {
        return item.name == v;
      });
      return isUnique;
    },
  },
  props: ["submitForm", "submitButton"],
};
</script>

<style>
</style>