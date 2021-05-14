import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";

export interface TenantUserUpdateRequest {
  role: TenantUserRole;
  firstName: string;
  lastName: string;
  phone: string;
}
