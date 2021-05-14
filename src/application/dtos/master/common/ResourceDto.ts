import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { MasterEntityDto } from "../MasterEntityDto";

export interface ResourceDto extends MasterEntityDto {
  title: string;
  description: string;
  type: string;
  tiers: number[];
  roles: TenantUserRole[];
  needsUpgrade: boolean;
  needsPermission: boolean;
  hasFile: boolean;
}
