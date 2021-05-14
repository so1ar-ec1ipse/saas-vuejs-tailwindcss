import { MasterEntityDto } from "../MasterEntityDto";
import { TenantProductDto } from "./TenantProductDto";
import { TenantUserDto } from "./TenantUserDto";

export interface TenantDto extends MasterEntityDto {
  uuid: string;
  name: string;
  domain: string;
  subdomain: string;
  icon: string;
  logo: string;
  logoDarkmode: string;
  appTheme: string;
  appColor: string;
  subscriptionCustomerId: string;
  subscriptionPlanId: string;
  users: TenantUserDto[];
  products: TenantProductDto[];
  currentUser: TenantUserDto;
}
