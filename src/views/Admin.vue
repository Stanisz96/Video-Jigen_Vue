<template>
  <div>
    <div class="display-3 font-weight-regular my-6 d-flex justify-center">
      Admin
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  destroyed() {
    console.log(`Admin main page has been destroyed!`);
  },
};
</script>

<style>
</style>