import { SubscriptionCardDto } from "@/application/dtos/master/subscriptions/SubscriptionCardDto";
import { SubscriptionCustomerDto } from "@/application/dtos/master/subscriptions/SubscriptionCustomerDto";
import { SubscriptionInvoiceDto } from "@/application/dtos/master/subscriptions/SubscriptionInvoiceDto";
import { SubscriptionPaymentMethodDto } from "@/application/dtos/master/subscriptions/SubscriptionPaymentMethodDto";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";

export interface SubscriptionGetCurrentResponse {
  activeProduct: TenantProductDto[];
  myProducts: TenantProductDto[];
  customer?: SubscriptionCustomerDto;
  invoices?: SubscriptionInvoiceDto[];
  cards?: SubscriptionCardDto[];
  paymentMethods?: SubscriptionPaymentMethodDto[];
}
