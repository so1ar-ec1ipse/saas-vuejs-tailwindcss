<template>
  <div>
    <div class="w-full flex justify-center mb-0">
      <div class="flex justify-center" v-if="billingPeriods.length > 0">
        <a
          v-for="(billingPeriod, idx) in billingPeriods"
          :key="idx"
          @click.prevent="changeInterval(billingPeriod)"
          class="border border-blueGray-200 dark:border-gray-700 uppercase py-1 flex justify-center w-36 sm:w-32 items-center space-x-2"
          :class="[
            $store.state.pricing.billingPeriod !== billingPeriod
              ? 'text-xs p-4 cursor-pointer bg-gray-50 dark:bg-gray-700'
              : 'text-xs p-4 cursor-pointer bg-white dark:bg-gray-900 border shadow-md border-blueGray-300 dark:border-gray-600',
            idx === 0
              ? 'rounded-l-md border-r-none'
              : 'rounded-r-md border-l-none',
            ,
          ]"
        >
          <div>{{ billingPeriodName(billingPeriod) }}</div>
          <div
            v-if="isYearly(billingPeriod) && yearlyDiscount(billingPeriod)"
            class="text-right bg-green-200 text-green-600 ml-1 flex content-center items-center justify-center rounded-sm p-1 text-xs px-2 cursor-pointer font-semibold"
          >
            {{ yearlyDiscount(billingPeriod) }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { SubscriptionPriceDto } from "../../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionBillingPeriod } from "../../../application/enums/master/subscriptions/SubscriptionBillingPeriod";
import BaseComponent from "../../../components/shared/BaseComponent.vue";

@Component
export default class BillingPeriodToggleComponent extends BaseComponent {
  private changeInterval(billingPeriod: SubscriptionBillingPeriod) {
    this.$store.commit("pricing/billingPeriod", billingPeriod);
    this.$emit("selected");
  }
  private changeToMonthly() {
    this.changeInterval(SubscriptionBillingPeriod.MONTHLY);
  }
  private changeToYearly() {
    this.changeInterval(SubscriptionBillingPeriod.YEARLY);
  }
  private billingPeriodName(billingPeriod: SubscriptionBillingPeriod): string {
    return this.$t(
      "marketing.pricing." + SubscriptionBillingPeriod[billingPeriod].toString()
    ).toString();
    // switch (billingPeriod) {
    //   case SubscriptionBillingPeriod.ONCE:
    //     return "Una vez";
    //   case SubscriptionBillingPeriod.WEEKLY:
    //     return "Semanal";
    //   case SubscriptionBillingPeriod.MONTHLY:
    //     return "Mensual";
    //   case SubscriptionBillingPeriod.YEARLY:
    //     return "Anual";
    //   case SubscriptionBillingPeriod.DAILY:
    //     return "Diario";
    //   default:
    //     return "";
    // }
  }
  private isYearly(billingPeriod: SubscriptionBillingPeriod): boolean {
    return billingPeriod === SubscriptionBillingPeriod.YEARLY;
  }
  private yearlyDiscount(
    billingPeriod: SubscriptionBillingPeriod
  ): string | undefined {
    const priceYearly = this.getPriceWithInterval(
      SubscriptionBillingPeriod.YEARLY
    );
    const priceMonthly = this.getPriceWithInterval(
      SubscriptionBillingPeriod.MONTHLY
    );
    if (priceYearly && priceMonthly) {
      const discount =
        100 - (priceYearly.price * 100) / (priceMonthly.price * 12);
      if (discount !== 0) {
        return "-" + discount.toFixed(0) + "%";
      }
    }

    return undefined;
  }
  private getPriceWithInterval(
    billingPeriod: SubscriptionBillingPeriod
  ): SubscriptionPriceDto | undefined {
    let price: SubscriptionPriceDto | undefined;
    if (this.products && this.products.length > 0) {
      this.products.forEach(product => {
        const prices = product.prices.find(
          f =>
            f.billingPeriod === billingPeriod &&
            f.currency === this.$store.state.pricing.currency &&
            f.mode === this.$store.state.pricing.mode
        );
        if (prices) {
          price = prices;
        }
      });
    }
    return price;
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products as SubscriptionProductDto[];
  }
  get billingPeriods() {
    const allBillingPeriods: SubscriptionBillingPeriod[] = [];
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.products.forEach(element => {
      element.prices.forEach(price => {
        if (
          this.$store.state.pricing.currency === price.currency &&
          price.mode === this.$store.state.pricing.mode &&
          price.billingPeriod !== SubscriptionBillingPeriod.ONCE
        ) {
          allBillingPeriods.push(price.billingPeriod);
        }
      });
    });
    return allBillingPeriods.filter(onlyUnique);
  }
  get billingPeriod() {
    return this.$store.state.pricing.billingPeriod as SubscriptionBillingPeriod;
  }
  get isMonthly() {
    return this.billingPeriod !== SubscriptionBillingPeriod.MONTHLY;
  }
}
</script>
