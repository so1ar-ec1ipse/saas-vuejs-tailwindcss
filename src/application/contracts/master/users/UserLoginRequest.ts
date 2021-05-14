import { UserLoginType } from "@/application/enums/master/users/UserLoginType";

export interface UserLoginRequest {
  email: string;
  password: string;
  loginType: UserLoginType;
}
