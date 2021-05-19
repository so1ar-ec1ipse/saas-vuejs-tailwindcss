import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/registerServiceWorker";

// Tailwind
import "@/assets/css/out.css";
import "@/assets/css/styles.css";

// ----------Plugins
import "@/plugins/vuex";
import "@/plugins/axios-helper";
import "@/plugins/toast";
import "@/plugins/event-bus";
import "@/plugins/integrations";
import "@/plugins/directives";
import "@/plugins/filters";
import { i18n } from "@/plugins/vue-i18n";
import moment from "moment";
moment().locale("es");

Vue.prototype.moment = moment;
import Clipboard from "v-clipboard";
Vue.use(Clipboard);

// ----------Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUserSecret);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

import { filters } from "./plugins/filters";

export const app = new Vue({
  i18n,
  router,
  store,
  filters,
  render: (h) => h(App),
}).$mount("#app");
