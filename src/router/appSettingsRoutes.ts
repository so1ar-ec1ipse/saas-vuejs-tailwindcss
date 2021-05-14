import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { i18n } from "@/plugins/vue-i18n";

export const appSettingsRoutes = {
  name: "settings",
  path: "settings",
  alias: "ajustes",
  component: require("@/views/app/settings/Index.vue").default,
  redirect: "settings/profile",
  children: [
    {
      name: "settings.profile",
      path: "profile",
      alias: "perfil",
      component: require("@/views/app/settings/Profile.vue").default,
      meta: {
        title: i18n.t("settings.profile.profileTitle"),
      },
    },
    {
      name: "settings.tenant",
      path: "organization",
      alias: "organizacion",
      component: require("@/views/app/settings/tenant/TenantCurrent.vue")
        .default,
      meta: {
        title: i18n.t("settings.tenant.title"),
      },
      redirect: "organization/general",
      children: [
        {
          path: "general",
          name: "settings.tenant.general",
          component: require("@/components/app/settings/tenant/TenantSettings.vue")
            .default,
          meta: {
            title: i18n.t("settings.tenant.general"),
            roles: [TenantUserRole.OWNER],
          },
        },
        {
          name: "settings.tenant.subscription",
          path: "subscription",
          alias: "subscripcion",
          component: require("@/components/app/settings/tenant/subscription/TenantSubscription.vue")
            .default,
          meta: {
            title: i18n.t("settings.tenant.subscription.title"),
            roles: [TenantUserRole.OWNER],
          },
        },
        {
          name: "settings.tenant.members",
          path: "members",
          alias: "miembros",
          component: require("@/components/app/settings/tenant/TenantMembers.vue")
            .default,
          meta: {
            title: i18n.t("settings.tenant.members.title"),
            roles: [
              TenantUserRole.OWNER,
              TenantUserRole.ADMIN,
            ],
          },
          children: [
            {
              name: "settings.tenant.members.new",
              path: "new",
              alias: "nuevo",
              component: require("@/components/app/settings/members/MembersForm.vue")
                .default,
              meta: {
                roles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
              },
            },
            {
              name: "settings.tenant.members.edit",
              path: "edit/:id",
              alias: "editar/:id",
              component: require("@/components/app/settings/members/MembersForm.vue")
                .default,
              meta: {
                roles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
              },
            },
          ],
        },
      ],
    },
  ],
};
