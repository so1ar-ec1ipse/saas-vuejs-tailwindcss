import { TenantUserJoined } from "@/application/enum/master/TenantUserJoined";
import { TenantUserRole } from "@/application/enum/master/TenantUserRole";
import { TenantUserStatus } from "@/application/enum/master/TenantUserStatus";
import { MasterEntityDto } from "../MasterEntityDto";
import { UserDto } from "../users/UserDto";
import { TenantDto } from "./TenantDto";

export interface TenantUserDto extends MasterEntityDto {
  tenantId?: string;
  tenant?: TenantDto;
  userId?: string;
  user?: UserDto;
  role: TenantUserRole;
  joined: TenantUserJoined;
  status: TenantUserStatus;
  uuid?: string;
  accepted?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
