import store from "../../store";
import { Extension } from "../enums/app/common/Extension";
import { SubscriptionBillingPeriod } from "../enums/master/subscriptions/SubscriptionBillingPeriod";
import { SubscriptionPriceType } from "../enums/master/subscriptions/SubscriptionPriceType";
import { TenantUserRole } from "../enums/master/tenants/TenantUserRole";
import { UserLoginType } from "../enums/master/users/UserLoginType";
import { UserType } from "../enums/master/users/UserType";

export enum ValueType {
  String,
  Bool,
  Money,
  SubscriptionPriceType,
  SubscriptionBillingPeriod,
  Number,
  Image,
  ResourceFileType,
  File,
  SubscriptionProducts,
  TenantUserRoles,
  TextArea,
  Date,
  UserType,
  UserLoginType,
  Count
}

export class ColumnType {

  public static convertValue(item: any, column: ColumnType): string {
    const value = item[column.name];
    if (value === null || value === undefined) {
      return "";
    }
    if (column.valueType) {
      switch (column.valueType as ValueType) {
        case ValueType.Count:
          console.log("column: " + column.name);
          console.log("valueType: " + column.valueType);
          console.log("value: " + value);
          if (!value) {
            return "0";
          } else {
            console.log("length: " + value.length);
            return value.length;
          }
        case ValueType.String:
        case ValueType.TextArea:
        case ValueType.Date:
          return value;
        case ValueType.Money:
          return (
            "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || ""
          );
          case ValueType.SubscriptionBillingPeriod:
            return SubscriptionBillingPeriod[value].toString();
            case ValueType.UserType:
              return UserType[value].toString();
              case ValueType.UserLoginType:
                return UserLoginType[value].toString();
        case ValueType.SubscriptionPriceType:
          return SubscriptionPriceType[value];
        case ValueType.ResourceFileType:
          return Extension[value];
        case ValueType.TenantUserRoles:
          return TenantUserRole[value];
        case ValueType.SubscriptionProducts:
          const products = store.state.pricing.products;
          return products?.find((f) => f.tier === value)?.title ?? "";
        case ValueType.Bool:
          if (value) {
            return "yes";
          } else {
            return "no";
          }
        //     ? i18n.t("shared.active").toString()
        //     : i18n.t("shared.inactive").toString();
      }
    }
    return value;
  }
  public static getFormType(column: ColumnType) {
    if (column.values && column.values.length > 0) {
      return "select";
    }
    if (!column.valueType) {
      return "input";
    } else {
      switch (column.valueType as ValueType) {
        case ValueType.Date:
          return "dateInput";
        case ValueType.String:
        case ValueType.Money:
        case ValueType.Number:
          return "input";
        case ValueType.TextArea:
          return "textArea";
        case ValueType.Bool:
          return "checkbox";
        case ValueType.SubscriptionPriceType:
          case ValueType.SubscriptionBillingPeriod:
            case ValueType.UserLoginType:
              case ValueType.UserType:
              case ValueType.ResourceFileType:
          return "select";
        case ValueType.SubscriptionProducts:
        case ValueType.TenantUserRoles:
          return "checklist";
        case ValueType.Image:
          // case ValueType.File:
          return "image";
        case ValueType.File:
          return "upload";
        default:
          break;
      }
    }
  }
  public static getFormInputType(column: ColumnType) {
    if (this.getFormType(column) === "input") {
      switch (column.valueType as ValueType) {
        // case ValueType.Date:
        //   return "";
        case ValueType.Money:
        case ValueType.Number:
          return "number";
        case ValueType.File:
          return "file";
      }
      return "text";
    }
  }
  public static getValues(column: ColumnType) {
    if (column.values && column.values.length > 0) {
      return column.values;
    }
    let keys: any = [];
    let enumValues: any = [];
    const values: any = [];
    switch (column.valueType as ValueType) {
      case ValueType.SubscriptionBillingPeriod:
        keys = Object.keys(SubscriptionBillingPeriod).filter(
          (k) => typeof SubscriptionBillingPeriod[k as any] === "number"
        );
        enumValues = keys.map((k) => SubscriptionBillingPeriod[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: SubscriptionBillingPeriod[key], id: key });
        });
        return values;
      case ValueType.SubscriptionPriceType:
        keys = Object.keys(SubscriptionPriceType).filter(
          (k) => typeof SubscriptionPriceType[k as any] === "number"
        );
        enumValues = keys.map((k) => SubscriptionPriceType[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: SubscriptionPriceType[key], id: key });
        });
        return values;
      case ValueType.ResourceFileType:
        keys = Object.keys(Extension).filter(
          (k) => typeof Extension[k as any] === "number"
        );
        enumValues = keys.map((k) => Extension[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: Extension[key], id: key });
        });
        return values;
      case ValueType.TenantUserRoles:
        keys = Object.keys(TenantUserRole).filter(
          (k) => typeof TenantUserRole[k as any] === "number"
        );
        enumValues = keys.map((k) => TenantUserRole[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: TenantUserRole[key], value: key });
        });
        return values;
      case ValueType.SubscriptionProducts:
        const products = store.state.pricing.products;
        products.forEach((product) => {
          values.push({ name: product.title, value: product.tier });
        });
        return values;
        case ValueType.UserType:
          keys = Object.keys(UserType).filter(
            (k) => typeof UserType[k as any] === "number"
          );
          enumValues = keys.map((k) => UserType[k as any]); // [0, 1]
          enumValues.forEach((key) => {
            values.push({ name: UserType[key], id: key });
          });
          return values;
          case ValueType.UserLoginType:
            keys = Object.keys(UserLoginType).filter(
              (k) => typeof UserLoginType[k as any] === "number"
            );
            enumValues = keys.map((k) => UserLoginType[k as any]); // [0, 1]
            enumValues.forEach((key) => {
              values.push({ name: UserLoginType[key], id: key });
            });
            return values;
        default:
        break;
    }
  }
  public name!: string;
  public valueType?: ValueType = ValueType.String;
  public optional?: boolean;
  public cannotEdit?: boolean;
  public values?: any[];
  public default?: any;
  public placeholder?: any;
}
