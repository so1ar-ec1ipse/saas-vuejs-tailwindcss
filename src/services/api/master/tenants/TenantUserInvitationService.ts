import store from "@/store";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { TenantInvitationResponse } from "@/application/contracts/master/tenants/TenantInvitationResponse";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { UserInviteRequest } from "@/application/contracts/master/users/UserInviteRequest";
import { TenantJoinSettingsDto } from "@/application/dtos/master/tenants/TenantJoinSettingsDto";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { UserVerifyRequest } from "@/application/contracts/master/users/UserVerifyRequest";
import { TenantUserStatus } from "@/application/enum/master/TenantUserStatus";
import { AuthenticationService } from "@/services/api/master/users/AuthenticationService";
import { UserLoggedResponse } from "@/application/contracts/master/users/UserLoggedResponse";
import { UserLoginType } from "@/application/enum/master/UserLoginType";
import { TenantUserUpdateRequest } from "@/application/contracts/master/tenants/TenantUserUpdateRequest";
// tslint:disable-next-line: max-line-length
import { TenantUpdateJoinSettingsRequest } from "@/application/contracts/master/tenants/TenantUpdateJoinSettingsRequest";
import { fakeTenantOrg1, fakeTenantUser, loginFakeResponse } from '../users/FakeAuthenticationServer';

export class TenantUserInvitationService extends ApiService {
  constructor() {
    super("TenantUserInvitation", ApiServiceType.MasterDatabase);
  }

  getInvitation(tenantUserId: string): Promise<TenantInvitationResponse> {
    return Promise.resolve({} as TenantInvitationResponse);
    // return super.get("GetInvitation", tenantUserId);
  }
  getInviteURL(linkUuid: string): Promise<TenantDto> {
    return Promise.resolve(fakeTenantOrg1);
    // return super.get("GetInviteURL", linkUuid);
  }
  getInvitationSettings(tenantId: string = ""): Promise<TenantJoinSettingsDto> {
    return Promise.resolve({} as TenantJoinSettingsDto);
    // if (!tenantId) {
    //   tenantId = store.state.tenant?.current?.id ?? "";
    // }
    // return super.get("GetInvitationSettings", tenantId);
  }
  inviteUser(invitation: UserInviteRequest): Promise<TenantUserDto> {
    return Promise.resolve(fakeTenantUser);
    // return super.post(invitation, `InviteUser`);
  }
  requestAccess(
    linkUuid: string,
    payload: UserVerifyRequest
  ): Promise<TenantUserDto> {
    return Promise.resolve(fakeTenantUser);
    // return new Promise((resolve, reject) => {
    //   super
    //     .post(payload, `RequestAccess/${linkUuid}`)
    //     .then((response: TenantUserDto) => {
    //       if (response.status === TenantUserStatus.Active) {
    //         const auth = new AuthenticationService();
    //         auth.login({
    //           email: payload.email,
    //           password: payload.password,
    //           loginType: payload.userLoginType,
    //         });
    //       }
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  acceptUser(payload: TenantUserDto) {
    return Promise.resolve(true);
    // return super.post(payload, `AcceptUser/${payload.id}`);
  }
  acceptInvitation(
    tenantUserId: string,
    payload: UserVerifyRequest
  ): Promise<UserLoggedResponse> {
    return Promise.resolve(loginFakeResponse);
    // return new Promise((resolve, reject) => {
    //   super
    //     .post(payload, `AcceptInvitation/${tenantUserId}`)
    //     .then((response: UserLoggedResponse) => {
    //       store.commit("auth/login", response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  updateInvitationSettings(
    payload: TenantUpdateJoinSettingsRequest
  ): Promise<TenantJoinSettingsDto> {
    return Promise.resolve({} as TenantJoinSettingsDto);
    // return super.post(payload, `UpdateInvitationSettings`);
  }
}
