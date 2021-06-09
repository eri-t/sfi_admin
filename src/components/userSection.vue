<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8" class="d-flex align-center">
        <v-fade-transition mode="out-in">
          <v-btn @click="goBack" plain>
            <v-icon class="pa-2"> fas fa-chevron-left </v-icon>
            Volver
          </v-btn>
        </v-fade-transition>

        <h1 class="d-inline-block ms-2">{{ this.name }}</h1>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center justify-end">
        <v-btn
          @click="enable"
          class="white--text"
          color="green lighten-1"
          rounded
          >Habilitar</v-btn
        >
        <v-btn
          @click="disable"
          class="white--text ms-2"
          color="grey darken-1"
          rounded
          >Deshabilitar</v-btn
        >
      </v-col>
    </v-row>

    <ul class="row my-3 ps-0">
      <li
        v-for="post in userPosts"
        :key="post.id"
        class="col-sm-6 col-md-4 col-lg-3 col-xl-2"
      >
        <v-card class="mx-auto" height="100%">
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
              class="mt-0"
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
    this.fillName();
    this.populateUserPosts();
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
          this.selected = [];
        }
      }
    },

    disable: function () {
      for (let i = 0; i < this.selected.length; i++) {

        let selectedPost = this.userPosts.find(obj => {
          return obj.id == this.selected[i]
        });
        if (selectedPost.published) {
          let index = this.userPosts.findIndex(obj => obj.id == this.selected[i]);
          this.userPosts[index].published = false;
          this.$set(this.userPosts, index, this.userPosts[index]);
          this.selected = [];
        }
      }
    },

    goBack: function () {
      this.$emit('showItem', null);
    },

    fillName: function () {
      for (const user of this.allUsers) {
        if (this.userId == user.id) {
          this.name = user.name;
        }
      }
    },

    populateUserPosts: function () {
      if (this.allPosts) {
        this.userPosts = this.allPosts.filter((post) => post.userId == this.userId);

        // assign published state to some posts:
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
