import { CustomFieldType } from "@/application/enums/app/projects/CustomFieldType";
import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";

export interface TeamCustomFieldDto extends AppWorkspaceEntityDto {
  name: string;
  description: string;
  type: CustomFieldType;
  configuration: string[];
  order: number;
  default: string;
  required: boolean;
  active: boolean;
}
