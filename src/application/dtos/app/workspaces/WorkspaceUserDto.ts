import { Role } from "@/application/enums/app/common/Role";
import { UserDto } from "../../master/users/UserDto";
import { AppEntityDto } from "../AppEntityDto";
import { WorkspaceDto } from "./WorkspaceDto";

export interface WorkspaceUserDto extends AppEntityDto {
  workspaceId: string;
  workspace?: WorkspaceDto;
  userId: string;
  user?: UserDto;
  role: Role;
  default?: boolean;
}
