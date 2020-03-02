<template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.name" label="Name" :rules="loginRules.name"></v-text-field>
    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :type="showPass ? 'text' : 'password'"
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="loginRules.password"
      @click:append="showPass =!showPass"
      counter
    ></v-text-field>
    <v-btn small @click="submitForm(userInfo)" :disabled="!valid">{{submitButton}}</v-btn>
  </v-form>
</template>

<script>
import { loginRules } from "@/utils/validations";

export default {
  data() {
    return {
      valid: false,
      showPass: false,
      loginRules,
      userInfo: {
        name: "",
        password: ""
      }
    };
  },
  props: ["submitForm", "submitButton"]
};
</script>

<style>
</style>