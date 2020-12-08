import { UserLoginType } from "@/application/enum/master/UserLoginType";
import { SelectedSubscriptionRequest } from "../subscriptions/SelectedSubscriptionRequest";

export interface UserRegisterRequest {
  email: string;
  selectedSubscription: SelectedSubscriptionRequest;
  organization: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  workspace: string;
  loginType: UserLoginType;
}
