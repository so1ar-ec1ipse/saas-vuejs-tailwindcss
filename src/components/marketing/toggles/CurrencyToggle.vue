<template>
  <div>
    <div
      v-if="currencies && currencies.length > 1"
      class="w-full flex justify-center mb-0"
    >
      <div
        class="rounded-lg bg-primary shadow-inner p-1 flex justify-center text-primary"
      >
        <a
          v-for="(currency, idx) in currencies"
          :key="idx"
          @click.prevent="changeCurrency(currency)"
          class="uppercase"
          :class="
            $store.state.pricing.currency !== currency
              ? 'rounded-lg p-1 text-xs px-2 cursor-pointer hover:bg-focus mx-1'
              : 'rounded-lg p-1 text-xs px-2 cursor-pointer bg-focus mx-1'
          "
          >{{ currency }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import BaseComponent from "../../../components/shared/BaseComponent.vue";

import { defaultProducts } from "../../../store/modules/pricing/default-pricing";
import { defaultProductsDevelopment } from "../../../store/modules/pricing/default-pricing.Development";

@Component
export default class BillingPeriodToggleComponent extends BaseComponent {
  private changeCurrency(currency) {
    this.$store.commit("pricing/currency", currency);
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products as SubscriptionProductDto[];
  }
  get currencies() {
    const allCurrencies: string[] = [];
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.products.forEach((element) => {
      element.prices.forEach((price) => {
        if (
          this.$store.state.pricing.billingPeriod === price.billingPeriod ||
          true
        ) {
          allCurrencies.push(price.currency.toLowerCase());
        }
      });
    });
    return allCurrencies.filter(onlyUnique);
  }
}
</script>