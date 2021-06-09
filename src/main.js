import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import navBar from "./components/navBar";
import tableSection from "./components/tableSection";
import userSection from "./components/userSection";
import customFooter from "./components/customFooter";

Vue.component('nav-bar', navBar);
Vue.component('table-section', tableSection);
Vue.component('user-section', userSection);
Vue.component('custom-footer', customFooter);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");