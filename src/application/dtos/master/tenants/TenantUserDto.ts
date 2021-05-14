import { TenantUserJoined } from "@/application/enums/master/tenants/TenantUserJoined";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { TenantUserStatus } from "@/application/enums/master/tenants/TenantUserStatus";
import { MasterEntityDto } from "../MasterEntityDto";
import { UserDto } from "../users/UserDto";
import { TenantDto } from "./TenantDto";

export interface TenantUserDto extends MasterEntityDto {
  tenantId: string;
  tenant: TenantDto;
  userId: string;
  user: UserDto;
  role: TenantUserRole;
  joined: TenantUserJoined;
  status: TenantUserStatus;
  chatbotToken?: string;
  uuid: string;
  accepted: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
}
