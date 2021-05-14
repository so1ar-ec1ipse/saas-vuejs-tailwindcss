import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "@/store";
import router from "@/router";
import { i18n } from "@/plugins/vue-i18n";
const debug = process.env.NODE_ENV !== "production";

declare module "axios" {
  export interface AxiosRequestConfig {
    masterDatabase: boolean;
  }
}
let apiUrl = process.env.VUE_APP_API_URL?.toString();
if (apiUrl?.includes("[HOSTNAME]")) {
  apiUrl = apiUrl.replace("[HOSTNAME]", location.hostname);
}
const config: AxiosRequestConfig = {
  baseURL: apiUrl,
  masterDatabase: false,
};
const server: AxiosInstance = axios.create(config);

server.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error && error.toString().includes("QuotaExceededError")) ||
      (error.message && error.message.toString().includes("QuotaExceededError"))
    ) {
      localStorage.clear();
      store.dispatch("auth/logout");
      return Promise.reject(
        "Se excedió el tiempo de respuesta, se cerrará sesión..."
      );
    }
    if (debug) {
      console.log("ERROR: " + JSON.stringify(error));
    }
    if (error.status && error.status === 404) {
      return Promise.reject(i18n.t("shared.notFound").toString());
    }
    if (
      error.message &&
      error.message.includes("Request failed with status code 404")
    ) {
      return Promise.reject(i18n.t("shared.notFound").toString());
    }
    // if (error.message) {
    //   return Promise.reject(i18n.t(error.message).toString());
    // } else
    if (error.response?.data) {
      return Promise.reject(i18n.t(error.response.data).toString());
    } else if (error.errors) {
      return Promise.reject(i18n.t(error.errors).toString());
    }
    return Promise.reject(i18n.t(error.message).toString());
  }
);

server.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.common["Access-Control-Allow-Origin"] = "*";
    if (store.state.tenant.current) {
      config.headers.common["X-Tenant-Key"] = store.state.tenant.current.uuid;
    }
    if (store.state.tenant.currentWorkspace) {
      config.headers.common["X-Workspace-Id"] = store.state.tenant.currentWorkspace.id;
    }
    const authToken = store.state.auth.token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default server;
