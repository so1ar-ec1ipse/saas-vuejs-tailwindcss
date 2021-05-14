<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="
        !editing
          ? $t('shared.new') + ' ' + $t('models.subscriptionProduct.object')
          : $t('shared.edit') + ' ' + $t('models.subscriptionProduct.object')
      "
    >
      <template v-slot:content>
        <form @submit="save">
          <vue-form-generator
            :disabled="disabled"
            ref="vfg"
            :schema="schema"
            :model="model"
            :options="formOptions"
          ></vue-form-generator>
        </form>
      </template>
      <template v-slot:footer>
        <span class="inline-flex rounded-sm shadow-sm">
          <button
            v-if="editing"
            @click="remove"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-red-800 bg-rose-50 hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.delete") }}
          </button>
          <button
            @click="cancel"
            type="button"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.cancel") }}
          </button>
          <button
            :disabled="disabled"
            @click="save"
            type="submit"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-indigo-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.save") }}
          </button>
        </span>
      </template>
    </side-modal>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal ref="confirmSave" v-on:yes="yesSave"></confirm-modal>
    <confirm-modal ref="confirmRemove" v-on:yes="yesRemove"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import SideModal from "@/components/shared/modals/SideModal.vue";
import VueFormGenerator, { validators } from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { Prop } from "vue-property-decorator";
import dateInput from "@/components/shared/forms/DateInput.vue";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
Vue.component("fieldDateInput", dateInput);

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    SideModal,
    "vue-form-generator": VueFormGenerator.component,
  },
})
export default class SubscriptionProductFormComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    confirmSave: ConfirmModalComponent;
    confirmRemove: ConfirmModalComponent;
    vfg: VueFormGenerator;
  };
  private id: any = false;

  private flagAllowEdit: boolean = true;
  private flagAllowDelete: boolean = true;
  private editing: boolean = false;
  private isValid: boolean = false;
  private model = {} as SubscriptionProductDto;
  private disabled: boolean = true;
  private updateOnServer: boolean = true;
  private schema: any = {
    fields: [
      {
        id: "title",
        type: "input",
        inputType: "text",
        model: "title",
        label: this.$t("models.subscriptionProduct.title"),
        placeholder: this.$t("models.subscriptionProduct.title"),
        required: true,
        validator: validators.string,
      },
      {
        id: "description",
        type: "input",
        inputType: "text",
        model: "description",
        label: this.$t("models.subscriptionProduct.description"),
        placeholder: this.$t("models.subscriptionProduct.description"),
        required: false,
        validator: validators.string,
      },
      {
        id: "serviceId",
        type: "input",
        inputType: "text",
        label: this.$t("models.subscriptionProduct.serviceId"),
        placeholder: this.$t("models.subscriptionProduct.serviceIdLeaveEmpty"),
        model: "serviceId",
        required: false,
        attributes: {
          autofocus: true,
        },
        validator: validators.string,
      },
      {
        id: "tier",
        inputType: "number",
        type: "input",
        model: "tier",
        label: this.$t("models.subscriptionProduct.tier"),
        placeholder: this.$t("models.subscriptionProduct.tier"),
        required: true,
        validator: validators.integer,
      },
      {
        id: "badge",
        type: "input",
        inputType: "text",
        model: "badge",
        label: this.$t("models.subscriptionProduct.badge"),
        placeholder: this.$t("models.subscriptionProduct.badge"),
        required: false,
        validator: validators.string,
      },
      {
        id: "active",
        type: "checkbox",
        model: "active",
        label: this.$t("models.subscriptionProduct.active"),
        required: true,
      },
      {
        id: "image",
        type: "image",
        model: "image",
        label: this.$t("models.subscriptionProduct.image"),
        placeholder: this.$t("models.subscriptionProduct.image"),
        hideInput: true,
      },
      {
        id: "maxUsers",
        inputType: "number",
        type: "input",
        model: "maxUsers",
        label: this.$t("models.subscriptionProduct.maxUsers"),
        placeholder: this.$t("models.subscriptionProduct.maxUsers"),
        default: 0,
      },
    ],
  };
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true,
  };
  mounted() {
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;

      this.schema.fields[2].disabled = true;
      this.services.subscriptionProducts
        .getProduct(this.id)
        .then((response: SubscriptionProductDto) => {
          this.model = response;
          this.disabled = false;
        })
        .catch((error) => {
          this.$refs.errorModal.show(this.$t("shared.notFound"));
          this.pushToParent();
        });
    } else {
      this.disabled = false;
    }
  }
  cancel() {
    this.$emit("canceled");
    this.pushToParent();
  }
  save() {
    this.$refs.vfg.validate().then((errors) => {
      if (errors && errors.length > 0) {
        this.$refs.errorModal.show(this.$t("shared.invalidForm"));
      } else {
        this.$refs.confirmSave.show(
          this.editing ? this.$t("shared.save?") : this.$t("shared.add?")
        );
      }
    });
  }
  yesSave() {
    if (this.editing && this.flagAllowEdit) {
      if (this.updateOnServer) {
        this.services.subscriptionProducts
          .updateProduct(this.id, {
            id: this.model.id,
            tier: this.model.tier,
            title: this.model.title,
            description: this.model.description,
            badge: this.model.badge,
            active: this.model.active,
            image: this.model.image,
            maxUsers: this.model.maxUsers,
          })
          .then(() => {
            this.$emit("saved", this.model);
            this.pushToParent();
          })
          .catch((error) => {
            this.$refs.errorModal.show(error);
          });
      } else {
        this.$emit("saved", this.model);
        this.pushToParent();
      }
    } else if (!this.editing) {
      if (this.updateOnServer) {
        this.services.subscriptionProducts
          .createProduct(this.model)
          .then((response: SubscriptionProductDto) => {
            this.$emit("added", response);
            this.pushToParent();
          })
          .catch((error) => {
            this.$refs.errorModal.show(error);
          });
      } else {
        this.$emit("added", this.model);
        this.pushToParent();
      }
    }
  }
  remove() {
    this.$refs.confirmRemove.show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      if (this.updateOnServer) {
        this.services.subscriptionProducts
          .deleteProduct(this.id)
          .then((response) => {
            this.$emit("deleted", this.model);
          });
      } else {
        this.$emit("deleted", this.model);
      }
    }
  }
}
</script>
<style>
.form-control {
  @apply w-full;
  @apply border;
  @apply border-gray-400;
  @apply shadow-sm;
  @apply rounded;
  @apply leading-5;
  @apply text-sm;
  @apply h-8;
  @apply p-3;
}
.wrapper .file {
  @apply h-10;
}
.vdp-datepicker div input {
  @apply w-full;
  @apply border;
  @apply border-gray-400;
  @apply shadow-sm;
  @apply rounded;
  @apply leading-5;
  @apply text-sm;
  @apply h-8;
  @apply p-3;
}
</style>
