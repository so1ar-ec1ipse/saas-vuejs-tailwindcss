import store from "@/store";
import router from "@/router";
import { Module } from "vuex";
import { AuthState, RootState } from "@/types/stateTypes";
import { SignalService } from "@/plugins/SignalR";
import mixpanel from "mixpanel-browser";
// import LogRocket from "logrocket";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { UserLoggedResponse } from "@/application/contracts/master/users/UserLoggedResponse";
import { UserType } from "@/application/enums/master/users/UserType";
import supportedLocales from "../../../locale/supportedLocales";

export const state: AuthState = {
  authenticated: false,
  token: "",
};
export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  actions: {
    logout({ commit, rootState }, payload) {
      commit("logout");
      localStorage.clear();
      router.push({name: "account.login"});
    },
  },
  mutations: {
    login: (state: AuthState, payload: UserLoggedResponse) => {
      SignalService.startConnection();

      state.authenticated = true;
      state.token = payload.token;
      localStorage.setItem("id_token", state.token);

      store.dispatch("account/logged", payload.user);
      store.commit("tenant/myTenants", payload.user.tenants);
      store.commit("tenant/current", payload.user.currentTenant);
      store.commit("locale/updateLocale", payload.user.locale);
      store.commit("tenant/currentWorkspace", payload.defaultWorkspace);

      try {
        // @ts-ignore
        if (window.analytics) {
          // @ts-ignore
          window.analytics.identify(payload.user.username, {
            email: payload.user.email,
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            type: payload.user.type,
            tenant: payload.user.currentTenant,
          });
        }
        if (mixpanel) {
          try {
            mixpanel.identify(payload.user.id);
            if (mixpanel.people) {
              mixpanel.people.set({
                USER_ID: payload.user.id,
                $email: payload.user.email,
                "First name": payload.user.firstName,
                "Last name": payload.user.lastName,
              });
            }
            mixpanel.track("Login");
          } catch (ex) {
            // ignore
          }
        }
        // if (LogRocket) {
        //   LogRocket.identify(payload.user.email, {
        //     username: payload.user.username,
        //     firstName: payload.user.firstName,
        //     lastName: payload.user.lastName,
        //     email: payload.user.email,
        //     subscriptionCustomerId:
        //       payload.user.currentTenant?.subscriptionCustomerId ?? "",
        //     subscriptionPlanId:
        //       payload.user.currentTenant?.subscriptionPlanId ?? "",
        //   });
        // }
      } catch (ex) {
        // ignore
      }
      if ((payload.user as UserDto).type === UserType.ADMIN) {
        router.push({name: "admin"});
      } else {
        router.push({name: "app.dashboard"});
      }
    },
    logout: (state: AuthState) => {
      state.authenticated = false;
      state.token = "";
      localStorage.removeItem("id_token");
      localStorage.clear();
      if (mixpanel) {
        try {
          mixpanel.track("Logout");
        } catch (ex) {
          // ignore
        }
      }
      SignalService.closeConnection();
      // store.commit("locale/reset");
      store.commit("account/reset");
      store.commit("pricing/reset");
      store.commit("tenant/reset");
      store.commit("theme/reset");
    },
  },
};
