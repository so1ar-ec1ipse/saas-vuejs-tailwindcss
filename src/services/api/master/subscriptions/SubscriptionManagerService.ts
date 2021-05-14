import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import store from "@/store";
import { SubscriptionGetCurrentResponse } from "@/application/contracts/master/subscriptions/SubscriptionGetCurrentResponse";
import { SubscriptionInvoiceDto } from "@/application/dtos/master/subscriptions/SubscriptionInvoiceDto";
import { SubscriptionCouponDto } from "@/application/dtos/master/subscriptions/SubscriptionCouponDto";
import { SelectedSubscriptionRequest } from "@/application/contracts/master/subscriptions/SelectedSubscriptionRequest";
import { SubscriptionCreateCardTokenRequest } from "@/application/contracts/master/subscriptions/SubscriptionCreateCardTokenRequest";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";

const debug = process.env.NODE_ENV !== "production";

export class SubscriptionManagerService extends ApiService {
  constructor() {
    super("SubscriptionManager", ApiServiceType.MasterDatabase);
  }
  getCurrentSubscription(): Promise<SubscriptionGetCurrentResponse> {
    return new Promise((resolve, reject) => {
      super
        .get("GetCurrentSubscription")
        .then((subscription) => {
          store.commit("tenant/subscription", subscription);
          resolve(subscription);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getUpcomingInvoice(): Promise<SubscriptionInvoiceDto> {
    return super.get("GetUpcomingInvoice");
  }
  getCoupon(
    couponId: string,
    currency: string
  ): Promise<SubscriptionCouponDto> {
    return super.get(`GetCoupon/${couponId}/${currency}`);
  }
  updateSubscription(
    subscription: SelectedSubscriptionRequest
  ): Promise<SubscriptionGetCurrentResponse> {
    return new Promise((resolve, reject) => {
      return super
        .post(subscription, `UpdateSubscription`)
        .then((response) => {
          store.commit("tenant/subscription", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  cancelSubscription(): Promise<SubscriptionGetCurrentResponse> {
    return new Promise((resolve, reject) => {
      super
        .post(null, "CancelSubscription")
        .then((response) => {
          store.commit("tenant/subscription", response);
          store.commit("pricing/select", {
            product: null,
            billingPeriod: SubscriptionBillingPeriod.MONTHLY,
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateCardToken(cardToken: string): Promise<SubscriptionGetCurrentResponse> {
    return super.post(cardToken, `UpdateCardToken/${cardToken}`);
  }
  createCardToken(
    cardTokenRequest: SubscriptionCreateCardTokenRequest
  ): Promise<SubscriptionGetCurrentResponse> {
    return super.post(cardTokenRequest, `CreateCardToken`);
  }
  updateCard(
    cardTokenRequest: SubscriptionCreateCardTokenRequest
  ): Promise<SubscriptionGetCurrentResponse> {
    return super.post(cardTokenRequest, `UpdateCard`);
  }
  createCustomerPortalSession(): Promise<SubscriptionGetCurrentResponse> {
    return super.post(null, `CreateCustomerPortalSession`);
  }
}
