import { UserLoginType } from "@/application/enum/master/UserLoginType";
import { UserType } from "@/application/enum/master/UserType";
import { WorkspaceDto } from "../common/WorkspaceDto";
import { MasterEntityDto } from "../MasterEntityDto";
import { TenantDto } from "../tenants/TenantDto";
import { TenantUserDto } from "../tenants/TenantUserDto";

export interface UserDto extends MasterEntityDto {
  username: string;
  email: string;
  type: UserType;
  firstName: string;
  lastName: string;
  phone: string;
  loginType: UserLoginType;
  avatar: string;
  token?: string;
  defaultTenantId?: number | null;
  defaultTenant?: TenantDto;
  tenants?: TenantUserDto[];
  workspaces?: WorkspaceDto[];
  currentTenant?: TenantDto;
}
