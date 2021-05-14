import { Module } from "vuex";
import { ThemeState, RootState } from "@/types/stateTypes";

export const defaultState: ThemeState = {
  marketingTheme: process.env.VUE_APP_THEME_MARKETING_THEME ?? "theme-bg-light",
  marketingColor: process.env.VUE_APP_THEME_MARKETING_COLOR ?? "theme-indigo",
  appTheme: process.env.VUE_APP_THEME ?? "theme-bg-dark",
  appColor: process.env.VUE_APP_COLOR ?? "theme-indigo",
};
export const state: ThemeState = defaultState;
export const theme: Module<ThemeState, RootState> = {
  namespaced: true,
  state,
  getters: {
    marketingTheme: (state: ThemeState) => {
      return state.marketingTheme;
    },
    marketingColor: (state: ThemeState) => {
      return state.marketingColor;
    },
    appTheme: (state: ThemeState) => {
      return state.appTheme ?? defaultState.appTheme;
    },
    appColor: (state: ThemeState) => {
      return state.appColor ?? defaultState.appColor;
    },
  },
  mutations: {
    reset(state: ThemeState) {
      state = defaultState;
      const htmlClasses = document.querySelector("html")?.classList;
      if (state.marketingTheme === "theme-bg-light") {
        htmlClasses?.remove("dark");
      } else {
        htmlClasses?.add("dark");
      }
    },
    marketingTheme(state: ThemeState, payload: string) {
      state.marketingTheme = payload;
      const htmlClasses = document.querySelector("html")?.classList;
      if (payload === "theme-bg-light") {
        htmlClasses?.remove("dark");
      } else {
        htmlClasses?.add("dark");
      }
    },
    marketingColor(state: ThemeState, payload: string) {
      state.marketingColor = payload;
    },
    appTheme(state: ThemeState, payload: string) {
      state.appTheme = payload;
    },
    appColor(state: ThemeState, payload: string) {
      state.appColor = payload;
    },
  },
};
