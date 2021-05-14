import VueI18n from "vue-i18n";
import { TenantUserRole } from "../enums/master/tenants/TenantUserRole";
import { UserType } from "../enums/master/users/UserType";

export interface SideBarItem {
  title: string | VueI18n.TranslateResult;
  pathName?: string;
  icon?: string;
  open?: boolean;
  userTypes?: UserType[];
  userRoles?: TenantUserRole[];
  items: SideBarItem[];
}
