import { SubscriptionPriceDto } from "./SubscriptionPriceDto";
import { MasterEntityDto } from "../MasterEntityDto";
import { SubscriptionFeatureDto } from "./SubscriptionFeatureDto";

export interface SubscriptionProductDto extends MasterEntityDto {
  serviceId: string;
  tier: number;
  title: string;
  description: string;
  badge: string;
  active: boolean;
  image: string;
  maxUsers: number;
  prices: SubscriptionPriceDto[];
  features: SubscriptionFeatureDto[];
}
