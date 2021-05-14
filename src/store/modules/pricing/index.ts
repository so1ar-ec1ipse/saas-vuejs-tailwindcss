import { Module } from "vuex";
import { PricingState, RootState } from "@/types/stateTypes";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";
import { SubscriptionPriceType } from "@/application/enums/master/subscriptions/SubscriptionPriceType";

export const state: PricingState = {
  products: [],
  selectedProduct: null,
  billingPeriod: SubscriptionBillingPeriod.MONTHLY,
  currency: "mxn",
  mode: 1
};
export const pricing: Module<PricingState, RootState> = {
  namespaced: true,
  state,
  actions: {
    myProducts({ commit }, prices: SubscriptionPriceDto[]) {
      if (prices && prices.length > 0) {
        const productPrice = prices[0];
        if (productPrice.billingPeriod === SubscriptionBillingPeriod.ONCE) {
          commit("billingPeriod", productPrice.billingPeriod);
        } else {
          commit("billingPeriod", SubscriptionBillingPeriod.MONTHLY);
        }
        const selected = this.state.pricing.products.find(
          (f: SubscriptionProductDto) =>
            f.prices.find((x) => x.serviceId === productPrice.serviceId)
        ) as SubscriptionProductDto;
        // console.log("selected: " + JSON.stringify(selected));
        commit("select", {
          product: selected,
          billingPeriod: state.billingPeriod,
        });
      }
    },
  },
  getters: {
    selectedProductTitle: (state: PricingState) => {
      return state.selectedProduct?.title;
    },
    selectedProduct: (state: PricingState) => {
      return state.selectedProduct;
    },
    selectedPrice: (state: PricingState) => {
      const prices = state.selectedProduct?.prices;
      if (prices && prices.length > 0) {
        return (
          prices.find(
            (e) =>
              e.billingPeriod === state.billingPeriod &&
              e.currency === state.currency &&
              e.mode === state.mode
          ) ??
          prices.filter(
            (f) => f.currency === state.currency && f.mode === state.mode
          )[0]
        );
      }
    },
    selectedBillingPeriod: (state: PricingState, getters) => {
      if (
        getters.selectedPrice &&
        getters.selectedPrice.billingPeriod === SubscriptionBillingPeriod.ONCE
      ) {
        return "once";
      } else {
        return SubscriptionBillingPeriod[state.billingPeriod] + "Short";
      }
    },
    productCount: (state: PricingState) => {
      return state.products.length;
    },
  },
  mutations: {
    reset: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.billingPeriod = SubscriptionBillingPeriod.MONTHLY;
      state.currency = "mxn";
      state.mode = 1;
    },
    products: (state: PricingState, payload: SubscriptionProductDto[]) => {
      if (payload) {
        payload = payload.sort((x, y) => {
          return x.tier > y.tier ? 1 : -1;
        });
      }
      state.products = payload;
      if (payload.length > 0) {
        payload.forEach((product) => {
          product.prices.forEach((price) => {
            if (price.type === SubscriptionPriceType.RECURRING) {
              if (!state.currency) {
                state.currency = price.currency;
              }
            }
          });
        });
      }
    },
    select: (state: PricingState, payload) => {
      state.billingPeriod = payload.billingPeriod;
      state.selectedProduct = payload.product;
    },
    billingPeriod: (
      state: PricingState,
      payload: SubscriptionBillingPeriod
    ) => {
      state.billingPeriod = payload;
    },
    currency: (state: PricingState, payload: string) => {
      state.currency = payload;
    },
    mode: (state: PricingState, payload: number) => {
      state.mode = payload;
    },
  },
};
