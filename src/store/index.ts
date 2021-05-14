/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import createLogger from "vuex/dist/logger";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// Modules
import { locale } from "./modules/locale";
import { account } from "./modules/account";
import { auth } from "./modules/auth";
import { tenant } from "./modules/tenant";
import { pricing } from "./modules/pricing";
import { theme } from "./modules/theme";
import { tickets } from "./modules/tickets";
import { RootState } from "@/types/stateTypes";

const debug = process.env.NODE_ENV !== "production";

const store: StoreOptions<RootState> = {
  modules: {
    locale,
    account,
    auth,
    // navigation,
    tenant,
    pricing,
    theme,
    tickets,
  },
  strict: debug,
  plugins: debug
    ? [
        createLogger(),
        createPersistedState({
          key: "vuex",
          reducer(val) {
            if (!val.auth.token || val.auth.token === "") {
              return {};
            }
            return val;
          },
        }),
      ]
    : [
        createPersistedState({
          key: "vuex",
          reducer(val) {
            if (!val.auth.token || val.auth.token === "") {
              return {};
            }
            return val;
          },
        }),
      ],
};

export default new Vuex.Store<RootState>(store);
