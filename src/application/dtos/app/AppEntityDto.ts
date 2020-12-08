import { EntityDto } from "../EntityDto";

export interface AppEntityDto extends EntityDto {
  tenant?: string;
  workspace?: string;
}
