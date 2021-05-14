import { Module } from "vuex";
import { TenantState, RootState } from "@/types/stateTypes";
import store from "@/store";
import { SubscriptionGetCurrentResponse } from "@/application/contracts/master/subscriptions/SubscriptionGetCurrentResponse";
import { SubscriptionCardDto } from "@/application/dtos/master/subscriptions/SubscriptionCardDto";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";

export const state: TenantState = {
  tenants: [],
  current: null,
  subscription: null,
  members: [],
  workspaces: [],
  currentWorkspace: null,
  features: null,
};
export const tenant: Module<TenantState, RootState> = {
  namespaced: true,
  state,
  getters: {
    defaultSubscriptionCard: (
      state: TenantState
    ): SubscriptionCardDto | undefined => {
      if (state.subscription && state.subscription.paymentMethods?.length > 0) {
        return state.subscription.paymentMethods[0].card;
      }
      return undefined;
    },
    activeProduct: (state: TenantState): TenantProductDto | null => {
      if (state.subscription && state.subscription.myProducts?.length > 0) {
        return state.subscription.myProducts[0];
      }
      return null;
    },
    activePrice: (state: TenantState): SubscriptionPriceDto | null => {
      if (state.subscription && state.subscription.myProducts?.length > 0) {
        return state.subscription.myProducts[0].subscriptionPrice;
      }
      return null;
    },
    // subscription: (state: TenantState): TenantProductDto | null => {
    //   return state.subscription;
    // },
    roleName: (state: TenantState) => {
      return state.current?.currentUser
        ? TenantUserRole[state.current.currentUser.role]
        : "--";
    },
    role: (state: TenantState) => {
      return state.current?.currentUser ? state.current.currentUser.role : "--";
    },
    currentRole: (state: TenantState) => {
      return state.current?.currentUser?.role;
    },
    currentWorkspace: (state: TenantState) => {
      return state.currentWorkspace;
    },
    isOwnerOrAdmin: (state: TenantState): boolean => {
      if (!state.current?.currentUser) {
        return false;
      }
      return (
        state.current.currentUser?.role === TenantUserRole.OWNER ||
        state.current.currentUser?.role === TenantUserRole.ADMIN
      );
    },
    memberCount: (state: TenantState) => {
      return state.members.length;
    },
    features: (state: TenantState) => {
      return state.features;
    },
    workspaces: (state: TenantState) => {
      if (!state.workspaces || state.workspaces.length === 0) {
        return [];
      }
      const arr: WorkspaceDto[] = JSON.parse(JSON.stringify(state.workspaces));
      if (!arr || arr.length === 0) {
        return [];
      }
      const defaultWorkspace = arr.find(f => f.default);
      if (defaultWorkspace && !state.currentWorkspace) {
        state.currentWorkspace = defaultWorkspace;
      }
      return arr.sort((x, y) => {
        if (x.default && y.default) {
          return (x.default ? 1 : -1) ?? 1;
        }
        return 1;
      });
    },
    workspacesCount: (state: TenantState) => {
      return state.workspaces?.length ?? 0;
    }
  },
  mutations: {
    reset(state: TenantState) {
      state.tenants = [];
      state.current = null;
      state.subscription = null;
      state.members = [];
      state.workspaces = [];
      state.currentWorkspace = null;
      state.features = null;
    },
    myTenants: (state: TenantState, payload: TenantDto[]) => {
      state.tenants = payload;
    },
    current: (state: TenantState, payload: TenantDto) => {
      state.current = payload;
      if (payload) {
        store.commit("theme/appTheme", payload.appTheme);
        store.commit("theme/appColor", payload.appColor);
      }
    },
    currentWorkspace: (state: TenantState, payload: WorkspaceDto) => {
      state.currentWorkspace = payload;
    },
    currentImage: (state: TenantState, payload: any) => {
      if (state.current) {
        if (payload.imageType === "icon") {
          state.current.icon = payload.image;
        } else if (payload.imageType === "logo") {
          state.current.logo = payload.image;
        } else if (payload.imageType === "logoDarkmode") {
          state.current.logoDarkmode = payload.image;
        }
      }
    },
    features: (state: TenantState, payload: TenantFeaturesResponse) => {
      state.features = payload;
    },
    subscription: (
      state: TenantState,
      payload: SubscriptionGetCurrentResponse
    ) => {
      state.subscription = payload;

      if (state.tenants && payload.customer) {
        state.tenants.forEach((tenant) => {
          if (tenant.subscriptionCustomerId === payload.customer.id) {
            tenant.products = payload.myProducts;
          }
        });
      }

      store.dispatch("pricing/myProducts", payload.myProducts);
    },
    appTheme(state: TenantState, payload: string) {
      if (state.current) {
        state.current.appTheme = payload;
      }
    },
    appColor(state: TenantState, payload: string) {
      if (state.current) {
        state.current.appColor = payload;
      }
    },
    members(state: TenantState, payload: TenantUserDto[]) {
      state.members = payload;
    },
    workspaces(state: TenantState, payload: WorkspaceDto[]) {
      state.currentWorkspace = null;
      state.workspaces = payload;
      if (payload?.length > 0) {
        const defaultWorkspace = payload.find(f => f.default);
        if (defaultWorkspace) {
          state.currentWorkspace = defaultWorkspace;
        } else {
          state.currentWorkspace = payload[0];
        }
      }
    },
    settings(state: TenantState, payload: TenantDto) {
      if (state.current) {
        state.current.name = payload.name;
        state.current.subdomain = payload.subdomain;
        state.current.appTheme = payload.appTheme;
        state.current.appColor = payload.appColor;
      }
    },
  },
};
