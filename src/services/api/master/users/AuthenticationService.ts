import store from "@/store";
import {ApiService, ApiServiceType} from "@/services/api/ApiService";
import {UserLoginRequest} from "@/application/contracts/master/users/UserLoginRequest";
import {UserLoggedResponse} from "@/application/contracts/master/users/UserLoggedResponse";
import {UserRegisterRequest} from "@/application/contracts/master/users/UserRegisterRequest";
import {UserLoginType} from "@/application/enum/master/UserLoginType";
import {UserVerifyRequest} from "@/application/contracts/master/users/UserVerifyRequest";
import { fakeUserAdmin, fakeUserTenant, loginFakeResponse } from "./FakeAuthenticationServer";

export class AuthenticationService extends ApiService {
  constructor() {
    super("Authentication", ApiServiceType.MasterDatabase);
  }
  login(payload: UserLoginRequest): Promise<UserLoggedResponse> {
    loginFakeResponse.user = fakeUserTenant;
    if (payload.email === fakeUserAdmin.email) {
      loginFakeResponse.user = fakeUserAdmin;
    }
    store.commit("auth/login", loginFakeResponse);
    return Promise.resolve(loginFakeResponse);
  }
  register(payload: UserRegisterRequest): Promise < UserLoggedResponse > {
    loginFakeResponse.user = fakeUserTenant;
    if (payload.email === fakeUserAdmin.email) {
      loginFakeResponse.user = fakeUserAdmin;
    }
    store.commit("auth/login", loginFakeResponse);
    return Promise.resolve(loginFakeResponse);
  }
  verify(payload: UserVerifyRequest): Promise < UserLoggedResponse > {
    store.commit("auth/login", loginFakeResponse);
    return Promise.resolve(loginFakeResponse);
  }
  reset(email: string): Promise<any> {
    return Promise.resolve(true);
    // return super.post(null, "Reset/" + email);
  }
}
