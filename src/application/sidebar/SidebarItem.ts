import VueI18n from "vue-i18n";
import { TenantUserRole } from '../enum/master/TenantUserRole';
import { UserType } from '../enum/master/UserType';

export interface SideBarItem {
  title: string | VueI18n.TranslateResult;
  path?: string;
  icon?: string;
  open?: boolean;
  userTypes?: UserType[];
  userRoles?: TenantUserRole[];
  items?: SideBarItem[];
}
