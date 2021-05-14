// import { defaultProducts } from "@/store/modules/pricing/default-pricing";
// import { i18n } from "@/plugins/vue-i18n";
// import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";

// const products = defaultProducts;

// export const appPermissionsRoutes = {
//   name: "permissions",
//   path: "permissions",
//   component: require("@/views/app/permissions/Index.vue").default,
//   meta: {
//     title: i18n.t("shared.permissions"),
//   },
//   children: [
//     {
//       name: "permissions.subscriptions",
//       path: "subscriptions",
//       children: [
//         {
//           name: "permissions.subscriptions.starter",
//           path: "starter",
//           component: require("@/views/app/permissions/subscriptions/TierStandard.vue")
//             .default,
//           meta: {
//             title: i18n.t("shared.permissions"),
//             subscriptions: [products[1], products[2]],
//           },
//         },
//         {
//           name: "permissions.subscriptions.pro",
//           path: "pro",
//           component: require("@/views/app/permissions/subscriptions/TierEnterprise.vue")
//             .default,
//           meta: {
//             title: "Pro",
//             subscriptions: [products[1], products[2]],
//           },
//         },
//         {
//           name: "permissions.subscriptions.unlimited",
//           path: "unlimited",
//           component: require("@/views/app/permissions/subscriptions/TierUnlimited.vue")
//             .default,
//           meta: {
//             title: "Unlimited",
//             subscriptions: [products[2]],
//           },
//         },
//       ],
//     },
//     {
//       name: "permissions.roles",
//       path: "roles",
//       children: [
//         {
//           name: "permissions.roles.owner",
//           path: "owner",
//           component: require("@/views/app/permissions/roles/RoleOwner.vue")
//             .default,
//           meta: {
//             title: i18n.t("settings.profile.roles.Owner"),
//             roles: [TenantUserRole.OWNER],
//           },
//         },
//         {
//           name: "permissions.roles.admin",
//           path: "admin",
//           component: require("@/views/app/permissions/roles/RoleAdmin.vue")
//             .default,
//           meta: {
//             title: i18n.t("settings.profile.roles.Admin"),
//             roles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
//           },
//         },
//         {
//           name: "permissions.roles.member",
//           path: "member",
//           component: require("@/views/app/permissions/roles/RoleMember.vue")
//             .default,
//           meta: {
//             title: i18n.t("settings.profile.roles.Member"),
//             roles: [
//               TenantUserRole.OWNER,
//               TenantUserRole.ADMIN,
//               TenantUserRole.MEMBER,
//             ],
//           },
//         },
//       ],
//     },
//   ],
// };
