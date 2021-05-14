<template>
  <div>
    <form @submit.prevent>
      <div class="shadow overflow-hidden sm:rounded-sm">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-6 sm:col-span-6 w-full">
              <span
                id="listbox-label"
                class="flex justify-between text-sm leading-5 font-medium text-gray-700 mb-4"
                >{{ $t("settings.tenant.payment.title") }}</span
              >
              <div
                class="text-gray-600 text-sm font-semibold"
                v-if="subscriptionCard && !editing"
              >
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
                  {{ $t("settings.tenant.payment.notSet") }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            @click="editing = !editing"
            class="py-2 px-4 text-sm leading-5 font-medium rounded-sm text-gray-800 bg-gray-100 border border-gray-200 shadow-sm hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out"
          >
            <span>
              {{ !editing ? $t("shared.edit") : $t("shared.cancel") }}
            </span>
          </button>

          <loading-button
            class="ml-3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-white bg-gray-800 shadow-sm hover:bg-gray-700 active:bg-gray-900 transition duration-150 ease-in-out"
            @click="updatePaymentDetails"
            v-if="editing"
            ref="loadingButton"
            >{{ $t("shared.save") }}</loading-button
          >
        </div>
      </div>
    </form>

    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import { mapGetters } from "vuex";
import { SubscriptionCardDto } from "../../../../../application/dtos/master/subscriptions/SubscriptionCardDto";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import { Card, createToken } from "vue-stripe-elements-plus";

@Component({
  components: { LoadingButton, SuccessModal, ErrorModal, Card },
  computed: {
    ...mapGetters("tenant", {
      subscriptionCard: "defaultSubscriptionCard"
    })
  }
})
export default class TenantSubscriptionPaymentDetails extends BaseComponent {
  $refs!: {
    successModal: SuccessModal;
    errorModal: ErrorModal;
    loadingButton: LoadingButton;
  };
  private editing: boolean = false;
  private stripeKey!: string;
  private stripeOptions!: any;
  private complete: boolean = false;
  private subscriptionCard!: SubscriptionCardDto;
  created() {
    this.stripeKey = process.env.VUE_APP_SUBSCRIPTION_PUBLIC_KEY ?? "";
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale
      }
    };
  }
  updatePaymentDetails() {
    this.$refs.loadingButton.start();
    createToken()
      .then(data => {
        if (data.error) {
          this.$refs.errorModal.show(data.error.message);
          if (this.$refs.loadingButton) {
            this.$refs.loadingButton.stop();
          }
        } else {
          if (data.token.id && data.token.id !== "") {
            this.updateCardToken(data.token.id);
          }
        }
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
        this.editing = false;
      });
  }
  updateCardToken(token: string) {
    this.services.subscriptionManager
      .updateCardToken(token)
      .then(response => {
        this.services.subscriptionManager.getCurrentSubscription();
        this.$refs.successModal.show(
          this.$t("settings.tenant.payment.updated")
        );
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
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
