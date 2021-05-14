<template>
  <div :class="mainTheme" v-click-outside="closeDropdown">
    <div class="space-y-1">
      <span
        id="listbox-label"
        class="flex items-center justify-between text-sm leading-5 font-medium"
      >
        <div>
          {{ $t("shared.plan") }}
        </div>
      </span>

      <div class="relative">
        <span class="inline-block w-full rounded-sm shadow-sm">
          <button
            v-on:click="droppedDown = !droppedDown"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            class="text-primary cursor-default relative w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <span
              v-if="selectedPrice && selectedProduct"
              class="flex truncate space-x-1 items-center"
            >
              <div class="mr-1">
                {{ selectedProductTitle }}
              </div>
              <div class="">
                -
                <span v-if="selectedProduct.features[0].translateInFrontend">
                  {{
                    $t(
                      "marketing.pricing.features." +
                        selectedProduct.features[0].key,
                      [selectedProduct.features[0].value]
                    )
                  }} </span
                ><span v-else>
                  {{ selectedProduct.features[0].value }}
                </span>
              </div>
              <div class="font-bold">
                - ${{ selectedPrice.price | numberFormat }}
                {{ selectedPrice.currency }}
                {{
                  selectedBillingPeriod !== "once"
                    ? "/" + $t("marketing.pricing." + selectedBillingPeriod)
                    : $t("marketing.pricing." + selectedBillingPeriod)
                }}
                <span v-if="selectedProduct.custom">mínimo</span>
              </div>
              <div class="text-xs" v-if="selectedPrice">
                <span v-if="selectedPrice.mode === 0"
                  >(Tú facturas tus tickets)</span
                >
                <span v-if="selectedPrice.mode === 1">
                  (Nosotros facturamos tus tickets)
                </span>
              </div>
            </span>
            <span v-else class="block truncate">{{ $t("shared.select") }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </span>
      </div>
    </div>
    <!-- Plan -->
    <section
      v-if="droppedDown"
      aria-labelledby="plan_heading"
      class="border border-gray-200 dark:border-gray-700 shadow-md"
    >
      <div>
        <div class="sm:rounded-md sm:overflow-hidden">
          <div class="bg-secondary py-6 px-4 space-y-3">
            <div class="flex justify-between items-center">
              <h2
                id="plan_heading"
                class="text-lg leading-6 font-medium text-secondary"
              >
                {{ $t("models.subscriptionPrice.plural") }}
              </h2>
              <div class="relative" v-click-outside="closeShowOptions">
                <button
                  @click.prevent="showShowOptions"
                  class="flex items-center space-x-1 text-base font-medium leading-5 text-theme-500 cursor-pointer hover:text-theme-400"
                >
                  <div>
                    {{ $t("shared.more") }}
                    {{
                      $t("shared.options")
                        .toString()
                        .toLowerCase()
                    }}
                  </div>
                  <svg
                    class="h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <transition
                  enter-active-class=""
                  enter-class=""
                  enter-to-class=""
                  leave-active-class="transition ease-in duration-100"
                  leave-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <div
                    v-if="showOptions"
                    class="z-30 origin-top-right absolute right-0 mt-1 space-y-2 p-3 bg-primary border border-gray-300 dark:border-gray-700 rounded-md shadow-2xl"
                  >
                    <div class="flex items-center justify-center w-full">
                      {{ $t("marketing.pricing.pricingMode") }}
                    </div>
                    <!-- <invoice-toggle
                      v-on:selected="showOptions = false"
                    ></invoice-toggle> -->
                    <Billing-Period-Toggle
                      v-on:selected="showOptions = false"
                    ></Billing-Period-Toggle>
                    <currency-toggle
                      v-on:selected="showOptions = false"
                    ></currency-toggle>
                  </div>
                </transition>
              </div>
            </div>

            <fieldset>
              <legend class="sr-only">
                {{ $t("models.subscriptionPrice.plural") }}
              </legend>

              <div
                class="text-sm px-3 py-2 flex items-center justify-center w-full mx-auto border rounded-tr-md rounded-tl-md"
                :class="{
                  'bg-yellow-50 border-yellow-200 text-yellow-800':
                    selectedMode === 0,
                  'bg-teal-50 border-teal-200 text-teal-800': selectedMode === 1
                }"
              >
                <span v-if="selectedMode === 0">{{
                  $t("app.tickets.whoInvoices.0")
                }}</span>
                <span v-if="selectedMode === 1">
                  {{ $t("app.tickets.whoInvoices.1") }}
                </span>
              </div>
              <div class="relative bg-secondary rounded-md -space-y-px">
                <label
                  v-for="(product, index) in products"
                  :key="index"
                  class="border-gray-200 dark:border-gray-700 relative border p-4 flex flex-col cursor-pointer"
                  :class="{
                    'border-t-0': index === 0,
                    'rounded-bl-md rounded-br-md':
                      index === products.length - 1,

                    'bg-primary border-primary z-10':
                      selectedProduct && selectedProduct.id === product.id
                  }"
                >
                  <div class="flex items-center text-sm justify-between">
                    <div>
                      <button @click="changeProduct(product)" />
                      <span class="ml-3 font-medium text-secondary">{{
                        product.title
                      }}</span>
                    </div>
                    <div id="pricing-plans-0-description-0" class="text-sm">
                      <span
                        class="font-medium"
                        :class="{
                          'text-theme-500':
                            selectedProduct &&
                            selectedProduct.id &&
                            selectedProduct.id === product.id,
                          'text-secondary':
                            !selectedProduct ||
                            selectedProduct.id !== product.id
                        }"
                      >
                        <div class="flex">
                          <div>${{ price(product).price | numberFormat }}</div>
                          <div>
                            {{
                              selectedBillingPeriod !== "once"
                                ? " /" +
                                  $t(
                                    "marketing.pricing." + selectedBillingPeriod
                                  )
                                : $t(
                                    "marketing.pricing." + selectedBillingPeriod
                                  )
                            }}
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>

                  <!-- <div v-if="product.custom" class="flex justify-between">
                    <div>
                      Se cobra por uso, mínimo de {{ minPrice(product) }}
                    </div>
                  </div> -->

                  <div
                    id="pricing-plans-0-description-1"
                    class="text-gray-400 ml-2 pl-1 text-sm grid grid-cols-1 2xl:grid-cols-3"
                  >
                    <div
                      v-for="(feature, idxFeature) in product.features"
                      :key="idxFeature"
                      class=""
                      :class="{
                        'line-through text-gray-500': !feature.included
                      }"
                    >
                      <div v-if="feature.translateInFrontend">
                        {{
                          $t("marketing.pricing.features." + feature.key, [
                            feature.value
                          ])
                        }}
                      </div>
                      <div v-else>
                        {{ feature.value }}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import BillingPeriodToggle from "../../components/marketing/toggles/BillingPeriodToggle.vue";
import { mapGetters } from "vuex";
import { SubscriptionProductDto } from "../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionPriceDto } from "../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import CurrencyToggle from "@/components/marketing/toggles/CurrencyToggle.vue";
import InvoiceToggle from "@/components/marketing/toggles/InvoiceToggle.vue";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import Vue from "vue";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    BillingPeriodToggle,
    CurrencyToggle,
    InvoiceToggle
  },
  computed: {
    ...mapGetters("pricing", {
      selectedProductTitle: "selectedProductTitle",
      selectedPrice: "selectedPrice",
      selectedProduct: "selectedProduct",
      selectedBillingPeriod: "selectedBillingPeriod"
    }),
    ...mapGetters("tenant", {
      activePrice: "activePrice",
      activeProduct: "activeProduct"
    })
  }
})
export default class PlansComponent extends BaseComponent {
  @Prop({ default: "theme-bg-light theme-indigo" }) mainTheme!: string;
  public droppedDown: boolean = false;
  showOptions: boolean = false;
  selectedProduct!: SubscriptionProductDto;
  selectedPrice!: SubscriptionPriceDto;
  activePrice!: SubscriptionPriceDto;
  activeProduct!: TenantProductDto;
  selectedProductTitle!: string;
  selectedBillingPeriod!: string;

  created() {
    if (this.$store.state.pricing.products.length === 0) {
      this.services.subscriptionProducts.getProducts(false, true).then(() => {
        this.loadCurrent();
      });
    }
  }
  mounted() {
    this.services.subscriptionProducts.getProducts(true, true);
    this.loadCurrent();
    // this.$store.commit("pricing/mode", 0);
    // if (
    //   this.myProducts &&
    //   this.myProducts.length > 0 &&
    //   this.myProducts[0].subscriptionProduct
    // ) {
    //   this.$store.commit(
    //     "pricing/currency",
    //     this.myProducts[0].subscriptionPrice.currency
    //   );
    //   this.$store.commit(
    //     "pricing/billingPeriod",
    //     this.myProducts[0].subscriptionPrice.billingPeriod
    //   );
    //   this.$store.commit(
    //     "pricing/mode",
    //     this.myProducts[0].subscriptionPrice.mode
    //   );
    //   this.changeProduct(this.myProducts[0].subscriptionProduct);
    // }
  }
  loadCurrent() {
    if (this.activeProduct) {
      this.$store.commit("pricing/select", {
        billingPeriod: this.activeProduct.subscriptionPrice.billingPeriod,
        product: this.activeProduct.subscriptionProduct
      });
    }
  }
  // public setFromCurrentSubscription() {
  //   if (this.subscription) {
  //   }
  // }
  open() {
    this.droppedDown = true;
  }
  closeDropdown() {
    this.droppedDown = false;
  }
  changeProduct(product: SubscriptionProductDto) {
    this.closeDropdown();
    this.$store.commit("pricing/select", {
      product,
      billingPeriod: this.$store.state.pricing.billingPeriod
    });
  }
  price(product: SubscriptionProductDto): SubscriptionPriceDto {
    return (
      product.prices.find(
        f =>
          f.billingPeriod === this.$store.state.pricing.billingPeriod &&
          f.currency === this.$store.state.pricing.currency &&
          f.mode === this.$store.state.pricing.mode
      ) ?? product.prices[0]
    );
  }
  billingPeriod(price: SubscriptionPriceDto): string {
    if (price.billingPeriod === SubscriptionBillingPeriod.ONCE) {
      return this.$t("marketing.pricing.once").toString();
    } else {
      return (
        "/" +
        this.$t(
          "marketing.pricing." +
            SubscriptionBillingPeriod[price.billingPeriod] +
            "Short"
        )
      );
    }
  }
  showShowOptions() {
    // if (!this.showOptions) {
    //   this.closeDropdown();
    // }
    this.showOptions = !this.showOptions;
  }
  closeShowOptions() {
    // if (!this.showOptions) {
    //   this.closeDropdown();
    // }
    this.showOptions = false;
  }
  toggleBilling() {
    if (
      this.selectedPrice?.billingPeriod === SubscriptionBillingPeriod.MONTHLY
    ) {
      this.$store.commit(
        "pricing/billingPeriod",
        SubscriptionBillingPeriod.MONTHLY
      );
    } else {
      this.$store.commit(
        "pricing/billingPeriod",
        SubscriptionBillingPeriod.YEARLY
      );
    }
  }
  minPrice(product) {
    const price = Vue.filter("intFormat")(this.price(product));
    const billingPeriod = this.$t(
      "marketing.pricing." + this.selectedBillingPeriod
    );
    return `${price} ${this.price(product).currency} ${billingPeriod}`;
  }
  get selectedMode(): number {
    return this.$store.state.pricing.mode as number;
  }
  get myProducts(): TenantProductDto[] {
    return (this.$store.state.tenant.subscription
      .myProducts as TenantProductDto[])?.filter(
      f => f.subscriptionPrice.billingPeriod !== SubscriptionBillingPeriod.ONCE
    );
  }
  get products() {
    return (this.$store.state.pricing.products as SubscriptionProductDto[])
      ?.filter(f => f.active && !f.custom)
      .sort((x, y) => {
        return x.tier > y.tier ? 1 : -1;
      });
  }
}
</script>
