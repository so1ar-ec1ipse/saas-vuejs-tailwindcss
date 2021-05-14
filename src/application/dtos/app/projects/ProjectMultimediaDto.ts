import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { ProjectDto } from "./ProjectDto";
import { Extension } from "@/application/enums/app/common/Extension";

export interface ProjectMultimediaDto extends AppWorkspaceEntityDto {
  projectId: string;
  project: ProjectDto;
  fileType: Extension;
  name: string;
  extension: string;
  file: string;
}
