<template>
  <div>
    <form @submit.prevent>
      <div class="shadow overflow-hidden sm:rounded-sm">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-6 sm:col-span-6 w-full">
              <span
                id="listbox-label"
                class="block text-sm leading-5 font-medium text-gray-700 mb-4"
                >{{ $t("settings.tenant.payment.title") }}</span
              >
              <div
                class="text-theme-800 text-sm font-semibold"
                v-if="subscriptionCard && !editing"
              >
                {{ subscriptionCardHolder }}
                <span class="uppercase">{{ subscriptionCard.brand }}</span>
                {{ $t("settings.tenant.payment.ending") }} ****
                {{ subscriptionCardLast4 }} - {{ subscriptionCardExpDesc }}
              </div>
              <div v-else>
                <div v-if="editing" id="card-element">
                  <card
                    ref="card"
                    class="stripe-card w-full"
                    :class="complete ? 'border-1 border-green-100' : ''"
                    :stripe="stripeKey"
                    :options="stripeOptions"
                    @change="complete = $event.complete"
                  />
                </div>
                <div v-else class="text-red-500 text-sm">
                  {{ $t("settings.tenant.payment.notset") }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            @click="editing = !editing"
            class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-gray-800 bg-gray-200 shadow-sm hover:bg-gray-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out"
          >
            <span>
              {{ !editing ? $t("shared.edit") : $t("shared.cancel") }}
            </span>
          </button>

          <loading-button
            class="ml-3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-white bg-theme-600 shadow-sm hover:bg-theme-500 focus:outline-none focus:shadow-outline-blue active:bg-theme-600 transition duration-150 ease-in-out"
            @click="updatePaymentDetails"
            v-if="editing"
            ref="loadingButton"
            >{{ $t("shared.save") }}</loading-button
          >
        </div>
      </div>
    </form>

    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import Stripe from "stripe";
import { Card, createToken } from "vue-stripe-elements-plus";
import { mapGetters } from "vuex";
import { SubscriptionCardDto } from "../../../../../application/dtos/master/subscriptions/SubscriptionCardDto";

@Component({
  components: { SuccessModal, ErrorModal, Card },
  computed: {
    ...mapGetters("tenant", {
      subscriptionCard: "defaultSubscriptionCard",
    }),
  },
})
export default class TenantSubscriptionPaymentDetails extends BaseComponent {
  private editing: boolean = false;
  private stripeKey!: string;
  private stripeOptions!: any;
  private complete: boolean = false;
  private subscriptionCard!: SubscriptionCardDto;
  created() {
    // @ts-ignore
    this.stripeKey = process.env.VUE_APP_SUBSCRIPTION_PUBLIC_KEY.toString();
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale,
      },
    };
  }
  updatePaymentDetails() {
    // @ts-ignore
    this.$refs.loadingButton.start();
    createToken()
      .then((data) => {
        if (data.error) {
          // @ts-ignore
          this.$refs["error-modal"].show(data.error.message);
          // @ts-ignore
          this.$refs.loadingButton.stop();
        } else {
          if (data.token.id && data.token.id !== "") {
            this.updateCardToken(data.token.id);
          }
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
        this.editing = false;
      });
  }
  updateCardToken(token: string) {
    this.services.subscriptionManager
      .updateCardToken(token)
      .then((response) => {
        this.services.subscriptionManager.getCurrentSubscription();
        // @ts-ignore
        this.$refs["success-modal"].show(
          this.$t("settings.tenant.payment.updated")
        );
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
        this.editing = false;
      });
  }

  get subscriptionCardLast4() {
    return this.subscriptionCard?.lastFourDigits;
  }
  get subscriptionCardHolder() {
    return this.subscriptionCard?.brand;
  }
  get subscriptionCardExpDesc() {
    return (
      ("0" + this.subscriptionCard?.expiryMonth).slice(-2) +
      " / " +
      this.subscriptionCard?.expiryYear
    );
  }
}
</script>
