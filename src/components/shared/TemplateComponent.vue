<template>
  <div>
    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ErrorModalComponent from "./modals/NewErrorModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";

@Component({
  components: { SuccessModal, ErrorModal, ConfirmModal },
})
export default class TemplateComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    successModal: SuccessModalComponent;
  };
}
</script>
