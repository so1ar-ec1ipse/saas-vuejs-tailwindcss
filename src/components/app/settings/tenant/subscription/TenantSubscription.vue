<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <div
      v-if="$store.state.tenant.current.subdomain !== 'admin'"
      class="md:grid lg:grid-cols-3 md:gap-2"
    >
      <div class="md:col-span-1">
        <div class="sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ $t("settings.tenant.subscription.title") }}
            <span v-if="activeProduct" class="text-gray-700 text-sm">
              <!-- ({{ activeProduct.subscriptionProduct.title }}) -->
            </span>
          </h3>

          <div class="mt-1 text-xs leading-5 text-gray-600">
            <span v-if="subscription">
              <p class="text-xs text-gray-900 font-bold"></p>
              <p>
                <button
                  @click="cancel"
                  class="text-gray-500 font-medium hover:underline hover:text-gray-600"
                >
                  {{ $t("settings.tenant.subscription.clickCancel") }}
                </button>
              </p>
            </span>
            <span v-else>{{
              $t("settings.tenant.subscription.description")
            }}</span>
          </div>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div v-if="!subscription && (!products || products.length === 0)">
          <div
            class="rounded-sm bg-yellow-50 p-4 mb-4 border border-yellow-200 shadow-sm"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm leading-5 font-medium text-yellow-800">
                  {{ $t("settings.tenant.subscription.notSubscribed") }}
                </h3>
                <div class="mt-2 text-sm leading-5 text-yellow-700">
                  <p>
                    {{
                      $t(
                        "settings.tenant.subscription.notSubscribedDescription"
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <tenant-subscription-products></tenant-subscription-products>
        <tenant-subscription-plan></tenant-subscription-plan>
        <tenant-subscription-payment-details
          class="mt-3"
        ></tenant-subscription-payment-details>
        <tenant-subscription-invoices
          class="mt-3"
        ></tenant-subscription-invoices>
      </div>
    </div>
    <div
      v-else
      class="px-4 py-5 bg-white sm:p-6 block text-sm font-medium leading-5 text-gray-700"
    >
      <div class="rounded-sm bg-yellow-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm leading-5 font-medium text-yellow-800">
              {{ $t("shared.warning") }}
            </h3>
            <div class="mt-2 text-sm leading-5 text-yellow-700">
              <p>{{ $t("admin.cannotHaveSubscription") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <confirm-modal ref="confirmModal" v-on:yes="confirmCancel"></confirm-modal>
    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import TenantSubscriptionPlan from "@/components/app/settings/tenant/subscription/TenantSubscriptionPlan.vue";
import TenantSubscriptionProducts from "@/components/app/settings/tenant/subscription/TenantSubscriptionProducts.vue";
import TenantSubscriptionPaymentDetails from "@/components/app/settings/tenant/subscription/TenantSubscriptionPaymentDetails.vue";
import TenantSubscriptionInvoices from "@/components/app/settings/tenant/subscription/TenantSubscriptionInvoices.vue";
import { mapGetters } from "vuex";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";

@Component({
  components: {
    ConfirmModal,
    SuccessModal,
    ErrorModal,
    TenantSubscriptionPlan,
    TenantSubscriptionProducts,
    TenantSubscriptionPaymentDetails,
    TenantSubscriptionInvoices
  },
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct"
    })
  }
})
export default class TenantSubscription extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    successModal: SuccessModalComponent;
    confirmModal: ConfirmModalComponent;
  };
  mounted() {
    this.services.subscriptionProducts.getProducts(true, true);
  }
  cancel() {
    this.$refs.confirmModal.show(
      this.$t("settings.tenant.subscription.confirmCancel")
    );
  }
  confirmCancel() {
    return this.services.subscriptionManager
      .cancelSubscription()
      .then(response => {
        this.$refs.successModal.show(
          this.$t("settings.tenant.subscription.canceled")
        );
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  get products(): TenantProductDto[] | undefined {
    return (
      (this.$store.state.tenant?.subscription
        ?.myProducts as TenantProductDto[]) ?? []
    );
  }
  get subscription(): SubscriptionPriceDto | undefined {
    const mySubscriptions = this.products?.filter(
      f => f.subscriptionPrice.billingPeriod !== SubscriptionBillingPeriod.ONCE
    );
    if (mySubscriptions && mySubscriptions.length > 0) {
      return mySubscriptions[0].subscriptionPrice;
    } else {
      return undefined;
    }
  }
}
</script>
