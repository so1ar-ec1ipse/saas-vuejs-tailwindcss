
import { SubscriptionPriceDto } from "../../../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { TenantDto } from "../../../../application/dtos/master/tenants/TenantDto";
import { TenantUserDto } from "../../../../application/dtos/master/tenants/TenantUserDto";
import { UserDto } from "../../../../application/dtos/master/users/UserDto";
import { TenantUserRole } from "../../../../application/enum/master/TenantUserRole";
import { TenantUserJoined } from "../../../../application/enum/master/TenantUserJoined";
import { TenantUserStatus } from "../../../../application/enum/master/TenantUserStatus";
import { UserLoginType } from "../../../../application/enum/master/UserLoginType";
import { UserType } from "../../../../application/enum/master/UserType";
import { defaultProductsDevelopment } from "../../../../store/modules/pricing/default-pricing.Development";
import { UserLoggedResponse } from '@/application/contracts/master/users/UserLoggedResponse';

export const fakeUserAdmin: UserDto = {
  id: 1,
  username: "admin@fake.com",
  email: "admin@fake.com",
  type: UserType.Admin,
  firstName: "Fake name",
  lastName: "Fake lastname",
  phone: "",
  loginType: UserLoginType.Password,
  avatar:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEXMzMyWlpa3t7eqqqrFxcW+vr6xsbGjo6OcnJwtaz+fAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQYlWNgGHaAyURdAUaC+U4tDTASDEwFBNhUQSSEy+rW0sBSACIhfDYjdQU2VRBJLxfTEAAAv8sIm/VDSJMAAAAASUVORK5CYII=",
};
export const fakeUserTenant: UserDto = {
  id: 1,
  username: "tenant@fake.com",
  email: "tenant@fake.com",
  type: UserType.Tenant,
  firstName: "Fake name",
  lastName: "Fake lastname",
  phone: "",
  loginType: UserLoginType.Password,
  avatar:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEXMzMyWlpa3t7eqqqrFxcW+vr6xsbGjo6OcnJwtaz+fAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQYlWNgGHaAyURdAUaC+U4tDTASDEwFBNhUQSSEy+rW0sBSACIhfDYjdQU2VRBJLxfTEAAAv8sIm/VDSJMAAAAASUVORK5CYII=",
};
// export const fakeSubscriptionPricePro: SubscriptionPriceDto =
//   defaultProductsDevelopment[1].prices[0];
// export const fakeSubscriptionPriceUltimate: SubscriptionPriceDto =
//   defaultProductsDevelopment[2].prices[0];
// fakeSubscriptionPricePro.subscriptionProduct = defaultProductsDevelopment[1];
// fakeSubscriptionPriceUltimate.subscriptionProduct = defaultProductsDevelopment[2];
export const fakeTenantOrg1: TenantDto = {
  id: "",
  name: "Organization 1",
  domain: "org1.com",
  subdomain: "org1",
  icon:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEXMzMyWlpa3t7eqqqrFxcW+vr6xsbGjo6OcnJwtaz+fAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQYlWNgGHaAyURdAUaC+U4tDTASDEwFBNhUQSSEy+rW0sBSACIhfDYjdQU2VRBJLxfTEAAAv8sIm/VDSJMAAAAASUVORK5CYII=",
  logo:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEXMzMyWlpa3t7eqqqrFxcW+vr6xsbGjo6OcnJwtaz+fAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQYlWNgGHaAyURdAUaC+U4tDTASDEwFBNhUQSSEy+rW0sBSACIhfDYjdQU2VRBJLxfTEAAAv8sIm/VDSJMAAAAASUVORK5CYII=",
  logoDarkmode:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEXMzMyWlpa3t7eqqqrFxcW+vr6xsbGjo6OcnJwtaz+fAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQYlWNgGHaAyURdAUaC+U4tDTASDEwFBNhUQSSEy+rW0sBSACIhfDYjdQU2VRBJLxfTEAAAv8sIm/VDSJMAAAAASUVORK5CYII=",
  appTheme: "theme-bg-dark",
  appColor: "theme-rose",
  subscriptionCustomerId: "",
  subscriptionPlanId: "",
  products: [{
    id: "",
    subscriptionProduct: defaultProductsDevelopment[1]
  }]
};
export const fakeTenantOrg2: TenantDto = {
  id: "",
  name: "Organization 2",
  domain: "org2.com",
  subdomain: "org2",
  icon: "",
  logo: "",
  logoDarkmode: "",
  appTheme: "theme-bg-dark",
  appColor: "theme-yellow",
  subscriptionCustomerId: "",
  subscriptionPlanId: "",
  products: [{
    id: "",
    subscriptionProduct: defaultProductsDevelopment[2]
  }],
};
export const fakeTenantUser: TenantUserDto = {
  id: "",
  email: fakeUserTenant.email,
  firstName: fakeUserTenant.firstName,
  lastName: fakeUserTenant.lastName,
  phone: fakeUserTenant.phone,
  tenantId: "",
  userId: fakeUserTenant.id,
  // user: fakeUserTenant,
  role: TenantUserRole.Owner,
  joined: TenantUserJoined.Creator,
  status: TenantUserStatus.Active,
  accepted: true,
};
export const fakeTenantUser2: TenantUserDto = {
  id: "",
  email: fakeUserAdmin.email,
  firstName: fakeUserAdmin.firstName,
  lastName: fakeUserAdmin.lastName,
  phone: fakeUserAdmin.phone,
  userId: fakeUserAdmin.id,
  // user: fakeUserAdmin,
  role: TenantUserRole.Admin,
  joined: TenantUserJoined.JoinedByInvitation,
  status: TenantUserStatus.PendingInvitation,
  accepted: true,
};
fakeTenantOrg1.currentUser = {
  id: "",
  // user: fakeUserAdmin,
  role: TenantUserRole.Owner,
  joined: TenantUserJoined.Creator,
  status: TenantUserStatus.Active,
  firstName: fakeUserAdmin.firstName
};
fakeTenantOrg2.currentUser = {
  id: "",
  // user: fakeUserTenant,
  role: TenantUserRole.Owner,
  joined: TenantUserJoined.Creator,
  status: TenantUserStatus.Active,
  firstName: fakeUserTenant.firstName
};

fakeUserAdmin.currentTenant = fakeTenantOrg1;

fakeUserTenant.currentTenant = fakeTenantOrg2;

export const loginFakeResponse: UserLoggedResponse = {
    token: "abc123",
    user: fakeUserTenant,
};
