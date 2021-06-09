<template>
  <v-app>
    <nav-bar />

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

    <custom-footer />
  </v-app>
</template>

<script>
import axios from "axios";
import navBar from './components/navBar.vue';
import tableSection from "./components/tableSection.vue";
import userSection from "./components/userSection.vue";
import customFooter from "./components/customFooter.vue";

export default {
  components: { navBar, tableSection, userSection, customFooter },
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
