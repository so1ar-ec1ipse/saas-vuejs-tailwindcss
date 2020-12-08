import { TenantUserRole } from "@/application/enum/master/TenantUserRole";

export interface UserInviteRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: TenantUserRole;
}
