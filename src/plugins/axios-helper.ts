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
    if (debug) {
          console.log("error: " + JSON.stringify(error));
        }
    if (error.errors && error.errors.length > 0) {
       return Promise.reject(i18n.t(error.errors.map(f => f)).toString());
    } else if (error.response && error.response.status === 401) {
      console.log("Unauthorized, logging out ...");
      store.commit("auth/logout");
      router.replace("/account/login");
    } else if (error.response && (error.response.data || error.message)) {
      if (error.response.data) {
        let errorDescription: string = "";
        errorDescription = i18n.t(error.response.data).toString();
        if (!errorDescription) {
          errorDescription = error.response.data;
          if (error.response.data.title) {
            errorDescription = error.response.data.title;
          }
        }
        return Promise.reject(errorDescription);
      } else if (error.message) {
        return Promise.reject(i18n.t(error.message).toString());
      }
    }
    return Promise.reject(error);
  }
);

server.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.common["Access-Control-Allow-Origin"] = "*";
    if (store.state.tenant.current) {
      config.headers.common["X-Tenant-Key"] = store.state.tenant.current.uuid;
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
