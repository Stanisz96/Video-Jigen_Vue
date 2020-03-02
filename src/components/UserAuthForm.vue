<template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.name" label="Name" :rules="authRules.name"></v-text-field>
    <v-text-field
      v-if="submitButton=='Register'"
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
      @click:append="showPass =!showPass"
      counter
    ></v-text-field>
    <v-btn small @click="submitForm(userInfo)" :disabled="!valid">{{submitButton}}</v-btn>
  </v-form>
</template>

<script>
import { authRules } from "@/utils/validations";

export default {
  data() {
    return {
      valid: false,
      showPass: false,
      authRules,
      userInfo: {
        name: "",
        password: "",
        email: ""
      }
    };
  },
  props: ["submitForm", "submitButton"]
};
</script>

<style>
</style>