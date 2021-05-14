import { Colors } from "@/application/enums/app/common/Colors";
import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";

export interface TeamDto extends AppWorkspaceEntityDto {
  name: string;
  description: string;
  color: Colors;
  archived: boolean;
}
