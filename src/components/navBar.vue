<template>
  <v-app-bar app prominent flat class="bg-gradient">
    <div class="d-flex align-self-center">
      <v-img
        alt="SFI App Logo"
        class="mr-2"
        contain
        src="../assets/logo.png"
        transition="scale-transition"
      />
    </div>

    <v-spacer></v-spacer>

    <v-avatar size="70" class="align-self-center">
      <v-img alt="Admin avatar" src="../assets/avatar.png" contain />
    </v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  name: "navBar",
};
</script>
