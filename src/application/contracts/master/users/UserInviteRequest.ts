import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";

export interface UserInviteRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: TenantUserRole;
}
