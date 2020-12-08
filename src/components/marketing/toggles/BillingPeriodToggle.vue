<template>
  <div>
    <div class="w-full flex justify-center mb-0">
      <div
        class="rounded-lg bg-primary shadow-inner p-1 flex justify-center"
        v-if="billingPeriods.length > 0"
      >
        <!-- <a
          @click="changeToMonthly()"
          :class="isMonthly ? 'rounded-lg p-1 text-xs px-2 cursor-pointer hover:bg-focus mx-1':'rounded-lg p-1 text-xs px-2 cursor-pointer bg-focus mx-1'"
        >{{$t("marketing.pricing.monthly")}}</a>
        <a
          @click="changeToYearly()"
          :class="!isMonthly ? 'flex content-center items-center justify-center rounded-lg p-1 text-xs px-2 cursor-pointer hover:bg-focus mx-1 font-semibold ':'flex content-center items-center justify-center rounded-lg p-1 text-xs px-2 cursor-pointer  mx-1 font-semibold bg-focus'"
        >
          {{$t("marketing.pricing.annually")}}
          <div class="bg-green-200 text-green-600 text-xs rounded-lg px-1 ml-1">2 months free</div>
        </a>-->
        <a
          v-for="(billingPeriod, idx) in billingPeriods"
          :key="idx"
          @click.prevent="changeInterval(billingPeriod)"
          class="uppercase inline-flex pt-2 pb-1"
          :class="
            $store.state.pricing.billingPeriod !== billingPeriod
              ? 'rounded-lg text-xs px-2 cursor-pointer hover:bg-focus mx-1'
              : 'rounded-lg text-xs px-2 cursor-pointer bg-focus mx-1'
          "
        >
          {{ billingPeriodName(billingPeriod) }}
          <span
            v-if="isYearly(billingPeriod) && yearlyDiscount(billingPeriod)"
            class="-mt-1 bg-green-200 text-green-600 ml-1 flex content-center items-center justify-center rounded-lg p-1 text-xs px-2 cursor-pointer font-semibold"
            >{{ yearlyDiscount(billingPeriod) }}</span
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { SubscriptionPriceDto } from "../../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionBillingPeriod } from "../../../application/enum/master/SubscriptionBillingPeriod";
import BaseComponent from "../../../components/shared/BaseComponent.vue";

@Component
export default class BillingPeriodToggleComponent extends BaseComponent {
  private changeInterval(billingPeriod: SubscriptionBillingPeriod) {
    this.$store.commit("pricing/billingPeriod", billingPeriod);
  }
  private changeToMonthly() {
    this.changeInterval(SubscriptionBillingPeriod.Monthly);
  }
  private changeToYearly() {
    this.changeInterval(SubscriptionBillingPeriod.Yearly);
  }
  private billingPeriodName(billingPeriod: SubscriptionBillingPeriod): string {
    return SubscriptionBillingPeriod[billingPeriod];
  }
  private isYearly(billingPeriod: SubscriptionBillingPeriod): boolean {
    return billingPeriod === SubscriptionBillingPeriod.Yearly;
  }
  private yearlyDiscount(
    billingPeriod: SubscriptionBillingPeriod
  ): string | undefined {
    const priceYearly = this.getPriceWithInterval(
      SubscriptionBillingPeriod.Yearly
    );
    const priceMonthly = this.getPriceWithInterval(
      SubscriptionBillingPeriod.Monthly
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
      this.products.forEach((product) => {
        const prices = product.prices.find(
          (f) =>
            f.billingPeriod === billingPeriod &&
            f.currency === this.$store.state.pricing.currency
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

    this.products.forEach((element) => {
      element.prices.forEach((price) => {
        if (
          this.$store.state.pricing.currency === price.currency &&
          price.billingPeriod !== SubscriptionBillingPeriod.Once
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
    return this.billingPeriod !== SubscriptionBillingPeriod.Monthly;
  }
}
</script>