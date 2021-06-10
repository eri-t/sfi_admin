<template>
  <v-app>
    <nav-bar />

    <v-main>
      <v-alert v-if="alert.show" type="error" class="ma-2">
        {{ alert.text }}
      </v-alert>

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
    alert: { text: '', show: false, },
  }),

  mounted () {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {

      this.allUsers = result.data;
      axios.get("https://jsonplaceholder.typicode.com/posts").then((result) => {

        this.allPosts = result.data;

      }).catch((error) => {
        this.showAlert();
        console.log(error);
      })
    })
      .catch((error) => {
        this.showAlert();
        console.log(error);
      })
  },

  methods: {
    showAlert: function () {
      this.alert.text = "Ha ocurrido un error inesperado. Por favor reintente más tarde.";
      this.alert.show = true;
    },
  }
};
</script>

<style>
@import "./assets/styles/main.css";
</style>
