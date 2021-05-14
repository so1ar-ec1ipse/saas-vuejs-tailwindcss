import store from "@/store";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { UserUpdateRequest } from "@/application/contracts/master/users/UserUpdateRequest";
import { UserUpdatePasswordRequest } from "@/application/contracts/master/users/UserUpdatePasswordRequest";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { UserUpdateAvatarRequest } from "@/application/contracts/master/users/UserUpdateAvatarRequest";
import { UserLoggedResponse } from "@/application/contracts/master/users/UserLoggedResponse";
import { UserUpdateLocaleRequest } from "@/application/contracts/master/users/UserUpdateLocaleRequest";

export class UserService extends ApiService {
  constructor() {
    super("User", ApiServiceType.MasterDatabase);
  }
  adminGetAll(): Promise<UserDto[]> {
    return super.getAll("Admin/GetAll");
  }
  get(id: string): Promise<UserDto[]> {
    return super.get("Get", id);
  }
  getUserAvatar(id: string): Promise<string> {
    return super.get("GetUserAvatar", id);
  }
  getClaims(): Promise<any[]> {
    return super.get("GetClaims");
  }
  getCurrent(): Promise<UserDto[]> {
    return super.get("GetCurrent");
  }
  updateAvatar(avatar: UserUpdateAvatarRequest): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      super
        .post(avatar, "UpdateAvatar")
        .then((response: UserDto) => {
          store.commit("account/logged", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateLocale(payload: UserUpdateLocaleRequest): Promise<any> {
    return super.post(payload, `UpdateLocale`);
  }
  update(id: string, payload: UserUpdateRequest): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      super
        .put(id, payload)
        .then((response: UserDto) => {
          store.commit("account/logged", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updatePassword(payload: UserUpdatePasswordRequest): Promise<any> {
    return super.post(payload, "UpdatePassword");
  }
  adminUpdatePassword(userId: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      super
        .post(null, `Admin/UpdatePassword/${userId}/${password}`)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateDefaultTenant(tenantId?: string): Promise<UserLoggedResponse> {
    const userId = store.state.account.user?.id ?? "";
    return new Promise((resolve, reject) => {
      super
        .post(null, `UpdateDefaultTenant/${userId}/${tenantId}`)
        .then((response: UserLoggedResponse) => {
          store.commit("auth/login", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  deleteMe() {
    return new Promise((resolve, reject) => {
      super
        .delete("", "DeleteMe")
        .then((response) => {
          store.dispatch("auth/logout");
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  adminDelete(id: string) {
    return super.delete(id, "Admin/Delete");
  }
}
