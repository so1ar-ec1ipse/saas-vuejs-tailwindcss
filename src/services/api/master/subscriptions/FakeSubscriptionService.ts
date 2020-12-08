import { SubscriptionGetCurrentResponse } from "../../../../application/contracts/master/subscriptions/SubscriptionGetCurrentResponse";
import { TenantProductDto } from "../../../../application/dtos/master/tenants/TenantProductDto";
import { defaultProductsDevelopment } from "../../../../store/modules/pricing/default-pricing.Development";

const tenantProducts: TenantProductDto[] = [
  {
    id: "",
    subscriptionProduct: defaultProductsDevelopment[1],
    active: true,
  }
];
export const fakeResponse: SubscriptionGetCurrentResponse = {
  activeProduct: tenantProducts,
  myProducts: tenantProducts,
};
