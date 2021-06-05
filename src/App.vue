<template>
  <v-app>
    <v-app-bar app prominent flat class="bg-gradient">
      <div class="d-flex align-self-center">
        <v-img
          alt="SFI App Logo"
          class="mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
        />
      </div>

      <v-spacer></v-spacer>

      <v-avatar size="70" class="align-self-center">
        <v-img alt="Admin avatar" src="./assets/avatar.png" contain />
      </v-avatar>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>

    <v-footer padless dark>
      <v-container fluid>
        <p class="text-center my-3">Mapa de la Acción Estatal - Challenge</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@import "./assets/styles/main.css";
</style>
