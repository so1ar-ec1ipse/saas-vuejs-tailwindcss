// import {
//   IUserDTO,
//   UserType,
//   LoginType,
// } from "@/app/models/system/account/IUserDTO";
// import {
//   ITenantDTO,
//   ITenantUserDTO,
//   TenantUserRole,
//   TenantUserStatus,
//   TenantUserJoined,
// } from "@/app/models/system/account/ITenantDTO";
// import { defaultProductsDevelopment } from "@/store/modules/pricing/default-pricing.Development";
// import { StripePrice } from "@/app/models/subscription/StripePrice";

// export const fakeUserAdmin: IUserDTO = {
//   id: 1,
//   username: "admin@fake.com",
//   email: "admin@fake.com",
//   type: UserType.Admin,
//   company: "fakeCompany",
//   firstName: "Fake name",
//   lastName: "Fake lastname",
//   phone: "",
//   dateJoined: new Date(),
//   dateJoinedDesc: "",
//   loginType: LoginType.Password,
//   stripeCustomerId: "",
//   passwordCurrent: "",
//   passwordNew: "",
//   passwordConfirm: "",
//   avatar:
// };
// export const fakeUserTenant: IUserDTO = {
//   id: 1,
//   username: "tenant@fake.com",
//   email: "tenant@fake.com",
//   type: UserType.Tenant,
//   company: "fakeCompany",
//   firstName: "Fake name",
//   lastName: "Fake lastname",
//   phone: "",
//   dateJoined: new Date(),
//   dateJoinedDesc: "",
//   loginType: LoginType.Password,
//   stripeCustomerId: "",
//   passwordCurrent: "",
//   passwordNew: "",
//   passwordConfirm: "",
//   avatar:
// };
// export const fakeStripePriceStandard: StripePrice =
//   defaultProductsDevelopment[0].prices[0];
// export const fakeStripePriceEnterprise: StripePrice =
//   defaultProductsDevelopment[1].prices[0];
// fakeStripePriceStandard.product = defaultProductsDevelopment[1];
// fakeStripePriceEnterprise.product = defaultProductsDevelopment[2];
// export const fakeTenantOrg1: ITenantDTO = {
//   apiKey: "apiKey1",
//   name: "Organization 1",
//   domain: "org1.com",
//   subdomain: "org1",
//   icon:
//   logo:
//   appTheme: "theme-bg-dark",
//   appColor: "theme-blue",
//   stripeCustomerId: "",
//   stripeSubscriptionId: "",
//   products: [fakeStripePriceStandard],
//   memberCount: 1,
// };
// export const fakeTenantOrg2: ITenantDTO = {
//   apiKey: "apiKey2",
//   name: "Organization 2",
//   domain: "org2.com",
//   subdomain: "org2",
//   icon: "",
//   logo: "",
//   logoDarkmode: "",
//   appTheme: "theme-bg-dark",
//   appColor: "theme-red",
//   stripeCustomerId: "",
//   stripeSubscriptionId: "",
//   products: [fakeStripePriceEnterprise],
//   memberCount: 1,
// };
// export const fakeTenantUser: ITenantUserDTO = {
//   email: fakeUserTenant.email,
//   firstName: fakeUserTenant.firstName,
//   lastName: fakeUserTenant.lastName,
//   phone: fakeUserTenant.phone,
//   tenantId: 1,
//   tenant: fakeTenantOrg1,
//   userId: fakeUserTenant.id,
//   user: fakeUserTenant,
//   role: TenantUserRole.Owner,
//   joined: TenantUserJoined.Creator,
//   status: TenantUserStatus.Active,
//   accepted: true,
// };
// export const fakeTenantUser2: ITenantUserDTO = {
//   email: fakeUserAdmin.email,
//   firstName: fakeUserAdmin.firstName,
//   lastName: fakeUserAdmin.lastName,
//   phone: fakeUserAdmin.phone,
//   tenantId: 1,
//   tenant: fakeTenantOrg1,
//   userId: fakeUserAdmin.id,
//   user: fakeUserAdmin,
//   role: TenantUserRole.Admin,
//   joined: TenantUserJoined.JoinedByInvitation,
//   status: TenantUserStatus.PendingInvitation,
//   accepted: true,
// };
// fakeTenantOrg1.currentUser = {
//   tenantId: 1,
//   // tenant: fakeTenantOrg1,
//   userId: 1,
//   user: fakeUserTenant,
//   role: TenantUserRole.Owner,
//   active: true,
// };
// fakeTenantOrg2.currentUser = {
//   tenantId: 1,
//   // tenant: fakeTenantOrg1,
//   userId: 1,
//   user: fakeUserTenant,
//   role: TenantUserRole.Owner,
//   active: true,
// };
// export const loginFakeResponse = {
//   data: {
//     token: "abc123",
//     user: fakeUserTenant,
//     myTenants: [fakeTenantOrg1, fakeTenantOrg2],
//     currentTenant: fakeTenantOrg1,
//   },
// };
