import { i18n } from "../../plugins/vue-i18n";
import { SideBarItem } from "./SidebarItem";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { UserType } from "@/application/enums/master/users/UserType";

export const AppSidebar: SideBarItem[] = [
  {
    title: i18n.t("app.sidebar.app"),
    items: [
      {
        title: i18n.t("shared.dashboard"),
        pathName: "app.dashboard",
        // icon: "chart-line",
        items: [],
      },
      {
        title: i18n.t("models.ticket.plural"),
        pathName: "app.tickets",
        // icon: "receipt",
        items: [],
      },
      {
        title: i18n.t("models.invoice.plural"),
        pathName: "app.invoices",
        // icon: "file-invoice-dollar",
        items: [],
      },
      {
        title: i18n.t("models.project.plural"),
        pathName: "app.projects",
        // icon: "clipboard-list",
        userRoles: [
          TenantUserRole.OWNER,
          TenantUserRole.ADMIN,
          TenantUserRole.MEMBER,
        ],
        items: [],
      },
      {
        title: i18n.t("app.reports.title"),
        pathName: "app.reports",
        // icon: "chart-pie",
        items: [],
      },
    ],
  },
  {
    title: i18n.t("app.navbar.settings"),
    items: [
      {
        title: i18n.t("models.workspace.plural"),
        pathName: "app.workspaces",
        icon: "",
        userRoles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
        items: [],
      },
      {
        title: i18n.t("app.navbar.tenant"),
        pathName: "settings.tenant.general",
        userRoles: [TenantUserRole.OWNER],
        items: [],
      },
      {
        title: i18n.t("settings.tenant.subscription.title"),
        pathName: "settings.tenant.subscription",
        userRoles: [TenantUserRole.OWNER],
        items: [],
      },
      {
        title: i18n.t("settings.tenant.members.title"),
        pathName: "settings.tenant.members",
        userRoles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
        items: [],
      },
      {
        title: i18n.t("app.navbar.profile"),
        pathName: "settings.profile",
        items: [],
      },
      {
        title: i18n.t("app.navbar.logout"),
        pathName: "logout",
        items: [],
      },
    ],
  },
  {
    title: i18n.t("admin.title"),
    items: [
      {
        title: i18n.t("admin.switchToAdmin"),
        pathName: "admin",
        // icon: "user-shield",
        userTypes: [UserType.ADMIN],
        items: [],
      },
    ],
  },
];
