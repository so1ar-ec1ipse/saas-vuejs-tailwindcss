export interface IAuditableEntity {
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
}
