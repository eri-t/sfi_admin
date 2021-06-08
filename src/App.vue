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
      <v-fade-transition mode="out-in">
        <div>
          <table-section
            v-if="!id"
            :allUsers="allUsers"
            @showItem="id = $event"
          />
          <user-section
            v-else
            :allUsers="allUsers"
            :userId="id"
            :allPosts="allPosts"
            @showItem="id = $event"
          />
        </div>
      </v-fade-transition>
    </v-main>

    <v-footer padless dark>
      <v-container fluid>
        <p class="text-center my-3">Mapa de la Acción Estatal - Challenge</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data: () => ({
    allUsers: null,
    allPosts: null,
    id: '',
  }),

  mounted () {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {

      // handle success - users
      this.allUsers = result.data;
      axios.get("https://jsonplaceholder.typicode.com/posts").then((result) => {

        // handle success - posts
        this.allPosts = result.data;

      }).catch(function (error) {
        // handle error - posts
        console.log(error);
      })
        .then(function () {
          // always executed - posts

        });
    })
      .catch(function (error) {
        // handle error - users
        console.log(error);
      })
      .then(function () {
        // always executed - users

      });
  },

};
</script>

<style>
@import "./assets/styles/main.css";
</style>
