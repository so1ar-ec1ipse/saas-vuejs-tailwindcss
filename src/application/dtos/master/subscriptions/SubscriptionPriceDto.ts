import { SubscriptionProductDto } from "./SubscriptionProductDto";
import { MasterEntityDto } from "../MasterEntityDto";
import { ColumnType, ValueType } from "../../ColumnType";
import { SubscriptionPlanDto } from "./SubscriptionPlanDto";
import { SubscriptionPriceType } from "@/application/enum/master/SubscriptionPriceType";
import { SubscriptionBillingPeriod } from "@/application/enum/master/SubscriptionBillingPeriod";

export interface SubscriptionPriceDto extends MasterEntityDto {
  serviceId: string;
  type: SubscriptionPriceType;
  billingPeriod: SubscriptionBillingPeriod;
  price: number;
  currency: string;
  trialDays: number;
  active: boolean;
  priceBefore?: number;
  subscriptionProductId?: string;
  subscriptionProduct?: SubscriptionProductDto;
  subscriptionPlan?: SubscriptionPlanDto;
}

export const columns: ColumnType[] = [
  {
    name: "serviceId",
    cannotEdit: true,
    optional: true,
    placeholder: "serviceIdLeaveEmpty"
  },
  {
    name: "type",
    valueType: ValueType.SubscriptionPriceType,
    cannotEdit: true,
  },
  {
    name: "billingPeriod",
    valueType: ValueType.SubscriptionBillingPeriod,
    cannotEdit: true,
  },
  { name: "price", valueType: ValueType.Money, cannotEdit: true },
  { name: "currency", cannotEdit: true, values: ["usd", "mxn", "eur"] },
  {
    name: "trialDays",
    cannotEdit: true,
    optional: true,
  },
  {
    name: "active",
    valueType: ValueType.Bool,
  },
  { name: "priceBefore", valueType: ValueType.Money, optional: true },
];
