import { UserLoginType } from "@/application/enum/master/UserLoginType";

export interface UserVerifyRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  phone: string;
  token: string;
  userLoginType: UserLoginType.Password;
}
