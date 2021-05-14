import { UserLoginType } from "@/application/enums/master/users/UserLoginType";

export interface UserVerifyRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  phone: string;
  token: string;
  userLoginType: UserLoginType;
}
