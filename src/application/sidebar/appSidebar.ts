import VueI18n from "vue-i18n";
import { i18n } from "../../plugins/vue-i18n";
import { TenantUserRole } from "../enum/master/TenantUserRole";
import { UserType } from "../enum/master/UserType";

export interface SideBarItem {
  title: string | VueI18n.TranslateResult;
  path?: string;
  icon?: string;
  open?: boolean;
  userTypes?: UserType[];
  userRoles?: TenantUserRole[];
  items?: SideBarItem[];
}
export const appSidebar: SideBarItem[] = [
  {
    title: i18n.t("app.sidebar.manage"),
    items: [
      {
        title: i18n.t("shared.dashboard"),
        path: "/app/dashboard",
        icon: "chart-line",
      },
      {
        title: i18n.t("models.transaction.plural") + '',
        open: true,
        icon: "list",
        items: [
          {
            title: 'Expenses',
            path: "/app/transactions",
            // icon: "receipt",
            items: [],
          },
          {
            title: 'Dynamic crud',
            path: "/app/transactions2",
            // icon: "receipt",
            items: [],
          },
        ],
      },
      {
        title: i18n.t("app.sidebar.permissions"),
        path: "/app/permissions",
        icon: "shield-alt",
        items: [
          {
            title: "Starter 🔥",
            path: "/app/permissions/subscriptions/starter",
          },
          {
            title: "Pro 🦄",
            path: "/app/permissions/subscriptions/pro",
          },
          {
            title: "Unlimited 🚀",
            path: "/app/permissions/subscriptions/unlimited",
          },
          {
            title: "Owner",
            path: "/app/permissions/roles/owner",
          },
          {
            title: "Admin",
            path: "/app/permissions/roles/admin",
          },
          {
            title: "Member",
            path: "/app/permissions/roles/member",
          },
        ],
      },
      // {
      //   title: i18n.t("app.navbar.integrations"),
      //   icon: "external-link-alt",
      //   items: [
      //     {
      //       title: "SignalR (Chat)",
      //       path: "/app/integrations/signalr",
      //       icon: "comments",
      //     },
      //     // {
      //     //   title: "Store",
      //     //   path: "/app/integrations/store",
      //     //   icon: "database",
      //     // },
      //     {
      //       title: "Charts",
      //       path: "/app/integrations/charts",
      //       icon: "chart-bar",
      //     },
      //   ],
      // },
      {
        title: i18n.t("models.resource.plural"),
        path: "/app/resources",
        icon: "file-download",
      },
    ],
  },
  {
    title: i18n.t("app.navbar.settings"),
    items: [
      // {
      //   title: i18n.t("app.navbar.tenant"),
      //   path: "/app/settings/organization",
      //   children: [
      {
        title: i18n.t("app.navbar.tenant"),
        path: "/app/settings/organization/general",
      },
      {
        title: i18n.t("settings.tenant.subscription.title"),
        path: "/app/settings/organization/subscription",
      },
      {
        title: i18n.t("settings.tenant.members.title"),
        path: "/app/settings/organization/members",
      },
      {
        title: i18n.t("app.navbar.profile"),
        path: "/app/settings/profile",
      },
    ],
  },
  {
    title: i18n.t("admin.title"),
    items: [
      {
        title: i18n.t("admin.switchToAdmin"),
        path: "/admin",
        icon: "user-shield",
        userTypes: [UserType.Admin],
      },
    ],
  },
];
