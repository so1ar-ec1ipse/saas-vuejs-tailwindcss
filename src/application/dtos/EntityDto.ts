import { IAuditableEntity } from './IAuditableEntity';

export interface EntityDto extends IAuditableEntity {
  id: any | undefined;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
}
