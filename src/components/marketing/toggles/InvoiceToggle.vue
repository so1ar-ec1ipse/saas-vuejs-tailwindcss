<template>
  <div>
    <div class="w-full flex justify-center mb-0">
      <div class="flex justify-center items-center rounded-md">
        <a
          @click.prevent="changeMode(1)"
          class="border border-blueGray-200 dark:border-gray-700 uppercase flex justify-center w-36 sm:w-32 rounded-l-md border-r-none"
          :class="
            $store.state.pricing.mode !== 1
              ? 'text-xs py-2 px-0 cursor-pointer bg-gray-50 dark:bg-gray-700'
              : 'text-xs py-2 px-0 cursor-pointer bg-white dark:bg-gray-900 border  shadow-md border-blueGray-300 dark:border-gray-600'
          "
          >{{ $t("shared.us") }}</a
        >
        <a
          @click.prevent="changeMode(0)"
          class="border border-blueGray-200 dark:border-gray-700 uppercase py-1 flex justify-center w-36 sm:w-32 rounded-r-md border-l-none items-center space-x-7"
          :class="
            $store.state.pricing.mode !== 0
              ? 'text-xs p-2 cursor-pointer bg-gray-50 dark:bg-gray-700 '
              : 'text-xs p-2 cursor-pointer bg-white dark:bg-gray-900 border  shadow-md border-blueGray-300 dark:border-gray-600'
          "
          ><div>{{ $t("shared.you") }}</div>
          <div
            v-if="whoInvoicesDiscount(0)"
            class="bg-green-200 text-green-600 ml-1 flex content-center items-center justify-center rounded-sm p-1 text-xs px-2 cursor-pointer font-semibold"
          >
            {{ whoInvoicesDiscount(0) }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import BaseComponent from "../../shared/BaseComponent.vue";
import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";

@Component
export default class InvoiceToggle extends BaseComponent {
  mounted() {
    if (!this.$store.state.pricing.mode) {
      this.$store.commit("pricing/mode", 1);
    }
  }
  private changeMode(mode) {
    this.$store.commit("pricing/mode", mode);
    this.$emit("selected");
  }
  private whoInvoicesDiscount(modo: WhoInvoices): string {
    const priceWithDiscount = this.getPriceWithMode(WhoInvoices.TENANT);
    const priceNormal = this.getPriceWithMode(WhoInvoices.ADMIN);
    // console.log("price 1: " + priceWithDiscount);
    // console.log("price normal: " + priceNormal);
    if (priceWithDiscount && priceNormal) {
      const discount =
        100 - (priceWithDiscount.price * 100) / priceNormal.price;
      if (discount !== 0) {
        return "-" + discount.toFixed(0) + "%";
      }
    }

    return "sin descuento";
  }
  private getPriceWithMode(mode: number): SubscriptionPriceDto | undefined {
    if (this.products && this.products.length > 0) {
      return this.products[0].prices.find(
        f =>
          f.billingPeriod === this.$store.state.pricing.billingPeriod &&
          f.currency === this.$store.state.pricing.currency &&
          f.mode === mode
      );
    }
    return undefined;
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products as SubscriptionProductDto[];
  }
}
</script>
