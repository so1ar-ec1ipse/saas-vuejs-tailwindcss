import store from "@/store";
import {ApiService, ApiServiceType} from "@/services/api/ApiService";
import {UserLoginRequest} from "@/application/contracts/master/users/UserLoginRequest";
import {UserLoggedResponse} from "@/application/contracts/master/users/UserLoggedResponse";
import {UserRegisterRequest} from "@/application/contracts/master/users/UserRegisterRequest";
import {UserVerifyRequest} from "@/application/contracts/master/users/UserVerifyRequest";

export class AuthenticationService extends ApiService {
  constructor() {
    super("Authentication", ApiServiceType.MasterDatabase);
  }
  login(payload: UserLoginRequest): Promise<UserLoggedResponse> {
    return new Promise((resolve, reject) => {
      super.post(payload, "Login")
          .then((response: UserLoggedResponse) => {
            store.commit("auth/login", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
  impersonate(userId: string): Promise<UserLoggedResponse> {
    return new Promise((resolve, reject) => {
      super.post(null, `Admin/Impersonate/${userId}`)
          .then((response: UserLoggedResponse) => {
            store.dispatch("auth/logout");
            store.commit("auth/login", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
  register(payload: UserRegisterRequest): Promise<UserLoggedResponse> {
    return new Promise((resolve, reject) => {
      super.post(payload, "Register")
          .then((response: UserLoggedResponse) => {
            if (response && response.user) {
              store.commit("auth/login", response);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
  verify(payload: UserVerifyRequest): Promise<UserLoggedResponse> {
    return new Promise((resolve, reject) => {
      super.post(payload, "Verify")
          .then((response: UserLoggedResponse) => {
            store.commit("auth/login", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
  reset(email: string): Promise<any> {
    return super.post(null, "Reset/" + email);
  }
}
