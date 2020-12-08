import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import store from "@/store";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { defaultProductsDevelopment } from "@/store/modules/pricing/default-pricing.Development";
import { defaultProducts } from "@/store/modules/pricing/default-pricing";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionFeatureDto } from '@/application/dtos/master/subscriptions/SubscriptionFeatureDto';
import { SubscriptionUpdatePriceRequest } from '@/application/contracts/master/subscriptions/SubscriptionUpdatePriceRequest';
import { SubscriptionUpdateProductRequest } from '@/application/contracts/master/subscriptions/SubscriptionUpdateProductRequest';

const debug = process.env.NODE_ENV !== "production";

export class SubscriptionProductService extends ApiService {
  constructor() {
    super("SubscriptionProduct", ApiServiceType.MasterDatabase);
  }
  getProducts(
    fromServer: boolean,
    onlyActive: boolean
  ): Promise<SubscriptionProductDto[]> {
    const products = [
      defaultProductsDevelopment[0],
      defaultProductsDevelopment[1],
      defaultProductsDevelopment[2]];
    // products.forEach(element => {
    //   element.prices.forEach(price => {
    //     price.subscriptionProduct = element;
    //   });
    // });
    store.commit("pricing/products", products);
    return Promise.resolve(products);
    // console.log("fromServer: " + fromServer);
    // return new Promise((resolve, reject) => {
    //   if (fromServer) {
    //     return super
    //       .getAll()
    //       .then((response) => {
    //         store.commit("pricing/products", response);
    //         resolve(response);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   } else {
    //     let products: SubscriptionProductDto[] = [];
    //     if (debug) {
    //       products = defaultProductsDevelopment;
    //     } else {
    //       products = defaultProducts;
    //     }
    //     if (onlyActive) {
    //       products = products.filter(
    //         (f) => f.active && f.prices.find((f) => f.active)
    //       );
    //     }
    //     // console.log("products: " + JSON.stringify(products));
    //     store.commit("pricing/products", products);
    //     resolve(products);
    //   }
    // });
  }
  getProduct(id: string): Promise<SubscriptionProductDto> {
    return Promise.resolve(defaultProductsDevelopment[0]);
    // return super.get("GetProduct", id);
  }
  getPrice(id: string): Promise<SubscriptionPriceDto> {
    return Promise.resolve(defaultProductsDevelopment[0].prices[0]);
    // return super.get("GetPrice", id);
  }
  getFeature(id: string): Promise<SubscriptionFeatureDto> {
    return Promise.resolve(defaultProductsDevelopment[0].features[0]);
    // return super.get("GetFeature", id);
  }
  createProduct(product: SubscriptionProductDto): Promise<SubscriptionProductDto> {
    return Promise.resolve(defaultProductsDevelopment[0]);
    // return super.post(product, `CreateProduct`);
  }
  createPrice(price: SubscriptionPriceDto): Promise<SubscriptionPriceDto> {
    return Promise.resolve(defaultProductsDevelopment[0].prices[0]);
    // return super.post(price, `CreatePrice`);
  }
  createFeature(feature: SubscriptionFeatureDto): Promise<SubscriptionFeatureDto> {
    return Promise.resolve(defaultProductsDevelopment[0].features[0]);
    // return super.post(feature, `CreateFeature`);
  }
  updateProduct(id: string, product: SubscriptionUpdateProductRequest): Promise<SubscriptionProductDto> {
    return Promise.resolve(defaultProductsDevelopment[0]);
    // return super.put(id, product, `UpdateProduct`);
  }
  updatePrice(id: string, price: SubscriptionUpdatePriceRequest): Promise<SubscriptionPriceDto> {
    return Promise.resolve(defaultProductsDevelopment[0].prices[0]);
    // return super.put(id, price, `UpdatePrice`);
  }
  updateFeature(id: string, feature: SubscriptionFeatureDto): Promise<SubscriptionFeatureDto> {
    return Promise.resolve(defaultProductsDevelopment[0].features[0]);
    // return super.put(id, feature, `UpdateFeature`);
  }
  deleteProduct(id: string): Promise<any> {
    return Promise.resolve(true);
    // return super.delete(id, "DeleteProduct");
  }
  deletePrice(id: string): Promise<any> {
    return Promise.resolve(true);
    // return super.delete(id, "DeletePrice");
  }
  deleteFeature(id: string): Promise<any> {
    return Promise.resolve(true);
    // return super.delete(id, "DeleteFeature");
  }
}
