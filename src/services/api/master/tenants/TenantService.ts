import store from "@/store";
import { defaultState as defaultTheme } from "@/store/modules/theme";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { TenantCreateRequest } from "@/application/contracts/master/tenants/TenantCreateRequest";
import { UserLoggedResponse } from "@/application/contracts/master/users/UserLoggedResponse";
import { TenantUpdateImageRequest } from "@/application/contracts/master/tenants/TenantUpdateImageRequest";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";

export class TenantService extends ApiService {
  constructor() {
    super("Tenant", ApiServiceType.MasterDatabase);
  }
  adminGetAll(): Promise<TenantDto[]> {
    return super.getAll("Admin/GetAll");
  }
  getAll(): Promise<TenantDto[]> {
    return new Promise((resolve, reject) => {
      return super
        .getAll()
        .then((response: TenantDto[]) => {
          store.commit("tenant/myTenants", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  get(id: string): Promise<TenantDto[]> {
    return super.get("Get", id);
  }
  getFeatures(): Promise<TenantFeaturesResponse> {
    return new Promise((resolve, reject) => {
      super
        .get("GetFeatures")
        .then((response: TenantFeaturesResponse) => {
          store.commit("tenant/features", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  adminGetFeatures(id: string): Promise<TenantFeaturesResponse> {
    return super.get("GetFeatures/" + id);
  }
  getCurrent(): Promise<TenantDto[]> {
    return super.get("GetCurrent");
  }
  create(payload: TenantCreateRequest): Promise<UserLoggedResponse> {
    payload.appTheme = defaultTheme.appTheme;
    payload.appColor = defaultTheme.appColor;
    console.log("createTenant: " + JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      super
        .post(payload)
        .then((response: UserLoggedResponse) => {
          store.commit("auth/login", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  update(payload: TenantDto): Promise<TenantDto> {
    const tenantId = store.state.tenant?.current?.id ?? "";
    return new Promise((resolve, reject) => {
      super
        .put(tenantId, payload)
        .then((response: TenantDto) => {
          store.commit("tenant/settings", payload);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateImage(payload: TenantUpdateImageRequest): Promise<TenantDto> {
    const tenantId = store.state.tenant?.current?.id ?? "";
    return super.put(tenantId, payload, "UpdateImage");
  }
  delete() {
    const tenantId = store.state.tenant?.current?.id ?? "";
    return super.delete(tenantId);
  }
  adminDelete(id: string) {
    return super.delete(id, "Admin/Delete");
  }
}
export const tenantService = new TenantService();
