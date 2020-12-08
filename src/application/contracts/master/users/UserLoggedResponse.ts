import { UserDto } from "@/application/dtos/master/users/UserDto";

export interface UserLoggedResponse {
  user: UserDto;
  token: string;
  verifyToken?: string;
}
