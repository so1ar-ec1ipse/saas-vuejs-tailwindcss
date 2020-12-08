import store from "@/store";
import { defaultState as defaultTheme } from "@/store/modules/theme";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { TenantCreateRequest } from "@/application/contracts/master/tenants/TenantCreateRequest";
import { UserLoggedResponse } from "@/application/contracts/master/users/UserLoggedResponse";
import { TenantUpdateImageRequest } from "@/application/contracts/master/tenants/TenantUpdateImageRequest";
import { fakeTenantOrg1, fakeTenantOrg2, loginFakeResponse } from '../users/FakeAuthenticationServer';

export class TenantService extends ApiService {
  constructor() {
    super("Tenant", ApiServiceType.MasterDatabase);
  }
  adminGetAll(): Promise<TenantDto[]> {
    return Promise.resolve([fakeTenantOrg1, fakeTenantOrg2]);
    // return super.getAll("Admin/GetAll");
  }
  getAll(): Promise<TenantDto[]> {
    return Promise.resolve([fakeTenantOrg1, fakeTenantOrg2]);
    // return new Promise((resolve, reject) => {
    //   return super
    //     .getAll()
    //     .then((response: TenantDto[]) => {
    //       store.commit("tenant/myTenants", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  get(id: string): Promise<TenantDto[]> {
    return Promise.resolve([fakeTenantOrg1, fakeTenantOrg2]);
    // return super.get("Get", id);
  }
  getCurrent(): Promise<TenantDto[]> {
    return Promise.resolve([fakeTenantOrg1, fakeTenantOrg2]);
    // return super.get("GetCurrent");
  }
  create(payload: TenantCreateRequest): Promise<UserLoggedResponse> {
    return Promise.resolve(loginFakeResponse);

    // payload.appTheme = defaultTheme.appTheme;
    // payload.appColor = defaultTheme.appColor;
    // console.log('createTenant: ' + JSON.stringify(payload))
    // return new Promise((resolve, reject) => {
    //   super
    //     .post(payload)
    //     .then((response: UserLoggedResponse) => {
    //       store.commit("auth/login", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  update(payload: TenantDto): Promise<TenantDto> {
    return Promise.resolve(fakeTenantOrg1);
    // const tenantId = store.state.tenant?.current?.id ?? "";
    // return new Promise((resolve, reject) => {
    //   super
    //     .put(tenantId, payload)
    //     .then((response: TenantDto) => {
    //       store.commit("tenant/settings", payload);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  updateImage(payload: TenantUpdateImageRequest): Promise<TenantDto> {
    return Promise.resolve(fakeTenantOrg1);
    // const tenantId = store.state.tenant?.current?.id ?? "";
    // return super.put(tenantId, payload, "UpdateImage");
  }
  delete() {
    return Promise.resolve(true);
    // const tenantId = store.state.tenant?.current?.id ?? "";
    // return super.delete(tenantId);
  }
  adminDelete(id: string) {
    return Promise.resolve(true);
    // return super.delete(id, "Admin/Delete");
  }
}
export const tenantService = new TenantService();
