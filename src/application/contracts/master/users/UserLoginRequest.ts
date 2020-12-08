import {UserLoginType} from "@/application/enum/master/UserLoginType";

export interface UserLoginRequest {
  email: string;
  password: string;
  loginType: UserLoginType;
}
