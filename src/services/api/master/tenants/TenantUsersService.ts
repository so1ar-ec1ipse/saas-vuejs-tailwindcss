import store from "@/store";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { TenantUserUpdateRequest } from "@/application/contracts/master/tenants/TenantUserUpdateRequest";
import { fakeTenantUser, fakeTenantUser2, fakeUserAdmin } from '../users/FakeAuthenticationServer';

export class TenantUsersService extends ApiService {
  constructor() {
    super("TenantUsers", ApiServiceType.MasterDatabase);
  }
  adminGetAll(): Promise<UserDto[]> {
    return Promise.resolve([fakeUserAdmin, fakeUserAdmin]);
    // return super.getAll("Admin/GetAll");
  }
  getAll(tenantId: string = ""): Promise<TenantUserDto[]> {
    return Promise.resolve([fakeTenantUser, fakeTenantUser2]);
    // if (!tenantId) {
    //    tenantId = store.state.tenant?.current?.id ?? "";
    // }
    //  return new Promise((resolve, reject) => {
    //   super
    //     .getAll("GetAll/" + tenantId)
    //     .then((response: TenantUserDto[]) => {
    //       store.commit("tenant/members", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  get(tenantUserId: string): Promise<TenantUserDto> {
    return Promise.resolve(fakeTenantUser);
    // return super.get("Get", `${tenantUserId}`);
  }
  update(
    tenantUserId: string,
    payload: TenantUserUpdateRequest
  ): Promise<TenantUserDto> {
    return Promise.resolve(fakeTenantUser);
    // return super.put(`${tenantUserId}`, payload);
  }
  delete(tenantUserId: string): Promise<any> {
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //   super
    //     .delete(tenantUserId)
    //     .then((response) => {
    //       this.getAll(store.state.tenant.current?.id ?? "");
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  adminDelete(tenantUserId: string): Promise<any> {
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //   super
    //     .delete(tenantUserId, "Admin/Delete")
    //     .then((response) => {
    //       this.getAll(store.state.tenant.current?.id ?? "");
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
}
