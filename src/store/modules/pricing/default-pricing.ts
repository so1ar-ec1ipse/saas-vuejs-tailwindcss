import { SubscriptionPriceType } from "@/application/enum/master/SubscriptionPriceType";
import { SubscriptionBillingPeriod } from "@/application/enum/master/SubscriptionBillingPeriod";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { defaultProductsDevelopment } from "./default-pricing.Development";

export const defaultProducts: SubscriptionProductDto[] = defaultProductsDevelopment;
// Optional: Configure existing products by setting up the Service Id property
// on SubscriptionProducts and SubscriptionPrices
