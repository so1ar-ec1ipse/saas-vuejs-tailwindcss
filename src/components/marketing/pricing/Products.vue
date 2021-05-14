<template>
  <div>
    <div class="flex justify-center flex-col text-center w-full mb-6">
      <div v-if="!loading">
        <div
          v-if="false"
          class="w-full sm:flex sm:space-x-4 space-y-2 sm:space-y-0 justify-center items-center mt-5 max-w-lg mx-auto"
        >
          <div class="sm:w-1/2 flex justify-center">
            <h3 class="w-64 font-bold text-base">
              {{ $t("marketing.pricing.pricingMode") }}
            </h3>
          </div>
          <invoice-toggle class="sm:w-1/2 flex justify-center"></invoice-toggle>
        </div>
        <div
          class="w-full sm:flex sm:space-x-4 space-y-2 sm:space-y-0 justify-center items-center mt-2 sm:mt-5 max-w-lg mx-auto"
        >
          <currency-toggle
            class="sm:w-1/2 flex justify-center"
          ></currency-toggle>
          <billing-period-toggle class="sm:w-1/2"></billing-period-toggle>
        </div>
      </div>
    </div>
    <Warning v-if="!loading && !fromServer" :text="warningText"> </Warning>
    <div v-if="loading" class="flex flex-wrap -m-2 mb-10">
      <div class="h-auto w-full flex justify-center py-16">
        <div
          class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
        ></div>
      </div>
    </div>
    <div v-else-if="products" class="flex flex-wrap -m-2 mb-10">
      <div
        v-for="(product, index) in products"
        :key="index"
        :class="classForProduct(index)"
      >
        <div>
          <div v-if="productHasPrices(product) && getPrice(product)">
            <router-link
              @click.native="selectProduct(product)"
              :to="{ name: productUrl(product) }"
            >
              <div
                class="relative bg-secondary h-full p-6 rounded-sm border-2 flex flex-col overflow-hidden hover:border-blueGray-300 border-blueGray-100 dark:border-gray-700 dark:hover:border-gray-600"
              >
                <div class="p-2">
                  <h2 class="text-lg leading-6 font-medium text-secondary">
                    {{ getTransaltedProductTitle(product) }}
                  </h2>
                  <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {{ getTransaltedProductDescription(product) }}
                  </p>
                  <p v-if="product.custom" class="mt-7">
                    <span class="text-2xl font-extrabold text-secondary">
                      {{ $t("marketing.pricing.custom") }}</span
                    >
                  </p>
                  <p v-else class="mt-5">
                    <span class="text-4xl font-extrabold text-secondary"
                      >${{ getPriceAmount(product) | intFormat }}</span
                    >
                    <span class="text-base font-medium text-gray-500">{{
                      selectedBillingPeriod !== "once"
                        ? "/ " +
                          $t("marketing.pricing." + selectedBillingPeriod)
                        : $t("marketing.pricing." + selectedBillingPeriod)
                    }}</span>
                  </p>

                  <router-link
                    v-if="false"
                    @click.native="selectProduct(product)"
                    class="inline-flex items-center px-2 mt-4 w-full bg-theme-500 rounded-sm py-2 text-sm font-semibold text-white text-center hover:bg-theme-700"
                    :class="
                      product.badge === 'recommended'
                        ? 'from-theme-400 to-theme-900'
                        : ''
                    "
                    :to="{ name: productUrl(product) }"
                  >
                    <span v-if="product.custom">
                      {{ $t("marketing.pricing.custom") }}
                    </span>
                    <span v-else-if="getPriceTrialDays(product) > 0">
                      {{
                        $t("marketing.pricing.startTrial", [
                          getPriceTrialDays(product)
                        ])
                      }}
                    </span>
                    <span v-else-if="billingPeriodOnce(product)">
                      <span v-if="getPriceAmount(product) === 0">{{
                        $t("marketing.pricing.signUpFree")
                      }}</span>
                      <span v-else>{{ $t("marketing.pricing.payOnce") }}</span>
                    </span>
                    <span v-else>{{ $t("marketing.pricing.subscribe") }}</span>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </router-link>
                  <!-- <p class="text-xs text-gray-500 mt-3">
                    {{ $t("marketing.pricing.noCreditCardRequired") }}
                  </p> -->
                </div>
                <div class="pt-6 pb-4 px-2">
                  <h3
                    class="text-xs font-medium text-theme-500 tracking-wide uppercase"
                  >
                    {{ $t("marketing.pricing.whatsIncluded") }}
                  </h3>
                  <ul class="mt-6 space-y-4">
                    <li
                      v-for="(feature, idx) in getProductFeatures(product)"
                      :key="idx"
                      :class="
                        idx === 0
                          ? 'flex items-center lg:col-span-1'
                          : 'mt-5 flex items-center lg:col-span-1 lg:mt-0'
                      "
                    >
                      <span
                        v-if="feature.included"
                        class="w-4 h-4 inline-flex items-center justify-center text-teal-500 rounded-sm flex-shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-10 h-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span
                        v-else
                        class="w-4 h-4 inline-flex items-center justify-center text-rose-500 rounded-sm flex-shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-10 h-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                      <p class="ml-3 text-sm leading-5 primary">
                        {{ getFeatureDescription(feature) }}
                      </p>
                    </li>
                  </ul>
                </div>
                <div v-if="false">
                  <span
                    v-if="product.badge"
                    class="bg-theme-300 text-theme-700 px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl uppercase"
                    >{{ badgeFromProduct(product) }}</span
                  >
                  <h1
                    class="text-5xl text-secondary leading-none flex items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-600"
                  >
                    <span>${{ getPriceAmount(product) }}</span>
                    <span
                      v-if="getPriceAmountBefore(product)"
                      class="ml-1 line-through text-2xl leading-8 font-medium text-gray-500"
                      >${{ getPriceAmountBefore(product) }}</span
                    >
                    <span class="text-lg ml-1 font-normal text-gray-500">
                      {{ billingPeriod(product) }}
                    </span>
                  </h1>
                  <p
                    v-for="(feature, index) in product.features"
                    :key="index"
                    class="flex items-center text-secondary mb-2"
                  >
                    <span
                      v-if="feature.included"
                      class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-teal-500 text-white rounded-md flex-shrink-0"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span
                      v-else
                      class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-500 text-white rounded-md flex-shrink-0"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {{
                      $t("marketing.pricing.features." + feature.key, [
                        feature.value
                      ])
                    }}
                  </p>

                  <router-link
                    @click.native="selectProduct(product)"
                    class="flex items-center mt-auto text-white bg-gradient-to-r from-theme-500 to-theme-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-theme-400 rounded-sm"
                    :class="
                      product.badge === 'recommended'
                        ? 'from-theme-400 to-theme-900'
                        : ''
                    "
                    :to="{ name: 'account.register' }"
                  >
                    <span v-if="getPriceTrialDays(product) > 0">
                      {{
                        $t("marketing.pricing.startTrial", [
                          getPriceTrialDays(product)
                        ])
                      }}
                    </span>
                    <span v-else-if="billingPeriodOnce(product)">
                      <span v-if="getPriceAmount(product) === 0">{{
                        $t("marketing.pricing.signUpFree")
                      }}</span>
                      <span v-else>{{ $t("marketing.pricing.payOnce") }}</span>
                    </span>
                    <span v-else>{{ $t("marketing.pricing.subscribe") }}</span>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </router-link>
                  <p class="text-xs text-gray-500 mt-3">
                    {{ $t("marketing.pricing.noCreditCardRequired") }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import BillingPeriodToggle from "@/components/marketing/toggles/BillingPeriodToggle.vue";
import CurrencyToggle from "@/components/marketing/toggles/CurrencyToggle.vue";
import InvoiceToggle from "@/components/marketing/toggles/InvoiceToggle.vue";
import Products from "@/components/marketing/pricing/Products.vue";
import Warning from "@/components/shared/banners/Warning.vue";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionPriceDto } from "../../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionFeatureDto } from "../../../application/dtos/master/subscriptions/SubscriptionFeatureDto";
import { mapGetters } from "vuex";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";

@Component({
  components: {
    BillingPeriodToggle,
    CurrencyToggle,
    InvoiceToggle,
    Products,
    Warning,
    ErrorModal
  },
  computed: {
    ...mapGetters("pricing", {
      selectedProductTitle: "selectedProductTitle",
      selectedPrice: "selectedPrice",
      selectedBillingPeriod: "selectedBillingPeriod"
    })
  }
})
export default class ProductsComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
  };
  private items = [] as SubscriptionProductDto[];
  private fromServer: boolean = true;
  private selectedBillingPeriod!: string;
  mounted() {
    // this.$store.commit("pricing/currency", "mxn");
    this.reload(true);
  }
  async reload(fromServer: boolean) {
    const debug = process.env.NODE_ENV !== "production";

    this.fromServer = fromServer;
    this.items = [];
    this.loading = true;
    this.services.subscriptionProducts
      .getProducts(fromServer, true)
      .then((response: SubscriptionProductDto[]) => {
        this.items = [];
        response?.forEach(product => {
          this.items.push(product);
        });
        if (response.length === 0 && this.fromServer && debug) {
          this.reload(false);
        }
      })
      .catch(error => {
        if (this.fromServer && debug) {
          this.reload(false);
        } else {
          this.$refs.errorModal.show(error);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
  classForProduct(index) {
    // If there are 3 products, the last one full width
    if (this.products.length === 3) {
      if (index === this.products.length - 1) {
        return "p-2 xl:w-1/3 md:w-1/1 w-full";
      }
    } else if (this.products.length === 4) {
      return "p-2 w-full md:w-1/2 xl:w-1/4";
    } else if (this.products.length === 2 || this.products.length === 4) {
      return "p-2 xl:w-1/2 md:w-1/1 w-full";
    }
    return "p-2 xl:w-1/3 md:w-1/2 w-full";
  }
  private billingPeriodOnce(
    product: SubscriptionProductDto
  ): boolean | undefined {
    return (
      this.getPrice(product)?.billingPeriod === SubscriptionBillingPeriod.ONCE
    );
  }
  private getFeatureDescription(feature: SubscriptionFeatureDto) {
    if (!feature.translateInFrontend) {
      if (feature.value) {
        return `${feature.value}`;
      } else {
        return `${feature.key}`;
      }
    } else {
      return this.$t("marketing.pricing.features." + feature.key, [
        feature.value
      ]);
    }
  }
  private getProductFeatures(
    product: SubscriptionProductDto
  ): SubscriptionFeatureDto[] {
    return product.features;
    // const features = product.features.sort((x, y) => {
    //     return x.order > y.order ? 1 : -1;
    //   });
    //   return features;
  }
  private billingPeriod(product: SubscriptionProductDto): string {
    if (this.billingPeriodOnce(product)) {
      return this.$t("marketing.pricing.once").toString();
    } else {
      const idx = this.getPrice(product)?.billingPeriod ?? 0;
      return (
        "/" +
        this.$t("marketing.pricing." + SubscriptionBillingPeriod[idx] + "Short")
      );
    }
  }
  private productUrl(product: SubscriptionProductDto) {
    if (product.custom) {
      return "contact";
    }
    return "account.register";
  }
  private selectProduct(product: SubscriptionProductDto) {
    this.$store.commit("pricing/select", {
      product,
      billingPeriod: this.$store.state.pricing.billingPeriod
    });
  }
  private getPrice(
    product: SubscriptionProductDto
  ): SubscriptionPriceDto | undefined {
    const prices = product.prices.find(
      f =>
        (f.billingPeriod === this.$store.state.pricing.billingPeriod ||
          f.billingPeriod === SubscriptionBillingPeriod.ONCE) &&
        f.currency === this.$store.state.pricing.currency &&
        f.mode === this.$store.state.pricing.mode &&
        f.active
    );
    return prices;
  }
  private productHasPrices(product: SubscriptionProductDto): boolean {
    return product && product.prices && product.prices.length > 0;
  }
  private badgeFromProduct(product: SubscriptionProductDto): string {
    return product.badge;
    if (product.badge) {
      if (product.badge.includes(" ")) {
        return product.badge;
      }
      const translated = this.$t("marketing.pricing.badges." + product.badge);
      if (translated) {
        return translated.toString();
      } else {
        return product.badge;
      }
    }
    return "";
  }
  private getPriceAmount(product): number {
    return this.getPrice(product)?.price ?? 0;
  }
  private getPriceTrialDays(product): number {
    return this.getPrice(product)?.trialDays ?? 0;
  }
  private getPriceAmountBefore(product): number {
    return this.getPrice(product)?.priceBefore ?? 0;
  }
  private getTransaltedProductTitle(product): string {
    const translated = this.$t("marketing.pricing.products." + product.tier);
    if (translated) {
      return translated.toString();
    } else {
      return product.title;
    }
  }
  private getTransaltedProductDescription(product): string {
    const translated = this.$t(
      "marketing.pricing.productDescriptions." + product.tier
    );
    if (translated) {
      return translated.toString();
    } else {
      return product.description;
    }
  }
  get products(): SubscriptionProductDto[] {
    return (this.$store.state.pricing.products as SubscriptionProductDto[])
      .filter(f => this.getPrice(f) !== undefined && f.active)
      .sort((x, y) => {
        return x.tier > y.tier ? 1 : -1;
      });
  }
  get billingPeriods() {
    const periods: any[] = [];
    (this.$store.state.pricing.products as SubscriptionProductDto[]).map(f =>
      f.prices.forEach(price => {
        if (periods.includes(price.billingPeriod) === false) {
          periods.push(price.billingPeriod);
        }
      })
    );
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    return periods.filter(onlyUnique);
  }
  get warningText() {
    return (
      this.$t("admin.pricing.thesePricesAreFromFiles") +
      " ClientApp/src/store/modules/pricing/default-pricing.ts"
    );
  }
}
</script>


<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

