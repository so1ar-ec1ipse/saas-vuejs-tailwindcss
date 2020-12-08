import { Module } from "vuex";
import { TenantState, RootState } from "@/types/stateTypes";
import store from "@/store";
import { SubscriptionGetCurrentResponse } from "@/application/contracts/master/subscriptions/SubscriptionGetCurrentResponse";
import { SubscriptionCardDto } from "@/application/dtos/master/subscriptions/SubscriptionCardDto";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { TenantUserRole } from "@/application/enum/master/TenantUserRole";

export const state: TenantState = {
  tenants: [],
  current: null,
  subscription: null,
  members: [],
};
export const tenant: Module<TenantState, RootState> = {
  namespaced: true,
  state,
  getters: {
    defaultSubscriptionCard: (
      state: TenantState
    ): SubscriptionCardDto | undefined => {
      if (state.subscription && state.subscription.paymentMethods && state.subscription.paymentMethods?.length > 0) {
        return state.subscription?.paymentMethods[0].card;
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
        return state.subscription.myProducts[0].subscriptionPrice || null;
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
    isOwnerOrAdmin: (state: TenantState): boolean => {
      if (!state.current?.currentUser) {
        return false;
      }
      return (
        state.current.currentUser?.role === TenantUserRole.Owner ||
        state.current.currentUser?.role === TenantUserRole.Admin
      );
    },
    memberCount: (state: TenantState) => {
      return state.members.length;
    },
  },
  mutations: {
    reset(state: TenantState) {
      state.tenants = [];
      state.current = null;
      state.subscription = null;
      state.members = [];
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
    subscription: (
      state: TenantState,
      payload: SubscriptionGetCurrentResponse
    ) => {
      state.subscription = payload;
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
