import store from "@/store";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { UserUpdateRequest } from "@/application/contracts/master/users/UserUpdateRequest";
import { UserUpdatePasswordRequest } from "@/application/contracts/master/users/UserUpdatePasswordRequest";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { UserUpdateAvatarRequest } from '@/application/contracts/master/users/UserUpdateAvatarRequest';
import { fakeTenantOrg1, fakeTenantUser, fakeUserAdmin, fakeUserTenant } from './FakeAuthenticationServer';

export class UserService extends ApiService {
  constructor() {
    super("User", ApiServiceType.MasterDatabase);
  }
  adminGetAll(): Promise<UserDto[]> {
    return Promise.resolve([fakeUserAdmin, fakeUserTenant]);
    // return super.getAll("Admin/GetAll");
  }
  get(id: string): Promise<UserDto[]> {
    return Promise.resolve([fakeUserAdmin]);
    // return super.get("Get", id);
  }
  getCurrent(): Promise<UserDto> {
    return Promise.resolve(fakeUserAdmin);
    // return super.get("GetCurrent");
  }
  updateAvatar(avatar: UserUpdateAvatarRequest): Promise<UserDto> {
    return Promise.resolve(fakeUserAdmin);
    // return new Promise((resolve, reject) => {
    //   super
    //     .post(avatar, "UpdateAvatar")
    //     .then((response: UserDto) => {
    //       store.commit("account/logged", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  update(id: string, payload: UserUpdateRequest): Promise<UserDto> {
    return Promise.resolve(fakeUserAdmin);
    // return new Promise((resolve, reject) => {
    //   super
    //     .put(id, payload)
    //     .then((response: UserDto) => {
    //       store.commit("account/logged", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  updatePassword(payload: UserUpdatePasswordRequest): Promise<any> {
    return Promise.resolve(true);
    // return super.put("", payload, "UpdatePassword");
  }
  adminUpdatePassword(userId: string, password: string): Promise<any> {
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //   super
    //     .post(null, `Admin/UpdatePassword/${userId}/${password}`)
    //     .then((response: any) => {
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  updateDefaultTenant(tenantId?: string): Promise<TenantDto> {
    return Promise.resolve(fakeTenantOrg1);
    // const userId = store.state.account.user?.id ?? "";
    // return new Promise((resolve, reject) => {
    //   super
    //     .post(null, `UpdateDefaultTenant/${userId}/${tenantId}`)
    //     .then((response: TenantDto) => {
    //       store.commit("tenant/current", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  deleteMe() {
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //   super
    //     .delete("", "DeleteMe")
    //     .then((response) => {
    //       store.dispatch("auth/logout");
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  adminDelete(id: string) {
    return Promise.resolve(true);
    // return super.delete(id, "Admin/Delete");
  }
}
