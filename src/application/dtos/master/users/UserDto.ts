import { UserLoginType } from "@/application/enums/master/users/UserLoginType";
import { UserType } from "@/application/enums/master/users/UserType";
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
  token: string;
  defaultTenantId: number | null;
  defaultTenant: TenantDto;
  tenants: TenantUserDto[];
  currentTenant: TenantDto;
  timezone: string;
  locale: string;
}
