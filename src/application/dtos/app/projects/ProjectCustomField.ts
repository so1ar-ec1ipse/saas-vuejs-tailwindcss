import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TeamCustomFieldDto } from "./TeamCustomFieldDto";

export interface ProjectCustomField extends AppWorkspaceEntityDto {
  teamCustomFieldId: string;
  teamCustomField: TeamCustomFieldDto;
  order: number;
  showGrid: boolean;
  showKanban: boolean;
  showGallery: boolean;
  showCalendar: boolean;
  showGantt: boolean;
  showForm: boolean;
  admin: boolean;
}
