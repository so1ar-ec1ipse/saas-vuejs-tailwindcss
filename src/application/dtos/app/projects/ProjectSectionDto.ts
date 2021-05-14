import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { ProjectDto } from "./ProjectDto";

export interface ProjectSectionDto extends AppWorkspaceEntityDto {
  projectId: string;
  project: ProjectDto;
  order: number;
  name: string;
}
