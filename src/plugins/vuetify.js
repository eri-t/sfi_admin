import '@fortawesome/fontawesome-free/css/all.css';
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#64a8e0', // blue
            }
        }
    },
    icons: {
        iconfont: 'fa',
    },
});