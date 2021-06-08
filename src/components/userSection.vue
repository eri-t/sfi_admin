<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-fade-transition mode="out-in">
          <!--
      <v-btn @click="$router.go(-1)"> Volver </v-btn>
      -->
          <v-btn @click="goBack"> Volver </v-btn>
        </v-fade-transition>

        <h1>{{ this.name }}</h1>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn @click="enable" class="white--text" color="green lighten-1"
          >Habilitar</v-btn
        >
        <v-btn class="white--text" color="grey darken-1">Deshabilitar</v-btn>
      </v-col>
    </v-row>

    <ul class="row userPostsList">
      <li v-for="post in userPosts" :key="post.id" class="col-auto">
        <v-card class="mx-auto" max-width="250" height="100%">
          <v-card-actions>
            <v-chip
              class="white--text"
              :class="post.published ? 'green lighten-1' : 'grey darken-1'"
            >
              <span v-if="post.published">Habilitado</span>
              <span v-else>Deshabilitado</span>
            </v-chip>

            <v-spacer></v-spacer>
            <v-checkbox
              v-model="selected"
              :value="post.id"
              hide-details
            ></v-checkbox>
          </v-card-actions>
          <v-card-title> {{ post.title }} </v-card-title>
          <v-card-text> {{ post.body }} </v-card-text>
        </v-card>
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  name: "userSection",
  props: ['allUsers', 'userId', 'allPosts'],

  data: () => ({
    id: '',
    name: '',
    userPosts: [],
    selected: [],
  }),

  mounted: function () {
    this.getName();
    this.getUserPosts();
  },

  methods: {

    enable: function () {
      for (let i = 0; i < this.selected.length; i++) {

        let selectedPost = this.userPosts.find(obj => {
          return obj.id == this.selected[i]
        });
        if (!selectedPost.published) {
          let index = this.userPosts.findIndex(obj => obj.id == this.selected[i]);
          this.userPosts[index].published = true;
          this.$set(this.userPosts, index, this.userPosts[index]);
        }
      }
    },

    goBack: function () {
      this.$emit('showItem', null);
    },
    /*
    getData: function () {
      this.id = this.$route.params.userId;
      console.log('this.allUsers: ' + this.allUsers);
      console.log('this.id: ' + this.id);
      console.log('this.allPosts: ' + this.allPosts);
      for (const user of this.allUsers) {
        if (this.id == user.id) {
          this.name = user.name;
        }
      }
      this.userPosts = this.allPosts.filter((post) => post.userId == this.id);
    },
    */

    getName: function () {
      for (const user of this.allUsers) {
        if (this.userId == user.id) {
          this.name = user.name;
        }
      }
      /*
      this.id = this.$route.params.userId;
      if (this.allUsers) {
        for (const user of this.allUsers) {
          if (this.id == user.id) {
            this.name = user.name;
          }
        }
      }
*/
    },

    getUserPosts: function () {
      if (this.allPosts) {
        this.userPosts = this.allPosts.filter((post) => post.userId == this.userId);
        // console.log('this.userPosts: ' + this.userPosts);

        // assign published state 
        for (let i = 0; i < this.userPosts.length; i++) {
          if (i % 2 == 0) {
            this.userPosts[i].published = true;
          }
        }
      }
    }
  },

};
</script>
