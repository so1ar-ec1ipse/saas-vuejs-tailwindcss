import { Role } from "@/application/enums/app/common/Role";
import { ProjectView } from "@/application/enums/app/projects/ProjectView";
import { UserDto } from "../../master/users/UserDto";
import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { ProjectDto } from "./ProjectDto";

export interface ProjectMemberDto extends AppWorkspaceEntityDto {
  projectId: string;
  project: ProjectDto;
  userId: string;
  user: UserDto;
  role: Role;
  view: ProjectView;
  default: boolean;
}
