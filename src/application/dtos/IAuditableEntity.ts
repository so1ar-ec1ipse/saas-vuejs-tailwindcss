import {UserDto} from "@/application/dtos/master/users/UserDto";

export interface IAuditableEntity {
  createdAt?: Date;
  modifiedAt?: Date;
}
