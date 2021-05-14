import { EntityDto } from "../EntityDto";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import {UserDto} from "@/application/dtos/master/users/UserDto";

export interface AppEntityDto extends EntityDto {
  createdByUserId?: string;
  createdByUser?: UserDto;
  modifiedByUserId?: string;
  modifiedByUser?: UserDto;
  tenantId?: string | undefined;
  tenant?: TenantDto | undefined;
  // workspaceId?: string | undefined;
}
