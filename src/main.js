import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import tableSection from "./components/tableSection";
import userSection from "./components/userSection";

Vue.component('table-section', tableSection);
Vue.component('user-section', userSection);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");