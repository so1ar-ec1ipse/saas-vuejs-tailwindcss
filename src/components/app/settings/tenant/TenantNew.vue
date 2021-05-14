<template>
  <div>
    <div
      class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <section class="absolute inset-y-0 pl-16 max-w-full right-0 flex">
          <div class="w-screen max-w-md">
            <div
              class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-2xl"
            >
              <div class="flex-1 h-0 overflow-y-auto bg-white text-gray-600">
                <header
                  class="space-y-1 py-6 px-4 bg-gray-100 sm:px-6 shadow-inner border-b border-gray-200"
                >
                  <div class="flex items-center justify-between space-x-3">
                    <h2 class="text-lg leading-7 font-medium text-gray-800">
                      {{ $t("settings.tenant.create") }}
                    </h2>
                    <div class="h-7 flex items-center">
                      <button
                        @click="close"
                        aria-label="Close panel"
                        class="text-gray-500 hover:text-gray-800 transition ease-in-out duration-150"
                      >
                        <svg
                          class="h-6 w-6"
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
                      </button>
                    </div>
                  </div>
                  <div>
                    <p class="text-sm leading-5 text-gray-500">
                      {{ $t("settings.tenant.createDescription") }}
                    </p>
                  </div>
                </header>
                <div class="flex-1 flex flex-col justify-between">
                  <div class="px-4 divide-y divide-gray-200 sm:px-6">
                    <div class="space-y-6 pt-6 pb-5">
                      <div class="space-y-1">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-5 text-gray-600"
                          >{{ $t("shared.name") }}</label
                        >
                        <div class="relative rounded-sm shadow-sm">
                          <input
                            v-model="name"
                            id="name"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                      </div>
                      <div>
                        <invoice-toggle
                          v-if="false"
                          class="w-full flex justify-center mt-2"
                        ></invoice-toggle>
                        <currency-toggle
                          class="w-full flex justify-center"
                          theme="light"
                        ></currency-toggle>
                      </div>
                      <div class="space-y-1">
                        <plans ref="plans"></plans>
                      </div>
                    </div>

                    <div class="space-y-4 pt-4 pb-6 text-right text-gray-700">
                      <div class="text-sm leading-5 right-0">
                        <span class="inline-flex rounded-sm shadow-sm">
                          <button
                            @click="close"
                            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-gray-50 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
                          >
                            {{ $t("shared.cancel") }}
                          </button>
                        </span>
                        <span class="inline-flex rounded-sm shadow-sm ml-2">
                          <button
                            @click="createTenant"
                            class="ml-1 h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-indigo focus:border-gray-600 active:bg-gray-700 transition duration-150 ease-in-out"
                          >
                            {{ $t("shared.create") }}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <modal ref="cardModal">
      <div>
        <card
          ref="card"
          class="stripe-card w-full mt-5 mb-5"
          :class="complete ? 'border-1 border-green-100' : ''"
          :stripe="stripeKey"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />

        <button
          class="block w-full py-2 px-3 border border-transparent rounded-sm text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 focus:outline-shadow sm:text-sm sm:leading-5"
          @click="pay"
          :disabled="!complete"
        >
          {{ getButtonText }}
        </button>
      </div>
    </modal>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal ref="confirmModal" v-on:yes="tryRegister"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import Modal from "@/components/shared/modals/Modal.vue";
import Plans from "@/components/marketing/Plans.vue";
import { Card, createToken } from "vue-stripe-elements-plus";
import CurrencyToggle from "@/components/marketing/toggles/CurrencyToggle.vue";
import InvoiceToggle from "@/components/marketing/toggles/InvoiceToggle.vue";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { TenantCreateRequest } from "@/application/contracts/master/tenants/TenantCreateRequest";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";

@Component({
  components: {
    ErrorModal,
    Modal,
    ConfirmModal,
    Plans,
    Card,
    CurrencyToggle,
    InvoiceToggle
  }
})
export default class TenantNew extends BaseComponent {
  $refs!: {
    errorModal: ErrorModal;
    cardModal: Modal;
    confirmModal: ConfirmModalComponent;
  };
  private name: string = "";
  private stripeKey: string = "";
  private stripeOptions: any = {};
  private complete: boolean = false;
  created() {
    this.stripeKey =
      process.env.VUE_APP_SUBSCRIPTION_PUBLIC_KEY?.toString() ?? "";
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale
      }
    };
    if (!this.selectedProduct) {
      this.$store.commit("pricing/select", {
        product: this.$store.state.pricing.products[0],
        billingPeriod: SubscriptionBillingPeriod.MONTHLY
      });
    }
  }
  mounted() {
    this.services.subscriptionProducts.getProducts(true, true);
  }
  close() {
    this.$emit("close");
  }
  createTenant() {
    if (!this.selectedPrice) {
      this.$refs.errorModal.show("Selecciona un plan");
    } else if (this.name === "") {
      this.$refs.errorModal.show("Escribe un nombre");
    } else {
      this.$refs.confirmModal.show(this.$t("settings.tenant.createConfirm"));
    }
  }
  tryRegister() {
    if (this.selectedPrice?.trialDays === 0 && this.selectedPrice?.price > 0) {
      this.$refs.cardModal.show(
        this.$t("account.register.providePaymentDetails").toString(),
        this.$t("shared.cancel")
      );
    } else {
      this.register();
    }
  }
  pay() {
    createToken()
      .then(data => {
        if (data.error) {
          this.$refs.errorModal.show(data.error.message);
        } else {
          this.register(data.token.id);
        }
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.$refs.cardModal.close();
      });
  }
  register(stripeCardToken: string = "") {
    const tenantCreateRequest: TenantCreateRequest = {
      name: this.name,
      selectedSubscription: {
        subscriptionPriceId: this.selectedPrice?.id ?? "",
        subscriptionCardToken: stripeCardToken,
        subscriptionCoupon: ""
      }
    };
    this.services.tenants
      .create(tenantCreateRequest)
      .then(response => {
        this.name = "";
        this.$router.go(0);
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  get selectedProduct() {
    return this.$store.state.pricing.selectedProduct as SubscriptionProductDto;
  }
  get getButtonText() {
    if (this.selectedPrice) {
      return (
        (this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.ONCE
          ? this.$t("marketing.pricing.pay")
          : this.$t("marketing.pricing.subscribe")) +
        " " +
        this.priceDescription
      );
    }
  }
  get selectedPrice(): SubscriptionPriceDto | undefined {
    if (this.selectedProduct) {
      return (
        this.selectedProduct.prices.find(
          f => f.billingPeriod === this.$store.state.pricing.billingPeriod
        ) ?? this.selectedProduct.prices[0]
      );
    }
  }
  get billingPeriod() {
    if (this.selectedPrice) {
      if (
        this.selectedPrice?.billingPeriod === SubscriptionBillingPeriod.ONCE
      ) {
        return this.$t("marketing.pricing.once");
      } else {
        return (
          "/ " +
          this.$t(
            "marketing.pricing." +
              SubscriptionBillingPeriod[this.selectedPrice.billingPeriod] +
              "Short"
          )
        );
      }
    }
  }
  get priceDescription() {
    return "$" + this.selectedPrice?.price + " " + this.billingPeriod;
  }
}
</script>
