<template>
  <div>
    <span class="rounded-sm shadow-sm w-full">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-4"
      >
        <button
          @click="everyone()"
          type="button"
          class="w-full mr-3 items-center px-2 py-2 border border-gray-300 text-lg leading-4 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
        >
          Everyone
        </button>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-4"
      >
        <div v-for="product in products" :key="product.id">
          <button
            @click="onlyTierAndUp(product)"
            type="button"
            class="w-full mr-3 items-center px-2 py-2 border border-gray-300 text-lg leading-4 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
          >
            {{ product.title }}
          </button>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
      >
        <div v-for="role in roleValues" :key="role">
          <button
            @click="onlyRole(role)"
            type="button"
            class="w-full mr-3 items-center px-2 py-2 border border-gray-300 text-lg leading-4 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
          >
            {{ getRoleName(role) }}
          </button>
        </div>
      </div>
    </span>

    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal
      ref="confirmModal"
      v-on:yes="yesUpdateSubscription"
    ></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import { mapGetters } from "vuex";
import { defaultProducts } from "@/store/modules/pricing/default-pricing";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionGetCurrentResponse } from "@/application/contracts/master/subscriptions/SubscriptionGetCurrentResponse";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";

@Component({
  components: { ConfirmModal, ErrorModal, SuccessModal },
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      subscription: "subscription",
      role: "role",
      roleName: "roleName"
    })
  }
})
export default class DemoActionsComponent extends BaseComponent {
  $refs!: {
    successModal: SuccessModal;
    errorModal: ErrorModal;
    confirmModal: ConfirmModal;
  };
  public activeProduct!: TenantProductDto;
  public role!: TenantUserRole;
  public roleName!: string;
  public subscription!: SubscriptionGetCurrentResponse;
  public products: SubscriptionProductDto[] = [];
  public roleKeys: string[] = [];
  public roleValues: any[] = [];
  mounted() {
    this.roleKeys = Object.keys(TenantUserRole).filter(
      k => typeof TenantUserRole[k as any] === "number"
    );
    this.roleValues = this.roleKeys.map(k => TenantUserRole[k as any]); // [0, 1]
    this.products = defaultProducts;
  }
  everyone() {
    this.showAllowed();
  }
  onlyTierAndUp(product: SubscriptionProductDto) {
    if (this.activeProduct.subscriptionProduct.tier >= product.tier) {
      this.showAllowed();
    } else {
      this.showNotAllowed();
    }
  }
  getRoleName(role) {
    return TenantUserRole[role];
  }
  onlyRole(role: TenantUserRole) {
    console.log("current: " + this.role);
    console.log("role: " + role);
    if (this.role > role) {
      this.$refs.errorModal.show(
        this.$t("account.tenant.only" + TenantUserRole[role])
      );
    } else {
      this.showAllowed();
    }
  }
  showAllowed() {
    this.$refs.successModal.show(this.$t("shared.allowed"));
  }
  showNotAllowed() {
    this.$refs.confirmModal.show(this.$t("shared.upgrade"));
  }
  yesUpdateSubscription() {
    this.$router.push({
      name: "settings.tenant.subscription"
    });
  }
}
</script>
