<template>
  <div>
    <div v-for="(tenant, index) in tenants" :key="index">
      <a @click="selectTenant(tenant)">{{ tenant.name }}</a>
    </div>
    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import { TenantDto } from "../../../application/dtos/master/tenants/TenantDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";

@Component({
  components: {
    SuccessModal,
    ErrorModal
  }
})
export default class SelectOrganizationComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    successModal: SuccessModalComponent;
  };
  mounted() {
    this.services.tenants
      .getAll()
      .then((response: TenantDto[]) => {
        if (response.length > 0) {
          if (response.length === 1) {
            this.selectTenant(response[0]);
          }
        }
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  selectTenant(tenant) {
    this.$store.commit("tenant/current", tenant);
    this.$router.push({ name: "app" });
  }
  get tenants() {
    return this.$store.state.tenant.tenants;
  }
}
</script>
