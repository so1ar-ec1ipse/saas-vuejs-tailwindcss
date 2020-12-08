import { TenantUserRole } from "@/application/enum/master/TenantUserRole";
import { i18n } from "@/plugins/vue-i18n";

export const appSettingsRoutes = {
  path: "settings",
  component: require("@/views/app/settings/Index.vue").default,
  redirect: "settings/profile",
  children: [
    {
      path: "profile",
      component: require("@/views/app/settings/Profile.vue").default,
      meta: {
        title: i18n.t("settings.profile.profileTitle"),
      },
    },
    {
      path: "organization",
      component: require("@/views/app/settings/tenant/TenantCurrent.vue")
        .default,
      meta: {
        title: i18n.t("settings.tenant.title"),
      },
      redirect: "organization/general",
      children: [
        {
          path: "general",
          name: "tenant.general",
          component: require("@/components/app/settings/tenant/TenantSettings.vue")
            .default,
          meta: {
            title: i18n.t("settings.tenant.general"),
            roles: [TenantUserRole.Owner],
          },
        },
        {
          path: "subscription",
          name: "tenant.subscription",
          component: require("@/components/app/settings/tenant/subscription/TenantSubscription.vue")
            .default,
          meta: {
            title: i18n.t("settings.tenant.subscription.title"),
            roles: [TenantUserRole.Owner, TenantUserRole.Admin],
          },
        },
        {
          path: "members",
          name: "tenant.members",
          component: require("@/components/app/settings/tenant/TenantMembers.vue")
            .default,
          meta: {
            title: i18n.t("settings.tenant.members.title"),
            roles: [
              TenantUserRole.Owner,
              TenantUserRole.Admin,
              TenantUserRole.Member,
            ],
          },
          children: [
            {
              path: "new",
              component: require("@/components/app/settings/members/MembersForm.vue")
                .default,
              meta: {
                roles: [TenantUserRole.Owner, TenantUserRole.Admin],
              },
            },
            {
              path: "edit/:id",
              component: require("@/components/app/settings/members/MembersForm.vue")
                .default,
              meta: {
                roles: [TenantUserRole.Owner, TenantUserRole.Admin],
              },
            },
          ],
        },
      ],
    },
  ],
};
