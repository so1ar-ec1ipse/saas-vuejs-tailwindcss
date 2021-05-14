import { ColumnType, ValueType } from "../../ColumnType";
import { IOrderableEntity } from '../../IOrderableEntity';
import { MasterEntityDto } from "../MasterEntityDto";
import { SubscriptionProductDto } from "./SubscriptionProductDto";

export interface SubscriptionFeatureDto extends MasterEntityDto, IOrderableEntity {
  order: number;
  subscriptionProductId?: string;
  subscriptionProduct?: SubscriptionProductDto;
  key: string;
  value: string;
  translateInFrontend: boolean;
  included: boolean;
  customUnitPrice?: number;
  customMinValue?: number;
  customMaxValue?: number;
}

export const columns: ColumnType[] = [
  {
    name: "order",
    valueType: ValueType.Number,
  },
  {
    name: "key",
    valueType: ValueType.String,
  },
  {
    name: "value",
    valueType: ValueType.String,
    optional: true,
  },
  {
    name: "translateInFrontend",
    valueType: ValueType.Bool,
  },
  {
    name: "included",
    valueType: ValueType.Bool,
  },
];
