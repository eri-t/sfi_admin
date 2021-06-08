import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import tableSection from "./components/tableSection";
import userSection from "./components/userSection";
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);
/*
const listView = {
  template: `<table-section :allUsers="allUsers"/>`,
  props: ['allUsers'],
}

const userView = {
  template: `<user-section :allUsers="allUsers" :userId="userId" :allPosts="allPosts"/>`,
  props: ['allUsers', 'userId', 'allPosts'],
}

const routes = [{
    path: '/home',
    name: 'Home',
    component: listView,
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: userView,
  },
  {
    path: '*',
    redirect: '/home'
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',

  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
})
*/
Vue.component('table-section', tableSection);
Vue.component('user-section', userSection);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  //  router,
  render: (h) => h(App),
}).$mount("#app");