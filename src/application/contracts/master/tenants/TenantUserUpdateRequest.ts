import { TenantUserRole } from '@/application/enum/master/TenantUserRole';

export interface TenantUserUpdateRequest {
  role: TenantUserRole;
  firstName: string;
  lastName: string;
  phone: string;
}
