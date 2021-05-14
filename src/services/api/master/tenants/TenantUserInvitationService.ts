import store from "@/store";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { TenantInvitationResponse } from "@/application/contracts/master/tenants/TenantInvitationResponse";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { UserInviteRequest } from "@/application/contracts/master/users/UserInviteRequest";
import { TenantJoinSettingsDto } from "@/application/dtos/master/tenants/TenantJoinSettingsDto";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { UserVerifyRequest } from "@/application/contracts/master/users/UserVerifyRequest";
import { AuthenticationService } from "@/services/api/master/users/AuthenticationService";
import { UserLoggedResponse } from "@/application/contracts/master/users/UserLoggedResponse";
// tslint:disable-next-line: max-line-length
import { TenantUpdateJoinSettingsRequest } from "@/application/contracts/master/tenants/TenantUpdateJoinSettingsRequest";
import { TenantUserStatus } from "@/application/enums/master/tenants/TenantUserStatus";

export class TenantUserInvitationService extends ApiService {
  constructor() {
    super("TenantUserInvitation", ApiServiceType.MasterDatabase);
  }

  getInvitation(tenantUserId: string): Promise<TenantInvitationResponse> {
    return super.get("GetInvitation", tenantUserId);
  }
  getInviteURL(linkUuid: string): Promise<TenantDto> {
    return super.get("GetInviteURL", linkUuid);
  }
  getInvitationSettings(tenantId: string = ""): Promise<TenantJoinSettingsDto> {
    if (!tenantId) {
      tenantId = store.state.tenant?.current?.id ?? "";
    }
    return super.get("GetInvitationSettings", tenantId);
  }
  inviteUser(invitation: UserInviteRequest): Promise<TenantUserDto> {
    return super.post(invitation, `InviteUser`);
  }
  requestAccess(
    linkUuid: string,
    payload: UserVerifyRequest
  ): Promise<TenantUserDto> {
    return new Promise((resolve, reject) => {
      super
        .post(payload, `RequestAccess/${linkUuid}`)
        .then((response: TenantUserDto) => {
          if (response.status === TenantUserStatus.ACTIVE) {
            const auth = new AuthenticationService();
            auth.login({
              email: payload.email,
              password: payload.password,
              loginType: payload.userLoginType,
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  acceptUser(payload: TenantUserDto) {
    return super.post(payload, `AcceptUser/${payload.id}`);
  }
  acceptInvitation(
    tenantUserId: string,
    payload: UserVerifyRequest
  ): Promise<UserLoggedResponse> {
    return new Promise((resolve, reject) => {
      super
        .post(payload, `AcceptInvitation/${tenantUserId}`)
        .then((response: UserLoggedResponse) => {
          store.commit("auth/login", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateInvitationSettings(
    payload: TenantUpdateJoinSettingsRequest
  ): Promise<TenantJoinSettingsDto> {
    return super.post(payload, `UpdateInvitationSettings`);
  }
}
