<template>
  <div>
    <form @submit.prevent method="POST">
      <div class="shadow sm:rounded-sm">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-2">
            <plans ref="plans" class="col-span-6"></plans>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            v-if="false"
            @click="openCustomerPortal"
            class="mx-2 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-shadow active:bg-gray-900 transition duration-150 ease-in-out"
          >
            <span>
              {{ $t("settings.tenant.subscription.openCustomerPortal") }}
            </span>
          </button>
          <button
            @click="openDropdown"
            class="py-2 px-4 text-sm leading-5 font-medium rounded-sm text-gray-800 bg-gray-100 border border-gray-200 shadow-sm hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out"
          >
            <span>
              {{ !editing ? $t("shared.change") : $t("shared.cancel") }}
            </span>
          </button>
          <loading-button
            class="ml-3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-white bg-gray-800 shadow-sm hover:bg-gray-700 active:bg-gray-900 transition duration-150 ease-in-out"
            v-if="editing && saveText"
            @click="updateSubscription"
            ref="loadingButton"
            >{{ saveText }}</loading-button
          >
        </div>
      </div>
    </form>

    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal ref="confirmModal" v-on:yes="yesUpdate"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import Plans from "@/components/marketing/Plans.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import BillingPeriodToggle from "@/components/marketing/toggles/BillingPeriodToggle.vue";
import { mapGetters } from "vuex";
import { SubscriptionPriceDto } from "@/application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionCardDto } from "@/application/dtos/master/subscriptions/SubscriptionCardDto";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import ErrorModalComponent from "@/components/shared/modals/ErrorModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import PlansComponent from "@/components/marketing/Plans.vue";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";

@Component({
  components: {
    Plans,
    ErrorModal,
    SuccessModal,
    ConfirmModal,
    BillingPeriodToggle,
    LoadingButton
  },
  computed: {
    ...mapGetters("tenant", {
      subscriptionCard: "defaultSubscriptionCard",
      activePrice: "activePrice"
    }),
    ...mapGetters("pricing", {
      selectedPrice: "selectedPrice",
      selectedProduct: "selectedProduct"
    })
  }
})
export default class TenantSubscriptionPlan extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    successModal: SuccessModalComponent;
    confirmModal: ConfirmModalComponent;
    loadingButton: LoadingButton;
    plans: PlansComponent;
  };
  private editing: boolean = false;
  private subscriptionCard!: SubscriptionCardDto;
  private selectedPrice!: SubscriptionPriceDto;
  private selectedProduct!: SubscriptionProductDto;
  private activePrice!: SubscriptionPriceDto;
  updateSubscription() {
    if (
      !this.selectedPrice ||
      !this.selectedPrice.serviceId ||
      !this.selectedProduct
    ) {
      this.$refs.errorModal.show(
        this.$t("shared.select") + " " + this.$t("shared.product")
      );
      return;
    }
    if (
      this.selectedPrice.trialDays === 0 &&
      this.selectedPrice.price > 0 &&
      !this.subscriptionCard
    ) {
      this.$refs.errorModal.show(this.$t("settings.tenant.payment.notSet"));
      return;
    }

    if (
      this.myProducts &&
      this.myProducts.length > 0 &&
      this.myProducts[0].subscriptionPriceId === this.selectedPrice.id
    ) {
      this.$refs.errorModal.show(
        this.$t("settings.tenant.subscription.alreadySubscribed")
      );
      return;
    }

    this.$refs.confirmModal.show(
      this.$t("shared.updateSubscriptionTo?", [
        this.selectedProduct.title
      ]).toString(),
      this.$t("shared.confirm").toString(),
      this.$t("shared.back").toString(),
      this.priceDescription
    );
  }
  yesUpdate() {
    this.$refs.loadingButton.start();
    this.services.subscriptionManager
      .updateSubscription({
        subscriptionPriceId: this.selectedPrice.id
      })
      .then(() => {
        this.services.subscriptionManager.getCurrentSubscription();
        this.$refs.successModal.show(
          this.$t("settings.tenant.subscription.updated")
        );
        this.eventBus.$emit("updated-plan");
        this.editing = false;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
      });
  }
  async openCustomerPortal() {
    this.services.subscriptionManager
      .createCustomerPortalSession()
      .then((result: any) => {
        location = result.data.url;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  openDropdown() {
    if (this.editing) {
      this.$refs.plans.open();
    } else {
      this.$refs.plans.closeDropdown();
    }
    this.editing = !this.editing;
  }
  get priceDescriptionSmall(): string {
    if (!this.selectedPrice) {
      return "";
    }
    const price = this.selectedPrice.price;
    const currency = this.selectedPrice.currency;
    const period =
      "/" +
      this.$t(
        "marketing.pricing." +
          SubscriptionBillingPeriod[this.selectedPrice.billingPeriod] +
          "Short"
      );
    return `${price} ${currency}${period}`;
  }
  get priceDescription(): string {
    if (!this.selectedPrice) {
      return "";
    }
    const price = this.selectedPrice.price;
    const currency = this.selectedPrice.currency;
    const period =
      "/" +
      this.$t(
        "marketing.pricing." +
          SubscriptionBillingPeriod[this.selectedPrice.billingPeriod] +
          "Short"
      );
    const feature = this.selectedProduct?.features[0].value;

    const modo =
      this.selectedPrice.mode === 0
        ? this.$t("app.tickets.whoInvoices.0")
        : this.$t("app.tickets.whoInvoices.1");
    return `${price} ${currency}${period}. ${feature}. ${modo}.`;
  }
  get myProducts(): TenantProductDto[] {
    const products = this.$store.state.tenant.subscription
      .myProducts as TenantProductDto[];
    if (products && products.length > 0) {
      return products.filter(
        f =>
          f.subscriptionPrice.billingPeriod !== SubscriptionBillingPeriod.ONCE
      );
    }
    return [];
  }
  get saveText() {
    if (!this.selectedPrice) {
      return this.$t("shared.upgrade");
    } else if (
      this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.ONCE
    ) {
      return this.$t("marketing.pricing.buy");
    } else if (!this.activePrice) {
      return this.$t("marketing.pricing.subscribe");
    }
    return this.$t("marketing.pricing.updateSubscription");
    // +
    // " por " +
    // this.priceDescriptionSmall
    // else if (this.activePrice.serviceId === this.selectedPrice.serviceId) {
    //   return "";
    // } else if (this.selectedPrice.price < this.activePrice.price) {
    //   return this.$t("marketing.pricing.downgrade");
    // } else {
    //   return this.$t("marketing.pricing.upgrade");
    // }
  }
  // get selectedPrice() {
  //   const selectedProduct = this.$store.state.pricing
  //     .selectedProduct as SubscriptionProduct;
  //   return (
  //     selectedProduct.prices.find(
  //       (f) => f.billingPeriod === this.$store.state.pricing.billingPeriod
  //     ) ?? selectedProduct.prices[0]
  //   );
  // }
}
</script>
