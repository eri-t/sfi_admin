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
      <v-container fluid class="pa-7 pa-lg-10">
        <h1 class="pb-5">Usuarios</h1>
        <v-data-table
          v-if="result"
          :headers="headers"
          :items="result"
          :hide-default-footer="true"
          class="elevation-2"
        >
          <template v-if="result" v-slot="result">
            <tr v-for="item in result" :key="item.id">
              <td v-for="header in headers" :key="header.value">
                {{ item[header.value] }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-main>

    <v-footer padless dark>
      <v-container fluid>
        <p class="text-center my-3">Mapa de la Acción Estatal - Challenge</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

import axios from "axios";

export default {
  name: "App",

  components: {
    //  HelloWorld,
  },

  data: () => ({

    headers: [
      {
        text: 'Nombre',
        //  align: 'start',
        //  sortable: false,
        value: 'name',
      },
      { text: 'Usuario', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Teléfono', value: 'phone' },
      { text: 'Website', value: 'website' },
      { text: 'Nombre empresa', value: 'company.name' },
      { text: 'Opciones', value: 'options' },

    ],
    result: null,
  }),

  created () {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
      this.result = result.data;
    })
  }
};
</script>

<style>
@import "./assets/styles/main.css";
</style>
