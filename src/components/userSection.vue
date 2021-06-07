<template>
  <v-container>
    <v-fade-transition mode="out-in">
      <v-btn @click="$router.go(-1)"> Volver </v-btn>
    </v-fade-transition>

    <h1>UserId : {{ this.id }}</h1>
  </v-container>
</template>

<script>
export default {
  name: "userSection",
  props: ['userId'],

  data: () => ({
    id: '',
  }),

  mounted: function () {
    this.getId();
  },

  methods: {
    getId: function () {
      this.id = this.$route.params.userId;
    },
  },

};
</script>
