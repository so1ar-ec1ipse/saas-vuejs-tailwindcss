import { IAuditableEntity } from './IAuditableEntity';
import {UserDto} from "@/application/dtos/master/users/UserDto";
import {TenantDto} from "@/application/dtos/master/tenants/TenantDto";

export interface EntityDto extends IAuditableEntity {
  id: any | undefined;
  createdAt?: Date;
  // createdByUserId?: string;
  // createdByUser?: UserDto;
  modifiedAt?: Date;
  // modifiedByUserId?: string;
  // modifiedByUser?: UserDto;
}
