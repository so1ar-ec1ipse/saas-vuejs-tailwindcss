import { SubscriptionGetCurrentResponse } from "@/application/contracts/master/subscriptions/SubscriptionGetCurrentResponse";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";

export interface RootState {
  appName: string;
  version: string;
  locale: LocaleState;
  auth: AuthState;
  tenant: TenantState;
  account: AccountState;
  // navigation: NavigationState;
  pricing: PricingState;
  tickets: TicketsState;
}

export interface LocaleState {
  locale: string;
}

export interface AuthState {
  authenticated: boolean;
  token: string;
}
export interface TenantState {
  tenants: TenantDto[];
  current: TenantDto | null;
  subscription: SubscriptionGetCurrentResponse | null;
  members: TenantUserDto[];
  workspaces: WorkspaceDto[];
  currentWorkspace: WorkspaceDto | null;
  features: TenantFeaturesResponse | null;
}
export interface AccountState {
  user: UserDto | null;
}
export interface PricingState {
  products: SubscriptionProductDto[];
  selectedProduct: SubscriptionProductDto | null;
  billingPeriod: SubscriptionBillingPeriod;
  currency: string;
  mode: number;
}
export interface ThemeState {
  marketingTheme: string;
  marketingColor: string;
  appTheme: string;
  appColor: string;
}

export interface TicketsState {
  email: string;
  workspaces: WorkspaceDto[];
  tickets: TicketDto[];
}
