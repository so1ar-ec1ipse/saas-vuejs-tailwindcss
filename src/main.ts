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

import VueTailwind from "vue-tailwind";
import { TPagination } from "vue-tailwind/dist/components";
const settings = {
  "t-pagination": {
    component: TPagination,
    props: {
      wrapper: "table border-collapse text-center bg-white shadow-sm",
      element:
        "w-8 h-8 border border-gray-200 table-cell hover:border-blue-100",
      activeElement:
        "w-8 h-8 border border-blue-500 table-cell hover:border-blue-600",
      disabledElement: "w-8 h-8 border border-gray-200 table-cell",
      ellipsisElement: "w-8 h-8 border border-gray-200 hidden md:table-cell",
      activeButton:
        "bg-blue-500 w-full h-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      disabledButton:
        "opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out",
      button:
        "hover:bg-blue-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      ellipsis: "",
    },
  },
};
Vue.use(VueTailwind, settings);

Vue.config.productionTip = false;

import {filters} from "./plugins/filters";

export const app = new Vue({
  i18n,
  router,
  store,
  filters,
  render: (h) => h(App),
}).$mount("#app");
