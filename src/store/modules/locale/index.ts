import { Module } from "vuex";
import { LocaleState, RootState } from "@/types/stateTypes";
import moment from "moment";

export const state: LocaleState = {
  locale: process.env.VUE_APP_LANGUAGE?.toString() ?? "",
};

export const locale: Module<LocaleState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    reset(state) {
      const lang = process.env.VUE_APP_LANGUAGE?.toString();
      if (lang) {
        state.locale = lang;
      }
      console.log("moment.locale before: " + moment.locale());
      if (state.locale) {
        moment.locale(state.locale.split('-')[0]);
      }
      console.log("moment.locale after: " + moment.locale());
    },
    updateLocale(state, locale: string) {
      state.locale = locale;
      console.log("moment.locale before: " + moment.locale());
      if (state.locale) {
        moment.locale(state.locale.split('-')[0]);
      }
      console.log("moment.locale after: " + moment.locale());
    },
  },
};
