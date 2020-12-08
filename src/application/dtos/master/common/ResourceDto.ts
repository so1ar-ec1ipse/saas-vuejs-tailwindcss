import { TenantUserRole } from "@/application/enum/master/TenantUserRole";
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

export enum FileType {
  Zip,
  Txt,
  Png,
  Jpg,
  Rar
}
