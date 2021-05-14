import { Role } from "@/application/enums/app/common/Role";
import { UserDto } from "../../master/users/UserDto";
import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TeamDto } from "./TeamDto";

export interface TeamMemberDto extends AppWorkspaceEntityDto {
  teamId: string;
  team: TeamDto;
  userId: string;
  user: UserDto;
  role: Role;
  color: string;
  default: boolean;
  configuration: string[];
}
