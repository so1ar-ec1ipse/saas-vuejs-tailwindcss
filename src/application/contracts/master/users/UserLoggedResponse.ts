import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import { UserDto } from "@/application/dtos/master/users/UserDto";

export interface UserLoggedResponse {
  user: UserDto;
  token: string;
  defaultWorkspace: WorkspaceDto;
}
