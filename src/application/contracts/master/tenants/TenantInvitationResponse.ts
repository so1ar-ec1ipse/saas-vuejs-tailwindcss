import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";

export interface TenantInvitationResponse {
  invitation: TenantUserDto;
  tenant: TenantDto;
  requiresVerify: boolean;
}
