<template>
  <div>
    <form
      v-if="myProducts && myProducts.length > 0"
      @submit.prevent
      method="POST"
    >
      <div class="shadow sm:rounded-sm mb-4">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-2">
            <!-- <div id="card-element" class="col-span-6 sm:col-span-6"></div> -->

            <div
              v-for="(myProduct, idx) in myProducts"
              :key="idx"
              class="col-span-6 block"
            >
              <span
                v-if="idx === 0"
                id="listbox-label"
                class="text-sm leading-5 font-medium text-gray-700"
                >{{ $t("shared.myProducts") }}</span
              >
              <div>
                <!-- {{myProduct}} -->
                <span
                  class="-mt-4 block text-right text-medium text-sm text-theme-500 font-medium"
                >
                  {{ myProduct.product.title }} ${{ myProduct.price }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import {SubscriptionBillingPeriod} from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";

@Component({
  components: {},
})
export default class TenantSubscriptionPlan extends BaseComponent {
  get myProducts(): SubscriptionPriceDto[] {
    const products = this.$store.state.tenant
      .myProducts as SubscriptionPriceDto[];
    if (products && products.length > 0) {
      return products.filter(
        (f) => f.billingPeriod === SubscriptionBillingPeriod.ONCE
      );
    }
    return [];
  }
}
</script>
