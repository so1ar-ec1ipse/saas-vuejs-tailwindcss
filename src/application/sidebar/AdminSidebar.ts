import { SideBarItem } from "./SidebarItem";
import {i18n} from "@/plugins/vue-i18n";
import {UserType} from "@/application/enums/master/users/UserType";

export const AdminSidebar: SideBarItem[] = [
  {
    title: i18n.t("app.sidebar.manage"),
    items: [
      {
        title: i18n.t("models.ticket.plural"),
        pathName: "admin.tickets",
        icon: "receipt",
        items: []
      },
      {
        title: i18n.t("models.invoice.plural"),
        pathName: "admin.invoices",
        icon: "file-invoice-dollar",
        items: []
      },
      {
        title: i18n.t("admin.support"),
        pathName: "admin.support",
        icon: "toolbox",
        items: []
      },
      {
        title: i18n.t("admin.tenants"),
        pathName: "admin.tenants",
        icon: "users",
        items: []
      },
      {
        title: i18n.t("admin.users"),
        pathName: "admin.users",
        icon: "user",
        items: []
      },
      {
        title: i18n.t("admin.pricing.title"),
        pathName: "admin.pricing",
        icon: "tags",
        items: []
      },
      {
        title: i18n.t("admin.switchToApp"),
        pathName: "app",
        icon: "external-link-alt",
        userTypes: [UserType.ADMIN],
        items: []
      },
    ],
  },
];
