<template>
  <div>
    <div class="p-20 space-y-2 mx-auto max-w-md">
      <div>{{ $t("shared.authentication") }}: {{ userClaims }}</div>
      <button
        :disabled="loading"
        class="w-full bg-yellow-50 border border-yellow-400 hover:border-2 text-gray-800 font-medium"
        @click="scanTickets"
      >
        {{ $t("app.tickets.scanAllPending") }}
      </button>
    </div>
    <success-modal ref="modalSuccess"></success-modal>
    <new-error-modal ref="modalError"></new-error-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { AdminService } from "../../../services/api/master/admin/AdminService";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import NewErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import { UserService } from "@/services/api/master/users/UserService";

@Component({
  components: {
    SuccessModal,
    NewErrorModal
  }
})
export default class SoporteComponent extends Vue {
  $refs!: {
    modalSuccess: SuccessModal;
    modalError: NewErrorModal;
  };
  private userClaims: any[] = [];
  private loading: boolean = false;
  private adminService: AdminService = new AdminService();
  private userService: UserService = new UserService();
  mounted() {
    this.userService.getClaims().then((response: any[]) => {
      this.userClaims = response;
    });
  }
  scanTickets() {
    this.loading = true;
    this.adminService
      .scanTickets()
      .then((response: any) => {
        this.$refs.modalSuccess.show(response);
      })
      .catch((error: any) => {
        this.$refs.modalError.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
