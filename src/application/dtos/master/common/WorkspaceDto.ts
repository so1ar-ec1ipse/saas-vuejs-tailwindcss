import { MasterEntityDto } from "../MasterEntityDto";
import { TenantDto } from "../tenants/TenantDto";
import { UserDto } from "../users/UserDto";

export interface WorkspaceDto extends MasterEntityDto {
  tenantId: string;
  tenant: TenantDto;
  name: string;
  publuc: boolean;
  users: UserDto[];
}
